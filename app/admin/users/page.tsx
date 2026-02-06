"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import {
  Plus,
  Edit,
  Trash2,
  ChevronLeft,
  ChevronRight,
  User,
} from "lucide-react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { sweetAlert } from "@/components/SweetAlert";
import base64UrlEncode from "@/app/utils/base64UrlEncode";
import { MoreVertical, Pencil } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

interface User {
  id: number;
  firstname: string;
  lastname: string;
  email: string;
  profilePicture: string;
  role: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [page, setPage] = useState(1);
  const [pageSize] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const router = useRouter();

  useEffect(() => {
    fetchUsers(page);
  }, [page]);

  const fetchUsers = async (pageNumber: number) => {
    try {
      const res = await axios.get("/api/user", {
        params: { page: pageNumber, pageSize, isWeb: true },
      });
      setUsers(res.data.users);
      setTotalPages(res.data.totalPages);
    } catch {
      toast.error("Failed to fetch users");
    }
  };

  const handleDelete = async (id: number) => {
    sweetAlert({
      title: "Are you sure?",
      text: "This action cannot be undone!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.delete(`/api/user/${id}`);
          toast.success("User deleted");
          fetchUsers(page);
        } catch {
          toast.error("Failed to delete user");
        }
      }
    });
  };
  const handleToggleStatus = async (id: number) => {
    // optimistic UI update
    setUsers((prev) =>
      prev.map((u) =>
        u.id === id ? { ...u, isActive: !u.isActive } : u
      )
    );

    try {
      await axios.put(`/api/user/${id}/toggle-status`);
      toast.success("User status updated");
    } catch (error) {
      // rollback if API fails
      setUsers((prev) =>
        prev.map((u) =>
          u.id === id ? { ...u, isActive: !u.isActive } : u
        )
      );
      toast.error("Failed to update user status");
    }
  };
  return (
    <div className="">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">Users</h1>
        <button
          onClick={() => router.push("/admin/users/add")}
          className="btn btn-primary flex items-center"
        >
          <Plus className="mr-2" />
          Add User
        </button>
      </div>

      <div className="overflow-x-auto border rounded-md">
        <table className="table-auto w-full min-w-[600px] divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">
                S. No.
              </th>

              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">
                Profile Picture
              </th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">
                First Name
              </th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">
                Last Name
              </th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">
                Email
              </th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">
                Role
              </th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">
                Status
              </th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">
                CreatedAt
              </th>   <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">
                UpdatedAt
              </th>
              <th className="px-4 py-3 text-center text-sm font-semibold text-gray-900">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {users.map((user, i) => (
              <tr key={user.id} className="hover:bg-gray-50">
                <td className="px-4 py-3 text-sm text-gray-700">{++i}</td>
                <td className="px-4 py-3 text-sm text-gray-700">
                  {user.profilePicture ? (
                    <img
                      src={`/uploads/${user.profilePicture}`}
                      alt={user.firstname || "User"}
                      className="w-10 h-10 object-cover rounded-full"
                    />
                  ) : (
                    <div className="w-10 h-10 flex items-center justify-center bg-gray-200 rounded-full">
                      <User className="w-7 h-7 text-gray-500" />
                    </div>
                  )}
                </td>
                <td className="px-4 py-3 text-sm text-gray-700">
                  {user.firstname}
                </td>
                <td className="px-4 py-3 text-sm text-gray-700">
                  {user.lastname}
                </td>
                <td className="px-4 py-3 text-sm text-gray-700">
                  {user.email}
                </td>
                <td className="px-4 py-3 text-sm capitalize text-gray-700">
                  {user.role}
                </td>
                <td className="px-4 py-3 text-sm">
                  <div
                    onClick={() => handleToggleStatus(user.id)}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full cursor-pointer transition
      ${user.isActive ? "bg-green-500" : "bg-red-500"}
    `}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition
        ${user.isActive ? "translate-x-6" : "translate-x-1"}
      `}
                    />
                  </div>
                </td>


                <td className="px-4 py-3 text-sm text-gray-600">
                  {user.createdAt
                    ? new Date(user.createdAt).toLocaleDateString("en-US", {
                      month: "2-digit",
                      day: "2-digit",
                      year: "numeric",
                    })
                    : "-"}
                </td>

                <td className="px-4 py-3 text-sm text-gray-600">
                  {user.updatedAt
                    ? new Date(user.updatedAt).toLocaleDateString("en-US", {
                      month: "2-digit",
                      day: "2-digit",
                      year: "numeric",
                    })
                    : "-"}
                </td>

                <td className="px-4 py-3 text-sm text-center">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="mx-auto">
                        <MoreVertical className="h-5 w-5" aria-hidden="true" />
                        <span className="sr-only">Open actions</span>
                      </Button>
                    </DropdownMenuTrigger>

                    <DropdownMenuContent align="end" className="w-44">
                      {/* <DropdownMenuLabel>Actions</DropdownMenuLabel> */}
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        onClick={() =>
                          router.push(
                            `/admin/users/edit/${base64UrlEncode(
                              user.id.toString()
                            )}`
                          )
                        }
                        className="cursor-pointer"
                      >
                        <Pencil className="mr-2 h-4 w-4" />
                        Edit User
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        className="cursor-pointer text-red-600"
                        onClick={() => handleDelete(user.id)}
                      >
                        <Trash2 className="mr-2 h-4 w-4" />
                        Delete User
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </td>
              </tr>
            ))}
            {users.length === 0 && (
              <tr>
                <td colSpan={9} className="px-4 py-6 text-center text-gray-500">
                  No users found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}

      <div className="flex justify-end items-center space-x-2 mt-4">
        {/* Previous Button */}
        <button
          className="btn btn-outline flex items-center gap-2 cursor-pointer"
          disabled={page <= 1}
          onClick={() => setPage((p) => Math.max(p - 1, 1))}
        >
          <ChevronLeft className="w-4 h-4" />
          {/* <span className="hidden sm:inline">Previous</span> */}
        </button>

        {/* Page Info */}
        <span className="inline-flex items-center px-3 text-sm font-medium text-gray-700">
          Page {page} of {totalPages}
        </span>

        {/* Next Button */}
        <button
          className="btn btn-outline flex items-center gap-2 cursor-pointer"
          disabled={page >= totalPages}
          onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
        >
          {/* <span className="hidden sm:inline">Next</span> */}
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
