import { createRootRoute, Link, Outlet, useLocation } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/router-devtools'
import { useAuth } from '@monoverse/state'
import { LogOut, BarChart3 } from 'lucide-react'

export const Route = createRootRoute({
  component: RootComponent,
})

function RootComponent() {
  const { isAuthenticated, logout, user } = useAuth()
  const location = useLocation()
  const isLoginPage = location.pathname === '/login'

  const handleLogout = () => {
    logout()
  }

  return (
    <>
      <div className="app-layout">
        {(isAuthenticated || !isLoginPage) && (
          <nav className="nav-bar">
            <div className="nav-content">
              <Link to="/" className="nav-brand">
                <h1>Monoverse</h1>
              </Link>
              <div className="nav-links">
                {isAuthenticated ? (
                  <>
                    <Link to="/dashboard" className="nav-link" activeProps={{ className: 'active' }}>
                      <BarChart3 size={18} />
                      Dashboard
                    </Link>
                    <div className="nav-user">
                      <span className="user-email">{user?.email}</span>
                      <button onClick={handleLogout} className="nav-logout">
                        <LogOut size={18} />
                        Logout
                      </button>
                    </div>
                  </>
                ) : (
                  <Link to="/login" className="nav-link" activeProps={{ className: 'active' }}>
                    Login
                  </Link>
                )}
              </div>
            </div>
          </nav>
        )}
        <main className={`main-content ${isLoginPage ? 'login-main' : ''}`}>
          <Outlet />
        </main>
      </div>
      <TanStackRouterDevtools />
    </>
  )
}
