import Pick from "./Pick.tsx";
import {CardData} from "../types.ts";
import Timeline from "./Timeline.tsx";
import { Link } from "react-router";

interface GameBoardProps {
    data: CardData[];
    gameId: string;
}

const GameBoard = ({ data, gameId }: GameBoardProps) => {

    return (
        <>
            <Pick data={data} />
            <Timeline data={data} />
            <p>Code room : #{gameId}</p>
            <Link to="/" className="btn">Leave</Link>
        </>
    );
}
export default GameBoard
