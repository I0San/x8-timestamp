import { ActivityList } from '../components/ActivityList'

export function ActivityPage() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <div className="mb-8">
        <h1 className="page-title mb-2">Activity</h1>
        <p className="text-x8-gray">
          View all your timestamped documents.
        </p>
      </div>
      
      <ActivityList />
    </div>
  )
}
