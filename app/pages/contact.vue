<script setup lang="ts">
import { withoutTrailingSlash } from "ufo"

/* region State */
const route = useRoute()
const { locale, t } = useI18n()
const { data: page } = await useAsyncData(
  withoutTrailingSlash(route.path),
  async () => {
    const collection = `${locale.value}_contact` as any
    return queryCollection(collection).first()
  },
  { watch: [locale] }
)

if (!page.value) {
  throw createError({
    statusCode: 404,
    statusMessage: "Contact page not found",
    fatal: true
  })
}

if (page.value?.ogImage) {
  defineOgImage(page.value.ogImage)
} else if (page.value?.image) {
  defineOgImage({ url: page.value.image })
}
useHead((page.value?.head || {}) as any)
/* endregion */

/* region Meta */
useSeoMeta({
  title: page.value?.title || t("pages.contact.meta.title"),
  description: page.value?.description || t("pages.contact.sections.form.title"),
  ...page.value?.seo
})
/* endregion */

/* region Lifecycle */
/* endregion */

/* region Logic */
/* endregion */
</script>

<template>
  <UPage v-if="page" class="pt-18 sm:pt-24 lg:pt-32">
    <ContentRenderer :key="page.path" :value="page" />
  </UPage>
</template>
