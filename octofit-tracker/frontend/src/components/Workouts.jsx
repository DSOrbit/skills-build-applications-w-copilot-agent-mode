import { useEffect, useState } from 'react'

const codespaceName = import.meta.env.VITE_CODESPACE_NAME
const apiUrl = codespaceName && codespaceName.trim() !== ''
  ? `https://${codespaceName}-8000.app.github.dev/api/workouts/`
  : 'http://localhost:8000/api/workouts/'

export default function Workouts() {
  const [workouts, setWorkouts] = useState([])
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch(apiUrl)
      .then((r) => { if (!r.ok) throw new Error(`API error ${r.status}`); return r.json() })
      .then((json) => Array.isArray(json) ? json : (json.data ?? []))
      .then(setWorkouts)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false))
  }, [])

  if (loading) return <p className="text-muted">Loading workouts…</p>
  if (error) return <p className="text-danger">Error: {error}</p>

  return (
    <div>
      <h2 className="mb-3">Workouts</h2>
      <table className="table table-striped table-hover">
        <thead className="table-dark">
          <tr>
            <th>Name</th>
            <th>Focus Area</th>
            <th>Difficulty</th>
            <th>Duration (min)</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {workouts.map((w) => (
            <tr key={w._id}>
              <td>{w.name}</td>
              <td>{w.focusArea}</td>
              <td>{w.difficulty}</td>
              <td>{w.durationMinutes}</td>
              <td>{w.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
