import {Navbar} from "@/components/Navbar";
import { getCurrentUser } from "@/actions/game";
import Link from "next/link";


export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
        <h1 className="titleApp ">GameAuth</h1>

          <div className="fixed bottom-0 left-0 flex h-48 w-full items-end justify-center bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:h-auto lg:w-auto lg:bg-none">
            <p className="mb-8 text-center text-2xl">
              Bienvenu sur GameVault
            </p>
        
          </div>
      </div>
    </main>
  );
}
