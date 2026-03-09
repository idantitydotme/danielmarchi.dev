<script setup lang="ts">
/* region State */
const route = useRoute()
const { locale, t } = useI18n()
const localePath = useLocalePath()
const { data: page } = await useAsyncData(
  route.path,
  async () => {
    const collection = `${locale.value}_pages` as any
    return queryCollection(collection).path("/blog").first()
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
const { data: posts } = await useAsyncData(
  `blogs-${locale.value}`,
  async () => {
    const collection = `${locale.value}_blog` as any
    return queryCollection(collection).order("date", "DESC").all()
  },
  { watch: [locale] }
)
if (!posts.value) {
  throw createError({
    statusCode: 404,
    statusMessage: "blogs posts not found",
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
  title: t("pages.blog.meta.title"),
  description: t("pages.blog.sections.hero.description"),
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
      :title="t('pages.blog.sections.hero.title')"
      :description="t('pages.blog.sections.hero.description')"
      :links="page.links"
      :ui="{
        title: 'mx-0 text-left',
        description: 'mx-0 text-left',
        links: 'justify-start'
      }"
    >
      <UBlogPosts orientation="vertical">
        <UBlogPost
          v-for="(post, index) in posts"
          :key="index"
          variant="naked"
          orientation="horizontal"
          :to="post.path ? localePath(post.path) : undefined"
          v-bind="{
            ...post,
            image: post.image || undefined,
            author: post.author
              ? {
                  ...post.author,
                  avatar: post.author.avatar?.src ? post.author.avatar : undefined
                }
              : undefined
          }"
          :ui="{
            root: 'md:grid md:grid-cols-2 group overflow-visible transition-all duration-300',
            image:
              'group-hover/blog-post:scale-105 rounded-lg shadow-lg border-4 border-muted ring-2 ring-default',
            header:
              index % 2 === 0 ? 'sm:-rotate-1 overflow-visible' : 'sm:rotate-1 overflow-visible'
          }"
        />
      </UBlogPosts>
    </UPageSection>
  </UPage>
</template>
