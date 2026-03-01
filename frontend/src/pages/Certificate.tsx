import { useParams, Link } from 'react-router-dom'
import { CertificateView } from '../components/CertificateView'

export function CertificatePage() {
  const { hash } = useParams<{ hash: string }>()
  
  if (!hash || !hash.startsWith('0x')) {
    return (
      <div className="max-w-3xl mx-auto px-6 py-12">
        <div className="card text-center py-12">
          <svg className="w-16 h-16 text-x8-border mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h3 className="section-title mb-2">Invalid Certificate ID</h3>
          <p className="text-x8-gray mb-4">
            The certificate ID provided is not valid.
          </p>
          <Link to="/activity" className="btn btn-primary">
            View Your Timestamps
          </Link>
        </div>
      </div>
    )
  }
  
  return (
    <div className="max-w-3xl mx-auto px-6 py-12">
      <div className="mb-6">
        <Link to="/activity" className="text-sm text-x8-gray hover:text-x8-dark flex items-center gap-1 transition-colors">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Activity
        </Link>
      </div>
      
      <CertificateView hash={hash as `0x${string}`} />
    </div>
  )
}
