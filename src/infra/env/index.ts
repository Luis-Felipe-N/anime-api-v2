import 'dotenv'
import z from 'zod'

const envSchema = z.object({
  NODE_ENV: z.enum(['dev', 'test', 'prod']).default('dev'),
  PORT: z.coerce.number().default(3333),
  SECRET_KEY: z.string().default('sdokhashascxzxc'),
})

const _env = envSchema.safeParse(process.env)

if (_env.success === false) {
  console.log(`Invalid environments variables - ${String(_env.error)}`)

  throw new Error('Invalid environments variables')
}

export const env = _env.data
