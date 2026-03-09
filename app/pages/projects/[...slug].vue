<script setup lang="ts">
import type { ContentNavigationItem } from "@nuxt/content";
import { findPageHeadline } from "@nuxt/content/utils";

/* region State */
const route = useRoute();
const navigation = inject<Ref<ContentNavigationItem[]>>("navigation");

const { locale, t } = useI18n();
const localePath = useLocalePath();

const slug = computed(() => {
  const s = Array.isArray(route.params.slug) ? route.params.slug.join("/") : route.params.slug;
  return `/projects/${s}`;
});

const { data: page } = await useAsyncData(
  route.path,
  async () => {
    const collection = `${locale.value}_projects` as any;
    return queryCollection(collection).path(slug.value).first();
  },
  { watch: [locale] },
);

if (!page.value) {
  throw createError({ statusCode: 404, statusMessage: "Project not found", fatal: true });
}

const { data: surround } = await useAsyncData(
  `${route.path}-surround`,
  async () => {
    const collection = `${locale.value}_projects` as any;
    return queryCollectionItemSurroundings(collection, slug.value, {
      fields: ["description"],
    });
  },
  { watch: [locale] },
);

if (page.value?.ogImage) {
  defineOgImage(page.value.ogImage);
} else if (page.value?.image) {
  defineOgImage({ url: page.value.image });
}

useHead((page.value?.head || {}) as any);

const headline = computed(() => findPageHeadline(navigation?.value, page.value?.path));
/* endregion */

/* region Meta */
useSeoMeta((page.value?.seo || {}) as any);
/* endregion */

/* region Lifecycle */
/* endregion */

/* region Logic */
/* endregion */
</script>

<template>
  <UContainer class="pt-8 sm:pt-16 lg:pt-24">
    <UPage v-if="page">
      <UPageHeader
        :title="page.title"
        :description="page.description"
        :headline="headline"
        class="border-none"
      >
        <template #links>
          <UButton v-for="(link, index) in page.links" :key="index" v-bind="link" />
        </template>
      </UPageHeader>

      <UPageBody>
        <LazyNuxtImg
          v-if="page.image"
          :src="page.image"
          :alt="page.title"
          format="webp"
          preload
          class="w-full aspect-video object-cover rounded-2xl mb-12 shadow-2xl ring-1 ring-default"
        />

        <div class="flex flex-wrap items-center gap-3 mb-12">
          <UBadge v-for="tag in page.tags" :key="tag" variant="subtle" color="neutral" size="md">
            {{ tag }}
          </UBadge>
          <div class="h-4 w-px bg-default mx-2" />
          <span class="text-muted text-sm font-medium flex items-center">
            <UIcon name="i-lucide-calendar" class="mr-2 size-4" />
            {{
              new Date(page.date).toLocaleDateString(locale, { year: "numeric", month: "long" })
            }}
          </span>
        </div>

        <div class="max-w-none">
          <ContentRenderer
            v-if="page"
            :key="page.path"
            :value="page"
            class="prose prose-primary dark:prose-invert"
          />
        </div>

        <USeparator class="my-16" />

        <UContentSurround :surround="surround" />
      </UPageBody>

      <template #left>
        <UPageAside>
          <div class="flex flex-col gap-sm">
            <div class="text-sm font-semibold text-highlighted">
              {{ t("app.header.projects") }}
            </div>
            <UContentNavigation
              highlight
              :navigation="
                navigation?.find((item) => item.path === localePath('/projects'))?.children || []
              "
            />
          </div>
        </UPageAside>
      </template>

      <template v-if="page?.body?.toc?.links?.length" #right>
        <UPageAside>
          <UContentToc :links="page.body?.toc?.links" :ui="{ container: 'lg:py-0' }" />
        </UPageAside>
      </template>
    </UPage>
  </UContainer>
</template>
