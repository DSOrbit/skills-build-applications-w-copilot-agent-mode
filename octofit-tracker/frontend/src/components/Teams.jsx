import { useEffect, useState } from 'react'
import { fetchResource } from '../api.js'

export default function Teams() {
  const [teams, setTeams] = useState([])
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchResource('/api/teams/')
      .then(setTeams)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false))
  }, [])

  if (loading) return <p className="text-muted">Loading teams…</p>
  if (error) return <p className="text-danger">Error: {error}</p>

  return (
    <div>
      <h2 className="mb-3">Teams</h2>
      <table className="table table-striped table-hover">
        <thead className="table-dark">
          <tr>
            <th>Team Name</th>
            <th>Mascot</th>
            <th>Members</th>
          </tr>
        </thead>
        <tbody>
          {teams.map((t) => (
            <tr key={t._id}>
              <td>{t.name}</td>
              <td>{t.mascot}</td>
              <td>
                {(t.members ?? []).map((m) =>
                  typeof m === 'object' ? (m.displayName ?? m.username) : m
                ).join(', ')}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
