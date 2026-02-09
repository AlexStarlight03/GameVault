import { Platform, GameStatus } from "../generated/prisma/client";

export type Game = {
  id: number;
  title: string;
  platform: Platform;
  status: GameStatus;
  rating?: number | null;
  imageUrl?: string | null;
  userId: string;
  isPublic: boolean;
  createdAt: Date;
  updatedAt: Date;
};