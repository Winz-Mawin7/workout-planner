'use client'

import { signIn } from 'next-auth/react'
import { useRouter } from 'next/router'
import { useState } from 'react'
import Link from 'next/link'
import axios from 'axios'

export default function SignupPage() {
  const [form, setForm] = useState({ email: '', password: '', confirmPassword: '' })

  const handleSubmit = async () => {
    // if (form.password !== form.confirmPassword) console.log('Passwords do not match')

    try {
      await axios.post('/api/signup', form)
      await signIn('credentials', form)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <>
      <div className="m-auto">
        <div className="container rounded-lg bg-white px-8 py-12 md:min-w-[50vw]">
          <div>
            <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
              Register you account
            </h2>
          </div>

          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
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
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
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
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div>
                <button onClick={handleSubmit} className="btn btn-neutral w-full">
                  Register
                </button>
              </div>
            </div>
            <p className="mt-10 text-center text-sm text-gray-500">
              Already have account?
              <Link href="/login" passHref className="font-semibold leading-6 underline hover:text-primary">
                {' '}
                Log in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  )
}
