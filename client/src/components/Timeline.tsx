import {useState} from "react";
import {CardData} from "../types.ts";
import {DndContext} from "@dnd-kit/core";

interface TimelineProps {
    data: CardData[];
}

const Timeline = ({ data }: TimelineProps) => {
    const [cards] = useState<CardData[]>(data)

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
