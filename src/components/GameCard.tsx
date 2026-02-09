"use client";

// import { useState } from "react";
import { Game } from "@/lib/types";
import { formatDistanceToNow } from "date-fns";
import { fr } from "date-fns/locale";

type Props = {
  game: Game;
  currentUserId?: string;
};

export function GameCard({ game, currentUserId }: Props) {
//   const [isEditing, setIsEditing] = useState(false);
//   const [isDeleting, setIsDeleting] = useState(false);

  const isOwner = currentUserId === game.userId;

  return (
    <article className="bg-gray-800/50 backdrop-blur border border-gray-700 rounded-xl p-6 hover:border-purple-500/50 transition">
        {/* Image */}
        {game.imageUrl && (
            <div className="relative h-48 overflow-hidden bg-gray-900">
                <img
                    src={game.imageUrl}
                    alt={game.title}
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
            </div>
        )}
        <div className="p-6">
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                    <span className="text-sm text-purple-400">{game.platform}</span>
                </div>
                <time className="text-xs text-gray-500">
                    {formatDistanceToNow(new Date(game.createdAt), {
                        addSuffix: true,
                        locale: fr,
                    })}
                </time>
            </div>
        {/* Titre */}
        <h3 className="text-xl font-bold text-gray-100 mb-3">
          {game.title}
        </h3>

        {/* Statut et Note */}
        <div className="flex items-center gap-3 mb-4">
            <span>{game.status}</span>
          {game.rating && (
            <div className="flex items-center gap-1 text-yellow-400">
              <span>⭐</span>
              <span className="text-sm font-semibold">{game.rating}/5</span>
            </div>
          )}
        </div>

        {/* Visibilité */}
        <div className="flex items-center gap-2 mb-4 text-sm text-gray-400">
          <span className="text-lg">{game.isPublic ? "🌍" : "🔒"}</span>
          <span>{game.isPublic ? "Public" : "Privé"}</span>
        </div>
      </div>
    </article>
  );
}