import {Link, Outlet} from "react-router";
import {socket} from "../socket.ts";

const Home = () => {
    socket.connect();

    return (
        <>
            <div className="flex bg-darkBlue w-full h-screen">
                <div className={`flex flex-col gap-4 items-center justify-center ${isBtnClicked ? 'w-1/2' : 'w-full'}`}>
                    <h2 className="text-4xl font-semibold text-white border-b-1 border-white">Frise-moi ça!</h2>
                    <Link to="/create-game" className="btn btn-primary"
                          onClick={() => setIsBtnClicked(true)}>Créer une partie</Link>
                    <Link to="/join-game" className="btn btn-primary"
                          onClick={() => setIsBtnClicked(true)}>Rejoindre une partie</Link>
                </div>
                <div className={`flex flex-col gap-4 items-center justify-center ${isBtnClicked ? 'w-1/2' : 'hidden'}`}>
                    <Outlet />
                </div>
            </div>
        </>
    )
}
export default Home
