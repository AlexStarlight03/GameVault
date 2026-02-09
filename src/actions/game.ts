"use server";

import { Game, Platform, GameStatus } from "@/generated/prisma/client";
import prisma from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { auth } from '@clerk/nextjs/server';
import { redirect } from "next/navigation";



export async function getCurrentUser(){
    const clerkUser = await currentUser();

    if(!clerkUser){
        throw new Error("Non autorisé");
    }
    return clerkUser.id;
}

export async function addGame(data: GameFormData){
    const { userId } = await auth();
    if (!userId) {
        redirect('/sign-in');
     };
    await prisma.game.create({
        data: {
            title : data.title,
            platform: data.platform,
            status : data.status,
            rating: data.rating || null,
            imageUrl: data.imageUrl || null,
            userId: userId
        }
    });
    revalidatePath("/");
    revalidatePath("/dashboard");

}

export async function getUserGames(){
    const { userId } = await auth();
    if (!userId) {
        redirect('/sign-in');
     };
    const games = await prisma.game.findMany({
        where: {
            userId: userId
        }
    });
    return games;
    
}

export async function deleteGame(gameId: number){
    const { userId } = await auth();
    if (!userId) {
        redirect('/sign-in');
     };
    const game = await prisma.game.findUnique({
        where: {
            id: gameId,
            userId: userId
        }
    })
    if (!game) {
        throw new Error("Game not found");
    }
    await prisma.game.delete({
        where: {
            id: gameId,
            userId: userId
        }
    });
    revalidatePath("/");
    revalidatePath("/dashboard");
}

export async function getPublicGames(){
    const games = await prisma.game.findMany({
        where: {
            isPublic: true
        }
    });
    return games;
    
}


export async function updateGame (gameId: number, data: Partial<GameFormData>){
    const { userId } = await auth();
    if (!userId) {
        redirect('/sign-in');
     };
    const game = await prisma.game.findUnique({
        where: {
            id: gameId,
            userId: userId
        }
    })
    if (!game) {
        throw new Error("Game not found");
    }
    await prisma.game.update({
        where: {
            id: gameId,
            userId: userId
        },
        data: {
            ...data
        }
    });
    revalidatePath("/");
    revalidatePath("/dashboard");
}

interface GameFormData {
    title: string;
    platform: Platform;
    status: GameStatus;
    rating?: number;
    imageUrl?: string;
}

