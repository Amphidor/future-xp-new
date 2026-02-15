"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";
import { Eye, EyeOff } from "lucide-react";
import DateOfBirthPicker from "./DateOfBirthPicker";
import { loginRequest } from "../store/slices/authSlice";
import Image from "next/image";
import { RootState } from "../store";
import { useDispatch, useSelector } from "react-redux";
import { getClientAuthBaseUrl } from "../lib/api";

interface LoginFormProps {
  inModal?: boolean;
  onCloseModal?: () => void;
}

export default function LoginForm({ inModal = false, onCloseModal }: LoginFormProps) {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [showSignUp, setShowSignUp] = useState(false);
  const [forgotEmail, setForgotEmail] = useState("");
  const [forgotLoading, setForgotLoading] = useState(false);
  const [signUpData, setSignUpData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    gender: "",
    dob: "",
    password: "",
    confirmPassword: "",
  });

  const GENDER_OPTIONS = [
    { value: "MALE", label: "Male" },
    { value: "FEMALE", label: "Female" },
    { value: "NON_BINARY", label: "Non-binary" },
    { value: "TRANSGENDER", label: "Transgender" },
    { value: "INTERSEX", label: "Intersex" },
    { value: "OTHER", label: "Other" },
    { value: "PREFER_NOT_TO_SAY", label: "Prefer not to say" },
    { value: "UNKNOWN", label: "Unknown" },
  ] as const;
  const [showSignUpPassword, setShowSignUpPassword] = useState(false);
  const [signUpLoading, setSignUpLoading] = useState(false);
  const dispatch = useDispatch();
  const router = useRouter();

  const { user, loading, error } = useSelector(
    (state: RootState) => state.auth
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(loginRequest(formData));
  };

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!forgotEmail) return;
    setForgotLoading(true);
    try {
      // TODO: Replace with actual forgot password API
      await new Promise((r) => setTimeout(r, 1000));
      toast.success("Reset link sent! Check your email.");
      setShowForgotPassword(false);
      setForgotEmail("");
    } catch {
      toast.error("Failed to send reset link. Please try again.");
    } finally {
      setForgotLoading(false);
    }
  };

  // Password validation: 8+ chars, mix of letters, numbers, symbols
  const validatePassword = (pwd: string) => {
    if (!pwd) return { valid: false, message: "Password is required" };
    if (pwd.length < 8) return { valid: false, message: "Password must be at least 8 characters" };
    const hasLetter = /[a-zA-Z]/.test(pwd);
    const hasNumber = /\d/.test(pwd);
    const hasSymbol = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(pwd);
    if (!hasLetter || !hasNumber || !hasSymbol) {
      return { valid: false, message: "Use letters, numbers and symbols" };
    }
    return { valid: true, message: "" };
  };

  const passwordValidation = validatePassword(signUpData.password);
  const passwordsMatch = signUpData.password === signUpData.confirmPassword;
  const confirmPasswordError = signUpData.confirmPassword && !passwordsMatch ? "Passwords do not match" : "";

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    const pwdCheck = validatePassword(signUpData.password);
    if (!pwdCheck.valid) {
      toast.error(pwdCheck.message);
      return;
    }
    if (signUpData.password !== signUpData.confirmPassword) {
      toast.error("Passwords don't match.");
      return;
    }
    setSignUpLoading(true);
    try {
      const name = [signUpData.firstName, signUpData.lastName].filter(Boolean).join(" ").trim() || "User";
      const base = getClientAuthBaseUrl();
      const registerUrl = base ? `${base}/auth/student-register` : "/api/auth/student-register";
      const res = await axios.post(registerUrl, {
        email: signUpData.email,
        password: signUpData.password,
        name,
        ...(signUpData.gender && { gender: signUpData.gender }),
        ...(signUpData.dob && { dob: signUpData.dob }),
      });
      toast.success(res.data?.message ?? "Account created! You can sign in now.");
      setShowSignUp(false);
      setSignUpData({ firstName: "", lastName: "", email: "", gender: "", dob: "", password: "", confirmPassword: "" });
      // Keep modal open and show login form so user can sign in right away (login is a popup, not a page)
    } catch (err: any) {
      const message = err.response?.data?.message || "Failed to create account. Please try again.";
      toast.error(message);
    } finally {
      setSignUpLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      toast.success("Signed in successfully");
      router.push("/careers");
    }
  }, [user, router]);

  useEffect(() => {
    if (error) toast.error(error);
  }, [error]);

  const formInner = (
    <div className={inModal ? "p-6 flex flex-col justify-center" : "p-8 flex flex-col justify-center"}>
          {/* <div className="flex justify-center">
            <Image
              src="/frontend/logo-future.png"
              alt="Logo"
              width={150}
              height={50}
              className="mb-6 drop-shadow-lg"
            />
          </div> */}
          {showForgotPassword ? (
            <>
              <h2 className="text-2xl font-bold text-gray-800 mb-2 text-left">
                Forgot Password
              </h2>

              <p className="text-[#7f7f7f] mb-8 text-[14px]">Forgot your password? No worries. Enter your registered email address and we'll send you a secure link to reset your Future XP password and get you back on track.</p>
              <form className="space-y-8" onSubmit={handleForgotPassword}>
                <div>
                  <label
                    htmlFor="forgot-email"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Email Address
                  </label>
                  <input
                    id="forgot-email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={forgotEmail}
                    onChange={(e) => setForgotEmail(e.target.value)}
                    className="mt-1 block w-full px-4 py-3 mt-2 border border-[#D4D7E3] rounded-lg shadow-sm placeholder-gray-400 focus:ring-primary-400 focus:border-primary-400 sm:text-sm"
                    placeholder="Enter Your Email Address"
                  />
                </div>

                <button
                  type="submit"
                  disabled={forgotLoading}
                  className="w-full flex justify-center py-4 px-4 text-[15px] font-semibold rounded-xl text-white bg-[#084A85] focus:outline-none focus:ring-2 focus:ring-primary-400 disabled:opacity-50"
                >
                  {forgotLoading ? (
                    <div className="flex items-center">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Sending...
                    </div>
                  ) : (
                    "Send Reset Link"
                  )}
                </button>

                <button
                  type="button"
                  onClick={() => setShowForgotPassword(false)}
                  className="w-full text-[#828282] text-center font-medium hover:text-[#084A85]"
                >
                  ← Back to Login
                </button>
              </form>
            </>
          ) : showSignUp ? (
            <>
              <h2 className="text-2xl font-bold text-gray-800 mb-2 text-left">
                Create an Account
              </h2>

              <p className={`text-[#7f7f7f] text-[14px] ${inModal ? "mb-4" : "mb-8"}`}>Create your Future XP account to get started. Sign up to access personalized tools, track your progress, and explore powerful features designed to support your growth and success.</p>
              <form className={inModal ? "space-y-4" : "space-y-6"} onSubmit={handleSignUp}>
                <div className={inModal ? "flex gap-3" : "flex gap-4"}>
                  <div className="flex-1">
                    <label htmlFor="signup-firstName" className="block text-sm font-medium text-gray-700">First Name</label>
                    <input
                      id="signup-firstName"
                      type="text"
                      required
                      value={signUpData.firstName}
                      onChange={(e) => setSignUpData({ ...signUpData, firstName: e.target.value })}
                      className={`mt-1 block w-full px-4 border border-[#D4D7E3] rounded-lg shadow-sm placeholder-gray-400 focus:ring-primary-400 focus:border-primary-400 sm:text-sm ${inModal ? "py-2.5 mt-1" : "py-3 mt-2"}`}
                      placeholder="First Name"
                    />
                  </div>
                  <div className="flex-1">
                    <label htmlFor="signup-lastName" className="block text-sm font-medium text-gray-700">Last Name</label>
                    <input
                      id="signup-lastName"
                      type="text"
                      required
                      value={signUpData.lastName}
                      onChange={(e) => setSignUpData({ ...signUpData, lastName: e.target.value })}
                      className={`mt-1 block w-full px-4 border border-[#D4D7E3] rounded-lg shadow-sm placeholder-gray-400 focus:ring-primary-400 focus:border-primary-400 sm:text-sm ${inModal ? "py-2.5 mt-1" : "py-3 mt-2"}`}
                      placeholder="Last Name"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="signup-gender" className="block text-sm font-medium text-gray-700">Gender</label>
                  <select
                    id="signup-gender"
                    value={signUpData.gender}
                    onChange={(e) => setSignUpData({ ...signUpData, gender: e.target.value })}
                    className={`mt-1 block w-full px-4 border border-[#D4D7E3] rounded-lg shadow-sm bg-white focus:ring-primary-400 focus:border-primary-400 sm:text-sm ${inModal ? "py-2.5 mt-1" : "py-3 mt-2"}`}
                  >
                    <option value="">Select gender</option>
                    {GENDER_OPTIONS.map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="signup-dob" className="block text-sm font-medium text-gray-700">Date of Birth</label>
                  <DateOfBirthPicker
                    id="signup-dob"
                    value={signUpData.dob}
                    onChange={(dob) => setSignUpData({ ...signUpData, dob })}
                    placeholder="DD/MM/YYYY"
                    inModal={inModal}
                  />
                </div>

                <div>
                  <label htmlFor="signup-email" className="block text-sm font-medium text-gray-700">Email Address</label>
                  <input
                    id="signup-email"
                    type="email"
                    autoComplete="email"
                    required
                    value={signUpData.email}
                    onChange={(e) => setSignUpData({ ...signUpData, email: e.target.value })}
                    className={`mt-1 block w-full px-4 border border-[#D4D7E3] rounded-lg shadow-sm placeholder-gray-400 focus:ring-primary-400 focus:border-primary-400 sm:text-sm ${inModal ? "py-2.5 mt-1" : "py-3 mt-2"}`}
                    placeholder="Enter Your Email Address"
                  />
                </div>

                <div>
                  <label htmlFor="signup-password" className="block text-sm font-medium text-gray-700">Password</label>
                  <div className="mt-1 relative">
                    <input
                      id="signup-password"
                      type={showSignUpPassword ? "text" : "password"}
                      autoComplete="new-password"
                      required
                      value={signUpData.password}
                      onChange={(e) => setSignUpData({ ...signUpData, password: e.target.value })}
                      className={`block w-full px-4 pr-10 rounded-lg shadow-sm placeholder-gray-400 focus:ring-2 focus:ring-primary-400 sm:text-sm ${
                        inModal ? "py-2.5 mt-1" : "py-3 mt-2"
                      } ${
                        signUpData.password && !passwordValidation.valid
                          ? "border-red-500 focus:border-red-500 focus:ring-red-500/20"
                          : "border border-[#D4D7E3] focus:border-primary-400"
                      }`}
                      placeholder="Enter Your Password"
                    />
                    <button
                      type="button"
                      className="absolute inset-y-0 right-0 pr-3 flex items-center"
                      onClick={() => setShowSignUpPassword(!showSignUpPassword)}
                    >
                      {showSignUpPassword ? <EyeOff className="h-5 w-5 text-gray-400" /> : <Eye className="h-5 w-5 text-gray-400" />}
                    </button>
                  </div>
                  {signUpData.password && !passwordValidation.valid && (
                    <p className="mt-1 text-red-600 text-[12px]">{passwordValidation.message}</p>
                  )}
                  {signUpData.password && passwordValidation.valid && (
                    <p className="mt-1 text-green-600 text-[12px]">Password meets requirements</p>
                  )}
                </div>

                <div>
                  <label htmlFor="signup-confirmPassword" className="block text-sm font-medium text-gray-700">Confirm Password</label>
                  <input
                    id="signup-confirmPassword"
                    type={showSignUpPassword ? "text" : "password"}
                    autoComplete="new-password"
                    required
                    value={signUpData.confirmPassword}
                    onChange={(e) => setSignUpData({ ...signUpData, confirmPassword: e.target.value })}
                    className={`mt-1 block w-full px-4 rounded-lg shadow-sm placeholder-gray-400 focus:ring-2 focus:ring-primary-400 sm:text-sm ${
                      inModal ? "py-2.5 mt-1" : "py-3 mt-2"
                    } ${
                      confirmPasswordError
                        ? "border-red-500 focus:border-red-500 focus:ring-red-500/20"
                        : "border border-[#D4D7E3] focus:border-primary-400"
                    }`}
                    placeholder="Confirm Password"
                  />
                  {confirmPasswordError && (
                    <p className="mt-1 text-red-600 text-[12px]">{confirmPasswordError}</p>
                  )}
                  {signUpData.confirmPassword && passwordsMatch && (
                    <p className="mt-1 text-green-600 text-[12px]">Passwords match</p>
                  )}
                </div>
                <p className="text-[#7f7f7f] text-[12px]">Use 8 or more characters with a mix of letters, numbers and symbols</p>

                <button
                  type="submit"
                  disabled={signUpLoading || !passwordValidation.valid || !!confirmPasswordError}
                  className={`w-full flex justify-center px-4 text-[15px] font-semibold rounded-xl text-white bg-[#084A85] focus:outline-none focus:ring-2 focus:ring-primary-400 disabled:opacity-50 ${inModal ? "py-3" : "py-4"}`}
                >
                  {signUpLoading ? (
                    <div className="flex items-center">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Creating account...
                    </div>
                  ) : (
                    "Sign Up"
                  )}
                </button>

                <button
                  type="button"
                  onClick={() => setShowSignUp(false)}
                  className="w-full text-[#828282] text-center font-medium hover:text-[#084A85]"
                >
                  Already have an account? Sign In
                </button>
              </form>
            </>
          ) : (
            <>
              <h2 className="text-2xl font-bold text-gray-800 mb-2 text-left">
                Welcome Back 👋
              </h2>

              <p className="text-[#7f7f7f] mb-8 text-[14px]">Welcome back to Future XP. We're glad to have you again. Jump right back
                into your personalized dashboard, explore the latest updates, and continue building smarter, faster experiences.</p>
              <form className="space-y-8" onSubmit={handleSubmit}>
            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email Address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className="mt-1 block w-full px-4 py-3 mt-2 border border-[#D4D7E3] rounded-lg shadow-sm placeholder-gray-400 focus:ring-primary-400 focus:border-primary-400 sm:text-sm"
                placeholder="Enter Your Email Address"
              />
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <div className="mt-1 relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  required
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                  className="block w-full px-4 py-3 mt-2 pr-10 border-[1px] border-[#D4D7E3] rounded-lg shadow-sm placeholder-gray-400 focus:ring-primary-400 focus:border-primary-400 sm:text-sm"
                  placeholder="Enter Your password"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-gray-400" />
                  ) : (
                    <Eye className="h-5 w-5 text-gray-400" />
                  )}
                </button>
              </div>
              <div className={`mt-2 flex items-center justify-between ${inModal ? "mb-4" : "mb-24"}`}>
                <div>
                  {error && (
                    <p className="text-red-600 text-sm mt-2">{error}</p>
                  )}
                </div>
                <div>
                  <button
                    type="button"
                    onClick={() => setShowForgotPassword(true)}
                    className="text-[16px] text-[#084A85] font-semibold hover:underline"
                  >
                    Forgot password?
                  </button>
                </div>
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full flex justify-center py-4 px-4 text-[15px] font-semibold rounded-xl text-white bg-[#084A85] focus:outline-none focus:ring-2 focus:ring-primary-400 disabled:opacity-50"
            >
              {loading ? (
                <div className="flex items-center">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Signing in...
                </div>
              ) : (
                "Sign in"
              )}
            </button>

            <h6 className="text-[#828282] text-center font-medium">
              Don't you have an account?{" "}
              <button type="button" onClick={() => setShowSignUp(true)} className="text-[#084A85] font-semibold hover:underline">
                Sign Up
              </button>
            </h6>
          </form>
            </>
          )}
    </div>
  );

  if (inModal) {
    return formInner;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#ffffff] p-6">
      <div className="max-w-[580px] w-full bg-white rounded-2xl shadow-xl overflow-hidden">
        {formInner}
      </div>
    </div>
  );
}
