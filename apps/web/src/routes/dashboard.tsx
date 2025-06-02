import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useCounter, useAuth } from "@monoverse/state";
import { useEffect } from "react";
import { Plus, Minus, RotateCcw, Zap, User, Activity, TrendingUp } from "lucide-react";

export const Route = createFileRoute("/dashboard")({
  component: Dashboard,
});

function Dashboard() {
  const { count, increment, decrement, reset } = useCounter();
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate({ to: "/login" });
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className="dashboard-page">
      <div className="dashboard-header">
        <div className="welcome-section">
          <div className="user-avatar">
            <User size={24} />
          </div>
          <div className="welcome-text">
            <h1>Welcome back!</h1>
            {user && <p className="user-greeting">Hello, {user.name}</p>}
          </div>
        </div>
        <div className="dashboard-stats">
          <div className="stat-card">
            <Activity size={20} />
            <div>
              <span className="stat-value">42</span>
              <span className="stat-label">Actions Today</span>
            </div>
          </div>
          <div className="stat-card">
            <TrendingUp size={20} />
            <div>
              <span className="stat-value">+12%</span>
              <span className="stat-label">Growth</span>
            </div>
          </div>
        </div>
      </div>

      <div className="dashboard-grid">
        <div className="dashboard-widget counter-widget">
          <div className="widget-header">
            <h2>Interactive Counter</h2>
            <Zap size={20} className="widget-icon" />
          </div>
          <div className="counter-display">
            <span className="counter-value">{count}</span>
            <span className="counter-label">Current Value</span>
          </div>
          <div className="counter-controls">
            <button onClick={decrement} className="counter-btn decrement-btn">
              <Minus size={18} />
            </button>
            <button onClick={increment} className="counter-btn increment-btn">
              <Plus size={18} />
            </button>
          </div>
          <button onClick={reset} className="reset-btn">
            <RotateCcw size={16} />
            Reset to Zero
          </button>
        </div>

        <div className="dashboard-widget actions-widget">
          <div className="widget-header">
            <h2>Quick Actions</h2>
          </div>
          <div className="action-grid">
            <div className="action-item">
              <Activity size={24} />
              <span>Analytics</span>
            </div>
            <div className="action-item">
              <TrendingUp size={24} />
              <span>Reports</span>
            </div>
            <div className="action-item">
              <User size={24} />
              <span>Profile</span>
            </div>
          </div>
        </div>

        <div className="dashboard-widget activity-widget">
          <div className="widget-header">
            <h2>Recent Activity</h2>
          </div>
          <div className="activity-list">
            <div className="activity-item">
              <div className="activity-dot increment"></div>
              <span>Counter incremented to {count > 0 ? count : 1}</span>
              <span className="activity-time">Just now</span>
            </div>
            <div className="activity-item">
              <div className="activity-dot reset"></div>
              <span>Counter was reset</span>
              <span className="activity-time">2 minutes ago</span>
            </div>
            <div className="activity-item">
              <div className="activity-dot user"></div>
              <span>Welcome to dashboard</span>
              <span className="activity-time">5 minutes ago</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
