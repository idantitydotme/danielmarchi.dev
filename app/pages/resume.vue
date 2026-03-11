<script setup lang="ts">
import type { ButtonProps } from "@nuxt/ui"

/* region State */
const { t, rt } = useI18n()
const localePath = useLocalePath()
const { socials } = useAppConfig()

const age = computed(() => {
  const dob = new Date(1997, 3, 30)
  const today = new Date()
  return (
    today.getFullYear() -
    dob.getFullYear() -
    (today < new Date(today.getFullYear(), dob.getMonth(), dob.getDate()) ? 1 : 0)
  )
})

const portugueseProgress = ref(100)
const englishProgress = ref(100)
const spanishProgress = ref(25)
const romanianProgress = ref(5)

const getLanguageLevel = (progress: number) => {
  if (progress >= 75) return t("pages.resume.sections.languages.levels.native")
  if (progress >= 50) return t("pages.resume.sections.languages.levels.professional")
  if (progress >= 25) return t("pages.resume.sections.languages.levels.basic")
  return t("pages.resume.sections.languages.levels.learning")
}

const languages = computed(() => [
  {
    name: t("pages.resume.sections.languages.items.portuguese"),
    level: getLanguageLevel(portugueseProgress.value),
    progress: portugueseProgress.value
  },
  {
    name: t("pages.resume.sections.languages.items.english"),
    level: getLanguageLevel(englishProgress.value),
    progress: englishProgress.value
  },
  {
    name: t("pages.resume.sections.languages.items.spanish"),
    level: getLanguageLevel(spanishProgress.value),
    progress: spanishProgress.value
  },
  {
    name: t("pages.resume.sections.languages.items.romanian"),
    level: getLanguageLevel(romanianProgress.value),
    progress: romanianProgress.value
  }
])

const heroLinks = computed<ButtonProps[]>(() => [
  {
    label: t("pages.resume.sections.hero.actions.hire"),
    to: localePath("/contact"),
    color: "primary",
    variant: "solid"
  },
  {
    label: t("pages.resume.sections.hero.actions.downloadCv"),
    icon: "lucide:download",
    to: "https://cdn.danielmarchi.dev/Files/Resume.pdf",
    target: "_blank",
    color: "primary",
    variant: "outline"
  }
])

const educationItems = computed(() => [
  {
    degree: t("pages.resume.sections.education.items[0].degree"),
    school: t("pages.resume.sections.education.items[0].school"),
    period: t("pages.resume.sections.education.items[0].period")
  }
])

const certificationItems = computed(() => [
  {
    name: t("pages.resume.sections.certifications.items[0].name"),
    issuer: t("pages.resume.sections.certifications.items[0].issuer"),
    date: t("pages.resume.sections.certifications.items[0].date")
  },
  {
    name: t("pages.resume.sections.certifications.items[1].name"),
    issuer: t("pages.resume.sections.certifications.items[1].issuer"),
    date: t("pages.resume.sections.certifications.items[1].date")
  }
])
const volunteeringItems = computed(() => [
  {
    role: t("pages.resume.sections.volunteering.items[0].role"),
    organization: t("pages.resume.sections.volunteering.items[0].organization"),
    period: t("pages.resume.sections.volunteering.items[0].period"),
    field: t("pages.resume.sections.volunteering.items[0].field")
  }
])

const experienceItems = computed(() => [
  {
    role: t("pages.resume.sections.experience.items[0].role"),
    company: t("pages.resume.sections.experience.items[0].company"),
    period: t("pages.resume.sections.experience.items[0].period"),
    bullets: [
      t("pages.resume.sections.experience.items[0].bullets[0]"),
      t("pages.resume.sections.experience.items[0].bullets[1]")
    ]
  },
  {
    role: t("pages.resume.sections.experience.items[1].role"),
    company: t("pages.resume.sections.experience.items[1].company"),
    period: t("pages.resume.sections.experience.items[1].period"),
    bullets: [
      t("pages.resume.sections.experience.items[1].bullets[0]"),
      t("pages.resume.sections.experience.items[1].bullets[1]")
    ]
  },
  {
    role: t("pages.resume.sections.experience.items[2].role"),
    company: t("pages.resume.sections.experience.items[2].company"),
    period: t("pages.resume.sections.experience.items[2].period"),
    bullets: [
      t("pages.resume.sections.experience.items[2].bullets[0]"),
      t("pages.resume.sections.experience.items[2].bullets[1]")
    ]
  },
  {
    role: t("pages.resume.sections.experience.items[3].role"),
    company: t("pages.resume.sections.experience.items[3].company"),
    period: t("pages.resume.sections.experience.items[3].period"),
    bullets: [
      t("pages.resume.sections.experience.items[3].bullets[0]"),
      t("pages.resume.sections.experience.items[3].bullets[1]")
    ]
  }
])
/* endregion */

/* region Meta */
useSeoMeta({
  title: t("pages.resume.meta.title"),
  description: t("pages.resume.sections.hero.description")
})
/* endregion */

/* region Lifecycle */
/* endregion */

/* region Logic */
/* endregion */
</script>

<template>
  <UContainer class="pt-24 sm:pt-32 lg:pt-40">
    <UPage :ui="{ root: 'flex flex-col gap-y-8 lg:grid lg:grid-cols-10 lg:gap-10' }">
      <UPageHero
        :title="t('pages.resume.sections.hero.title')"
        :description="t('pages.resume.sections.hero.description')"
        orientation="horizontal"
        :links="heroLinks"
        :ui="{
          title: 'text-highlighted',
          description: 'text-muted',
          container: 'px-0 max-w-none py-16 sm:py-24'
        }"
      >
        <NuxtImg
          src="/Images/Users/Avatars/Daniel-Marchi_0000_00.webp"
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

      <UPageSection
        :title="t('pages.resume.sections.skills.title')"
        :ui="{
          title: 'text-left text-xl sm:text-2xl lg:text-3xl',
          container: 'px-0 max-w-none gap-md sm:gap-md py-4 sm:py-6 lg:py-8'
        }"
      >
        <!-- Empty for now -->
      </UPageSection>

      <UPageSection
        :title="t('pages.resume.sections.tech.title')"
        :ui="{
          title: 'text-left text-xl sm:text-2xl lg:text-3xl',
          container: 'px-0 max-w-none gap-md sm:gap-md py-4 sm:py-6 lg:py-8'
        }"
      >
        <div class="gap-lg grid grid-cols-2">
          <div class="gap-md flex flex-col">
            <h5 class="text-highlighted">{{ t("pages.resume.sections.tech.categories.audio") }}</h5>
            <ul class="gap-xs flex flex-col">
              <li>
                <UButton
                  block
                  variant="ghost"
                  color="neutral"
                  icon="simple-icons:vuedotjs"
                  to="https://vuejs.org/"
                  target="_blank"
                  class="hover:text-primary-500 justify-start"
                >
                  Vue.js
                </UButton>
              </li>
              <li>
                <UButton
                  block
                  variant="ghost"
                  color="neutral"
                  icon="simple-icons:nuxtdotjs"
                  to="https://nuxt.com/"
                  target="_blank"
                  class="hover:text-primary-500 justify-start"
                >
                  Nuxt
                </UButton>
              </li>
            </ul>
          </div>
          <div class="gap-md flex flex-col">
            <h5 class="text-highlighted">{{ t("pages.resume.sections.tech.categories.video") }}</h5>
            <ul class="gap-xs flex flex-col">
              <li>
                <UButton
                  block
                  variant="ghost"
                  color="neutral"
                  icon="simple-icons:bun"
                  to="https://bun.sh/"
                  target="_blank"
                  class="hover:text-primary-500 justify-start"
                >
                  Bun
                </UButton>
              </li>
              <li>
                <UButton
                  block
                  variant="ghost"
                  color="neutral"
                  icon="simple-icons:tailwindcss"
                  to="https://tailwindcss.com/"
                  target="_blank"
                  class="hover:text-primary-500 justify-start"
                >
                  Tailwind CSS
                </UButton>
              </li>
            </ul>
          </div>
        </div>
      </UPageSection>

      <UPageSection
        :title="t('pages.resume.sections.education.title')"
        :ui="{
          title: 'text-left text-xl sm:text-2xl lg:text-3xl',
          container: 'px-0 max-w-none gap-md sm:gap-md py-4 sm:py-6 lg:py-8'
        }"
      >
        <div v-for="(item, index) in educationItems" :key="index">
          <div class="gap-xs flex flex-col">
            <h3 class="text-highlighted">{{ rt(item.degree) }}</h3>
            <span class="text-muted text-sm">{{ rt(item.school) }}</span>
            <span class="text-muted/80 text-xs">{{ rt(item.period) }}</span>
          </div>
        </div>
      </UPageSection>

      <UPageSection
        :title="t('pages.resume.sections.experience.title')"
        :ui="{
          title: 'text-left text-xl sm:text-2xl lg:text-3xl',
          container: 'px-0 max-w-none gap-md sm:gap-md py-4 sm:py-6 lg:py-8'
        }"
      >
        <div v-for="(item, index) in experienceItems" :key="index">
          <div class="gap-xs flex flex-col">
            <h3 class="text-highlighted">{{ rt(item.role) }}</h3>
            <span class="text-muted text-sm">{{ rt(item.company) }}</span>
            <span class="text-muted/80 text-xs">{{ rt(item.period) }}</span>
            <ul
              v-if="item.bullets && Array.isArray(item.bullets)"
              class="text-highlighted list-inside list-disc"
            >
              <li v-for="(bullet, bIndex) in item.bullets" :key="bIndex">
                <span class="text-highlighted">{{ rt(bullet) }}</span>
              </li>
            </ul>
          </div>
        </div>
      </UPageSection>

      <UPageSection
        v-if="certificationItems.length"
        :title="t('pages.resume.sections.certifications.title')"
        :ui="{
          title: 'text-left text-xl sm:text-2xl lg:text-3xl',
          container: 'px-0 max-w-none gap-md sm:gap-md py-4 sm:py-6 lg:py-8'
        }"
      >
        <div v-for="(item, index) in certificationItems" :key="index">
          <div class="gap-xs flex flex-col">
            <h3 class="text-highlighted">{{ rt(item.name) }}</h3>
            <span class="text-muted text-sm">{{ rt(item.issuer) }}</span>
            <span class="text-muted/80 text-xs">{{ rt(item.date) }}</span>
          </div>
        </div>
      </UPageSection>

      <UPageSection
        v-if="volunteeringItems.length"
        :title="t('pages.resume.sections.volunteering.title')"
        :ui="{
          title: 'text-left text-xl sm:text-2xl lg:text-3xl',
          container: 'px-0 max-w-none gap-md sm:gap-md py-4 sm:py-6 lg:py-8'
        }"
      >
        <div v-for="(item, index) in volunteeringItems" :key="index">
          <div class="gap-xs flex flex-col">
            <h3 class="text-highlighted">{{ rt(item.role) }}</h3>
            <span class="text-muted text-sm">{{ rt(item.organization) }}</span>
            <span class="text-muted/80 text-xs">{{ rt(item.period) }}</span>
            <span v-if="item.field" class="text-muted/60 text-xs italic">{{ rt(item.field) }}</span>
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
                src="/Images/Users/Avatars/Daniel-Marchi_0000_00.webp"
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
              <UFieldGroup class="gap-xs pdf-exclude">
                <UButton
                  v-for="link in socials"
                  :key="link.label"
                  v-bind="link"
                  color="neutral"
                  variant="ghost"
                  class="hover:text-primary-500"
                  :aria-label="link.label"
                />
              </UFieldGroup>
              <UButton
                block
                variant="ghost"
                color="neutral"
                icon="lucide:map-pin"
                to="https://en.wikipedia.org/wiki/Curitiba"
                target="_blank"
                class="hover:text-primary-500 h-auto gap-2 text-left"
                :label="t('pages.resume.sections.sidebar.location')"
                :ui="{ label: 'whitespace-normal text-balance' }"
              />
              <UButton
                block
                color="success"
                variant="ghost"
                :to="localePath('/contact')"
                class="pdf-exclude h-auto gap-2 text-left"
                :label="t('pages.resume.sections.sidebar.availability')"
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
            <div class="gap-sm flex flex-col">
              <div class="gap-md flex flex-row items-center">
                <UIcon name="lucide:user" size="xs" />
                <h5 class="text-highlighted">{{ t("pages.resume.sections.about.title") }}</h5>
              </div>
              <USeparator />
              <ul class="text-neutral-900 dark:text-neutral-100">
                <li>
                  <span class="text-sm"
                    ><strong>{{ t("pages.resume.sections.about.fields.name") }}</strong>
                    {{ t("pages.resume.sections.about.fields.nameValue") }}</span
                  >
                </li>
                <li>
                  <span class="text-sm"
                    ><strong>{{ t("pages.resume.sections.about.fields.gender") }}</strong>
                    {{ t("pages.resume.sections.about.fields.genderValue") }}</span
                  >
                </li>
                <li>
                  <span class="text-sm"
                    ><strong>{{ t("pages.resume.sections.about.fields.pronouns") }}</strong>
                    {{ t("pages.resume.sections.about.fields.pronounsValue") }}</span
                  >
                </li>
                <li>
                  <span class="text-sm"
                    ><strong>{{ t("pages.resume.sections.about.fields.nationality") }}</strong>
                    {{ t("pages.resume.sections.about.fields.nationalityValue") }}</span
                  >
                </li>
                <li>
                  <span class="text-sm"
                    ><strong>{{ t("pages.resume.sections.about.fields.age") }}</strong>
                    {{ age }}</span
                  >
                </li>
              </ul>
            </div>
            <div class="gap-sm flex flex-col">
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

<style scoped></style>
