'use client'

import axios, { AxiosError, isAxiosError } from 'axios'
import { zodResolver } from '@hookform/resolvers/zod'
import { AuthFormData, authSchema } from '@/schema'
import { useForm } from 'react-hook-form'
import { signIn } from 'next-auth/react'
import { useState } from 'react'
import Link from 'next/link'

export default function SignupPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AuthFormData>({
    resolver: zodResolver(authSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const onSubmit = async (data: AuthFormData) => {
    try {
      setIsLoading(true)
      await axios.post('/api/signup', data)
      await signIn('credentials', data)
    } catch (error) {
      console.error(error)
      if (isAxiosError(error)) {
        setErrorMessage(error.response?.data.message)
        return
      }

      setErrorMessage('An error occurred. Please try again later.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      <div className="m-auto">
        <div className="container rounded-lg bg-white p-12 md:w-[700px]">
          <div>
            <h2 className="text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
              Register you account
            </h2>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="mt-10">
            <div className="space-y-6">
              <div>
                <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                  Email address
                </label>
                <div className="mt-2">
                  <input
                    type="email"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
                    {...register('email')}
                  />
                  {errors.email && <p className="mt-2 text-xs text-red-500">{errors.email.message}</p>}
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
                    type="password"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
                    {...register('password')}
                  />
                  {errors.password && <p className="mt-2 text-xs text-red-500">{errors.password.message}</p>}
                </div>
              </div>

              {!!errorMessage && <p className="mt-2 text-xs text-red-500">{errorMessage}</p>}

              <div>
                <button type="submit" disabled={isLoading} className="btn btn-neutral w-full">
                  Register {isLoading && <span className="loading loading-spinner" />}
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
          </form>
        </div>
      </div>
    </>
  )
}
