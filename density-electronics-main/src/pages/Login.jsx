import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  Mail,
  Lock,
  LogIn,
  Eye,
  EyeOff,
  ArrowLeft,
  ShieldCheck,
  UserPlus,
  Package,
  Cpu,
  CheckCircle2,
} from "lucide-react";
import toast from "react-hot-toast";
import logo from "../assets/headerlogo33.png";

const API_BASE_URL = "http://localhost:8000";

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const returnTo = location.state?.from || "/";

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const email = formData.email.trim().toLowerCase();

    if (!email) {
      toast.error("Please enter your email address.");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      toast.error("Please enter a valid email address.");
      return;
    }

    if (!formData.password) {
      toast.error("Please enter your password.");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(
        `${API_BASE_URL}/api/orders/login/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            email,
            password: formData.password,
          }),
        }
      );

      let data = {};

      try {
        data = await response.json();
      } catch (jsonError) {
        console.error("LOGIN RESPONSE JSON ERROR:", jsonError);
      }

      if (!response.ok || !data.success) {
        toast.error(
          data.message || "Invalid email or password."
        );
        return;
      }

      toast.success(
        `Welcome ${data.user?.name || "back"}! 👋`
      );

      setFormData({
        email: "",
        password: "",
      });

      /*
        Login successful.

        Tell Header.jsx that customer authentication
        has changed so it can refresh the logged-in user.
      */
      window.dispatchEvent(
        new Event("customer-auth-changed")
      );

      /*
        Small delay so the success toast can be seen.
        Then navigate to the previous page.
      */
      setTimeout(() => {
        navigate(returnTo, { replace: true });
      }, 800);

    } catch (error) {
      console.error("LOGIN ERROR:", error);

      toast.error(
        "Unable to connect to the server. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#eef3f8] relative overflow-hidden">

      {/* SUBTLE BACKGROUND */}
      <div
        className="absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage:
            "linear-gradient(#2563eb 1px, transparent 1px), linear-gradient(90deg, #2563eb 1px, transparent 1px)",
          backgroundSize: "42px 42px",
        }}
      />

      <div className="relative min-h-screen flex items-center justify-center px-4 py-8">

        <div className="w-full max-w-6xl">

          {/* BACK */}
          <div className="mb-5">
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-blue-600 transition"
            >
              <ArrowLeft size={17} />
              Back to Store
            </Link>
          </div>

          {/* MAIN CARD */}
          <div className="bg-white rounded-3xl shadow-[0_20px_60px_rgba(15,23,42,0.12)] border border-slate-200 overflow-hidden">

            <div className="grid lg:grid-cols-[0.9fr_1.1fr]">

              {/* LEFT BRAND */}
              <div className="hidden lg:flex bg-[#0f172a] relative overflow-hidden p-10 xl:p-12 flex-col justify-between">

                <div className="absolute top-0 right-0 w-64 h-64 rounded-full border border-blue-400/10 translate-x-1/3 -translate-y-1/3" />

                <div className="absolute bottom-0 left-0 w-72 h-72 rounded-full border border-cyan-400/10 -translate-x-1/3 translate-y-1/3" />

                <div className="absolute top-1/2 right-8 w-24 h-24 border border-blue-400/10 rounded-2xl rotate-12" />

                <div className="relative z-10">

                  {/* LOGO */}
                  <div className="inline-flex bg-white rounded-2xl px-5 py-4 shadow-lg mb-10">
                    <img
                      src={logo}
                      alt="Density Electronics"
                      className="w-52 h-auto object-contain"
                    />
                  </div>

                  {/* BADGE */}
                  <div className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-400/20 text-blue-300 rounded-full px-4 py-2 text-xs font-bold mb-5">
                    <Cpu size={14} />
                    ELECTRONICS & ROBOTICS
                  </div>

                  <h1 className="text-4xl xl:text-5xl font-black text-white leading-tight">
                    Welcome
                    <br />
                    <span className="text-blue-400">
                      Back.
                    </span>
                  </h1>

                  <p className="text-slate-400 mt-5 max-w-md leading-relaxed">
                    Login to your Density Electronics account
                    and continue shopping for components,
                    development boards and robotics products.
                  </p>

                  {/* BENEFITS */}
                  <div className="mt-10 space-y-5">

                    <div className="flex items-center gap-4">
                      <div className="w-11 h-11 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center">
                        <Package
                          size={19}
                          className="text-blue-400"
                        />
                      </div>

                      <div>
                        <p className="text-white text-sm font-bold">
                          Your Shopping
                        </p>

                        <p className="text-slate-500 text-xs">
                          Continue where you left off
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="w-11 h-11 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center">
                        <ShieldCheck
                          size={19}
                          className="text-blue-400"
                        />
                      </div>

                      <div>
                        <p className="text-white text-sm font-bold">
                          Secure Login
                        </p>

                        <p className="text-slate-500 text-xs">
                          Protected account session
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="w-11 h-11 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center">
                        <CheckCircle2
                          size={19}
                          className="text-blue-400"
                        />
                      </div>

                      <div>
                        <p className="text-white text-sm font-bold">
                          Easy Checkout
                        </p>

                        <p className="text-slate-500 text-xs">
                          Faster and simpler shopping
                        </p>
                      </div>
                    </div>

                  </div>
                </div>

                <p className="relative z-10 text-xs text-slate-600">
                  © {new Date().getFullYear()} Density Electronics
                </p>

              </div>

              {/* RIGHT LOGIN */}
              <div className="p-6 sm:p-9 lg:p-12">

                {/* MOBILE LOGO */}
                <div className="lg:hidden flex justify-center mb-7">
                  <img
                    src={logo}
                    alt="Density Electronics"
                    className="w-48 h-auto object-contain"
                  />
                </div>

                {/* HEADING */}
                <div className="mb-8">

                  <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mb-4">
                    <LogIn size={23} />
                  </div>

                  <h2 className="text-3xl sm:text-4xl font-black text-slate-900">
                    Welcome Back
                  </h2>

                  <p className="text-slate-500 text-sm mt-2">
                    Login to your Density Electronics account.
                  </p>

                </div>

                {/* FORM */}
                <form
                  onSubmit={handleSubmit}
                  className="space-y-5"
                >

                  {/* EMAIL */}
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">
                      Email Address
                    </label>

                    <div className="relative">
                      <Mail
                        size={18}
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                      />

                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="you@example.com"
                        autoComplete="email"
                        className="w-full h-12 bg-slate-50 border border-slate-200 rounded-xl pl-11 pr-4 text-sm outline-none transition focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                      />
                    </div>
                  </div>

                  {/* PASSWORD */}
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">
                      Password
                    </label>

                    <div className="relative">
                      <Lock
                        size={18}
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                      />

                      <input
                        type={
                          showPassword
                            ? "text"
                            : "password"
                        }
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="Enter your password"
                        autoComplete="current-password"
                        className="w-full h-12 bg-slate-50 border border-slate-200 rounded-xl pl-11 pr-12 text-sm outline-none transition focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                      />

                      <button
                        type="button"
                        onClick={() =>
                          setShowPassword(!showPassword)
                        }
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-blue-600"
                      >
                        {showPassword ? (
                          <EyeOff size={18} />
                        ) : (
                          <Eye size={18} />
                        )}
                      </button>
                    </div>
                  </div>

                  {/* LOGIN BUTTON */}
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full h-12 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-400 disabled:cursor-not-allowed text-white font-bold rounded-xl shadow-md hover:shadow-lg transition flex items-center justify-center gap-2"
                  >
                    {loading ? (
                      <>
                        <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Logging In...
                      </>
                    ) : (
                      <>
                        <LogIn size={18} />
                        Login
                      </>
                    )}
                  </button>

                </form>

                {/* DIVIDER */}
                <div className="flex items-center gap-3 my-6">

                  <div className="flex-1 h-px bg-slate-200" />

                  <span className="text-xs font-semibold text-slate-400">
                    NEW CUSTOMER?
                  </span>

                  <div className="flex-1 h-px bg-slate-200" />

                </div>

                {/* REGISTER */}
                <Link
                  to="/register"
                  className="w-full h-12 border-2 border-slate-200 hover:border-slate-900 hover:bg-slate-900 hover:text-white text-slate-800 font-bold rounded-xl transition flex items-center justify-center gap-2"
                >
                  <UserPlus size={18} />
                  Create New Account
                </Link>

                {/* SECURITY */}
                <div className="flex items-center justify-center gap-2 mt-6 text-xs text-slate-400">
                  <ShieldCheck size={15} />
                  <span>
                    Your login session is securely protected.
                  </span>
                </div>

              </div>
            </div>
          </div>

          {/* FOOTER */}
          <p className="text-center text-xs text-slate-500 mt-5">
            © {new Date().getFullYear()} Density Electronics
          </p>

        </div>
      </div>
    </div>
  );
}