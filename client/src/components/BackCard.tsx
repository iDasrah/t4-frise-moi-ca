import { CardData } from "../types.ts";

interface BackCardProps {
    onClick: () => void;
    data?: Omit<CardData, "type" | "description" | "date">;
}

const BackCard = ({ onClick, data }: BackCardProps) => {
    return (
        <div
            className="card back w-full h-full rounded-xl overflow-hidden cursor-pointer"
        >
            <div className="card-header">{data?.thematic}</div>

            <div className="w-full h-full p-1">
                <div className="flex flex-col h-full justify-between items-center bg-darkRed p-4 text-cream rounded-xl">
                    <p className="text-center">{data?.title}</p>
                    <img src="/t4_card_bg.png" className="w-24" alt="Logo" />
                </div>
            </div>
        </div>
    );
};

export default BackCard;
