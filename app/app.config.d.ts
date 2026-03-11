import type { ButtonProps } from "@nuxt/ui"

type SocialLink = ButtonProps & { class?: string }

declare module "nuxt/schema" {
  interface AppConfig {
    ui: {
      colors: {
        primary: string
        neutral: string
      }
    }
    socials: {
      instagram: SocialLink
      linkedin: SocialLink
      github: SocialLink
    }
  }
}

declare module "#app" {
  interface AppConfig {
    ui: {
      colors: {
        primary: string
        neutral: string
      }
    }
    socials: {
      instagram: SocialLink
      linkedin: SocialLink
      github: SocialLink
    }
  }
}
