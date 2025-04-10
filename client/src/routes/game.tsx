import {useParams} from "react-router";
import { CardData } from "../types.ts";
import GameBoard from "../components/GameBoard.tsx";

interface GameProps {
    data: CardData[];
}

const Game = ({ data }: GameProps) => {
    const params = useParams<{ game_code: string }>();
    const gameCode = params.game_code;

    return (
        <div>
            <GameBoard data={data} />
        </div>
    )
}
export default Game
