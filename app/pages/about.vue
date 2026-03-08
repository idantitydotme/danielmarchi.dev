<script setup lang="ts">
/* region State */
const route = useRoute();
const { locale, t } = useI18n();
const { data: page } = await useAsyncData(
  route.path,
  async () => {
    const collection = `${locale.value}_pages` as any;
    return queryCollection(collection).path("/about").first();
  },
  { watch: [locale] },
);

if (!page.value) {
  throw createError({
    statusCode: 404,
    statusMessage: "Page not found",
    fatal: true,
  });
}

if (page.value?.ogImage) {
  defineOgImage(page.value.ogImage);
} else if (page.value?.image) {
  defineOgImage({ url: page.value.image });
}
useHead((page.value?.head || {}) as any);
/* endregion */

/* region Meta */
useSeoMeta({
  title: t("pages.about.meta.title"),
  description: t("pages.about.sections.hero.description"),
  ...(page.value?.seo || {}),
});
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
        links: 'justify-start',
      }"
    >
      <div class="flex flex-col sm:grid sm:grid-cols-3 gap-24">
        <div class="order-first sm:order-last sm:col-span-1 w-full aspect-square sm:rotate-4">
          <NuxtImg
            src="https://cdn.danielmarchi.dev/Images/Users/Avatars/Daniel-Marchi_0000_00.webp"
            alt="Daniel Marchi"
            width="80"
            height="80"
            fetchpriority="high"
            loading="eager"
            class="w-full h-full ring ring-default ring-offset-6 ring-offset-bg mx-auto rounded-lg"
          />
        </div>
        <MDC :value="page.content" unwrap="p" class="order-last sm:order-first sm:col-span-2" />
      </div>
    </UPageSection>
  </UPage>
</template>
