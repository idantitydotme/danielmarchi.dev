export default defineNuxtConfig({
  compatibilityDate: "2026-02-13",
  future: {
    compatibilityVersion: 5
  },
  experimental: {
    viteEnvironmentApi: false,
    typescriptPlugin: true,
    nitroAutoImports: true,
    componentIslands: {
      selectiveClient: true
    },
    viewTransition: true
  },

  modules: [
    // Dev Modules
    "@nuxt/a11y",
    "@nuxt/hints",
    "@nuxt/test-utils",
    // Must go before Content
    "@nuxtjs/i18n",
    "@nuxt/image",
    "@nuxtjs/seo",
    "@nuxt/content",
    // Must go before UI
    "@nuxt/fonts",
    "@nuxt/icon",
    // Must go after Content
    "@nuxt/ui",
    "nuxt-studio",
    "@nuxtjs/device",
    "nuxt-llms",
    "nuxt-security"
  ],

  $development: {
    devtools: { enabled: true },
    // Change to true in case the issue gets resolved: https://github.com/fi3ework/vite-plugin-checker/issues/557
    typescript: { typeCheck: false },
    a11y: {
      enabled: true,
      defaultHighlight: false,
      logIssues: false
    },
    site: { indexable: false }
  },

  $test: {
    devtools: { enabled: true }
  },

  $production: {
    devtools: { enabled: false },
    typescript: { typeCheck: false },
    nitro: {
      experimental: {
        websocket: true,
        tasks: true
      },
      compressPublicAssets: true,
      minify: true,
      preset: "cloudflare-module",
      cloudflare: {
        deployConfig: true,
        nodeCompat: true
      },
      prerender: {
        routes: [
          "/",
          "/pt",
          "/en",
          "/about",
          "/pt/about",
          "/contact",
          "/pt/contact",
          "/blog",
          "/pt/blog",
          "/projects",
          "/pt/projects",
          "/resume",
          "/pt/resume"
        ],
        crawlLinks: true
      }
    },
    site: {
      url: "https://danielmarchi.dev",
      indexable: true
    },
    robots: {
      blockAiBots: true,
      blockNonSeoBots: true,
      disallow: ["/dashboard"]
    },
    a11y: {
      enabled: false
    },
    content: {
      database: {
        type: "d1",
        bindingName: "DB"
      }
    }
  },

  vite: {
    clearScreen: false
  },

  ssr: true,

  app: {
    baseURL: "/",
    head: {
      title: "Daniel Marchi",
      titleTemplate: "%s | Daniel Marchi",
      meta: [
        {
          name: "description",
          content: "Web Developer"
        },
        {
          name: "author",
          content: "Daniel Marchi"
        },
        {
          name: "creator",
          content: "Daniel Marchi"
        }
      ],
      link: [
        {
          rel: "icon",
          type: "image/svg+xml",
          href: "/favicon.svg"
        },
        {
          rel: "preconnect",
          href: "https://cdn.danielmarchi.dev"
        },
        {
          rel: "dns-prefetch",
          href: "https://cdn.danielmarchi.dev"
        }
      ]
    },
    viewTransition: true
  },

  security: {
    ssg: {
      meta: true,
      hashScripts: true,
      hashStyles: false,
      nitroHeaders: true,
      exportToPresets: true
    },
    sri: true,
    headers: {
      contentSecurityPolicy: {
        "default-src": ["'self'"],
        "base-uri": ["'none'"],
        "object-src": ["'none'"],
        "img-src": ["'self'", "blob:", "https://cdn.danielmarchi.dev", "https://placehold.co"],
        "script-src": ["'self'"],
        "script-src-attr": ["'unsafe-inline'"],
        "connect-src": [
          "'self'",
          "https://danielmarchi.dev",
          "https://api.iconify.design",
          "https://api.unisvg.com",
          "https://api.simplesvg.com"
        ],
        "font-src": ["'self'", "https://fonts.gstatic.com"],
        "style-src": ["'self'", "https://fonts.googleapis.com"],
        "frame-ancestors": ["'self'"],
        "form-action": ["'self'"]
      },
      strictTransportSecurity: {
        maxAge: 31536000,
        includeSubdomains: true,
        preload: true
      },
      crossOriginOpenerPolicy: "same-origin",
      referrerPolicy: "strict-origin-when-cross-origin",
      xFrameOptions: "SAMEORIGIN",
      xContentTypeOptions: "nosniff"
    }
  },

  routeRules: {
    // Disable rate limiting for internal Nuxt endpoints
    "/__nuxt_content/**": { security: { rateLimiter: false } },
    "/__nuxt_studio/**": { security: { rateLimiter: false } },
    "/__nuxt_hints/**": { security: { enabled: false } },
    "/_nuxt/**": { security: { rateLimiter: false } },
    // Cache content pages
    "/blog/**": { isr: true },
    "/projects/**": { isr: true },
    "/about": { isr: true },
    "/resume": { isr: true }
  },

  i18n: {
    strategy: "prefix_except_default",
    defaultLocale: "en",
    langDir: "locales",
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: "i18n_redirected",
      cookieSecure: true,
      alwaysRedirect: true
    },
    locales: [
      {
        code: "en",
        name: "English",
        language: "en-US",
        file: "en.json"
      },
      {
        code: "pt",
        name: "Português",
        language: "pt-BR",
        file: "pt.json"
      }
    ]
  },

  css: ["~/assets/css/main.css"],

  components: [
    {
      path: "~/components",
      pathPrefix: false,
      prefix: "DM"
    },
    {
      path: "~/pages",
      pattern: "**/components/**",
      pathPrefix: false,
      prefix: "DM"
    }
  ],

  pages: {
    pattern: ["**/*.vue", "!**/components/**"]
  },

  colorMode: {
    preference: "dark",
    fallback: "dark"
  },

  fonts: {
    defaults: {
      weights: [400, 500, 600, 700],
      styles: ["normal", "italic"]
    },
    families: [
      { name: "Public Sans", provider: "google" },
      { name: "Instrument Serif", provider: "google" }
    ]
  },

  icon: {
    class: "icon",
    size: "24px",
    customCollections: []
  },

  image: {
    provider: "cloudflare",
    cloudflare: {
      baseURL: "https://cdn.danielmarchi.dev"
    },
    domains: ["danielmarchi.dev", "placehold.co"]
  },

  ogImage: {
    zeroRuntime: true
  },

  sitemap: {
    zeroRuntime: true
  },

  content: {
    build: {
      markdown: {
        toc: {
          depth: 3
        }
      }
    }
  },

  studio: {
    i18n: {
      defaultLocale: "en"
    },
    route: "/studio",
    repository: {
      provider: "github",
      owner: "idantitydotme",
      repo: "danielmarchi.dev"
    }
  },

  llms: {
    domain: "https://danielmarchi.dev",
    title: "Daniel Marchi",
    description: "Web Developer"
  },

  ui: {
    prefix: "U",
    mdc: true,
    content: true,
    theme: {
      colors: [
        "neutral",
        "primary",
        "secondary",
        "info",
        "success",
        "warning",
        "error",
        "commentary",
        "ideation",
        "source"
      ]
    }
  }
})
