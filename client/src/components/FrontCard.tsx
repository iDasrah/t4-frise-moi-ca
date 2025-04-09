interface FrontCardProps {
    thematique: string;
    date: string;
    titre: string;
    type: string;
    description: string;
    onClick?: () => void;
}

const FrontCard = ({ onClick }: FrontCardProps) => {
    return (

        <div className="card front" onClick={onClick}>
            <div className="card-header">{'Thématique'}</div>

            <div className="w-full h-full p-1 ">
                <div className="flex justify-between gap-2 items-center flex-col">
            <div className="date">{"date"}</div>
            <div className="titre">
                <h3>{"titre"}</h3>
                <hr />
                <div className="type">{"type"}</div>
            </div>
            <div className="description">
                {"description"}
            </div>
                </div>
            </div>
        </div>
    );
};

export default FrontCard;
