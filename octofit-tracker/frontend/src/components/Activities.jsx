import { useEffect, useState } from 'react'
import { fetchResource } from '../api.js'

export default function Activities() {
  const [activities, setActivities] = useState([])
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchResource('/api/activities/')
      .then(setActivities)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false))
  }, [])

  if (loading) return <p className="text-muted">Loading activities…</p>
  if (error) return <p className="text-danger">Error: {error}</p>

  return (
    <div>
      <h2 className="mb-3">Activities</h2>
      <table className="table table-striped table-hover">
        <thead className="table-dark">
          <tr>
            <th>User</th>
            <th>Type</th>
            <th>Duration (min)</th>
            <th>Calories</th>
            <th>Logged At</th>
          </tr>
        </thead>
        <tbody>
          {activities.map((a) => (
            <tr key={a._id}>
              <td>{typeof a.user === 'object' ? (a.user.displayName ?? a.user.username) : a.user}</td>
              <td>{a.type}</td>
              <td>{a.durationMinutes}</td>
              <td>{a.caloriesBurned}</td>
              <td>{new Date(a.loggedAt).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
