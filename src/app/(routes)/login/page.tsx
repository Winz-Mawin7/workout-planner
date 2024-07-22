'use client'

import { useRouter } from 'next/navigation'
import { signIn } from 'next-auth/react'
import { useState } from 'react'
import Link from 'next/link'

export default function LoginPage() {
  const router = useRouter()
  const [form, setForm] = useState({ email: '', password: '' })
  const [errorMessage, setErrorMessage] = useState('')

  const handleSubmit = async () => {
    const result = await signIn('credentials', { ...form, redirect: false })

    if (result?.error) {
      setErrorMessage('Invalid Credentials')
      return
    }

    router.replace('/dashboard')
  }

  return (
    <div className="m-auto">
      <div className="container rounded-lg bg-white px-8 py-12 md:min-w-[50vw]">
        <div>
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Login in to your account
          </h2>
        </div>

        <div className="mt-10">
          <div className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                Email address
              </label>
              <div className="mt-2">
                <input
                  onChange={(e) => setForm((prev) => ({ ...prev, email: e.target.value }))}
                  id="email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                  Password
                </label>
              </div>
              <div className="mt-2">
                <input
                  onChange={(e) => setForm((prev) => ({ ...prev, password: e.target.value }))}
                  id="password"
                  name="password"
                  type="password"
                  required
                  autoComplete="current-password"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            {!!errorMessage && <div className="text-red-500">{errorMessage}</div>}

            <div>
              <button onClick={handleSubmit} className="btn btn-neutral w-full">
                Log in
              </button>
            </div>
          </div>
          <p className="mt-10 text-center text-sm text-gray-500">
            Not a member?
            <Link href="/signup" passHref className="btn btn-link btn-sm">
              {' '}
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
