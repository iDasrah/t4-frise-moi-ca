interface FrontCardProps {
    onClick: () => void;
}

const FrontCard = ({ onClick } : FrontCardProps) => {
    return (
        <>
            <div className="card front" onClick={onClick}>
                <h2>Front Side</h2>
                <p>This is the front side of the card.</p>
            </div>
        </>
    )
}
export default FrontCard
