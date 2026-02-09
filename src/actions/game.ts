"use server";

import prisma from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";


export async function getCurrentUser(){
    const clerkUser = await currentUser();

    if(!clerkUser){
        throw new Error("Non autorisé");
    }


    return clerkUser.id;
}

export async function addGame(data: GameFormData){

}

export async function getUserGames(){

}

export async function deleteGame(gameId: number, data: Partial<GameFormData>){

}

export async function getPublicGames(){
    
}

interface GameFormData {
    title: string;
    plateform: string;
    staus: "A_JOUER" | "EN_COURS" | "TERMINE" | "ABANDONNE" ;
    rating?: number;
    imgaeUrl?: string;
}