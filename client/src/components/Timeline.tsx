import {useState} from "react";
import {CardData, CardSide} from "../types.ts";
import Card from "./Card.tsx";
import {DndContext} from "@dnd-kit/core";

interface TimelineProps {
    data: CardData[];
}

const Timeline = ({ data }: TimelineProps) => {
    const [cards, setCards] = useState<CardData[]>(data)

    return <>
        <div className="flex flex-col items-center justify-center ">
            <div className="w-[80%] h-60 flex gap-5 flex-wrap overflow-hidden p-3 border-2 border-black rounded-xl bg-cream" >
                <DndContext>
                </DndContext>
            </div>
        </div>
    </>
}
export default Timeline
