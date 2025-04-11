const BackCard = () => {
    return (
        <div
            className="card back w-full h-full rounded-lg overflow-hidden cursor-pointer"
        >
            <div className="card-header">Frise-moi ça !</div>
            <hr className="border-3 border-cream2 w-full"></hr>

            <div className="w-full h-full ">
                <div className="flex flex-col h-full justify-center items-center bg-darkRed p-4 text-cream rounded-xs">
                    <img src="/t4_card_bg.png" className="w-24" alt="Logo" />
                </div>
            </div>
        </div>
    );
};

export default BackCard;
