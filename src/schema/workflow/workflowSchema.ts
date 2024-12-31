import { describe } from 'node:test'
import {z} from 'zod'

export const createWorkflowSchema = z.object({
    name: z.string().min(2, {
      message: "name must be at least 2 characters.",
    }).max(50,{message:'name should less than 50 character'}),
    description:z.string().max(200).optional()
  })