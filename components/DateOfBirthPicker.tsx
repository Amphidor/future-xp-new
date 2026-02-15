"use client";

import { useState, useRef, useEffect } from "react";
import { DayPicker } from "react-day-picker";
import { Calendar } from "lucide-react";
import "react-day-picker/style.css";

function formatDisplayDate(value: string): string {
  if (!value) return "";
  const [y, m, d] = value.split("-").map(Number);
  const date = new Date(y, m - 1, d);
  return date.toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });
}

export interface DateOfBirthPickerProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  id?: string;
  className?: string;
  inModal?: boolean;
}

export default function DateOfBirthPicker({
  value,
  onChange,
  placeholder = "DD/MM/YYYY",
  id = "signup-dob",
  className = "",
  inModal = false,
}: DateOfBirthPickerProps) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const selectedDate = value ? new Date(value + "T12:00:00") : undefined;
  const today = new Date();
  const fromYear = today.getFullYear() - 120;
  const toYear = today.getFullYear();

  const handleSelect = (date: Date | undefined) => {
    if (!date) return;
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, "0");
    const d = String(date.getDate()).padStart(2, "0");
    onChange(`${y}-${m}-${d}`);
  };

  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation();
    onChange("");
    setOpen(false);
  };

  const handleToday = (e: React.MouseEvent) => {
    e.stopPropagation();
    const t = new Date();
    handleSelect(t);
    setOpen(false);
  };

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [open]);

  return (
    <div ref={containerRef} className="relative">
      <button
        type="button"
        id={id}
        onClick={() => setOpen((o) => !o)}
        className={`flex items-center justify-between w-full px-4 border border-[#D4D7E3] rounded-lg shadow-sm bg-white text-left focus:ring-2 focus:ring-[#084A85] focus:border-[#084A85] sm:text-sm ${inModal ? "py-2.5 mt-1" : "py-3 mt-2"} ${className} ${open ? "ring-2 ring-[#084A85] border-[#084A85]" : ""}`}
      >
        <span className={value ? "text-gray-900" : "text-gray-400"}>
          {value ? formatDisplayDate(value) : placeholder}
        </span>
        <Calendar className="h-5 w-5 text-gray-400 shrink-0" aria-hidden />
      </button>

      {open && (
        <div className="absolute z-50 mt-1 p-4 bg-white rounded-xl border border-gray-200 shadow-xl calendar-dob-picker min-w-[280px]">
          <DayPicker
            mode="single"
            selected={selectedDate}
            onSelect={(date) => date && handleSelect(date)}
            defaultMonth={selectedDate || new Date(toYear - 25, 0)}
            fromYear={fromYear}
            toYear={toYear}
            disabled={{ after: today }}
            showOutsideDays
          />
          <div className="flex justify-between items-center mt-3 pt-3 border-t border-gray-100 gap-2">
            <button
              type="button"
              onClick={handleClear}
              className="text-sm text-gray-500 hover:text-gray-700"
            >
              Clear
            </button>
            <button
              type="button"
              onClick={handleToday}
              className="text-sm font-medium text-[#084A85] hover:underline border border-[#084A85] px-3 py-1.5 rounded-lg hover:bg-[#EAF5FF] transition-colors"
            >
              Today
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
