import Pick from "./Pick.tsx";
import {CardData, PlayerData} from "../types.ts";
import Timeline from "./Timeline.tsx";
import { Link } from "react-router";

interface GameBoardProps {
     cardsData: CardData[];
     playersData : PlayerData[];
}

const GameBoard = ({ cardsData }: GameBoardProps) => {
    return (
        <>
            <div className="bg-mainBlue h-screen text-white pt-5 flex flex-col gap-5">
                <div>
                    <Pick data={cardsData} />
                </div>
                <div>
                    <Timeline data={cardsData} />
                </div>
                <Link to="/" className="btn btn-danger absolute bottom-5 left-5">Quitter</Link>
            </div>
        </>
    );
};
export default GameBoard;
