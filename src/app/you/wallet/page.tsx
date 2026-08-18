'use client'

import { useState } from 'react'
import {
  Wallet as WalletIcon,
  ArrowDownCircle,
  ArrowUpCircle,
} from 'lucide-react'
import AuthHeader from '@/components/auth/AuthHeader'

type Transaction = {
  id: string
  label: string
  date: string
  amount: number // positive = credit, negative = debit
}

const initialTransactions: Transaction[] = [
  { id: 't1', label: 'Top-up', date: 'Feb 3, 2026', amount: 5000 },
  { id: 't2', label: 'Special event application fee', date: 'Feb 1, 2026', amount: -1850 },
  { id: 't3', label: 'Top-up', date: 'Jan 28, 2026', amount: 10000 },
  { id: 't4', label: 'Date reservation split', date: 'Jan 20, 2026', amount: -3200 },
]

const TOP_UP_PRESETS = [1000, 2000, 5000, 10000]

export default function WalletPage() {
  const [balance, setBalance] = useState(9950)
  const [transactions, setTransactions] = useState(initialTransactions)
  const [showTopUp, setShowTopUp] = useState(false)
  const [customAmount, setCustomAmount] = useState('')

  const handleTopUp = (amount: number) => {
    if (!amount || amount <= 0) return
    setBalance((b) => b + amount)
    setTransactions((prev) => [
      { id: Date.now().toString(), label: 'Top-up', date: 'Just now', amount },
      ...prev,
    ])
    setShowTopUp(false)
    setCustomAmount('')
  }

  return (
    <>
      <AuthHeader title="Wallet" backHref="/you" />

      <main className="mx-auto max-w-md px-6 py-8">
        <div className="card-glass text-center">
          <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-accent-primary">
            <WalletIcon size={20} className="text-white" />
          </span>
          <p className="mt-3 text-sm text-ink-muted">Balance</p>
          <p className="mt-1 text-3xl font-bold text-ink">
            ₦{balance.toLocaleString()}
          </p>

          <button
            type="button"
            onClick={() => setShowTopUp(true)}
            className="btn-primary mt-5 w-full"
          >
            Top up
          </button>
        </div>

        <h2 className="mb-3 mt-8 text-sm font-semibold text-ink-muted">
          Transaction history
        </h2>
        <div className="flex flex-col gap-3">
          {transactions.map((t) => (
            <div
              key={t.id}
              className="flex items-center gap-3 rounded-lg border border-accent-mid bg-white p-4"
            >
              <span
                className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full ${
                  t.amount > 0 ? 'bg-green-100' : 'bg-accent-soft'
                }`}
              >
                {t.amount > 0 ? (
                  <ArrowDownCircle size={18} className="text-green-600" />
                ) : (
                  <ArrowUpCircle size={18} className="text-accent-primary" />
                )}
              </span>
              <div className="flex-1">
                <p className="text-sm font-medium text-ink">{t.label}</p>
                <p className="text-xs text-ink-muted">{t.date}</p>
              </div>
              <span
                className={`text-sm font-semibold ${
                  t.amount > 0 ? 'text-green-600' : 'text-ink'
                }`}
              >
                {t.amount > 0 ? '+' : ''}₦{Math.abs(t.amount).toLocaleString()}
              </span>
            </div>
          ))}
        </div>
      </main>

      {showTopUp && (
        <div
          className="fixed inset-0 z-50 flex items-end bg-ink/30 animate-backdrop-fade-in"
          onClick={() => setShowTopUp(false)}
        >
          <div
            className="w-full rounded-t-lg bg-white p-6 animate-slide-up"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-lg font-bold text-ink">Top up wallet</h2>
            {/* No real payment gateway (Paystack/Flutterwave per the PRD)
                wired up yet — this adds to your balance locally so the
                flow can be seen end to end */}
            <p className="mt-1 text-sm text-ink-muted">
              No real payment gateway yet — this adds to your balance
              locally for now.
            </p>

            <div className="mt-4 grid grid-cols-2 gap-3">
              {TOP_UP_PRESETS.map((amount) => (
                <button
                  key={amount}
                  type="button"
                  onClick={() => handleTopUp(amount)}
                  className="rounded-lg border border-accent-mid bg-white py-3 text-sm font-semibold text-ink hover:bg-accent-soft"
                >
                  ₦{amount.toLocaleString()}
                </button>
              ))}
            </div>

            <div className="mt-4 flex gap-2">
              <input
                value={customAmount}
                onChange={(e) =>
                  setCustomAmount(e.target.value.replace(/\D/g, ''))
                }
                placeholder="Custom amount"
                inputMode="numeric"
                className="input-field flex-1"
              />
              <button
                type="button"
                disabled={!customAmount}
                onClick={() => handleTopUp(Number(customAmount))}
                className="rounded-pill bg-accent-primary px-5 py-2 text-sm font-semibold text-white shadow-glow disabled:opacity-40"
              >
                Add
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
