import Pick from "./Pick.tsx";
import { CardData, PlayerData } from "../types.ts";
import Timeline from "./Timeline.tsx";
import { Link } from "react-router";

interface GameBoardProps {
    cardsData: CardData[];
    playersData: PlayerData[];
}


const GameBoard = ({ cardsData, playersData }: GameBoardProps) => {
    return (
        <div className="bg-mainBlue text-white min-h-screen flex flex-col justify-between relative">

            <div className="flex justify-center gap-6 pt-4 flex-wrap">
                {playersData.map((player, index) => (
                    <div key={index} className="flex flex-col items-center text-sm">
                        <span>{player.name}</span>
                        <div className="flex items-center gap-1">
                            <span className="text-yellow-400 text-xl">⭐</span>
                            <span>{player.points}/15</span>
                        </div>
                    </div>
                ))}
            </div>


            <div className="flex justify-center mt-6">
                <Timeline data={cardsData} />
            </div>

            <div className="flex flex-col items-center mt-6 mb-6">
                <div className="flex flex-col items-center text-sm">
                    <span className="mt-1">{playersData[0]?.name}</span>
                    <div className="flex items-center gap-1">
                        <span className="text-yellow-400 text-xl">⭐</span>
                        <span>{playersData[0]?.points}/15</span>
                    </div>
                    <div className="w-60 h-85 bg-white/10 border border-white rounded-md mt-2"></div>
                </div>
            </div>


            <div className="absolute bottom-25 right-105 flex flex-col items-center">
                <h2 className="text-md mb-2">Pioche</h2>
                {/* Carte de pioche */}
                <Pick data={cardsData} />
            </div>

            <Link to="/" className="absolute bottom-5 left-5 text-white italic text-lg hover:underline">
                Leave
            </Link>
        </div>
    );
};

export default GameBoard;
