import { useEffect, useState } from 'react'
import { fetchResource } from '../api.js'

export default function Leaderboard() {
  const [entries, setEntries] = useState([])
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchResource('/api/leaderboard/')
      .then(setEntries)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false))
  }, [])

  if (loading) return <p className="text-muted">Loading leaderboard…</p>
  if (error) return <p className="text-danger">Error: {error}</p>

  return (
    <div>
      <h2 className="mb-3">Leaderboard</h2>
      <table className="table table-striped table-hover">
        <thead className="table-dark">
          <tr>
            <th>Rank</th>
            <th>User</th>
            <th>Score</th>
          </tr>
        </thead>
        <tbody>
          {entries.map((e) => (
            <tr key={e._id}>
              <td>{e.rank}</td>
              <td>{typeof e.user === 'object' ? (e.user.displayName ?? e.user.username) : e.user}</td>
              <td>{e.score}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
