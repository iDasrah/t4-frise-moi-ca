import { User } from "../types.ts";
import {Crown, Star} from "lucide-react";

interface PlayersListProps {
    users: User[];
}

const PlayersList = ({ users }: PlayersListProps) => {
    return (
        <div className="flex justify-center items-center gap-6 flex-wrap">
            {users.map((user, index) => (
                <>
                    <div key={index} className="flex flex-col items-center text-sm">
                        <div className="flex items-center gap-1">
                            {user.isHost && (
                                <Crown className="size-6 fill-yellow-400 text-yellow-400" />
                            )}
                            <span>{user.name}</span>
                        </div>

                        <div className="flex items-center gap-1">
                            <span>{user.points}</span>
                            <Star className="size-6 fill-yellow-400 text-yellow-400" />
                        </div>
                    </div>
                </>
            ))}
        </div>
    )
}
export default PlayersList
