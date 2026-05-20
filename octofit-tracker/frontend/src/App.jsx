import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom'
import Activities from './components/Activities.jsx'
import Leaderboard from './components/Leaderboard.jsx'
import Teams from './components/Teams.jsx'
import Users from './components/Users.jsx'
import Workouts from './components/Workouts.jsx'
import './App.css'

function App() {
  return (
    <BrowserRouter>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-3">
        <span className="navbar-brand fw-bold">🐙 OctoFit Tracker</span>
        <div className="navbar-nav flex-row gap-3">
          <NavLink className={({ isActive }) => 'nav-link' + (isActive ? ' active fw-semibold' : '')} to="/users">Users</NavLink>
          <NavLink className={({ isActive }) => 'nav-link' + (isActive ? ' active fw-semibold' : '')} to="/teams">Teams</NavLink>
          <NavLink className={({ isActive }) => 'nav-link' + (isActive ? ' active fw-semibold' : '')} to="/activities">Activities</NavLink>
          <NavLink className={({ isActive }) => 'nav-link' + (isActive ? ' active fw-semibold' : '')} to="/leaderboard">Leaderboard</NavLink>
          <NavLink className={({ isActive }) => 'nav-link' + (isActive ? ' active fw-semibold' : '')} to="/workouts">Workouts</NavLink>
        </div>
      </nav>

      <main className="container py-4">
        <Routes>
          <Route path="/" element={<Users />} />
          <Route path="/users" element={<Users />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/activities" element={<Activities />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/workouts" element={<Workouts />} />
        </Routes>
      </main>
    </BrowserRouter>
  )
}

export default App
