import { createFileRoute, redirect } from '@tanstack/react-router'
import { useAuth } from '@monoverse/state'

export const Route = createFileRoute('/')({
  beforeLoad: () => {
    const { checkAuth } = useAuth.getState()
    
    checkAuth()
    
    const { isAuthenticated } = useAuth.getState()
    
    if (isAuthenticated) {
      throw redirect({
        to: '/dashboard',
      })
    } else {
      throw redirect({
        to: '/login',
      })
    }
  },
})
