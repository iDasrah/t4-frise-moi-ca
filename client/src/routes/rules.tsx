import {Link} from "react-router";

export function Rules() {
return (
    <div className="flex flex-col bg-darkBlue text-cream items-center justify-center min-h-screen p-4">
        <h1 className="text-4xl font-bold mb-6 text-center">Règles du Jeu : Frise-moi ça!</h1>
        <div className="w-full max-w-3xl p-8 bg-white/10 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold mb-4">Objectif</h2>
            <p className="mb-6">
                L'objectif du jeu est de construire une frise historique des services publics en plaçant correctement des cartes dans l'ordre chronologique.
                Le premier joueur à atteindre le nombre de points requis gagne la partie.
            </p>

            <h2 className="text-2xl font-semibold mb-4">Matériel</h2>
            <p className="mb-4">
                Le jeu se compose d'un jeu de cartes. Chaque carte contient :
            </p>
            <ul className="list-disc list-inside mb-6 pl-4">
                <li>Un titre</li>
                <li>Un type</li>
                <li>Un service public</li>
                <li>Une description</li>
                <li>Une date</li>
            </ul>
            <p className="mb-4">
                Deux zones sont utilisées dans le jeu :
            </p>
            <ul className="list-disc list-inside mb-6 pl-4">
                <li>Une pioche centrale</li>
                <li>Une frise centrale où les cartes sont disposées dans leur ordre chronologique</li>
            </ul>

            <h2 className="text-2xl font-semibold mb-4">Paramètres de la Partie</h2>
            <p className="mb-6">
                Avant de commencer, définissez les paramètres suivants :
            </p>
            <ul className="list-disc list-inside mb-6 pl-4">
                <li>Nombre de joueurs</li>
                <li>Pour chaque joueur un pseudo</li>

            </ul>

            <h2 className="text-2xl font-semibold mb-4">Déroulement de la Partie</h2>
            <p className="mb-4">
                La partie se déroule comme suit :
            </p>
            <ol className="list-decimal list-inside mb-6 pl-4">
                <li>Une carte est tirée au sort et placée dans la frise centrale. Elle sert de point de départ.</li>
                <li>Chaque joueur, à tour de rôle :
                    <ul className="list-disc list-inside ml-6">
                        <li>Pioche une carte décrivant une étape historique, sans voir sa date.</li>
                        <li>Dispose cette carte dans la frise centrale (à gauche, à droite, ou entre deux cartes déjà posées).</li>
                        <li>Si la carte est à la bonne place (la chronologie est respectée), le joueur marque un point.</li>
                        <li>Sinon, la carte est déplacée à la bonne place et le joueur ne marque aucun point.</li>
                    </ul>
                </li>
            </ol>

            <h2 className="text-2xl font-semibold mb-4">Fin de Partie</h2>
            <p className="mb-4">
                La partie se termine lorsqu'un joueur atteint le nombre de points requis pour gagner. Ce joueur est déclaré vainqueur.
            </p>

            <div className="flex justify-center gap-4">
                <Link to="/" className="btn bg-lightBlue">Commencer</Link>
            </div>
        </div>
    </div>
);
}