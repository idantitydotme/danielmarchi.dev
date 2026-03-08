<script setup lang="ts">
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
useSeoMeta({
  title: t("pages.about.meta.title"),
  description: t("pages.about.sections.hero.description"),
  ...(page.value?.seo || {}),
});

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
          <img
            src="https://placehold.co/400x400"
            alt="My profile picture"
            class="w-full h-full rounded-lg ring ring-default ring-offset-3 ring-offset-bg"
          />
        </div>
        <MDC :value="page.content" unwrap="p" class="order-last sm:order-first sm:col-span-2" />
      </div>
    </UPageSection>
  </UPage>
</template>
