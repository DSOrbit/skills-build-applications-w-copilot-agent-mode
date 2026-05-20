import { useEffect, useState } from 'react'
import { fetchResource } from '../api.js'

export default function Users() {
  const [users, setUsers] = useState([])
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchResource('/api/users/')
      .then(setUsers)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false))
  }, [])

  if (loading) return <p className="text-muted">Loading users…</p>
  if (error) return <p className="text-danger">Error: {error}</p>

  return (
    <div>
      <h2 className="mb-3">Users</h2>
      <table className="table table-striped table-hover">
        <thead className="table-dark">
          <tr>
            <th>Username</th>
            <th>Display Name</th>
            <th>Email</th>
            <th>Fitness Goal</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u._id}>
              <td>{u.username}</td>
              <td>{u.displayName}</td>
              <td>{u.email}</td>
              <td>{u.fitnessGoal}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
