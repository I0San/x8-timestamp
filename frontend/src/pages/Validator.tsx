import { ValidatorForm } from '../components/ValidatorForm'

export function ValidatorPage() {
  return (
    <div className="max-w-2xl mx-auto px-6 py-12">
      <div className="mb-8">
        <h1 className="page-title mb-2">Validate Document</h1>
        <p className="text-x8-gray">
          Verify if a document has been timestamped on the blockchain.
        </p>
      </div>
      
      <ValidatorForm />
    </div>
  )
}
