'use client'

import { PAGE_TITLE } from '@/constants'
import { signOut, useSession } from 'next-auth/react'
import Link from 'next/link'

export const NavBar = () => {
  const { status, data: session } = useSession()

  return (
    <div className="navbar bg-white shadow-xl">
      <div className="navbar-start">
        <Link href="/" className="text-2xl font-bold">
          {PAGE_TITLE}
        </Link>
      </div>
      <div className="navbar-end">
        {session ? (
          <>
            <Link href="/dashboard" className="btn btn-link mr-6">
              Dashboard
            </Link>
            <button onClick={() => signOut()} className="btn btn-sm px-4 text-white">
              Log out
            </button>
          </>
        ) : (
          <Link href="/login" className="btn btn-sm px-4 text-white">
            Log in
          </Link>
        )}
      </div>
    </div>
  )
}
