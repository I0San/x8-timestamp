import { useState } from 'react'
import { useAccount } from 'wagmi'
import { Link } from 'react-router-dom'
import { useUserTimestamps, useGetTimestamp } from '../hooks/useTimestamp'
import { formatHash, formatTimestamp } from '../lib/hash'

interface TimestampItemProps {
  hash: `0x${string}`
}

function TimestampItem({ hash }: TimestampItemProps) {
  const { timestamp, isLoading } = useGetTimestamp(hash)
  
  if (isLoading) {
    return (
      <div className="p-4 border-b border-x8-border animate-pulse">
        <div className="h-4 bg-x8-gray-light w-3/4 mb-2" />
        <div className="h-3 bg-x8-gray-light w-1/2" />
      </div>
    )
  }
  
  if (!timestamp) return null
  
  return (
    <Link
      to={`/certificate/${hash}`}
      className="block p-4 border-b border-x8-border hover:bg-x8-gray-light transition-colors"
    >
      <div className="flex items-start justify-between">
        <div className="min-w-0 flex-1">
          <p className="font-medium text-x8-dark truncate">
            {timestamp.metadata || formatHash(hash)}
          </p>
          <p className="text-sm text-x8-gray mt-1">
            {formatTimestamp(timestamp.timestamp)}
          </p>
        </div>
        <div className="ml-4 flex items-center">
          <span className="inline-flex items-center px-2.5 py-0.5 text-xs font-medium bg-primary-50 text-x8-gold border border-primary-200">
            Confirmed
          </span>
          <svg className="ml-2 w-5 h-5 text-x8-gray" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </div>
      <p className="text-xs font-mono text-x8-gray mt-2 truncate">{hash}</p>
    </Link>
  )
}

type SortOrder = 'newest' | 'oldest'

export function ActivityList() {
  const { isConnected } = useAccount()
  const { hashes, isLoading, error, refetch } = useUserTimestamps()
  const [sortOrder, setSortOrder] = useState<SortOrder>('newest')
  
  const sortedHashes = [...hashes].sort(() => {
    return sortOrder === 'newest' ? -1 : 1
  })
  
  if (!isConnected) {
    return (
      <div className="card text-center py-12">
        <svg className="w-16 h-16 text-x8-border mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
        </svg>
        <h3 className="section-title mb-2">Connect Your Wallet</h3>
        <p className="text-x8-gray">Connect your wallet to view your timestamps</p>
      </div>
    )
  }
  
  if (isLoading) {
    return (
      <div className="card">
        <div className="animate-pulse space-y-4">
          <div className="h-6 bg-x8-gray-light w-1/4" />
          <div className="h-16 bg-x8-gray-light" />
          <div className="h-16 bg-x8-gray-light" />
          <div className="h-16 bg-x8-gray-light" />
        </div>
      </div>
    )
  }
  
  if (error) {
    return (
      <div className="card text-center py-12">
        <svg className="w-16 h-16 text-red-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <h3 className="section-title mb-2">Error Loading Activity</h3>
        <p className="text-x8-gray mb-4">{error.message}</p>
        <button onClick={() => refetch()} className="btn btn-outline">
          Try Again
        </button>
      </div>
    )
  }
  
  if (hashes.length === 0) {
    return (
      <div className="card text-center py-12">
        <svg className="w-16 h-16 text-x8-border mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
        <h3 className="section-title mb-2">No Timestamps Yet</h3>
        <p className="text-x8-gray mb-4">You haven't timestamped any documents yet</p>
        <Link to="/timestamp" className="btn btn-primary">
          Create Your First Timestamp
        </Link>
      </div>
    )
  }
  
  return (
    <div className="card p-0">
      <div className="p-4 border-b border-x8-border flex items-center justify-between">
        <h2 className="section-title">Your Timestamps ({hashes.length})</h2>
        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value as SortOrder)}
          className="text-sm border border-x8-border px-3 py-1.5 text-x8-dark bg-white focus:border-x8-gold focus:outline-none"
        >
          <option value="newest">Newest First</option>
          <option value="oldest">Oldest First</option>
        </select>
      </div>
      <div className="divide-y divide-x8-border">
        {sortedHashes.map((hash) => (
          <TimestampItem key={hash} hash={hash} />
        ))}
      </div>
    </div>
  )
}
