"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter, useParams } from "next/navigation";
import toast from "react-hot-toast";
import { Upload } from "lucide-react";
import base64UrlDecode from "@/app/utils/base64UrlDecode";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { updateUser } from "@/store/slices/authSlice";


export default function UserEdit() {
  const router = useRouter();
  // const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const token = useSelector((state: any) => state.auth.token);
  const dispatch = useDispatch();
  const [form, setForm] = useState({
    firstname: "",
    lastname: "",
    // username: "",
    email: "",
    password: "",
    confirmPassword: "",
    profilePicture: null as File | null,
  });

  const [preview, setPreview] = useState<string | null>(null);

  useEffect(() => {
    if (token) fetchUser();
  }, [token]);

  const fetchUser = async () => {
    try {
      const res = await axios.get(`/api/user/me`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const user = res.data.user;

      setForm({
        firstname: user.firstname || "",
        lastname: user.lastname || "",
        // username: user.username || "",
        email: user.email || "",
        password: "",
        confirmPassword: "",
        profilePicture: null,
      });

      if (user.profilePicture) {
        setPreview(
          `/uploads/${user.profilePicture}`
        );
      }
    } catch {
      toast.error("Failed to fetch user");
      router.push("/admin/dashboard");
    } finally {
      setLoading(false);
    }
  };

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

    if (form.password && form.password !== form.confirmPassword) {
      toast.error("Passwords don't match");
      return;
    }

    try {
      const data = new FormData();
      data.append("firstname", form.firstname);
      data.append("lastname", form.lastname);
      // data.append("username", form.username);
      data.append("email", form.email);
      if (form.password) data.append("password", form.password);
      if (form.profilePicture) {
        data.append("profilePicture", form.profilePicture);
      }

   const res = await axios.put(`/api/user/updateme`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

   dispatch(updateUser(res.data.user));
      toast.success("Profile updated successfully");
      router.push("/admin/dashboard");
    } catch {
      toast.error("Failed to update user");
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <>
      <h1 className="text-2xl font-bold mb-6 text-gray-900">Edit Profile</h1>
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
                className="block w-full cursor-pointer text-sm text-gray-600 file:mr-4 file:py-2 file:px-4
                file:rounded-lg file:border-0
                file:text-sm file:font-semibold
                file:bg-primary-50 file:text-white
                hover:file:bg-primary-100"
              />
            </div>
          </div>

          {/* Names */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="firstname"
                className="block mb-1 font-semibold text-gray-700"
              >
                First Name
              </label>
              <input
                id="firstname"
                type="text"
                value={form.firstname}
                onChange={(e) => handleChange("firstname", e.target.value)}
                required
                className="input-field"
              />
            </div>
            <div>
              <label
                htmlFor="lastname"
                className="block mb-1 font-semibold text-gray-700"
              >
                Last Name
              </label>
              <input
                id="lastname"
                type="text"
                value={form.lastname}
                onChange={(e) => handleChange("lastname", e.target.value)}
                required
                className="input-field"
              />
            </div>
          </div>

          {/* Username + Email */}
          <div className="grid grid-cols-2 gap-4">
            {/* <div>
              <label htmlFor="username" className="block mb-1 font-semibold text-gray-700">
                Username
              </label>
              <input
                id="username"
                type="text"
                value={form.username}
                onChange={(e) => handleChange("username", e.target.value)}
                required
                className="input-field"
              />
            </div> */}
            <div>
              <label
                htmlFor="email"
                className="block mb-1 font-semibold text-gray-700"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                value={form.email}
                onChange={(e) => handleChange("email", e.target.value)}
                required
                className="input-field"
              />
            </div>
          </div>

          {/* Passwords */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="password"
                className="block mb-1 font-semibold text-gray-700"
              >
                Password (leave blank to keep current)
              </label>
              <input
                id="password"
                type="password"
                value={form.password}
                onChange={(e) => handleChange("password", e.target.value)}
                className="input-field"
              />
            </div>
            <div>
              <label
                htmlFor="confirmPassword"
                className="block mb-1 font-semibold text-gray-700"
              >
                Confirm Password
              </label>
              <input
                id="confirmPassword"
                type="password"
                value={form.confirmPassword}
                onChange={(e) =>
                  handleChange("confirmPassword", e.target.value)
                }
                className="input-field"
              />
            </div>
          </div>
          {/* Buttons */}
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={() => router.push("/admin/dashboard")}
              className="btn btn-outline"
            >
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              Update Profile
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
