<script setup lang="ts">
/* region State */
const { t, rt, locale } = useI18n();
const localePath = useLocalePath();

const testimonialItems = computed(() => [
  {
    quote: t("pages.home.sections.testimonials.items[0].quote"),
    author: {
      name: t("pages.home.sections.testimonials.items[0].author.name"),
      description: t("pages.home.sections.testimonials.items[0].author.description"),
    },
  },
  {
    quote: t("pages.home.sections.testimonials.items[1].quote"),
    author: {
      name: t("pages.home.sections.testimonials.items[1].author.name"),
      description: t("pages.home.sections.testimonials.items[1].author.description"),
    },
  },
]);

const faqItems = computed(() => [
  {
    label: t("pages.home.sections.faq.categories[0].title"),
    value: "services",
    questions: [
      {
        label: t("pages.home.sections.faq.categories[0].questions[0].label"),
        content: t("pages.home.sections.faq.categories[0].questions[0].content"),
      },
      {
        label: t("pages.home.sections.faq.categories[0].questions[1].label"),
        content: t("pages.home.sections.faq.categories[0].questions[1].content"),
      },
    ],
  },
  {
    label: t("pages.home.sections.faq.categories[1].title"),
    value: "technical",
    questions: [
      {
        label: t("pages.home.sections.faq.categories[1].questions[0].label"),
        content: t("pages.home.sections.faq.categories[1].questions[0].content"),
      },
      {
        label: t("pages.home.sections.faq.categories[1].questions[1].label"),
        content: t("pages.home.sections.faq.categories[1].questions[1].content"),
      },
    ],
  },
]);

const { data: posts } = await useAsyncData(
  `index-blogs-${locale.value}`,
  () => {
    const collection = `${locale.value}_blog` as any;
    return queryCollection(collection).order("date", "DESC").limit(3).all();
  },
  { watch: [locale] },
);
/* endregion */

/* region Meta */
useSeoMeta({
  title: t("pages.home.meta.title"),
  description: t("pages.home.meta.description"),
});
/* endregion */

/* region Lifecycle */
/* endregion */

/* region Logic */
/* endregion */
</script>

<template>
  <UPage>
    <!-- Hero Section -->
    <UPageHero
      :title="t('pages.home.sections.hero.title')"
      :description="t('pages.home.sections.hero.description')"
      :ui="{ headline: 'flex justify-center' }"
    >
      <template #headline>
        <NuxtImg
          src="https://cdn.danielmarchi.dev/Images/Users/Avatars/Daniel-Marchi_0000_00.webp"
          alt="Daniel Marchi"
          width="80"
          height="80"
          format="webp"
          fetchpriority="high"
          loading="eager"
          preload
          class="ring ring-default ring-offset-6 ring-offset-bg mx-auto rounded-full"
        />
      </template>

      <template #links>
        <div class="flex flex-col items-center gap-md">
          <UButton
            :label="t('pages.home.sections.hero.actions.talk')"
            :to="localePath('/contact')"
            color="primary"
            variant="solid"
            size="lg"
          />
        </div>
      </template>
    </UPageHero>

    <!-- About Section -->
    <UPageSection
      :title="t('pages.home.sections.about.title')"
      :description="t('pages.home.sections.about.description')"
      :ui="{
        title: 'text-left text-xl sm:text-xl lg:text-2xl font-medium',
        description: 'text-left mt-m3 text-sm sm:text-md lg:text-sm text-muted',
      }"
    />

    <!-- Blog Section -->
    <UPageSection
      v-if="posts"
      :title="t('pages.home.sections.blog.title')"
      :description="t('pages.home.sections.blog.description')"
      :ui="{
        title: 'text-left text-xl sm:text-xl lg:text-2xl font-medium',
        description: 'text-left text-sm sm:text-md lg:text-sm text-muted',
      }"
    >
      <UBlogPosts orientation="vertical">
        <UBlogPost
          v-for="(post, index) in posts"
          :key="index"
          orientation="horizontal"
          variant="naked"
          v-bind="{
            ...post,
            image: post.image || undefined,
            author: post.author
              ? {
                  ...post.author,
                  avatar: post.author.avatar?.src ? post.author.avatar : undefined,
                }
              : undefined,
          }"
          :to="post.path ? localePath(post.path) : undefined"
          :ui="{
            root: 'group relative lg:items-start lg:flex ring-0 hover:ring-0',
            body: '!px-0',
            header: 'hidden',
          }"
        >
          <template #footer>
            <UButton
              size="xs"
              variant="link"
              :label="t('pages.home.sections.blog.readMore')"
              class="px-0 gap-0"
            >
              <template #trailing>
                <UIcon
                  name="lucide:arrow-right"
                  class="size-2 text-primary transition-all opacity-0 group-hover:translate-x-1 group-hover:opacity-100"
                />
              </template>
            </UButton>
          </template>
        </UBlogPost>
      </UBlogPosts>
    </UPageSection>

    <!-- Testimonials Section -->
    <UPageSection
      v-if="testimonialItems.length"
      :ui="{
        container: 'px-0 !pt-0',
      }"
    >
      <ClientOnly>
        <UCarousel
          v-slot="{ item }"
          :items="testimonialItems"
          :autoplay="{ delay: 4000 }"
          loop
          dots
          :ui="{
            viewport: '-mx-4 sm:-mx-12 lg:-mx-16 max-w-(--ui-container)',
          }"
        >
          <UPageCTA
            variant="naked"
            class="rounded-none w-full"
            :ui="{
              container: 'sm:py-12 lg:py-12 sm:gap-10',
            }"
          >
            <template #description>
              <div class="flex flex-col items-center gap-md text-center">
                <UIcon name="lucide:quote" class="size-8 text-dimmed rotate-180" />
                <p class="text-xl text-balance italic text-highlighted">
                  {{ rt(item.quote) }}
                </p>
                <UIcon name="lucide:quote" class="size-8 text-dimmed" />
              </div>
            </template>
            <UUser
              v-if="item && item.author"
              :name="rt(item.author.name)"
              :description="rt(item.author.description)"
              size="xl"
              class="justify-center"
            />
          </UPageCTA>
        </UCarousel>
      </ClientOnly>
    </UPageSection>

    <!-- FAQ Section -->
    <ClientOnly>
      <UPageSection
        :title="t('pages.home.sections.faq.title')"
        :description="t('pages.home.sections.faq.description')"
        :ui="{
          container: 'px-0 !pt-0 gap-md sm:gap-md',
          title: 'text-center text-xl sm:text-xl lg:text-2xl font-medium',
          description: 'text-center text-sm sm:text-md lg:text-sm text-muted',
        }"
      >
        <UContainer>
          <UTabs
            :items="faqItems"
            orientation="horizontal"
            :ui="{
              root: 'flex items-center gap-md w-full',
              list: 'relative flex bg-transparent dark:bg-transparent gap-sm px-0',
              indicator:
                'absolute top-[4px] duration-200 ease-out focus:outline-none rounded-lg bg-elevated/60',
              trigger:
                'px-3 py-2 rounded-lg hover:bg-muted/50 data-[state=active]:text-highlighted data-[state=inactive]:text-muted',
              label: 'truncate',
            }"
          >
            <template #content="{ item }">
              <LazyUAccordion
                trailing-icon="lucide:plus"
                :items="item.questions"
                :unmount-on-hide="false"
                :ui="{
                  item: 'border-none',
                  content: 'data-[state=open]:animate-none data-[state=closed]:animate-none',
                  trigger:
                    'mb-2 border-0 group px-4 transform-gpu rounded-lg bg-elevated/60 will-change-transform hover:bg-muted/50 text-base',
                  trailingIcon:
                    'group-data-[state=closed]:rotate-0 group-data-[state=open]:rotate-135 text-base text-muted',
                }"
              >
                <template #body="{ item: _item }">
                  <LazyMDC v-if="_item.content" :value="_item.content" unwrap="p" class="px-4" />
                </template>
              </LazyUAccordion>
            </template>
          </UTabs>
        </UContainer>
      </UPageSection>
    </ClientOnly>

    <!-- Post CTA -->
    <UPageCTA
      :title="t('pages.contact.sections.form.title')"
      :description="t('pages.contact.sections.hero.description')"
      variant="naked"
    >
      <template #links>
        <div class="flex flex-col items-center gap-sm">
          <UButton
            :label="t('pages.home.sections.hero.actions.talk')"
            :to="localePath('/contact')"
            color="primary"
            variant="solid"
            size="lg"
          />
        </div>
      </template>
    </UPageCTA>
  </UPage>
</template>
