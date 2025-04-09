interface BackCardProps {
    onClick: () => void;
}

const BackCard = ({ onClick } : BackCardProps) => {
    return (
        <>
            <div className="card back" onClick={onClick}>
            </div>
        </>
    )
}
export default BackCard
