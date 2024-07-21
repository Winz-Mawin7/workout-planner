import { IWorkoutPlan } from '@/models/workoutPlans.model'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'

export type PlanResponse = IWorkoutPlan & {
  _id: string
}

export const getPlan = async (id: string) => axios.get<PlanResponse>(`/api/plans/${id}`).then((res) => res.data)
export const getPlans = () => axios.get<PlanResponse[]>(`/api/plans`).then((res) => res.data)
export const deletePlan = async (id: string) => axios.delete(`/api/plans/${id}`)

export const usePlansQuery = () => {
  return useQuery({
    queryKey: ['plans'],
    queryFn: getPlans,
  })
}

export const usePlanQuery = (id: string) => {
  return useQuery({
    queryKey: ['plan', id],
    queryFn: () => getPlan(id),
  })
}

export const useDeletePlanMutation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: string) => deletePlan(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['plans'] })
    },
  })
}
