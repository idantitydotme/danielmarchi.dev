<script setup lang="ts">
import type { NuxtError } from "#app";

export interface ErrorProps {
  error: NuxtError
}

const { error} = defineProps<ErrorProps>();


const { t, locale } = useI18n();
const localePath = useLocalePath();

const searchLinks = computed(() => [
  {
    label: t("app.header.home"),
    icon: "i-lucide-home",
    to: localePath("/"),
  },
  {
    label: t("app.header.projects"),
    icon: "i-lucide-folder",
    to: localePath("/projects"),
  },
  {
    label: t("app.header.resume"),
    icon: "i-lucide-layout",
    to: localePath("/resume"),
  },
  {
    label: t("app.header.blog"),
    icon: "i-lucide-file-text",
    to: localePath("/blog"),
  },
  {
    label: t("app.header.about"),
    icon: "i-lucide-user",
    to: localePath("/about"),
  },
  {
    label: t("app.header.contact"),
    icon: "i-lucide-mail",
    to: localePath("/contact"),
  },
]);

useHead({
  htmlAttrs: {
    lang: locale.value,
  },
});

useSeoMeta({
  title: "Page not found",
  description: "We are sorry but this page could not be found.",
});

const [{ data: navigation }, { data: files }] = await Promise.all([
  useAsyncData(
    `navigation-${locale.value}`,
    async () => {
      const blogCollection = `${locale.value}_blog` as any;
      const projectsCollection = `${locale.value}_projects` as any;
      const [blogNavRaw, projectsNavRaw] = await Promise.all([
        queryCollectionNavigation(blogCollection),
        queryCollectionNavigation(projectsCollection),
      ]);

      const blogNav = blogNavRaw?.[0]?.path === "/blog" ? blogNavRaw[0].children : blogNavRaw;
      const projectsNav =
        projectsNavRaw?.[0]?.path === "/projects" ? projectsNavRaw[0].children : projectsNavRaw;

      return [
        {
          path: localePath("/blog"),
          title: t("app.header.blog"),
          children: blogNav,
        },
        {
          path: localePath("/projects"),
          title: t("app.header.projects"),
          children: projectsNav,
        },
      ];
    },
    { watch: [locale] },
  ),
  useLazyAsyncData(
    `search-${locale.value}`,
    () => {
      const collection = `${locale.value}_blog` as any;
      return queryCollectionSearchSections(collection);
    },
    {
      server: false,
      watch: [locale],
    },
  ),
]);
</script>

<template>
  <div>
    <TPAppHeader />

    <UMain>
      <UContainer>
        <UPage>
          <UError :error="error" />
        </UPage>
      </UContainer>
    </UMain>

    <TPAppFooter />

    <ClientOnly>
      <LazyUContentSearch
        :files="files"
        shortcut="meta_k"
        :navigation="navigation"
        :links="searchLinks"
        :fuse="{ resultLimit: 42 }"
      />
    </ClientOnly>

    <UToaster />
  </div>
</template>
