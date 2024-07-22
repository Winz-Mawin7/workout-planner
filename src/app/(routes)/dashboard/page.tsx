'use client'

import { PlanCard, PlanCardLoading } from '@/components/card'
import { PlusCircleIcon } from '@heroicons/react/20/solid'
import { usePlansQuery } from '@/data/plan.query'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import React from 'react'

export default function DashboardPage() {
  const { data: session } = useSession()
  const { data: plans, isLoading } = usePlansQuery()

  return (
    <div className="container relative mx-auto my-8 flex flex-1 flex-col bg-white px-4 py-8">
      <h1 className="mb-4 text-2xl font-bold">Dashboard</h1>
      <p>Welcome, {session?.user.email}</p>
      <Link href="/plan/create" className="btn btn-neutral absolute right-6 top-6">
        Create Plan <PlusCircleIcon className="h-5 w-5" />
      </Link>
      <div className="mt-12">
        {isLoading ? (
          <PlanCardLoading />
        ) : !plans?.length ? (
          <div className="text-center">
            No plans yet
            <Link href="/plan/create" className="btn btn-link">
              create plan now!
            </Link>
          </div>
        ) : (
          <div className="container mx-auto">
            <h1 className="text-1xl mb-4 font-bold">Your Workout Plans</h1>
            <div className="gap-4 space-y-4">{plans?.map((plan) => <PlanCard key={plan._id} {...plan} />)}</div>
          </div>
        )}
      </div>
    </div>
  )
}
