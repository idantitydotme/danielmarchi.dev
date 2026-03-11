export default defineAppConfig({
  ui: {
    colors: {
      primary: "blue",
      neutral: "neutral"
    }
  },
  socials: {
    instagram: {
      icon: "simple-icons:instagram",
      label: "Instagram",
      to: "https://instagram.com/idantity.me",
      variant: "ghost",
      color: "neutral",
      class: "hover:text-primary-500"
    },
    linkedin: {
      icon: "simple-icons:linkedin",
      label: "LinkedIn",
      to: "https://www.linkedin.com/in/daniel-marchi/",
      variant: "ghost",
      color: "neutral",
      class: "hover:text-primary-500"
    },
    github: {
      icon: "simple-icons:github",
      label: "GitHub",
      to: "https://github.com/idantitydotme",
      variant: "ghost",
      color: "neutral",
      class: "hover:text-primary-500"
    }
  }
})
