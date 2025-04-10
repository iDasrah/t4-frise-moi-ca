import Pick from "./Pick.tsx";
import {CardData, PlayerData} from "../types.ts";
import Timeline from "./Timeline.tsx";
import { Link } from "react-router";
import PlayersList from "./PlayersList.tsx";
import Player from "./Player.tsx";
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
            <PlayersList playersData={playersData} />

            <Timeline data={cardsData} />

            <div className="flex items-center justify-center gap-12">
                <div className="relative bottom-3.5">
                    <Player playerData={playersData[0]} />
                </div>
                <Pick data={cardsData} />
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

            <Link to="/" className="btn btn-danger absolute bottom-5 left-5">Quitter</Link>
        </div>
    );
};
export default GameBoard;
