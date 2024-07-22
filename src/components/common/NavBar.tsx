'use client'

import { signOut, useSession } from 'next-auth/react'
import { PAGE_TITLE } from '@/constants'
import Link from 'next/link'

export const NavBar = () => {
  const { data: session } = useSession()

  return (
    <div className="navbar justify-center bg-white shadow-sm">
      <div className="container flex flex-row items-center justify-between">
        <div>
          <Link href="/" className="font-bold md:text-2xl">
            {PAGE_TITLE}
          </Link>
        </div>
        <div>
          {session ? (
            <>
              {/* <Link href="/dashboard" className="btn btn-link mr-6 hidden md:inline">
                Dashboard
              </Link> */}
              <button onClick={() => signOut()} className="btn btn-ghost btn-sm">
                Log out
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="size-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15M12 9l-3 3m0 0 3 3m-3-3h12.75"
                  />
                </svg>
              </button>
            </>
          ) : (
            <Link href="/login" className="btn btn-ghost btn-sm">
              Log in
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="size-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15M12 9l3 3m0 0-3 3m3-3H2.25"
                />
              </svg>
            </Link>
          )}
        </div>
      </div>
    </div>
  )
}
