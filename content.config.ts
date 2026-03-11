import { defineCollection, defineContentConfig, z } from "@nuxt/content"
import { asSeoCollection } from "@nuxtjs/seo/content"

export const createButtonSchema = () =>
  z.object({
    label: z.string(),
    icon: z.string().optional(),
    to: z.string().optional(),
    color: z.enum(["primary", "neutral", "success", "warning", "error", "info"]).optional(),
    size: z.enum(["xs", "sm", "md", "lg", "xl"]).optional(),
    variant: z.enum(["solid", "outline", "subtle", "soft", "ghost", "link"]).optional(),
    target: z.enum(["_blank", "_self"]).optional()
  })

const createImageSchema = () =>
  z.object({
    src: z.string().editor({ input: "media" }),
    alt: z.string()
  })

const createAuthorSchema = () =>
  z.object({
    name: z.string(),
    description: z.string().optional(),
    username: z.string().optional(),
    twitter: z.string().optional(),
    to: z.string().optional(),
    avatar: createImageSchema().optional()
  })

const commonSchema = z.object({
  title: z.string(),
  description: z.string().optional(),
  links: z.array(createButtonSchema()).optional(),
  content: z.string().optional(),
  images: z.array(createImageSchema()).optional()
})

const contactSchema = commonSchema.extend({
  contactItems: z
    .array(
      z.object({
        icon: z.string().optional(),
        label: z.string().optional(),
        value: z.string().optional()
      })
    )
    .optional(),
  recipientEmail: z.string().optional()
})

const blogSchema = commonSchema.extend({
  minRead: z.number(),
  date: z.date(),
  image: z.string().optional().editor({ input: "media" }),
  author: createAuthorSchema()
})

const projectSchema = commonSchema.extend({
  title: z.string().nonempty(),
  description: z.string().nonempty(),
  image: z.string().optional().editor({ input: "media" }),
  tags: z.array(z.string()),
  date: z.date()
})

export default defineContentConfig({
  collections: {
    en_blog: defineCollection(
      asSeoCollection({
        type: "page",
        source: { include: "en/blog/**", prefix: "/blog" },
        schema: blogSchema
      })
    ),
    en_projects: defineCollection(
      asSeoCollection({
        type: "page",
        source: { include: "en/projects/**", prefix: "/projects" },
        schema: projectSchema
      })
    ),
    en_about: defineCollection(
      asSeoCollection({
        type: "page",
        source: { include: "en/*about.{yml,md}", prefix: "/" },
        schema: commonSchema
      })
    ),
    en_contact: defineCollection(
      asSeoCollection({
        type: "page",
        source: { include: "en/*contact.{yml,md}", prefix: "/" },
        schema: contactSchema
      })
    ),
    en_pages: defineCollection(
      asSeoCollection({
        type: "page",
        source: { include: "en/*{blog,projects}.{yml,md}", prefix: "/" },
        schema: commonSchema
      })
    ),

    pt_blog: defineCollection(
      asSeoCollection({
        type: "page",
        source: { include: "pt/blog/**", prefix: "/pt/blog" },
        schema: blogSchema
      })
    ),
    pt_projects: defineCollection(
      asSeoCollection({
        type: "page",
        source: { include: "pt/projects/**", prefix: "/pt/projects" },
        schema: projectSchema
      })
    ),
    pt_about: defineCollection(
      asSeoCollection({
        type: "page",
        source: { include: "pt/*about.{yml,md}", prefix: "/pt" },
        schema: commonSchema
      })
    ),
    pt_contact: defineCollection(
      asSeoCollection({
        type: "page",
        source: { include: "pt/*contact.{yml,md}", prefix: "/pt" },
        schema: contactSchema
      })
    ),
    pt_pages: defineCollection(
      asSeoCollection({
        type: "page",
        source: { include: "pt/*{blog,projects}.{yml,md}", prefix: "/pt" },
        schema: commonSchema
      })
    )
  }
})
