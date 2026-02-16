
import { getUserGames } from "@/actions/game";
import { GameCard } from "@/components/GameCard";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import Link from "next/link";



type Props = {
    searchParams : Promise<{page?: string}>;
}

export default async function Dashboard({searchParams}: Props) {
    const params = await searchParams;
    const page = Number(params.page) || 1;

    const [{ games, totalPages, currentPage }, user] = await Promise.all([
        getUserGames(page, 2),
        currentUser()
    ]);
    if (!user) {
        redirect('/sign-in');
     };
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold text-white mb-2">
              Ma Collection de Jeux
            </h1>
            <p className="text-gray-400">
              {games.length} {games.length > 1 ? "jeux" : "jeu"} dans votre bibliothèque
            </p>
          </div>
          
          <Link href="/dashboard/add" passHref>
            <button className="flex items-center gap-2 bg-[#6c47ff] hover:bg-[#5a3ad6] text-white font-medium rounded-full px-4 py-2 transition-colors">
              <span className="text-sm font-medium text-white">Ajouter un jeu</span>
            </button>
          </Link>
        </div>

        {/* Liste des jeux */}
        {games.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">🎮</div>
            <h2 className="text-2xl font-semibold text-gray-300 mb-2">
              Aucun jeu dans votre collection
            </h2>
            <p className="text-gray-500 mb-6">
              Commencez à ajouter des jeux!
            </p>
            <Link href="/dashboard/add" passHref>
              <button className="flex items-center gap-2 bg-[#6c47ff] hover:bg-[#5a3ad6] text-white font-medium rounded-full px-4 py-2 transition-colors">
                <span className="text-sm font-medium text-white">Ajouter un jeu</span>
              </button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {games.map((game) => (
              <GameCard
                key={game.id}
                game={game}
                currentUserId={user.id}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}