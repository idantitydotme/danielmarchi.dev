<script setup lang="ts">
import { withLeadingSlash } from "ufo";
import type { Collections } from "@nuxt/content";

const route = useRoute();
const { locale, t } = useI18n();
const slug = computed(() =>
  Array.isArray(route.params.slug)
    ? withLeadingSlash(String(route.params.slug.join("/")))
    : withLeadingSlash(String(route.params.slug)),
);

const { data: page } = await useAsyncData(
  "page-" + slug.value,
  async () => {
    // Build collection name based on current locale
    const collection = `${locale.value}_pages` as keyof Collections;
    const content = await queryCollection(collection).path(slug.value).first();

    // Optional: fallback to default locale if content is missing
    if (!content && locale.value !== "en") {
      return await queryCollection("en_pages").path(slug.value).first();
    }

    return content;
  },
  {
    watch: [locale], // Refetch when locale changes
  },
);

if (page.value?.ogImage) {
  defineOgImage(page.value.ogImage);
} else if ((page.value as any)?.image) {
  defineOgImage({ url: (page.value as any).image });
}

useHead((page.value?.head || {}) as any);
useSeoMeta((page.value?.seo || {}) as any);

/* region State */
/* endregion */

/* region Meta */
/* endregion */

/* region Lifecycle */
/* endregion */

/* region Logic */
/* endregion */
</script>

<template>
  <ContentRenderer v-if="page" :value="page" />
  <UError v-else :error="{ statusCode: 404, message: t('pages.global.errors.notFound') }" />
</template>
