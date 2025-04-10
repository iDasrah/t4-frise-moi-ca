import { CardData } from "../types.ts";

interface FrontCardProps {
    onClick: () => void;
    data?: CardData;
}

const FrontCard = ({ onClick, data }: FrontCardProps) => {
    return (
        <div
            className="card front w-full h-full rounded-xl overflow-hidden cursor-pointer"
        >
            <div className="card-header">{data?.thematic}</div>
            <div className="w-full h-full p-2">
                <div className="flex justify-between gap-2 h-full items-center flex-col">
                    <p className="bg-darkRed w-[98%] text-center rounded-xl text-sm font-medium py-2">
                        {data?.date}
                    </p>
                    <div className="w-[92%] bg-darkBlue text-center rounded-xl py-2">
                        <h3 className="text-sm font-bold">{data?.title}</h3>
                        <hr className="border-lightRed w-15 my-1 mx-auto" />
                        <div className="text-xs">{data?.type}</div>
                    </div>
                    <div className="w-[92%] bg-cream text-darkBlue rounded-xl text-xs text-center shadow-inner flex-grow flex items-center justify-center">
                        {data?.description}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FrontCard;
