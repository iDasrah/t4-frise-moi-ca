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
            <div className="bg-mainBlue h-screen text-white pt-5 flex flex-col justify-between gap-5">
                <div>
                    <Pick data={data} />
                </div>
                <div>
                    <Timeline data={data} />
                </div>
                <div className="ml-2 text-3xl">
                    <p>Code room : #{gameId}</p>
                    <Link to="/" className="btn text-red-500 hover:text-red-700 p-0">Leave</Link>
                </div>
            </div>
        </>
    );
};
export default GameBoard;
