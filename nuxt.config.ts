export default defineNuxtConfig({
  compatibilityDate: "2026-02-13",
  future: {
    compatibilityVersion: 5,
  },
  experimental: {
    viteEnvironmentApi: false,
    typescriptPlugin: true,
    nitroAutoImports: true,
    componentIslands: {
      selectiveClient: true,
    },
    viewTransition: true,
  },

  modules: [
    "@nuxtjs/seo",
    "@nuxt/a11y",
    "@nuxt/content",
    "@nuxt/fonts",
    "@nuxt/hints",
    "@nuxt/icon",
    "@nuxt/image",
    "@nuxt/test-utils",
    "@nuxt/ui",
    "@nuxtjs/device",
    "@nuxtjs/i18n",
    "nuxt-llms",
    "nuxt-security",
    "nuxt-studio",
  ],

  $development: {
    devtools: { enabled: true },
    // Change to true in case the issue gets resolved: https://github.com/fi3ework/vite-plugin-checker/issues/557
    typescript: { typeCheck: false },
    a11y: {
      enabled: true,
      defaultHighlight: false,
      logIssues: false,
    },
    site: { indexable: false },
  },

  $test: {
    devtools: { enabled: true },
  },

  $production: {
    devtools: { enabled: false },
    typescript: { typeCheck: false },
    nitro: {
      experimental: {
        websocket: true,
        tasks: true,
      },
      compressPublicAssets: true,
      minify: true,
      preset: "cloudflare-module",
      cloudflare: {
        deployConfig: true,
        nodeCompat: true,
      },
      prerender: {
        routes: ["/"],
        crawlLinks: true,
      },
    },
    site: {
      url: "https://template-dot-com.idantity.workers.dev",
      indexable: true,
    },
    robots: {
      blockAiBots: true,
      blockNonSeoBots: true,
      disallow: ["/dashboard"],
    },
    a11y: {
      enabled: false,
    },
    content: {
      database: {
        type: "d1",
        bindingName: "DB",
      },
    },
  },

  vite: {
    clearScreen: false,
  },

  ssr: true,

  app: {
    baseURL: "/",
    head: {
      title: "Template",
      titleTemplate: "%s | Template",
      meta: [
        {
          name: "description",
          content: "A website template.",
        },
        {
          name: "author",
          content: "Daniel Marchi",
        },
        {
          name: "creator",
          content: "Daniel Marchi",
        },
      ],
      link: [
        {
          rel: "icon",
          type: "image/svg+xml",
          href: "/favicon.svg",
        },
      ],
    },
    viewTransition: true,
  },

  security: {
    ssg: {
      meta: false,
      exportToPresets: false,
    },
    headers: {
      contentSecurityPolicy: {
        "img-src": [
          "'self'",
          "data:",
          "blob:",
          "https://pub-15f7c276f8b449ac91d74fa56692d47f.r2.dev",
          "https://placehold.co",
        ],
        "script-src": ["'self'", "'unsafe-inline'", "'wasm-unsafe-eval'"],
        "script-src-attr": ["'unsafe-inline'"],
        "connect-src": [
          "'self'",
          "https://template-dot-com.idantity.workers.dev",
          "https://api.iconify.design",
          "https://api.unisvg.com",
          "https://api.simplesvg.com",
        ],
        "font-src": ["'self'", "https://fonts.gstatic.com"],
        "style-src": ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
        "frame-ancestors": ["'self'"],
        "form-action": ["'self'"],
      },
      strictTransportSecurity: {
        maxAge: 31536000,
        includeSubdomains: true,
        preload: true,
      },
      crossOriginOpenerPolicy: "same-origin",
      referrerPolicy: "strict-origin-when-cross-origin",
      xFrameOptions: "SAMEORIGIN",
      xContentTypeOptions: "nosniff",
    },
  },

  i18n: {
    strategy: "prefix_except_default",
    defaultLocale: "en",
    langDir: "locales",
    locales: [
      {
        code: "en",
        name: "English",
        language: "en-US",
        file: "en.json",
      },
      {
        code: "pt",
        name: "Português",
        language: "pt-BR",
        file: "pt.json",
      },
    ],
  },

  css: ["~/assets/css/main.css"],

  components: [
    {
      path: "~/components",
      pathPrefix: false,
      prefix: "TP",
    },
    {
      path: "~/pages",
      pattern: "**/components/**",
      pathPrefix: false,
      prefix: "TP",
    },
  ],

  pages: {
    pattern: ["**/*.vue", "!**/components/**"],
  },

  colorMode: {
    preference: "dark",
    fallback: "dark",
  },

  fonts: {
    defaults: {
      weights: [
        // Thin
        100,
        // ExtraLight
        200,
        // Light
        300,
        // Regular
        400,
        // Medium
        500,
        // SemiBold
        600,
        // Bold
        700,
        // Extra Bold
        800,
      ],
      styles: ["normal", "italic"],
    },
    families: [],
  },

  icon: {
    class: "icon",
    size: "24px",
    customCollections: [],
  },

  image: {
    provider: "ipx",
    format: ["webp"],
    domains: ["pub-15f7c276f8b449ac91d74fa56692d47f.r2.dev", "placehold.co"],
  },

  ogImage: {
    zeroRuntime: true,
  },

  sitemap: {
    zeroRuntime: true,
  },

  content: {
    build: {
      markdown: {
        toc: {
          depth: 3,
        },
      },
    },
  },

  studio: {
    i18n: {
      defaultLocale: "en",
    },
    route: "/studio",
    repository: {
      provider: "github",
      owner: "idantitydotme",
      repo: "template.com",
    },
  },

  llms: {
    domain: "https://template.com",
    title: "Template",
    description: "My personal portfolio website.",
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
        "source",
      ],
    },
  },
});
