"use client";

import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { Upload } from "lucide-react";

export default function UserCreate() {
  const router = useRouter();
  const [form, setForm] = useState({
    firstname: "",
    lastname: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "user",
    isActive: true,
    profilePicture: null as File | null,
  });

  const [preview, setPreview] = useState<string | null>(null);

  const handleChange = (field: string, value: any) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setForm((prev) => ({ ...prev, profilePicture: file }));

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result as string);
      reader.readAsDataURL(file);
    } else {
      setPreview(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (form.password !== form.confirmPassword) {
      toast.error("Passwords don't match");
      return;
    }

    try {
      const data = new FormData();
      data.append("firstname", form.firstname);
      data.append("lastname", form.lastname);
      data.append("username", form.username);
      data.append("email", form.email);
      data.append("password", form.password);
      data.append("role", form.role);
      data.append("isActive", String(form.isActive));
      if (form.profilePicture) {
        data.append("profilePicture", form.profilePicture);
      }

      await axios.post("/api/user", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      toast.success("User created successfully");
      router.push("/admin/users");
    } catch {
      toast.error("Failed to create user");
    }
  };

  return (
    <>
      <h1 className="text-2xl font-bold mb-6 text-gray-900">Create New User</h1>
      <div className="mx-auto p-8 bg-white rounded-xl shadow-2xl">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Profile Picture */}
          <div className="flex items-center space-x-6">
            <div className="relative">
              {preview ? (
                <img
                  src={preview}
                  alt="Preview"
                  className="w-20 h-20 rounded-full object-cover border border-gray-300"
                />
              ) : (
                <div className="w-20 h-20 rounded-full cursor-pointer flex items-center justify-center bg-gray-100 border border-gray-300 text-gray-400">
                  <Upload className="w-6 h-6" />
                </div>
              )}
            </div>
            <div>
              <label className="block mb-2 cursor-pointer font-semibold text-gray-700">
                Profile Picture
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="block w-full text-sm text-gray-600 cursor-pointer file:mr-4 file:py-2 file:px-4
                file:rounded-lg file:border-0
                file:text-sm file:font-semibold
                file:bg-primary-50 file:text-white
                hover:file:bg-primary-100
              "
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="username"
                className="block mb-1 font-semibold text-gray-700"
              >
                First Name
              </label>
              <input
                id="firstname"
                type="text"
                placeholder="Enter firstname"
                value={form.firstname}
                onChange={(e) => handleChange("firstname", e.target.value)}
                required
                className="input-field"
                autoComplete="firstname"
              />
            </div>
            {/* Last Name */}

            <div>
              <label
                htmlFor="username"
                className="block mb-1 font-semibold text-gray-700"
              >
                Last Name
              </label>
              <input
                id="lastname"
                type="text"
                placeholder="Enter lastname"
                value={form.lastname}
                onChange={(e) => handleChange("lastname", e.target.value)}
                required
                className="input-field"
                autoComplete="lastname"
              />
            </div>
          </div>

          <div className="grid grid-cols-2   gap-4">
            {/* Username */}
            {/* <div>
              <label
                htmlFor="username"
                className="block mb-1 font-semibold text-gray-700"
              >
                Username <span className="text-red-500">*</span>
              </label>
              <input
                id="username"
                type="text"
                placeholder="Enter username"
                value={form.username}
                onChange={(e) => handleChange("username", e.target.value)}
                required
                className="input-field"
                autoComplete="username"
              />
            </div> */}

            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="block mb-1 font-semibold text-gray-700"
              >
                Email Address <span className="text-red-500">*</span>
              </label>
              <input
                id="email"
                type="email"
                placeholder="example@mail.com"
                value={form.email}
                onChange={(e) => handleChange("email", e.target.value)}
                required
                className="input-field"
                autoComplete="email"
              />
            </div>

            {/* Role */}
            <div className="grid grid-cols-1 gap-4">
              <div>
                <label
                  htmlFor="role"
                  className="block mb-1 font-semibold text-gray-700"
                >
                  Role <span className="text-red-500">*</span>
                </label>
                <select
                  id="role"
                  value={form.role}
                  onChange={(e) => handleChange("role", e.target.value)}
                  required
                  className="input-field"
                >
                  <option value="user">User</option>
                  <option value="admin">Admin</option>
                </select>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="block mb-1 font-semibold text-gray-700"
              >
                Password <span className="text-red-500">*</span>
              </label>
              <input
                id="password"
                type="password"
                placeholder="Enter password"
                value={form.password}
                onChange={(e) => handleChange("password", e.target.value)}
                required
                className="input-field"
                autoComplete="new-password"
              />
            </div>

            {/* Confirm Password */}
            <div>
              <label
                htmlFor="confirmPassword"
                className="block mb-1 font-semibold text-gray-700"
              >
                Confirm Password <span className="text-red-500">*</span>
              </label>
              <input
                id="confirmPassword"
                type="password"
                placeholder="Confirm password"
                value={form.confirmPassword}
                onChange={(e) =>
                  handleChange("confirmPassword", e.target.value)
                }
                required
                className="input-field"
                autoComplete="new-password"
              />
            </div>
          </div>
          {/* Role */}

          <div className="grid grid-cols-2">
            <div className="flex items-center space-x-2">
              <input
                id="isActive"
                type="checkbox"
                checked={form.isActive}
                onChange={() => handleChange("isActive", !form.isActive)}
                className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
              />
              <label
                htmlFor="isActive"
                className="text-gray-700 font-semibold select-none cursor-pointer"
              >
                Active User
              </label>
            </div>
            <div className="flex justify-end space-x-4">
              <button
                type="button"
                onClick={() => router.push("/admin/users")}
                className="btn btn-outline"
              >
                Cancel
              </button>
              <button type="submit" className="btn btn-primary">
                Create User
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}
