import { TimestampForm } from '../components/TimestampForm'

export function TimestampPage() {
  return (
    <div className="max-w-2xl mx-auto px-6 py-12">
      <div className="mb-8">
        <h1 className="page-title mb-2">Create Timestamp</h1>
        <p className="text-x8-gray">
          Upload a document to create an immutable blockchain timestamp.
        </p>
      </div>
      
      <TimestampForm />
      
      <div className="mt-8 p-4 bg-primary-50 border border-primary-200">
        <div className="flex gap-3">
          <svg className="w-5 h-5 text-x8-gold flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <div className="text-sm">
            <p className="font-medium mb-1 text-x8-dark">Privacy Note</p>
            <p className="text-x8-gray">
              Your document is processed entirely in your browser. Only the SHA-256 hash 
              (a unique fingerprint) is sent to the blockchain. The actual document content 
              never leaves your device.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
