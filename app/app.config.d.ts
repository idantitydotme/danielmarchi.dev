import type { z } from "zod"
import type { createButtonSchema } from "~/content.config"

type ButtonSchema = z.infer<ReturnType<typeof createButtonSchema>>

declare module "nuxt/schema" {
  interface AppConfig {
    ui: {
      colors: {
        primary: string
        neutral: string
      }
    }
    socials: {
      instagram: ButtonSchema & {
        class?: string
      }
      linkedin: ButtonSchema & {
        class?: string
      }
      github: ButtonSchema & {
        class?: string
      }
    }
  }
}

export {}
