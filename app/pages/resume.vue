<script setup lang="ts">
import { withoutTrailingSlash } from "ufo"

/* region State */
const route = useRoute()
const { locale, t } = useI18n()
const localePath = useLocalePath()
const { socials } = useAppConfig()

const { data: page } = await useAsyncData(
  withoutTrailingSlash(route.path),
  async () => {
    const collection = `${locale.value}_resume` as any
    return queryCollection(collection).first()
  },
  { watch: [locale] }
)

if (!page.value) {
  throw createError({
    statusCode: 404,
    statusMessage: "Resume page not found",
    fatal: true
  })
}

const age = computed(() => {
  if (!page.value?.sidebar?.dateOfBirth) return 0
  const dob = new Date(page.value.sidebar.dateOfBirth)
  const today = new Date()
  return (
    today.getFullYear() -
    dob.getFullYear() -
    (today < new Date(today.getFullYear(), dob.getMonth(), dob.getDate()) ? 1 : 0)
  )
})

const getLanguageLevel = (progress: number) => {
  if (progress >= 75) return t("pages.resume.sections.languages.levels.native")
  if (progress >= 50) return t("pages.resume.sections.languages.levels.professional")
  if (progress >= 25) return t("pages.resume.sections.languages.levels.basic")
  return t("pages.resume.sections.languages.levels.learning")
}

const languages = computed(() => {
  return (page.value?.sidebar?.languages || []).map((lang: { name: string; progress: number }) => ({
    ...lang,
    level: getLanguageLevel(lang.progress)
  }))
})

if (page.value?.ogImage?.component || page.value?.ogImage?.url) {
  defineOgImage(page.value.ogImage)
} else if ((page.value as any)?.image) {
  defineOgImage({ url: (page.value as any).image })
}
useHead((page.value?.head || {}) as any)
/* endregion */

/* region Meta */
useSeoMeta({
  title: page.value?.title || t("pages.resume.meta.title"),
  description: page.value?.description || t("pages.resume.sections.hero.description"),
  ...page.value?.seo
})
/* endregion */

/* region Lifecycle */
/* endregion */

/* region Logic */
/* endregion */
</script>

<template>
  <UContainer v-if="page" class="pt-24 sm:pt-32 lg:pt-40">
    <UPage :ui="{ root: 'flex flex-col gap-y-8 lg:grid lg:grid-cols-10 lg:gap-10' }">
      <!-- 1. HERO -->
      <UPageHero
        v-if="page.hero"
        :title="page.hero.title"
        :description="page.hero.description"
        orientation="horizontal"
        :links="page.hero.links"
        :ui="{
          title: 'text-highlighted',
          description: 'text-muted',
          container: 'px-0 max-w-none py-16 sm:py-24'
        }"
      >
        <NuxtImg
          :src="page.hero.image || '/Images/Users/Avatars/Daniel-Marchi_0000_00.webp'"
          alt="Daniel Marchi"
          width="512"
          height="512"
          format="webp"
          fetchpriority="high"
          loading="eager"
          preload
          class="ring-default ring-offset-bg mx-auto w-full rounded-full object-cover ring ring-offset-6"
        />
      </UPageHero>

      <!-- 2. SKILLS (MDC) -->
      <UPageSection
        v-if="page.skills"
        :title="t('pages.resume.sections.skills.title')"
        :ui="{
          title: 'text-left text-xl sm:text-2xl lg:text-3xl',
          container: 'px-0 max-w-none gap-md sm:gap-md py-4 sm:py-6 lg:py-8'
        }"
      >
        <MDC :value="page.skills" unwrap="p" class="text-highlighted" />
      </UPageSection>

      <!-- 3. TECH -->
      <UPageSection
        v-if="page.tech?.length"
        :title="t('pages.resume.sections.tech.title')"
        :ui="{
          title: 'text-left text-xl sm:text-2xl lg:text-3xl',
          container: 'px-0 max-w-none gap-md sm:gap-md py-4 sm:py-6 lg:py-8'
        }"
      >
        <div class="gap-lg grid grid-cols-2">
          <div v-for="category in page.tech" :key="category.title" class="gap-md flex flex-col">
            <h5 class="text-highlighted">{{ category.title }}</h5>
            <ul class="gap-xs flex flex-col">
              <li v-for="item in category.items" :key="item.label">
                <UButton
                  v-bind="item"
                  block
                  variant="ghost"
                  color="neutral"
                  class="hover:text-primary-500 justify-start"
                />
              </li>
            </ul>
          </div>
        </div>
      </UPageSection>

      <!-- 4. EDUCATION -->
      <UPageSection
        v-if="page.education?.length"
        :title="t('pages.resume.sections.education.title')"
        :ui="{
          title: 'text-left text-xl sm:text-2xl lg:text-3xl',
          container: 'px-0 max-w-none gap-md sm:gap-md py-4 sm:py-6 lg:py-8'
        }"
      >
        <div v-for="(item, index) in page.education" :key="index">
          <div class="gap-xs flex flex-col">
            <h3 class="text-highlighted">{{ item.degree }}</h3>
            <span class="text-muted text-sm">{{ item.school }}</span>
            <span class="text-muted/80 text-xs">{{ item.period }}</span>
          </div>
        </div>
      </UPageSection>

      <!-- 5. EXPERIENCE -->
      <UPageSection
        v-if="page.experience?.length"
        :title="t('pages.resume.sections.experience.title')"
        :ui="{
          title: 'text-left text-xl sm:text-2xl lg:text-3xl',
          container: 'px-0 max-w-none gap-md sm:gap-md py-4 sm:py-6 lg:py-8'
        }"
      >
        <div v-for="(item, index) in page.experience" :key="index">
          <div class="gap-xs flex flex-col">
            <h3 class="text-highlighted">{{ item.role }}</h3>
            <span class="text-muted text-sm">{{ item.company }}</span>
            <span class="text-muted/80 text-xs">{{ item.period }}</span>
            <ul v-if="item.bullets?.length" class="text-highlighted list-inside list-disc">
              <li v-for="(bullet, bIndex) in item.bullets" :key="bIndex">
                <span class="text-highlighted">{{ bullet }}</span>
              </li>
            </ul>
          </div>
        </div>
      </UPageSection>

      <!-- 6. CERTIFICATIONS -->
      <UPageSection
        v-if="page.certifications?.length"
        :title="t('pages.resume.sections.certifications.title')"
        :ui="{
          title: 'text-left text-xl sm:text-2xl lg:text-3xl',
          container: 'px-0 max-w-none gap-md sm:gap-md py-4 sm:py-6 lg:py-8'
        }"
      >
        <div v-for="(item, index) in page.certifications" :key="index">
          <div class="gap-xs flex flex-col">
            <h3 class="text-highlighted">{{ item.name }}</h3>
            <span class="text-muted text-sm">{{ item.issuer }}</span>
            <span class="text-muted/80 text-xs">{{ item.date }}</span>
          </div>
        </div>
      </UPageSection>

      <!-- 7. VOLUNTEERING -->
      <UPageSection
        v-if="page.volunteering?.length"
        :title="t('pages.resume.sections.volunteering.title')"
        :ui="{
          title: 'text-left text-xl sm:text-2xl lg:text-3xl',
          container: 'px-0 max-w-none gap-md sm:gap-md py-4 sm:py-6 lg:py-8'
        }"
      >
        <div v-for="(item, index) in page.volunteering" :key="index">
          <div class="gap-xs flex flex-col">
            <h3 class="text-highlighted">{{ item.role }}</h3>
            <span class="text-muted text-sm">{{ item.organization }}</span>
            <span class="text-muted/80 text-xs">{{ item.period }}</span>
            <span v-if="item.field" class="text-muted/60 text-xs italic">{{ item.field }}</span>
          </div>
        </div>
      </UPageSection>

      <template #left>
        <UPageAside
          :ui="{
            root: 'block overflow-y-auto lg:max-h-[calc(100vh-var(--ui-header-height))] lg:sticky lg:top-(--ui-header-height) pt-16 lg:pt-24 pb-8 lg:ps-4 lg:-ms-4 lg:pe-6.5'
          }"
        >
          <div class="gap-lg flex flex-col">
            <div class="gap-sm flex flex-col items-center justify-center">
              <NuxtImg
                :src="page.sidebar?.image || '/Images/Users/Avatars/Daniel-Marchi_0000_00.webp'"
                alt="Daniel Marchi"
                width="96"
                height="96"
                format="webp"
                fetchpriority="high"
                loading="eager"
                preload
                class="ring-default ring-offset-bg mx-auto rounded-full ring ring-offset-6"
              />
              <h3 class="text-highlighted text-center font-bold">Daniel Marchi</h3>
              <div class="gap-xs pdf-exclude flex items-center">
                <UButton
                  v-for="link in socials"
                  :key="link.label"
                  v-bind="{ ...link, label: undefined }"
                  color="neutral"
                  variant="ghost"
                  class="hover:text-primary-500"
                  :aria-label="link.label"
                />
              </div>
              <UButton
                v-if="page.sidebar?.location"
                block
                variant="ghost"
                color="neutral"
                icon="lucide:map-pin"
                :to="page.sidebar.locationLink || 'https://en.wikipedia.org/wiki/Curitiba'"
                target="_blank"
                class="hover:text-primary-500 h-auto gap-2 text-left"
                :label="page.sidebar.location"
                :ui="{ label: 'whitespace-normal text-balance' }"
              />
              <UButton
                v-if="page.sidebar?.availability"
                block
                color="success"
                variant="ghost"
                :to="localePath('/contact')"
                class="pdf-exclude h-auto gap-2 text-left"
                :label="page.sidebar.availability"
                :ui="{ label: 'whitespace-normal text-balance' }"
              >
                <template #leading>
                  <span class="relative flex size-2">
                    <span
                      class="bg-success absolute inline-flex size-full animate-ping rounded-full opacity-75"
                    />
                    <span class="bg-success relative inline-flex size-2 scale-90 rounded-full" />
                  </span>
                </template>
              </UButton>
            </div>

            <div v-if="page.sidebar?.about" class="gap-sm flex flex-col">
              <div class="gap-md flex flex-row items-center">
                <UIcon name="lucide:user" size="xs" />
                <h5 class="text-highlighted">{{ page.sidebar.about.title }}</h5>
              </div>
              <USeparator />
              <ul class="text-neutral-900 dark:text-neutral-100">
                <li v-for="field in page.sidebar.about.fields" :key="field.label">
                  <span class="text-sm">
                    <strong>{{ field.label }}</strong>
                    {{ field.value }}
                  </span>
                </li>
                <li>
                  <span class="text-sm">
                    <strong>{{ t("pages.resume.sections.about.fields.age") }}</strong>
                    {{ age }}
                  </span>
                </li>
              </ul>
            </div>

            <div v-if="languages.length" class="gap-sm flex flex-col">
              <div class="gap-md flex flex-row items-center">
                <UIcon name="lucide:languages" size="xs" />
                <h5 class="text-highlighted">{{ t("pages.resume.sections.languages.title") }}</h5>
              </div>
              <USeparator />
              <ul class="gap-md flex flex-col">
                <li v-for="lang in languages" :key="lang.name">
                  <div class="gap-xs flex flex-col">
                    <div class="flex w-full flex-row justify-between">
                      <h6 class="text-highlighted text-sm">{{ lang.name }}</h6>
                      <span class="text-muted text-xs">{{ lang.level }}</span>
                    </div>
                    <UProgress :model-value="lang.progress" size="sm" />
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </UPageAside>
      </template>
    </UPage>
  </UContainer>
</template>
