interface BackCardProps {
    onClick: () => void;
}

const BackCard = ({ onClick } : BackCardProps) => {
    return (
        <>
            <div className="card back" onClick={onClick}>
                <div className="card-header">
                    Thématique
                </div>

                <div className="w-full h-full p-1">
                    <div className="flex flex-col h-full justify-between items-center bg-darkRed p-4 text-cream rounded-xl">
                        <p className="text-center">Titre</p>
                        <img src="/t4_card_bg.png" className="w-24"  alt="Logo"/>
                    </div>
                </div>
            </div>
        </>
    )
}
export default BackCard
