
import {
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from '@clerk/nextjs'
import Link from 'next/link'


export function Navbar(){
  return (
      <header className="flex justify-between items-center p-4 gap-4 h-16">
        <nav className="flex gap-4">
          <Link href="/" className="text-white font-medium hover:text-purple-400 transition">Home</Link>
          <Link href="/dashboard" className="text-white font-medium hover:text-purple-400 transition">Dashboard</Link>
          <Link href="/explore" className="text-white font-medium hover:text-purple-400 transition">Explore</Link>
        </nav>
        <div className="flex items-center gap-4">
          <SignedOut>
            <SignInButton />
            <SignUpButton>
              <button className="bg-[#6c47ff] text-white rounded-full font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 cursor-pointer">
                Sign Up
              </button>
            </SignUpButton>
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
        </div>
      </header>
      )
}