// hooks/useDragAndDropTable.ts
import { useRef } from "react";
import {
  PointerSensor,
  KeyboardSensor,
  useSensors,
  useSensor,
  DragEndEvent,
} from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

type Id = string | number;

type UseDragAndDropTableOptions<T> = {
  /** Current items displayed in the table */
  items: T[];
  /** Setter for items (from useState) */
  setItems: (items: T[]) => void;
  /** How to get a stable id from each item (default: item.id) */
  getId?: (item: T) => Id;
  /**
   * Optional: reindex items after reorder
   * (e.g., to recompute orderIndex = 1..N).
   */
  reindex?: (items: T[]) => T[];
  /**
   * Optional: persist new order to backend.
   * Called AFTER local state has been updated optimistically.
   */
  onOrderChange?: (items: T[]) => Promise<void> | void;
};

export function useDragAndDropTable<T>({
  items,
  setItems,
  getId = (item: any) => item.id,
  reindex,
  onOrderChange,
}: UseDragAndDropTableOptions<T>) {
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 4 } }),
    useSensor(KeyboardSensor)
  );

  const prevItemsRef = useRef<T[]>(items);

  const getItemIds = () => items.map((item) => String(getId(item)));

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = items.findIndex(
      (i) => String(getId(i)) === String(active.id)
    );
    const newIndex = items.findIndex(
      (i) => String(getId(i)) === String(over.id)
    );

    if (oldIndex === -1 || newIndex === -1) return;

    prevItemsRef.current = items;

    // 1) reorder in memory
    let reordered = arrayMove(items, oldIndex, newIndex);

    // 2) optional reindex (e.g. recompute orderIndex)
    if (reindex) {
      reordered = reindex(reordered);
    }

    // optimistic update
    setItems(reordered);

    // 3) optional backend persist
    if (onOrderChange) {
      try {
        await onOrderChange(reordered);
      } catch (err) {
        console.error("Failed to persist order", err);
        // rollback if backend failed
        setItems(prevItemsRef.current);
      }
    }
  };

  return {
    sensors,
    handleDragEnd,
    getItemIds,
  };
}

/**
 * Hook to use inside each table row
 * to make it draggable.
 */
export function useDraggableRow(id: Id) {
  const sortable = useSortable({ id });
  const style: React.CSSProperties = {
    transform: CSS.Transform.toString(sortable.transform),
    transition: sortable.transition,
    background: sortable.isDragging ? "rgba(0,0,0,0.03)" : undefined,
  };

  return {
    ...sortable,
    style,
  };
}
