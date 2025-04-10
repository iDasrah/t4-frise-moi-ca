
    interface PlayerProps {
        data: PlayerData;
    }

export default function Player({ data } : PlayerProps) {


        return (
            <>
                <div className="flex-col items-center justify-center">
                    <div className="flex justify-center">{data.name}</div>
                    <div className="flex flex-col items-center justify-center">
                    </div>
                </div>
            </>
        );
    }