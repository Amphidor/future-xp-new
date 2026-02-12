"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { Plus, Edit, Trash2, X, ChevronLeft, ChevronRight, GripVertical, MoreVertical } from "lucide-react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { sweetAlert } from "@/components/SweetAlert";
import TextArea from "@/components/exercises/forms/TextArea";


// DnD imports
import {
  DndContext,
  closestCenter,
  PointerSensor,
  KeyboardSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
  arrayMove,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";


interface Faq {
  id: number;
  title: string;
  description: string;
  isActive: boolean;     // updated
  orderIndex?: number;
  createdAt?: string;
}

export default function FaqPage() {
  const token = useSelector((state: any) => state.auth?.token || "");

  const [page, setPage] = useState(1);
  const [pageSize] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const [faqs, setFaqs] = useState<Faq[]>([]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedFaq, setSelectedFaq] = useState<Faq | null>(null);
  const [formData, setFormData] = useState({ title: "", description: "" });
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [viewFaq, setViewFaq] = useState<Faq | null>(null);

  // Load FAQs
  useEffect(() => {
    fetchFaqs(page);
  }, [page]);

  // DnD sensors
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 4 } }),
    useSensor(KeyboardSensor)
  );
  const handleView = (faq: Faq) => {
    setViewFaq(faq);
    setIsViewModalOpen(true);
  };

  // Fetch FAQs
  const fetchFaqs = async (pageNumber = 1) => {
    try {
      const response = await axios.get("/api/faqs", {
        params: { page: pageNumber, pageSize, isWeb: true },
      });
      setFaqs(response.data.faqs || []);
      setPage(response.data.page || 1);
      setTotalPages(response.data.totalPages || 1);
    } catch {
      toast.error("Failed to fetch FAQs");
    }
  };

  // Reindex after sorting
  const withReindexedOrder = (list: Faq[]) =>
    list.map((faq, idx) => ({ ...faq, orderIndex: idx + 1 }));

  // Persist reorder API call
  const persistOrder = async (payload: { id: number; orderIndex: number }[]) => {
    await axios.put(
      "/api/faqs/reorder",
      { faqs: payload },
      { headers: { Authorization: `Bearer ${token}` } }
    );
  };

  // Drag handler for reorder
  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over || active.id === over.id) return;

    const oldIndex = faqs.findIndex((f) => String(f.id) === String(active.id));
    const newIndex = faqs.findIndex((f) => String(f.id) === String(over.id));

    if (oldIndex === -1 || newIndex === -1) return;

    const previousFaqs = faqs;

    const reordered = arrayMove(faqs, oldIndex, newIndex);
    const reindexed = withReindexedOrder(reordered);

    setFaqs(reindexed);

    try {
      const payload = reindexed.map((faq) => ({
        id: faq.id,
        orderIndex: faq.orderIndex!,
      }));

      await persistOrder(payload);
      toast.success("FAQ order updated");
    } catch {
      setFaqs(previousFaqs); // rollback
      toast.error("Failed to update FAQ order!");
    }
  };

  // Add / Edit FAQ
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (selectedFaq) {
        await axios.put(`/api/faqs/${selectedFaq.id}`, formData, {
          headers: { Authorization: `Bearer ${token}` },
        });
        toast.success("FAQ updated successfully");
      } else {
        await axios.post("/api/faqs", formData, {
          headers: { Authorization: `Bearer ${token}` },
        });
        toast.success("FAQ created successfully");
      }

      setIsModalOpen(false);
      setSelectedFaq(null);
      resetForm();
      fetchFaqs(page);
    } catch {
      toast.error("Failed to save FAQ");
    }
  };

  const handleEdit = (faq: Faq) => {
    setSelectedFaq(faq);
    setFormData({ title: faq.title, description: faq.description });
    setIsModalOpen(true);
  };

  const handleDelete = async (id: number) => {
    sweetAlert({
      title: "Are you sure you want to delete this FAQ?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await axios.delete(`/api/faqs/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        fetchFaqs(page);
        toast.success("FAQ deleted successfully");
      }
    });
  };


  // Toggle Active / Inactive
  const toggleStatus = async (id: number, currentStatus: boolean) => {
    try {
      await axios.put(
        `/api/faqs/${id}`,
        { isActive: !currentStatus },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setFaqs((prev) =>
        prev.map((f) =>
          f.id === id ? { ...f, isActive: !currentStatus } : f
        )
      );

      toast.success("Status updated");
    } catch {
      toast.error("Failed to update status");
    }
  };

  const resetForm = () => {
    setFormData({ title: "", description: "" });
  };
  return (
    <div>
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">Manage FAQs</h1>
        <button
          onClick={() => {
            resetForm();
            setSelectedFaq(null);
            setIsModalOpen(true);
          }}
          className="btn btn-primary flex items-center"
        >
          <Plus className="mr-2" size={18} />
          Add FAQ
        </button>
      </div>

      <div className="border rounded-md overflow-x-auto">
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <table className="table-auto w-full border border-gray-200 text-sm">
            <thead className="bg-gray-100">
              <tr className="text-left">
                <th className="px-3 py-3 w-10"></th>
                <th className="px-3 py-3 w-16">S. No.</th>
                <th className="px-3 py-3 w-52">Title</th>
                <th className="px-3 py-3 w-[40%]">Description</th>

                {/* ⭐ NEW STATUS COLUMN */}
                <th className="px-3 py-3 w-24">Status</th>

                <th className="px-3 py-3 w-36">CreatedAt</th>
                <th className="px-3 py-3 w-36">UpdatedAt</th>
                <th className="px-3 py-3 w-28 text-center">Actions</th>
              </tr>
            </thead>


            <SortableContext
              items={faqs.map((f) => String(f.id))}
              strategy={verticalListSortingStrategy}
            >
              <tbody>
                {faqs.map((faq, i) => (
                  <SortableFaqRow
                    key={faq.id}
                    id={String(faq.id)}
                    faq={faq}
                    index={(page - 1) * pageSize + i + 1}
                    onEdit={() => handleEdit(faq)}
                    onDelete={() => handleDelete(faq.id)}
                    toggleStatus={() => toggleStatus(faq.id, faq.isActive)}   // ⭐ added
                    onView={() => handleView(faq)}   // ⭐ NEW
                  />
                ))}


                {faqs.length === 0 && (
                  <tr>
                    <td colSpan={6} className="text-center py-4">
                      No FAQs found.
                    </td>
                  </tr>
                )}
              </tbody>
            </SortableContext>
          </table>

        </DndContext>
      </div>

      {/* Pagination */}
      <div className="flex justify-end items-center mt-4">
        <button
          disabled={page === 1}
          onClick={() => setPage((prev) => prev - 1)}
          className="px-3 py-1 border rounded disabled:opacity-50 cursor-pointer"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>
        <span>
          Page {page} of {totalPages}
        </span>
        <button
          disabled={page === totalPages}
          onClick={() => setPage((prev) => prev + 1)}
          className="px-3 py-1 border rounded disabled:opacity-50 cursor-pointer"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-2xl p-6 relative">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-3 right-3 text-gray-600 hover:text-gray-900"
            >
              <X size={20} />
            </button>
            <h2 className="text-lg font-semibold mb-4">
              {selectedFaq ? "Edit FAQ" : "Add FAQ"}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Title</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  className="w-full border px-3 py-2 rounded"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Description
                </label>
                <TextArea
                  value={formData.description}
                  setValue={(value) => setFormData({ ...formData, description: value })}
                />

              </div>
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 border rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn btn-primary flex items-center"
                >
                  {selectedFaq ? "Update" : "Save"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {isViewModalOpen && viewFaq && (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-2xl p-6 relative">
            <button
              onClick={() => setIsViewModalOpen(false)}
              className="absolute top-3 right-3 text-gray-600 hover:text-gray-900"
            >
              <X size={20} />
            </button>

            <h2 className="text-xl font-semibold mb-4">View FAQ</h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Title</label>
                <p className="border px-3 py-2 rounded bg-gray-50 break-words whitespace-pre-wrap">
                  {viewFaq.title}
                </p>

              </div>

              <div
                className="border px-3 py-2 rounded bg-gray-50 break-words whitespace-pre-wrap prose max-w-none max-h-60 overflow-y-auto"
                dangerouslySetInnerHTML={{ __html: viewFaq.description }}
              />


              <div className="flex justify-end">
                <button
                  onClick={() => setIsViewModalOpen(false)}
                  className="btn btn-primary"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

/* Sortable Row component */
function SortableFaqRow({ id, faq, index, onEdit, onDelete, toggleStatus, onView }) {

  const { attributes, listeners, setNodeRef, transform, transition, isDragging } =
    useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    background: isDragging ? "rgba(0,0,0,0.05)" : undefined,
  };
  function truncate(text, max) {
    if (!text) return "";
    return text.length > max ? text.substring(0, max) + "..." : text;
  }

  return (
    <tr ref={setNodeRef} style={style} className="hover:bg-gray-50">
      {/* drag column */}
      <td className="px-3 py-3 w-10 text-center">
        <button {...attributes} {...listeners} className="p-1 hover:bg-gray-200 rounded">
          <GripVertical className="text-gray-500" size={16} />
        </button>
      </td>

      {/* Sr No */}
      <td className="px-3 py-3 w-16 text-gray-700">{index}</td>

      {/* Title */}
      <td className="px-4 py-3 text-gray-700">{truncate(faq.title, 20)}</td>


      {/* Description */}
      <td
        className="px-3 py-3 w-[40%] prose max-w-none line-clamp-2 text-gray-700"
        dangerouslySetInnerHTML={{ __html: truncate(faq.description, 40) }}
      />
      {/* Status */}
      <td className="px-3 py-3 w-24">
        <button
          onClick={toggleStatus}
          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-300 cursor-pointer
      ${faq.isActive ? "bg-green-500" : "bg-red-500"}
    `}
        >
          <span
            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-300
        ${faq.isActive ? "translate-x-6" : "translate-x-1"}
      `}
          />
        </button>
      </td>


      {/* Created */}
      <td className="px-3 py-3 w-36 text-gray-700">
        {faq.createdAt
          ? new Date(faq.createdAt).toLocaleDateString("en-US", {
            month: "2-digit",
            day: "2-digit",
            year: "numeric",
          })
          : ""}
      </td>

      <td className="px-3 py-3 w-36 text-gray-700">
        {faq.updatedAt
          ? new Date(faq.updatedAt).toLocaleDateString("en-US", {
            month: "2-digit",
            day: "2-digit",
            year: "numeric",
          })
          : ""}
      </td>


      {/* Actions */}
      <td className="px-3 py-3 w-28 flex justify-center">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="p-2 rounded hover:bg-gray-200">
              <MoreVertical size={16} />
            </button>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end" className="w-32">
            {/* View */}
            <DropdownMenuItem onClick={onView} className="cursor-pointer flex items-center gap-2">
              View
            </DropdownMenuItem>

            {/* Edit */}
            <DropdownMenuItem onClick={onEdit} className="cursor-pointer flex items-center gap-2">
              <Edit size={14} /> Edit
            </DropdownMenuItem>

            {/* Delete */}
            <DropdownMenuItem
              onClick={onDelete}
              className="cursor-pointer flex items-center gap-2 text-red-600"
            >
              <Trash2 size={14} /> Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </td>

    </tr>

  );
}
