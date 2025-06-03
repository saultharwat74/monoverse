import { useNavigate } from "@tanstack/react-router";
import { useLoginForm } from "@monoverse/hooks";
import { useState } from "react";
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  AlertCircle,
  Loader2,
  Shield,
  Sparkles,
  ArrowRight,
} from "lucide-react";
import { useAuth } from "@monoverse/state";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState<string | null>(null);
  const navigate = useNavigate();
  const { login } = useAuth();
  const form = useLoginForm();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
  } = form;

  const onSubmit = async (data: { email: string; password: string }) => {
    try {
      setLoginError(null);
      await login(data.email, data.password);
      navigate({ to: "/dashboard" });
    } catch (error) {
      console.error("Login error:", error);
      setLoginError(
        error instanceof Error
          ? error.message
          : "Login failed. Please try again."
      );
    }
  };

  const handleDemoCredentials = (email: string, password: string) => {
    setValue("email", email);
    setValue("password", password);
  };

  return (
    <div className="flex-1 p-5 bg-white">
      <div className="items-center mt-10 mb-8">
        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[#EEF2FF] flex items-center justify-center">
          <Shield size={32} color="#4F46E5" />
        </div>
        <h2 className="text-2xl font-bold text-[#111827] mb-2">Welcome Back</h2>
        <p className="text-base text-[#6B7280]">Sign in to your account</p>
      </div>

      {loginError && (
        <div className="flex items-center bg-[#FEE2E2] p-3 rounded-lg mb-4">
          <AlertCircle size={20} color="#EF4444" />
          <p className="text-[#EF4444] text-sm ml-2">{loginError}</p>
        </div>
      )}

      <div className="space-y-4">
        <div className="space-y-2">
          <label
            htmlFor="email"
            className="text-sm font-semibold text-[#374151]"
          >
            Email
          </label>
          <div
            className={`flex items-center border rounded-lg ${errors.email ? "border-[#EF4444]" : "border-[#D1D5DB]"} px-3 h-12`}
          >
            <Mail size={20} color="#6B7280" className="mr-3" />
            <input
              id="email"
              type="email"
              {...register("email")}
              placeholder="Enter your email"
              className="flex-1 text-base text-[#111827] focus:outline-none"
            />
          </div>
          {errors.email && (
            <div className="flex items-center mt-1">
              <AlertCircle size={16} color="#EF4444" />
              <p className="text-[#EF4444] text-sm ml-2">
                {errors.email.message}
              </p>
            </div>
          )}
        </div>

        <div className="space-y-2">
          <label
            htmlFor="password"
            className="text-sm font-semibold text-[#374151]"
          >
            Password
          </label>
          <div
            className={`flex items-center border rounded-lg ${errors.password ? "border-[#EF4444]" : "border-[#D1D5DB]"} px-3 h-12`}
          >
            <Lock size={20} color="#6B7280" className="mr-3" />
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              {...register("password")}
              placeholder="Enter your password"
              className="flex-1 text-base text-[#111827] focus:outline-none"
            />
            <button
              type="button"
              className="p-2"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <EyeOff size={20} color="#6B7280" />
              ) : (
                <Eye size={20} color="#6B7280" />
              )}
            </button>
          </div>
          {errors.password && (
            <div className="flex items-center mt-1">
              <AlertCircle size={16} color="#EF4444" />
              <p className="text-[#EF4444] text-sm ml-2">
                {errors.password.message}
              </p>
            </div>
          )}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          onClick={handleSubmit(onSubmit)}
          className={`flex items-center justify-center gap-2 bg-[#4F46E5] text-white py-4 px-6 rounded-lg font-semibold mt-2 ${
            isSubmitting ? "opacity-70" : ""
          }`}
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              <span>Signing in...</span>
            </>
          ) : (
            <>
              <Shield size={20} color="#FFFFFF" />
              <span>Sign In</span>
            </>
          )}
        </button>
      </div>

      <div className="mt-8 p-4 bg-[#F9FAFB] rounded-lg">
        <div className="flex items-center gap-2 mb-3">
          <Sparkles size={20} color="#4F46E5" />
          <h3 className="text-base font-semibold text-[#111827]">
            Demo Credentials
          </h3>
        </div>
        <div className="space-y-2">
          <button
            onClick={() =>
              handleDemoCredentials("admin@example.com", "password123")
            }
            className="w-full flex items-center gap-2 p-3 bg-white rounded-md"
          >
            <Mail size={20} color="#6B7280" />
            <span className="text-sm text-[#6B7280]">admin@example.com</span>
          </button>
          <button
            onClick={() =>
              handleDemoCredentials("admin@example.com", "password123")
            }
            className="w-full flex items-center gap-2 p-3 bg-white rounded-md"
          >
            <Lock size={20} color="#6B7280" />
            <span className="text-sm text-[#6B7280]">password123</span>
          </button>
        </div>
      </div>

      <div className="mt-6 flex items-center justify-center">
        <p className="text-sm text-[#6B7280]">Don&apos;t have an account? </p>
        <a
          href="/signup"
          className="text-sm text-[#4F46E5] font-semibold ml-1 flex items-center gap-1"
        >
          Sign up <ArrowRight size={16} color="#4F46E5" />
        </a>
      </div>
    </div>
  );
}
