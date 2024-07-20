export interface Env {
  OPEN_API_KEY: string
}

declare global {
  namespace NodeJS {
    interface ProcessEnv extends Env {}
  }
}
