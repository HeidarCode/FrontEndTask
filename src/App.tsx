
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import LoginPage from './components/LoginPage'
import UsersPage from './components/UsersPage'
// import ProductsPage from './components/ProductsPage'
// import GamesPage from './components/GamesPage'
// import GameDetailPage from './components/GameDetailPage'
import ProtectedRoute from './components/ProtectedRoute'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route element={<ProtectedRoute />}>
            <Route path="/users" element={<UsersPage />} />
          {/*<Route path="/products" element={<ProductsPage />} />
          <Route path="/games" element={<GamesPage />} />
          <Route path="/games/:id" element={<GameDetailPage />} /> */}
        </Route>
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
