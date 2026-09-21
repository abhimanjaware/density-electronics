import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Clock3,
  Eye,
  EyeOff,
  Mail,
  RefreshCw,
  ShieldCheck,
  UserPlus,
} from "lucide-react";

import logo from "../assets/headerlogo33.png";

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

export default function Register() {
  const navigate = useNavigate();
  const location = useLocation();

  // =====================================================
  // REGISTRATION FORM
  // =====================================================

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // =====================================================
  // OTP STATES
  // =====================================================

  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [resendTimer, setResendTimer] = useState(0);

  // =====================================================
  // UI STATES
  // =====================================================

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);

  const [loading, setLoading] = useState(false);

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // =====================================================
  // RESEND OTP TIMER
  // =====================================================

  useEffect(() => {
    if (resendTimer <= 0) {
      return;
    }

    const timer = setInterval(() => {
      setResendTimer((previous) => {
        if (previous <= 1) {
          clearInterval(timer);
          return 0;
        }

        return previous - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [resendTimer]);

  // =====================================================
  // CLEAR MESSAGES
  // =====================================================

  const clearMessages = () => {
    setMessage("");
    setError("");
    setSuccess("");
  };

  // =====================================================
  // SEND OTP
  // =====================================================

  const handleSendOTP = async (event) => {
    event.preventDefault();

    clearMessages();

    // ---------------------------------------------
    // NAME VALIDATION
    // ---------------------------------------------

    if (!name.trim()) {
      setError("Please enter your full name.");
      return;
    }

    // ---------------------------------------------
    // EMAIL VALIDATION
    // ---------------------------------------------

    const normalizedEmail = email.trim().toLowerCase();

    if (!normalizedEmail) {
      setError("Please enter your email address.");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedEmail)) {
      setError("Please enter a valid email address.");
      return;
    }

    // ---------------------------------------------
    // MOBILE VALIDATION
    // ---------------------------------------------

    const normalizedMobile = mobile
      .replace(/\D/g, "")
      .slice(0, 10);

    if (!normalizedMobile) {
      setError("Please enter your mobile number.");
      return;
    }

    if (!/^[6-9]\d{9}$/.test(normalizedMobile)) {
      setError("Please enter a valid 10-digit mobile number.");
      return;
    }

    // ---------------------------------------------
    // PASSWORD VALIDATION
    // ---------------------------------------------

    if (!password) {
      setError("Please enter a password.");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    if (!confirmPassword) {
      setError("Please confirm your password.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    // ---------------------------------------------
    // SEND OTP REQUEST
    // ---------------------------------------------

    try {
      setLoading(true);

      const response = await fetch(
        `${API_BASE_URL}/api/orders/send-registration-otp/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            name: name.trim(),
            email: normalizedEmail,
            mobile: normalizedMobile,
            password: password,
            confirm_password: confirmPassword,
          }),
        }
      );

      let data = {};

      try {
        data = await response.json();
      } catch (jsonError) {
        console.error("SEND OTP JSON ERROR:", jsonError);
      }

      if (!response.ok || !data.success) {
        setError(
          data.message ||
            "Unable to send OTP. Please try again."
        );
        return;
      }

      // ---------------------------------------------
      // OTP SENT SUCCESSFULLY
      // ---------------------------------------------

      setEmail(normalizedEmail);
      setMobile(normalizedMobile);
      setOtpSent(true);
      setOtp("");
      setResendTimer(60);

      setSuccess(
        "OTP sent successfully! Please check your email."
      );
    } catch (error) {
      console.error("SEND OTP ERROR:", error);

      setError(
        "Unable to connect to server. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  // =====================================================
  // VERIFY OTP
  // =====================================================

  const handleVerifyOTP = async (event) => {
    event.preventDefault();

    clearMessages();

    // ---------------------------------------------
    // OTP VALIDATION
    // ---------------------------------------------

    if (!otp.trim()) {
      setError("Please enter the OTP.");
      return;
    }

    if (!/^\d{6}$/.test(otp)) {
      setError("OTP must contain exactly 6 digits.");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(
        `${API_BASE_URL}/api/orders/verify-registration-otp/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            email: email.trim().toLowerCase(),
            otp: otp.trim(),
          }),
        }
      );

      let data = {};

      try {
        data = await response.json();
      } catch (jsonError) {
        console.error("VERIFY OTP JSON ERROR:", jsonError);
      }

      if (!response.ok || !data.success) {
        setError(
          data.message ||
            "Invalid OTP. Please try again."
        );
        return;
      }

      // ---------------------------------------------
      // REGISTRATION SUCCESS
      // ---------------------------------------------

      setSuccess(
        "Email verified successfully! Your account has been created."
      );

      // Notify Header.jsx
      window.dispatchEvent(
        new Event("customer-auth-changed")
      );

      // Redirect to previous page if available
      const redirectTo = location.state?.from || "/";

      setTimeout(() => {
        navigate(redirectTo, {
          replace: true,
        });
      }, 1200);
    } catch (error) {
      console.error("VERIFY OTP ERROR:", error);

      setError(
        "Unable to verify OTP. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  // =====================================================
  // RESEND OTP
  // =====================================================

  const handleResendOTP = async () => {
    if (resendTimer > 0 || loading) {
      return;
    }

    clearMessages();

    const normalizedEmail = email.trim().toLowerCase();

    const normalizedMobile = mobile
      .replace(/\D/g, "")
      .slice(0, 10);

    try {
      setLoading(true);

      const response = await fetch(
        `${API_BASE_URL}/api/orders/send-registration-otp/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            name: name.trim(),
            email: normalizedEmail,
            mobile: normalizedMobile,
            password: password,
            confirm_password: confirmPassword,
          }),
        }
      );

      let data = {};

      try {
        data = await response.json();
      } catch (jsonError) {
        console.error("RESEND OTP JSON ERROR:", jsonError);
      }

      if (!response.ok || !data.success) {
        setError(
          data.message ||
            "Unable to resend OTP."
        );
        return;
      }

      setOtp("");
      setResendTimer(60);

      setSuccess(
        "A new OTP has been sent to your email."
      );
    } catch (error) {
      console.error("RESEND OTP ERROR:", error);

      setError(
        "Unable to connect to server."
      );
    } finally {
      setLoading(false);
    }
  };

  // =====================================================
  // CHANGE EMAIL / GO BACK
  // =====================================================

  const handleChangeEmail = () => {
    clearMessages();

    setOtpSent(false);
    setOtp("");
    setResendTimer(0);
  };

  // =====================================================
  // FORMAT TIMER
  // =====================================================

  const formatTimer = () => {
    const minutes = Math.floor(resendTimer / 60);
    const seconds = resendTimer % 60;

    return `${minutes}:${seconds
      .toString()
      .padStart(2, "0")}`;
  };

  return (
    <div className="min-h-screen bg-[#eef3f8] relative overflow-hidden">

      {/* =================================================
          BACKGROUND TECH GRID
      ================================================= */}

      <div
        className="absolute inset-0 pointer-events-none opacity-[0.35]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(15,23,42,0.035) 1px, transparent 1px),
            linear-gradient(90deg, rgba(15,23,42,0.035) 1px, transparent 1px)
          `,
          backgroundSize: "42px 42px",
        }}
      />

      {/* =================================================
          TOP NAV
      ================================================= */}

      <div className="relative z-10 px-5 sm:px-8 lg:px-12 pt-6">

        <div className="max-w-7xl mx-auto flex items-center justify-between">

          <Link
            to="/"
            className="
              inline-flex
              items-center
              gap-2
              text-slate-600
              hover:text-blue-600
              transition
              font-medium
              text-sm
            "
          >
            <ArrowLeft size={17} />
            Back to Store
          </Link>

          <div className="text-xs sm:text-sm text-slate-500">
            Already have an account?

            <Link
              to="/login"
              className="
                ml-1
                font-semibold
                text-blue-600
                hover:text-blue-700
              "
            >
              Login
            </Link>
          </div>

        </div>

      </div>

      {/* =================================================
          MAIN
      ================================================= */}

      <main className="relative z-10 px-4 sm:px-6 py-8 sm:py-12">

        <div
          className="
            max-w-6xl
            mx-auto
            bg-white
            rounded-3xl
            shadow-[0_25px_70px_rgba(15,23,42,0.12)]
            overflow-hidden
            border
            border-slate-200
            grid
            lg:grid-cols-[0.9fr_1.1fr]
          "
        >

          {/* =================================================
              LEFT BRAND SECTION
          ================================================= */}

          <section
            className="
              relative
              hidden
              lg:flex
              flex-col
              justify-between
              bg-[#071a35]
              text-white
              p-10
              xl:p-12
              overflow-hidden
            "
          >

            {/* Decorative circles */}

            <div
              className="
                absolute
                -top-24
                -right-24
                w-72
                h-72
                rounded-full
                bg-blue-500/10
              "
            />

            <div
              className="
                absolute
                -bottom-32
                -left-24
                w-80
                h-80
                rounded-full
                bg-orange-500/10
              "
            />

            <div className="relative z-10">

              {/* Logo */}

              <div className="mb-10">

                <img
                  src={logo}
                  alt="Density Electronics"
                  className="
                    w-52
                    xl:w-60
                    h-auto
                    object-contain
                    object-left
                  "
                />

              </div>

              {/* Badge */}

              <div
                className="
                  inline-flex
                  items-center
                  gap-2
                  px-3
                  py-1.5
                  rounded-full
                  bg-blue-500/10
                  border
                  border-blue-400/20
                  text-blue-300
                  text-xs
                  font-semibold
                  mb-5
                "
              >
                <ShieldCheck size={14} />
                Secure Customer Registration
              </div>

              <h1
                className="
                  text-4xl
                  xl:text-5xl
                  font-bold
                  leading-tight
                  tracking-tight
                "
              >
                Build.
                <br />
                Innovate.
                <br />
                <span className="text-blue-400">
                  Create.
                </span>
              </h1>

              <p
                className="
                  mt-6
                  text-slate-300
                  leading-7
                  max-w-md
                  text-sm
                  xl:text-base
                "
              >
                Create your Density Electronics account and
                explore development boards, sensors, robotics
                components and electronics products.
              </p>

              {/* Benefits */}

              <div className="mt-9 space-y-4">

                <div className="flex items-center gap-3">

                  <div
                    className="
                      w-9
                      h-9
                      rounded-xl
                      bg-white/5
                      border
                      border-white/10
                      flex
                      items-center
                      justify-center
                    "
                  >
                    <ShieldCheck
                      size={18}
                      className="text-blue-400"
                    />
                  </div>

                  <div>
                    <p className="text-sm font-semibold">
                      Secure Account
                    </p>

                    <p className="text-xs text-slate-400">
                      Email verification protected
                    </p>
                  </div>

                </div>

                <div className="flex items-center gap-3">

                  <div
                    className="
                      w-9
                      h-9
                      rounded-xl
                      bg-white/5
                      border
                      border-white/10
                      flex
                      items-center
                      justify-center
                    "
                  >
                    <Mail
                      size={18}
                      className="text-orange-400"
                    />
                  </div>

                  <div>
                    <p className="text-sm font-semibold">
                      Email OTP
                    </p>

                    <p className="text-xs text-slate-400">
                      Quick and secure verification
                    </p>
                  </div>

                </div>

                <div className="flex items-center gap-3">

                  <div
                    className="
                      w-9
                      h-9
                      rounded-xl
                      bg-white/5
                      border
                      border-white/10
                      flex
                      items-center
                      justify-center
                    "
                  >
                    <CheckCircle2
                      size={18}
                      className="text-green-400"
                    />
                  </div>

                  <div>
                    <p className="text-sm font-semibold">
                      Easy Checkout
                    </p>

                    <p className="text-xs text-slate-400">
                      Faster shopping experience
                    </p>
                  </div>

                </div>

              </div>

            </div>

            <div
              className="
                relative
                z-10
                text-xs
                text-slate-500
                pt-8
              "
            >
              © {new Date().getFullYear()} Density Electronics
            </div>

          </section>

          {/* =================================================
              RIGHT FORM SECTION
          ================================================= */}

          <section
            className="
              p-6
              sm:p-8
              md:p-10
              xl:p-12
            "
          >

            {/* Mobile Logo */}

            <div className="lg:hidden flex justify-center mb-7">

              <img
                src={logo}
                alt="Density Electronics"
                className="w-48 h-auto object-contain"
              />

            </div>

            {/* FORM HEADER */}

            <div className="max-w-xl mx-auto">

              {!otpSent ? (

                <>
                  <div className="mb-8">

                    <div
                      className="
                        inline-flex
                        items-center
                        justify-center
                        w-12
                        h-12
                        rounded-2xl
                        bg-blue-50
                        text-blue-600
                        mb-4
                      "
                    >
                      <UserPlus size={23} />
                    </div>

                    <h2
                      className="
                        text-3xl
                        sm:text-4xl
                        font-bold
                        text-slate-900
                        tracking-tight
                      "
                    >
                      Create your account
                    </h2>

                    <p className="mt-2 text-slate-500 text-sm">
                      Join Density Electronics and start
                      exploring electronics & robotics.
                    </p>

                  </div>

                  {/* ALERTS */}

                  {error && (
                    <div
                      className="
                        mb-5
                        rounded-xl
                        border
                        border-red-200
                        bg-red-50
                        px-4
                        py-3
                        text-sm
                        text-red-700
                      "
                    >
                      {error}
                    </div>
                  )}

                  {success && (
                    <div
                      className="
                        mb-5
                        rounded-xl
                        border
                        border-green-200
                        bg-green-50
                        px-4
                        py-3
                        text-sm
                        text-green-700
                      "
                    >
                      {success}
                    </div>
                  )}

                  {/* REGISTRATION FORM */}

                  <form
                    onSubmit={handleSendOTP}
                    className="space-y-5"
                  >

                    {/* NAME */}

                    <div>

                      <label
                        className="
                          block
                          text-sm
                          font-semibold
                          text-slate-700
                          mb-2
                        "
                      >
                        Full Name
                      </label>

                      <input
                        type="text"
                        value={name}
                        onChange={(event) =>
                          setName(event.target.value)
                        }
                        placeholder="Enter your full name"
                        autoComplete="name"
                        disabled={loading}
                        className="
                          w-full
                          h-12
                          px-4
                          rounded-xl
                          border
                          border-slate-200
                          bg-slate-50
                          text-slate-900
                          outline-none
                          transition
                          focus:bg-white
                          focus:border-blue-500
                          focus:ring-4
                          focus:ring-blue-500/10
                          disabled:opacity-60
                        "
                      />

                    </div>

                    {/* MOBILE */}

                    <div>

                      <label
                        className="
                          block
                          text-sm
                          font-semibold
                          text-slate-700
                          mb-2
                        "
                      >
                        Mobile Number
                      </label>

                      <input
                        type="tel"
                        value={mobile}
                        onChange={(event) => {
                          const value =
                            event.target.value
                              .replace(/\D/g, "")
                              .slice(0, 10);

                          setMobile(value);
                        }}
                        placeholder="Enter 10-digit mobile number"
                        autoComplete="tel"
                        maxLength={10}
                        disabled={loading}
                        className="
                          w-full
                          h-12
                          px-4
                          rounded-xl
                          border
                          border-slate-200
                          bg-slate-50
                          text-slate-900
                          outline-none
                          transition
                          focus:bg-white
                          focus:border-blue-500
                          focus:ring-4
                          focus:ring-blue-500/10
                          disabled:opacity-60
                        "
                      />

                    </div>

                    {/* EMAIL */}

                    <div>

                      <label
                        className="
                          block
                          text-sm
                          font-semibold
                          text-slate-700
                          mb-2
                        "
                      >
                        Email Address
                      </label>

                      <div className="relative">

                        <Mail
                          size={18}
                          className="
                            absolute
                            left-4
                            top-1/2
                            -translate-y-1/2
                            text-slate-400
                          "
                        />

                        <input
                          type="email"
                          value={email}
                          onChange={(event) =>
                            setEmail(event.target.value)
                          }
                          placeholder="you@example.com"
                          autoComplete="email"
                          disabled={loading}
                          className="
                            w-full
                            h-12
                            pl-11
                            pr-4
                            rounded-xl
                            border
                            border-slate-200
                            bg-slate-50
                            text-slate-900
                            outline-none
                            transition
                            focus:bg-white
                            focus:border-blue-500
                            focus:ring-4
                            focus:ring-blue-500/10
                            disabled:opacity-60
                          "
                        />

                      </div>

                    </div>

                    {/* PASSWORD */}

                    <div>

                      <label
                        className="
                          block
                          text-sm
                          font-semibold
                          text-slate-700
                          mb-2
                        "
                      >
                        Password
                      </label>

                      <div className="relative">

                        <input
                          type={
                            showPassword
                              ? "text"
                              : "password"
                          }
                          value={password}
                          onChange={(event) =>
                            setPassword(event.target.value)
                          }
                          placeholder="Minimum 6 characters"
                          autoComplete="new-password"
                          disabled={loading}
                          className="
                            w-full
                            h-12
                            px-4
                            pr-12
                            rounded-xl
                            border
                            border-slate-200
                            bg-slate-50
                            text-slate-900
                            outline-none
                            transition
                            focus:bg-white
                            focus:border-blue-500
                            focus:ring-4
                            focus:ring-blue-500/10
                            disabled:opacity-60
                          "
                        />

                        <button
                          type="button"
                          onClick={() =>
                            setShowPassword(
                              !showPassword
                            )
                          }
                          className="
                            absolute
                            right-3
                            top-1/2
                            -translate-y-1/2
                            text-slate-400
                            hover:text-slate-700
                          "
                        >
                          {showPassword ? (
                            <EyeOff size={19} />
                          ) : (
                            <Eye size={19} />
                          )}
                        </button>

                      </div>

                    </div>

                    {/* CONFIRM PASSWORD */}

                    <div>

                      <label
                        className="
                          block
                          text-sm
                          font-semibold
                          text-slate-700
                          mb-2
                        "
                      >
                        Confirm Password
                      </label>

                      <div className="relative">

                        <input
                          type={
                            showConfirmPassword
                              ? "text"
                              : "password"
                          }
                          value={confirmPassword}
                          onChange={(event) =>
                            setConfirmPassword(
                              event.target.value
                            )
                          }
                          placeholder="Re-enter your password"
                          autoComplete="new-password"
                          disabled={loading}
                          className="
                            w-full
                            h-12
                            px-4
                            pr-12
                            rounded-xl
                            border
                            border-slate-200
                            bg-slate-50
                            text-slate-900
                            outline-none
                            transition
                            focus:bg-white
                            focus:border-blue-500
                            focus:ring-4
                            focus:ring-blue-500/10
                            disabled:opacity-60
                          "
                        />

                        <button
                          type="button"
                          onClick={() =>
                            setShowConfirmPassword(
                              !showConfirmPassword
                            )
                          }
                          className="
                            absolute
                            right-3
                            top-1/2
                            -translate-y-1/2
                            text-slate-400
                            hover:text-slate-700
                          "
                        >
                          {showConfirmPassword ? (
                            <EyeOff size={19} />
                          ) : (
                            <Eye size={19} />
                          )}
                        </button>

                      </div>

                    </div>

                    {/* SEND OTP BUTTON */}

                    <button
                      type="submit"
                      disabled={loading}
                      className="
                        w-full
                        min-h-[52px]
                        rounded-xl
                        bg-blue-600
                        hover:bg-blue-700
                        active:bg-blue-800
                        text-white
                        font-semibold
                        flex
                        items-center
                        justify-center
                        gap-2
                        transition
                        shadow-lg
                        shadow-blue-600/20
                        disabled:opacity-60
                        disabled:cursor-not-allowed
                      "
                    >
                      {loading ? (
                        <>
                          <RefreshCw
                            size={18}
                            className="animate-spin"
                          />
                          Sending OTP...
                        </>
                      ) : (
                        <>
                          Send Verification OTP
                          <ArrowRight size={18} />
                        </>
                      )}
                    </button>

                    <p
                      className="
                        text-center
                        text-xs
                        text-slate-400
                        leading-5
                      "
                    >
                      By creating an account, you agree to
                      our terms and acknowledge our privacy policy.
                    </p>

                  </form>
                </>

              ) : (

                <>
                  {/* OTP HEADER */}

                  <div className="mb-8">

                    <button
                      type="button"
                      onClick={handleChangeEmail}
                      disabled={loading}
                      className="
                        inline-flex
                        items-center
                        gap-2
                        text-sm
                        text-slate-500
                        hover:text-blue-600
                        mb-6
                        transition
                      "
                    >
                      <ArrowLeft size={16} />
                      Change email
                    </button>

                    <div
                      className="
                        inline-flex
                        items-center
                        justify-center
                        w-12
                        h-12
                        rounded-2xl
                        bg-blue-50
                        text-blue-600
                        mb-4
                      "
                    >
                      <Mail size={23} />
                    </div>

                    <h2
                      className="
                        text-3xl
                        sm:text-4xl
                        font-bold
                        text-slate-900
                        tracking-tight
                      "
                    >
                      Verify your email
                    </h2>

                    <p
                      className="
                        mt-3
                        text-slate-500
                        text-sm
                        leading-6
                      "
                    >
                      We've sent a 6-digit verification code
                      to
                      <span className="font-semibold text-slate-800">
                        {" "}
                        {email}
                      </span>
                    </p>

                  </div>

                  {/* ALERTS */}

                  {error && (
                    <div
                      className="
                        mb-5
                        rounded-xl
                        border
                        border-red-200
                        bg-red-50
                        px-4
                        py-3
                        text-sm
                        text-red-700
                      "
                    >
                      {error}
                    </div>
                  )}

                  {success && (
                    <div
                      className="
                        mb-5
                        rounded-xl
                        border
                        border-green-200
                        bg-green-50
                        px-4
                        py-3
                        text-sm
                        text-green-700
                      "
                    >
                      {success}
                    </div>
                  )}

                  {/* OTP FORM */}

                  <form
                    onSubmit={handleVerifyOTP}
                    className="space-y-6"
                  >

                    <div>

                      <label
                        className="
                          block
                          text-sm
                          font-semibold
                          text-slate-700
                          mb-3
                        "
                      >
                        Enter Verification Code
                      </label>

                      <input
                        type="text"
                        inputMode="numeric"
                        maxLength={6}
                        value={otp}
                        onChange={(event) => {
                          const value =
                            event.target.value
                              .replace(/\D/g, "")
                              .slice(0, 6);

                          setOtp(value);
                        }}
                        placeholder="000000"
                        autoComplete="one-time-code"
                        autoFocus
                        disabled={loading}
                        className="
                          w-full
                          h-16
                          px-4
                          rounded-2xl
                          border
                          border-slate-200
                          bg-slate-50
                          text-slate-900
                          text-center
                          text-3xl
                          tracking-[0.5em]
                          font-bold
                          outline-none
                          transition
                          focus:bg-white
                          focus:border-blue-500
                          focus:ring-4
                          focus:ring-blue-500/10
                          disabled:opacity-60
                        "
                      />

                      <p
                        className="
                          mt-3
                          text-xs
                          text-slate-400
                          text-center
                        "
                      >
                        Enter the 6-digit code from your email.
                      </p>

                    </div>

                    {/* VERIFY BUTTON */}

                    <button
                      type="submit"
                      disabled={
                        loading ||
                        otp.length !== 6
                      }
                      className="
                        w-full
                        min-h-[52px]
                        rounded-xl
                        bg-blue-600
                        hover:bg-blue-700
                        active:bg-blue-800
                        text-white
                        font-semibold
                        flex
                        items-center
                        justify-center
                        gap-2
                        transition
                        shadow-lg
                        shadow-blue-600/20
                        disabled:opacity-50
                        disabled:cursor-not-allowed
                      "
                    >
                      {loading ? (
                        <>
                          <RefreshCw
                            size={18}
                            className="animate-spin"
                          />
                          Verifying...
                        </>
                      ) : (
                        <>
                          <ShieldCheck size={18} />
                          Verify & Create Account
                        </>
                      )}
                    </button>

                    {/* RESEND OTP */}

                    <div
                      className="
                        flex
                        flex-col
                        items-center
                        gap-3
                        pt-2
                      "
                    >

                      {resendTimer > 0 ? (
                        <div
                          className="
                            inline-flex
                            items-center
                            gap-2
                            text-sm
                            text-slate-500
                          "
                        >
                          <Clock3 size={16} />

                          Resend OTP in

                          <span className="font-semibold text-slate-700">
                            {formatTimer()}
                          </span>
                        </div>
                      ) : (
                        <button
                          type="button"
                          onClick={handleResendOTP}
                          disabled={loading}
                          className="
                            inline-flex
                            items-center
                            gap-2
                            text-sm
                            font-semibold
                            text-blue-600
                            hover:text-blue-700
                            disabled:opacity-50
                          "
                        >
                          <RefreshCw size={16} />
                          Resend OTP
                        </button>
                      )}

                      <button
                        type="button"
                        onClick={handleChangeEmail}
                        disabled={loading}
                        className="
                          text-xs
                          text-slate-400
                          hover:text-slate-600
                        "
                      >
                        Didn't receive the code?
                        Check spam or change your email.
                      </button>

                    </div>

                  </form>

                  {/* SECURITY NOTE */}

                  <div
                    className="
                      mt-8
                      rounded-2xl
                      border
                      border-slate-200
                      bg-slate-50
                      p-4
                      flex
                      gap-3
                    "
                  >

                    <ShieldCheck
                      size={20}
                      className="
                        text-green-600
                        shrink-0
                        mt-0.5
                      "
                    />

                    <div>

                      <p
                        className="
                          text-sm
                          font-semibold
                          text-slate-800
                        "
                      >
                        Your account is protected
                      </p>

                      <p
                        className="
                          mt-1
                          text-xs
                          text-slate-500
                          leading-5
                        "
                      >
                        Email verification helps keep your
                        Density Electronics account secure.
                      </p>

                    </div>

                  </div>

                </>
              )}

            </div>

          </section>

        </div>

        {/* MOBILE FOOTER */}

        <div
          className="
            lg:hidden
            text-center
            mt-6
            text-xs
            text-slate-400
          "
        >
          © {new Date().getFullYear()} Density Electronics
          <span className="mx-2">•</span>
          Electronics & Robotics Store
        </div>

      </main>

    </div>
  );
}
