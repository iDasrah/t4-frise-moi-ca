import Pick from "./Pick.tsx";
import {CardData} from "../types.ts";
import Timeline from "./Timeline.tsx";

interface GameBoardProps {
    data: CardData[];
}

const GameBoard = ({ data }: GameBoardProps) => {
    return (
        <>
            <Pick data={data} />
            <Timeline data={data} />
        </>
    )
}
export default GameBoard
