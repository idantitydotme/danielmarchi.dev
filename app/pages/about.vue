<script setup lang="ts">
/* region State */
const route = useRoute()
const { locale, t } = useI18n()
const { data: page } = await useAsyncData(
  route.path,
  async () => {
    const collection = `${locale.value}_pages` as any
    return queryCollection(collection).path("/about").first()
  },
  { watch: [locale] }
)

if (!page.value) {
  throw createError({
    statusCode: 404,
    statusMessage: "Page not found",
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
  title: t("pages.about.meta.title"),
  description: t("pages.about.sections.hero.description"),
  ...page.value?.seo
})
/* endregion */

/* region Lifecycle */
/* endregion */

/* region Logic */
/* endregion */
</script>

<template>
  <UPage v-if="page">
    <UPageSection
      :title="t('pages.about.sections.hero.title')"
      :description="t('pages.about.sections.hero.description')"
      orientation="vertical"
      :ui="{
        title: 'mx-0 text-left',
        description: 'mx-0 text-left',
        links: 'justify-start'
      }"
    >
      <div class="flex flex-col gap-24 sm:grid sm:grid-cols-3">
        <div class="order-first aspect-square w-full sm:order-last sm:col-span-1 sm:rotate-4">
          <NuxtImg
            src="/Images/Users/Avatars/Daniel-Marchi_0000_00.webp"
            alt="Daniel Marchi"
            width="80"
            height="80"
            format="webp"
            fetchpriority="high"
            loading="eager"
            preload
            class="ring-default ring-offset-bg mx-auto h-full w-full rounded-lg ring ring-offset-6"
          />
        </div>
        <MDC :value="page.content" unwrap="p" class="order-last sm:order-first sm:col-span-2" />
      </div>
    </UPageSection>
  </UPage>
</template>
