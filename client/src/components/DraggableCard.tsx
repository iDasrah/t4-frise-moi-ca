import { useDraggable } from "@dnd-kit/core";
import { CardData, CardSide } from "../types";
import Card from "./Card";

interface DraggableCardProps {
    data: CardData;
}

export default function DraggableCard({ data }: DraggableCardProps) {
    const { attributes, listeners, setNodeRef, transform } = useDraggable({
        id: "picked-card",
    });

    return (
        <div
            ref={setNodeRef}
            {...listeners}
            {...attributes}
            data-id="picked-card"
            style={{
                transform: transform
                    ? `translate(${transform.x}px, ${transform.y}px)`
                    : undefined,
            }}
        >
            <Card data={data} initialSide={CardSide.FRONT} />
        </div>
    );
}