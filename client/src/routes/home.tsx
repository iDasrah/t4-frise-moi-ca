import {Link, Outlet, useLocation} from "react-router";
import {socket} from "../socket.ts";

const Home = () => {
    const location = useLocation();
    const isFormRoute = location.pathname === '/create-game' || location.pathname === '/join-game';
    socket.connect();

    return (
        <>
            <div className="flex bg-darkBlue w-full h-screen">
                <div className={`flex flex-col gap-4 items-center justify-center ${isFormRoute ? 'w-1/2' : 'w-full'}`}>
                    <h2 className="text-4xl font-semibold text-white border-b-1 border-white">Frise-moi ça !</h2>
                    <Link to="/create-game" className="btn btn-primary">Créer une partie</Link>
                    <Link to="/join-game" className="btn btn-primary">Rejoindre une partie</Link>
                </div>
                <div className={`flex flex-col gap-4 items-center justify-center ${isFormRoute ? 'w-1/2' : 'hidden'}`}>
                    <Outlet />
                </div>

                <Link to="/rules" className="btn btn-secondary absolute bottom-5 left-5">Comment jouer ?</Link>
            </div>
        </>
    )
}
export default Home
