import { CardData } from "../types.ts";

interface FrontCardProps {
    onClick: () => void;
    data?: CardData|Omit<CardData, "textDate">;
}

const FrontCard = ({ onClick, data }: FrontCardProps) => {
    console.log("FrontCard data", data);
    return (
        <div
            className="card front w-full h-full rounded-lg overflow-hidden cursor-pointer"
            onClick={onClick}
        >
            <div className="card-header">{data?.thematic}</div>
            <hr className="border-3 border-cream2 w-full" />
            <div className="w-full h-full p-2">
                <div className="flex flex-col gap-2 items-center h-full">
                    {data && "textDate" in data && data.textDate &&
                        <p className="bg-darkRed w-[55%] text-center rounded-xl text-sm font-medium py-2">
                            {data.textDate}
                        </p>
                    }

                    <div className="w-[92%] bg-lightBlue text-center rounded-xl pt-2 pb-1 px-1">
                        <h3 className="text-sm font-bold break-words">{data?.title}</h3>
                        <hr className="border-lightRed w-15 my-1 mx-auto" />
                        <div className="text-xs break-words">{data?.type}</div>
                    </div>

                    <div className="w-[92%] bg-lightBlue text-cream rounded-xl text-xs text-center p-2 overflow-auto flex-grow flex items-start justify-center break-words leading-tight">
                        {data?.description}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FrontCard;
