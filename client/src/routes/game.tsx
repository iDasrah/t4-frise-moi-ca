import {useParams} from "react-router";
import { CardData } from "../types.ts";
import GameBoard from "../components/GameBoard.tsx";

interface GameProps {
    data: CardData[];
}

const Game = ({ data }: GameProps) => {
    const { game_id: gameId } = useParams<{ game_id: string }>();

    return (
        <div>
            <GameBoard data={data} />
        </div>
    )
}
export default Game
