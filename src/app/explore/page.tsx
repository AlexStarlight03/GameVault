
import { getPublicGames } from "@/actions/game";
import { GameCard } from "@/components/GameCard";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";


type Props = {
    searchParams : Promise<{page?: string}>;
}

export default async function page({searchParams}: Props) {
    const params = await searchParams;
    const page = Number(params.page) || 1;

    const [{ games, totalPages, currentPage }] = await Promise.all([
        getPublicGames(page, 2),
    ]);
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold text-white mb-2">
              Jeux Publics
            </h1>
            <p className="text-gray-400">
              {games.length} {games.length > 1 ? "jeux" : "jeu"} jeux publics
            </p>
          </div>
          
          {/* Mettre un bouton pour ajouter des jeux */}
        </div>

        {/* Liste des jeux */}
        {games.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">🎮</div>
            <h2 className="text-2xl font-semibold text-gray-300 mb-2">
              Aucun jeu jeu public
            </h2>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {games.map((game) => (
              <GameCard
                key={game.id}
                game={game}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}