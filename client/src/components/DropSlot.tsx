import { useDroppable } from "@dnd-kit/core";

interface DropSlotProps {
    id: string;
}

export default function DropSlot({ id }: DropSlotProps) {
    const { setNodeRef, isOver } = useDroppable({ id });

    return (
        <div
            ref={setNodeRef}
            className={`w-50 h-70 rounded transition-all duration-200 ${
                isOver ? "bg-green-400" : "bg-gray-200"
            }`}
        />
    );
}