import zod from 'zod'

const envSchema = zod.object({
    API_URL: zod.string().min(1),
    BEARER: zod.string().min(1),
     
})

export const env = envSchema.parse(process.env)