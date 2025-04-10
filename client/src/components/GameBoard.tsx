import Pick from "./Pick.tsx";
import {CardData, PlayerData} from "../types.ts";
import Timeline from "./Timeline.tsx";
import { Link } from "react-router";
import { useState } from "react";



interface GameBoardProps {
    cardsData: CardData[];
    playersData: PlayerData[];
}

const GameBoard = ({ cardsData, playersData }: GameBoardProps) => {
    const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);
    const [turnNumber, setTurnNumber] = useState(1);

    const currentPlayer = playersData[currentPlayerIndex];

    const nextTurn = () => {
        if (currentPlayerIndex + 1 < playersData.length) {
            setCurrentPlayerIndex(currentPlayerIndex + 1);
        } else {

            setCurrentPlayerIndex(0);
            setTurnNumber(turnNumber + 1);
        }
    };


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
                <Link to="/" className="btn btn-danger absolute bottom-5 left-5">Quitter</Link>
            </div>



            

            <div className="absolute bottom-25 right-105 flex flex-col items-center">
                <h2 className="text-md mb-2">Pioche</h2>
                <Pick
                    data={cardsData}
                    onClick={() => {
                        console.log(`${currentPlayer.name} pioche une carte`);

                        nextTurn();
                    }}
                    canDraw={true}

                    /*
                canDraw={true}
                    onDraw={() => {
                        console.log(`${currentPlayer.name} pioche une carte`);



                        nextTurn();

                        */
                />



            </div>

        </div>
    );
};
export default GameBoard;
