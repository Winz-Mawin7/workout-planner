export interface Env {
  OPENAI_API_KEY: string
  MONGODB_URI: string
  SALT_SECRET: string
  NEXT_AUTH_URL: string
  NEXT_AUTH_SECRET: string
}

declare global {
  namespace NodeJS {
    interface ProcessEnv extends Env {}
  }
}
