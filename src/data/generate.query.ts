import { PersonalInfoData } from '@/components/form'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

export const getGoalsSuggeest = async (personalInfo: PersonalInfoData) =>
  axios.post<string[]>(`/api/generate-goals`, personalInfo).then((res) => res.data)

export const useGenerateGoalsQuery = (personalInfo: PersonalInfoData) => {
  return useQuery({
    queryKey: ['goals'],
    queryFn: () => getGoalsSuggeest(personalInfo),
    // enabled
  })
}
