import Pick from "./Pick.tsx";
import {CardData, PlayerData} from "../types.ts";
import Timeline from "./Timeline.tsx";
import { Link } from "react-router";
import PlayersList from "./PlayersList.tsx";
import Player from "./Player.tsx";

interface GameBoardProps {
    cardsData: CardData[];
    playersData: PlayerData[];
}

const GameBoard = ({ cardsData, playersData }: GameBoardProps) => {
    return (
        <div className="bg-mainBlue text-white min-h-screen flex flex-col justify-between relative">
            <PlayersList playersData={playersData} />

            <Timeline data={cardsData} />

            <div className="flex items-center justify-center gap-12">
                <div className="relative bottom-3.5">
                    <Player playerData={playersData[0]} />
                </div>
                <Pick data={cardsData} />
            </div>

            <Link to="/" className="btn btn-danger absolute bottom-5 left-5">Quitter</Link>
        </div>
    );
};
export default GameBoard;
