import {Link, Outlet} from "react-router";

const Home = () => {
    return (
        <>
            <div className="flex bg-darkBlue w-full h-screen">
                <div className="flex flex-col gap-4 items-center justify-center w-1/2">
                    <h2 className="text-4xl font-semibold text-white border-b-1 border-white">Frise-moi ça!</h2>
                    <Link to="/create-game" className="btn btn-primary">Créer une partie</Link>
                    <Link to="/join-game" className="btn btn-primary">Rejoindre une partie</Link>
                </div>
                <div className="flex flex-col gap-4 items-center justify-center w-1/2">
                    <Outlet />
                </div>
            </div>
        </>
    )
}
export default Home
