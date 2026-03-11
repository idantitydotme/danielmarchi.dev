<script setup lang="ts">
import type { Collections } from "@nuxt/content"
import { withLeadingSlash, withoutTrailingSlash } from "ufo"

/* region State */
const route = useRoute()
const { locale, t } = useI18n()
const slug = computed(() =>
  withoutTrailingSlash(
    Array.isArray(route.params.slug)
      ? withLeadingSlash(String(route.params.slug.join("/")))
      : withLeadingSlash(String(route.params.slug))
  )
)

const { data: page } = await useAsyncData(
  `page-${locale.value}-${slug.value.replace(/\//g, "-")}`,
  async () => {
    // Build collection name based on current locale
    const collection = `${locale.value}_pages` as keyof Collections
    const content = await queryCollection(collection).path(slug.value).first()

    // Optional: fallback to default locale if content is missing
    if (!content && locale.value !== "en") {
      return await queryCollection("en_pages").path(slug.value).first()
    }

    return content
  },
  {
    watch: [locale] // Refetch when locale changes
  }
)

if (page.value?.ogImage?.component || page.value?.ogImage?.url) {
  defineOgImage(page.value.ogImage)
} else if ((page.value as any)?.image) {
  defineOgImage({ url: (page.value as any).image })
}

useHead((page.value?.head || {}) as any)
/* endregion */

/* region Meta */
useSeoMeta((page.value?.seo || {}) as any)
/* endregion */

/* region Lifecycle */
/* endregion */

/* region Logic */
/* endregion */
</script>

<template>
  <div class="pt-18 sm:pt-24 lg:pt-32">
    <ContentRenderer v-if="page" :key="page.path" :value="page" />
    <UError v-else :error="{ status: 404, message: t('pages.global.errors.notFound') }" />
  </div>
</template>
