import { WebsiteTypes } from "@types";

declare global {
  namespace NodeJS {
    interface ProcessEnv extends WebsiteTypes.Env {}
  }
}
