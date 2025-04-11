
interface PickProps {
    //cardsData: Omit<CardData, "date">|null;
    onPick: () => void;
}

export default function Pick({ onPick } : PickProps) {

    return (
        <div className="flex flex-col items-center justify-center">
            <h2 className="text-md mb-2">Pioche</h2>
            <div onClick={onPick}>
                <div className="w-51 h-71 bg-white/10 border border-white rounded-md mt-2">
                    {//cardsData && (
                     //       <Card
                     //           data={cardsData}
                     //           initialSide={CardSide.BACK}
                     //           turnable={false}
                     //       />
                     //   )
                    }
                </div>
            </div>
        </div>
    );
}
