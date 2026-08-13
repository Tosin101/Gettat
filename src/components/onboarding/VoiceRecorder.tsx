'use client'

import { useEffect, useRef, useState } from 'react'
import { Mic, Pause, Play, RotateCcw } from 'lucide-react'

const MAX_SECONDS = 60

// A fixed set of bar heights so the waveform has a consistent silhouette
// rather than being random on every render.
const BAR_HEIGHTS = [
  40, 65, 30, 80, 50, 90, 45, 70, 35, 85, 55, 95, 40, 75, 30, 80, 50, 90, 45,
  65, 35, 85, 55, 70,
]

type Status = 'idle' | 'recording' | 'paused' | 'finished'

export default function VoiceRecorder() {
  const [status, setStatus] = useState<Status>('idle')
  const [elapsed, setElapsed] = useState(0)
  const [transcript, setTranscript] = useState('')
  const [speechSupported, setSpeechSupported] = useState(false)
  const [micError, setMicError] = useState<string | null>(null)

  const mediaRecorderRef = useRef<MediaRecorder | null>(null)
  const streamRef = useRef<MediaStream | null>(null)
  // Web Speech API isn't in TypeScript's standard DOM types, hence `any`
  const recognitionRef = useRef<any>(null)
  const finalTranscriptRef = useRef('')
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)

  useEffect(() => {
    const SpeechRecognitionImpl =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition
    setSpeechSupported(Boolean(SpeechRecognitionImpl))

    // Stop the mic/timer if the user navigates away mid-recording
    return () => stopEverything()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60)
    const s = seconds % 60
    return `${m}:${s.toString().padStart(2, '0')}`
  }

  const startTimer = () => {
    timerRef.current = setInterval(() => {
      setElapsed((prev) => {
        if (prev + 1 >= MAX_SECONDS) {
          finishRecording()
          return MAX_SECONDS
        }
        return prev + 1
      })
    }, 1000)
  }

  const stopTimer = () => {
    if (timerRef.current) clearInterval(timerRef.current)
    timerRef.current = null
  }

  const startSpeechRecognition = () => {
    const SpeechRecognitionImpl =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition
    if (!SpeechRecognitionImpl) return

    const recognition = new SpeechRecognitionImpl()
    recognition.continuous = true
    recognition.interimResults = true
    recognition.lang = 'en-US'

    // Accumulates onto finalTranscriptRef so pausing/resuming (which
    // restarts recognition under the hood) doesn't lose earlier text
    recognition.onresult = (event: any) => {
      let interim = ''
      for (let i = event.resultIndex; i < event.results.length; i++) {
        const text = event.results[i][0].transcript
        if (event.results[i].isFinal) {
          finalTranscriptRef.current += text + ' '
        } else {
          interim += text
        }
      }
      setTranscript((finalTranscriptRef.current + interim).trim())
    }

    recognition.onerror = () => {
      // Fails silently — recording itself still works without transcription
    }

    recognitionRef.current = recognition
    recognition.start()
  }

  const handleStart = async () => {
    setMicError(null)
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      streamRef.current = stream
      const recorder = new MediaRecorder(stream)
      mediaRecorderRef.current = recorder
      recorder.start()

      startTimer()
      if (speechSupported) startSpeechRecognition()
      setStatus('recording')
    } catch {
      setMicError(
        'Could not access your microphone. Check your browser permissions and try again.'
      )
    }
  }

  const handlePauseResume = () => {
    const recorder = mediaRecorderRef.current
    if (!recorder) return

    if (status === 'recording') {
      recorder.pause()
      stopTimer()
      recognitionRef.current?.stop()
      setStatus('paused')
    } else if (status === 'paused') {
      recorder.resume()
      startTimer()
      if (speechSupported) startSpeechRecognition()
      setStatus('recording')
    }
  }

  const stopEverything = () => {
    stopTimer()
    recognitionRef.current?.stop()
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
      mediaRecorderRef.current.stop()
    }
    streamRef.current?.getTracks().forEach((track) => track.stop())
  }

  const finishRecording = () => {
    stopEverything()
    setStatus('finished')
  }

  const handleRestart = () => {
    stopEverything()
    finalTranscriptRef.current = ''
    setElapsed(0)
    setTranscript('')
    setStatus('idle')
    handleStart()
  }

  const isRecording = status === 'recording'

  return (
    <div className="flex flex-col items-center">
      <div className="flex h-16 items-center justify-center gap-1">
        {BAR_HEIGHTS.map((height, i) => (
          <span
            key={i}
            className={`w-1 rounded-full bg-accent-primary ${
              isRecording ? 'animate-wave-bar' : ''
            }`}
            style={{ height: `${height}%`, animationDelay: `${i * 0.05}s` }}
          />
        ))}
      </div>

      <p className="mt-3 text-sm font-medium text-ink-muted">
        {formatTime(elapsed)} / {formatTime(MAX_SECONDS)}
      </p>

      {micError && <p className="mt-3 text-sm text-red-500">{micError}</p>}

      <div className="mt-6 flex items-center justify-center gap-6">
        {status !== 'idle' && (
          <button
            type="button"
            onClick={handleRestart}
            aria-label="Restart recording"
            className="flex h-14 w-14 items-center justify-center rounded-full border-2 border-accent-mid bg-white text-ink transition-colors hover:bg-accent-soft"
          >
            <RotateCcw size={22} />
          </button>
        )}

        <button
          type="button"
          onClick={status === 'idle' ? handleStart : handlePauseResume}
          disabled={status === 'finished'}
          aria-label={
            status === 'recording'
              ? 'Pause recording'
              : status === 'paused'
                ? 'Resume recording'
                : 'Start recording'
          }
          className={`flex h-24 w-24 items-center justify-center rounded-full bg-accent-primary text-white shadow-glow transition-transform disabled:opacity-50 ${
            status === 'idle' ? 'animate-pulse-record' : ''
          }`}
        >
          {status === 'idle' && <Mic size={32} />}
          {status === 'recording' && <Pause size={32} />}
          {(status === 'paused' || status === 'finished') && <Play size={32} />}
        </button>
      </div>

      <div className="mt-8 w-full rounded-lg bg-accent-soft/60 p-4">
        <p className="text-xs font-semibold uppercase tracking-wide text-ink-muted">
          Auto-translated caption
        </p>
        <p className="mt-2 text-sm italic text-ink">
          {transcript
            ? `"${transcript}"`
            : speechSupported
              ? 'Start recording to see your live transcript appear here...'
              : "Live transcription isn't supported in this browser — try Chrome or Edge. Recording itself still works fine."}
        </p>
      </div>
    </div>
  )
}
