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
            <div className="bg-darkBlue h-screen text-white">
                <div className="mt-5 mb-5">
                    <Pick data={data} />
                </div>
                <Timeline data={data} />
                <div className="ml-2 text-3xl">
                    <p>Code room :</p>
                    <p>#{gameId}</p>
                    <Link to="/" className="btn bg-">Leave</Link>
                </div>
            </div>
        </>
    );
}
export default GameBoard
