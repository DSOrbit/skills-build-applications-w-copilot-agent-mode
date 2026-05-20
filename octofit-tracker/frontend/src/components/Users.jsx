import { useEffect, useState } from 'react'

const codespaceName = import.meta.env.VITE_CODESPACE_NAME
const apiUrl = codespaceName && codespaceName.trim() !== ''
  ? `https://${codespaceName}-8000.app.github.dev/api/users/`
  : 'http://localhost:8000/api/users/'

export default function Users() {
  const [users, setUsers] = useState([])
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch(apiUrl)
      .then((r) => { if (!r.ok) throw new Error(`API error ${r.status}`); return r.json() })
      .then((json) => Array.isArray(json) ? json : (json.data ?? []))
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
