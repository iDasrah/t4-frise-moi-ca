const WaitingRoom = () => {
return (
    <div className="w-screen h-screen flex flex-col items-center justify-center bg-gray-800 text-white pt-3">
        {/* Titre Réglages */}
        <h2 className="text-white font-bold italic text-4xl mb-6">Waiting Room :</h2>

        {/* Conteneur principal des deux blocs */}
        <div className="w-full h-full flex flex-row gap-8 p-8 bg-gray-700 rounded-xl shadow-lg">
            {/* Carte Joueurs */}
            <div className="bg-gray-300 text-black p-6 rounded-lg border-2 border-black w-1/4">
                <h3 className="font-bold text-xl mb-3">Joueurs 3/4</h3>
                <ul className="italic space-y-2 text-lg">
                    <li>Joueur 1</li>
                    <li>Joueur 2</li>
                    <li>Joueur 3</li>
                </ul>
            </div>

            {/* Carte Réglages + Code Room */}
            <div className="bg-gray-300 text-black p-6 rounded-lg flex flex-col justify-start w-3/4">
                {/* Champ réglages visuel */}
                <div className="h-10 border border-black rounded-md flex items-center justify-center text-lg">
                    <span className="italic font-semibold">Réglages :</span>
                </div>
                {/* Code room */}
                <div className="italic font-semibold pt-4 text-center text-lg">
                    Code room : <span className="text-gray-800">#524368</span>
                </div>
            </div>
        </div>
    </div>
);
};

export default WaitingRoom;