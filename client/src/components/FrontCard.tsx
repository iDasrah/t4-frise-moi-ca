interface FrontCardProps {
    thematique: string;
    date: string;
    titre: string;
    type: string;
    description: string;
    onClick?: () => void;
}

const FrontCard = ({onClick}: FrontCardProps) => {
    return (

        <div className="card front" onClick={onClick}>
            <div className="card-header">{'Thématique'}</div>

            <div className="w-full h-full p-2">
                <div className="flex justify-between gap-2 h-full items-center flex-col">
                    <p className="bg-darkRed w-[98%] text-center rounded-xl text-sm font-medium py-2">Date</p>
                    <div className="w-[92%] bg-darkBlue text-center  rounded-xl py-2">
                        <h3 className="text-sm font-bold">Titre</h3>
                        <hr className="border-lightRed w-15 my-1 mx-auto" />
                        <div className="text-xs">Type</div>
                    </div>
                    <div className="w-[92%] bg-cream text-darkBlue rounded-xl text-xs text-center shadow-inner flex-grow flex items-center justify-center">
                        Description
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FrontCard;
