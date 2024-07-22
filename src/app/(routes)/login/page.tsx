'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { authSchema, AuthFormData } from '@/schema'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { signIn } from 'next-auth/react'
import { useState } from 'react'
import Link from 'next/link'

export default function LoginPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [isError, setIsError] = useState(false)
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

      const result = await signIn('credentials', { ...data, redirect: false })
      if (result?.error) {
        setIsError(true)
        return
      }

      router.replace('/dashboard')
    } catch (error) {
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="m-auto">
      <div className="container rounded-lg bg-white p-12 md:w-[700px]">
        <div>
          <h2 className="text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Login in to your account
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
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6"
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
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6"
                  {...register('password')}
                />
                {errors.password && <p className="mt-2 text-xs text-red-500">{errors.password.message}</p>}
              </div>
            </div>

            {!!isError && <div className="mt-2 text-xs text-red-500">Invalid Credentials</div>}

            <div>
              <button type="submit" disabled={isLoading} className="btn btn-neutral w-full">
                Log in {isLoading && <span className="loading loading-spinner" />}
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
        </form>
      </div>
    </div>
  )
}
