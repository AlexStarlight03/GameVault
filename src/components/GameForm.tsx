"use client";

import { useState } from "react";
import { addGame } from "@/actions/game";
import { Platform, GameStatus } from "@/lib/enums";
import { useRouter } from "next/navigation";

export default function AddGameForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form, setForm] = useState({
    title: "",
    platform: Platform.PC,
    status: GameStatus.A_JOUER,
    rating: "",
    imageUrl: "",
    isPublic: true,
  });
  const router = useRouter();

const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
  const { name, value, type } = e.target;
  if (type === "checkbox" && e.target instanceof HTMLInputElement) {
    setForm((prev) => ({
      ...prev,
      [name]: (e.target as HTMLInputElement).checked,
    }));
  } else {
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  }
};

const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  setIsSubmitting(true);
  try {
    const data = {
      ...form,
      rating: form.rating ? Number(form.rating) : undefined,
    };
    await addGame(data);
    router.push("/dashboard");
  } catch (error) {
    alert(error instanceof Error ? error.message : "Une erreur est survenue");
  } finally {
    setIsSubmitting(false);
  }
};

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-lg mx-auto">
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">Titre du jeu</label>
        <input
          type="text"
          name="title"
          value={form.title}
          onChange={handleChange}
          required
          className="w-full bg-gray-800 border border-gray-700 rounded-lg p-3 text-white"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">Plateforme</label>
        <select
          name="platform"
          value={form.platform}
          onChange={handleChange}
          className="w-full bg-gray-800 border border-gray-700 rounded-lg p-3 text-white"
        >
          {Object.values(Platform).map((p) => (
            <option key={p} value={p}>{p}</option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">Statut</label>
        <select
          name="status"
          value={form.status}
          onChange={handleChange}
          className="w-full bg-gray-800 border border-gray-700 rounded-lg p-3 text-white"
        >
          {Object.values(GameStatus).map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">Note (sur 5)</label>
        <input
          type="number"
          name="rating"
          min={0}
          max={5}
          value={form.rating}
          onChange={handleChange}
          className="w-full bg-gray-800 border border-gray-700 rounded-lg p-3 text-white"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">Image (URL)</label>
        <input
          type="url"
          name="imageUrl"
          value={form.imageUrl}
          onChange={handleChange}
          className="w-full bg-gray-800 border border-gray-700 rounded-lg p-3 text-white"
        />
      </div>

      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          name="isPublic"
          checked={form.isPublic}
          onChange={handleChange}
          id="isPublic"
        />
        <label htmlFor="isPublic" className="text-gray-300">Rendre public</label>
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-3 rounded-lg transition"
      >
        {isSubmitting ? "Ajout en cours..." : "Ajouter le jeu"}
      </button>
    </form>
  );
}