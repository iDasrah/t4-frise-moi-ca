import Pick from "./Pick.tsx";
import {CardData} from "../types.ts";
import Timeline from "./Timeline.tsx";
import { Link } from "react-router";

interface GameBoardProps {
    data: CardData[];
}
const GameBoard = ({ data }: GameBoardProps) => {
    return (
        <div className="bg-darkBlue h-screen text-white flex flex-col justify-between">
            <div className="flex flex-col items-center justify-center flex-grow gap-5">
                <div>
                    <Pick data={data} />
                </div>
                <div>
                    <Timeline data={data} />
                </div>
            </div>
            <div className="absolute bottom-5 left-5 text-3xl">
                <Link to="/" className="btn text-red-500 hover:text-red-700 p-0">Leave</Link>
            </div>
        </div>
    );
};
export default GameBoard;
