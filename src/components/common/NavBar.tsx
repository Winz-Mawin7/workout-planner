'use client'

import { PAGE_TITLE } from '@/constants'
import { signOut, useSession } from 'next-auth/react'
import Link from 'next/link'

export const NavBar = () => {
  const { status } = useSession()

  return (
    <div className="navbar bg-white shadow-xl">
      <div className="navbar-start">
        <Link href="/" passHref className="btn btn-ghost text-xl">
          {PAGE_TITLE}
        </Link>
      </div>
      {status !== 'loading' && (
        <div className="navbar-end">
          {status === 'authenticated' ? (
            <button onClick={() => signOut()} className="btn btn-sm px-4 text-white">
              Log out
            </button>
          ) : (
            <Link href="/login" passHref className="btn btn-sm px-4 text-white">
              Log in
            </Link>
          )}
        </div>
      )}
    </div>
  )
}
