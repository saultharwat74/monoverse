import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useLoginForm } from "@monoverse/hooks"
import { useState } from "react"
import { Mail, Lock, Eye, EyeOff, AlertCircle, Loader2, Shield, Sparkles, ArrowRight } from 'lucide-react'
import { useAuth } from "@monoverse/state"

export const Route = createFileRoute('/login')({
  component: Login,
})

function Login() {
  const [showPassword, setShowPassword] = useState(false)
  const [loginError, setLoginError] = useState<string | null>(null)
  const navigate = useNavigate()
  const { login } = useAuth()
  const form = useLoginForm()
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
  } = form

  const onSubmit = async (data: { email: string; password: string }) => {
    try {
      setLoginError(null)
      await login(data.email, data.password)
      navigate({ to: '/dashboard' })
    } catch (error) {
      console.error("Login error:", error)
      setLoginError(error instanceof Error ? error.message : "Login failed. Please try again.")
    }
  }

  const useDemo = (email: string, password: string) => {
    setValue('email', email)
    setValue('password', password)
  }

  return (
    <div className="login-wrapper">
      <div className="login-container">
        <div className="login-header">
          <div className="login-icon">
            <Shield />
          </div>
          <h2>Welcome Back</h2>
          <p>Sign in to your account</p>
        </div>

        {loginError && (
          <div className="login-error">
            <AlertCircle />
            <p>{loginError}</p>
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="login-form">
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <div className="input-wrapper">
              <div className="input-icon">
                <Mail />
              </div>
              <input
                id="email"
                type="email"
                {...register("email")}
                placeholder="Enter your email"
                className={errors.email ? "error" : ""}
              />
            </div>
            {errors.email && (
              <span className="error-message">
                <AlertCircle />
                {errors.email.message}
              </span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <div className="input-wrapper">
              <div className="input-icon">
                <Lock />
              </div>
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                {...register("password")}
                placeholder="Enter your password"
                className={errors.password ? "error" : ""}
              />
              <button
                type="button"
                className="password-toggle"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff /> : <Eye />}
              </button>
            </div>
            {errors.password && (
              <span className="error-message">
                <AlertCircle />
                {errors.password.message}
              </span>
            )}
          </div>

          <button 
            type="submit" 
            disabled={isSubmitting} 
            className={`login-button ${isSubmitting ? 'loading' : ''}`}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="loading-spinner" />
                Signing in...
              </>
            ) : (
              <>
                <Shield />
                Sign In
              </>
            )}
          </button>
        </form>

        <div className="demo-credentials">
          <div className="demo-header">
            <Sparkles />
            <p>Demo Credentials</p>
          </div>
          <div className="demo-content">
            <div 
              className="demo-item"
              onClick={() => useDemo('admin@example.com', 'password123')}
              title="Click to auto-fill demo credentials"
            >
              <Mail />
              <p>admin@example.com</p>
            </div>
            <div 
              className="demo-item"
              onClick={() => useDemo('admin@example.com', 'password123')}
              title="Click to auto-fill demo credentials"
            >
              <Lock />
              <p>password123</p>
            </div>
          </div>
        </div>

        <p className="signup-prompt">
          Don't have an account? 
          <a href="#" className="signup-link">
            Sign up <ArrowRight />
          </a>
        </p>
      </div>
    </div>
  )
}
