import { CardData } from "../types.ts";

interface BackCardProps {
    onClick: () => void;
    data?: Omit<CardData, "type" | "description" | "date">;
}

const BackCard = ({ data }: BackCardProps) => {
    return (
        <div
            className="card back w-full h-full rounded-lg overflow-hidden cursor-pointer"
        >
            <div className="card-header">{data?.thematic}</div>
            <hr className="border-3 border-cream2 w-full"></hr>

            <div className="w-full h-full ">
                <div className="flex flex-col h-full justify-between items-center bg-darkRed p-4 text-cream rounded-xs">
                    <p className="text-center">{data?.title}</p>
                    <img src="/t4_card_bg.png" className="w-24" alt="Logo" />
                </div>
            </div>
        </div>
    );
};

export default BackCard;
