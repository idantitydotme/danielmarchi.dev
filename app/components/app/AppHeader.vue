<script setup lang="ts">
import type { NavigationMenuItem, ButtonProps } from "@nuxt/ui"

/* region Props */
/* endregion */

/* region Emits */
/* endregion */

/* region Slots */
/* endregion */

/* region Styles */
/* endregion */

/* region State */
const { t, locale, setLocale } = useI18n()
const localePath = useLocalePath()
const route = useRoute()

const open = ref(false)

const leftLinks = computed<NavigationMenuItem[]>(() => [
  {
    label: t("app.header.home"),
    to: localePath("/")
  },
  {
    label: t("app.header.projects"),
    to: localePath("/projects")
  },
  {
    label: t("app.header.blog"),
    to: localePath("/blog")
  },
  {
    label: t("app.header.about"),
    to: localePath("/about")
  }
])

const rightLinks = computed<NavigationMenuItem[]>(() => [
  {
    label: t("app.header.resume"),
    to: localePath("/resume")
  },
  {
    label: t("app.header.contact"),
    to: localePath("/contact")
  }
])

const socialLinks = computed<ButtonProps[]>(() => [
  {
    label: "LinkedIn",
    icon: "simple-icons:linkedin",
    to: "https://linkedin.com",
    class: "hover:text-primary-500"
  },
  {
    label: "GitHub",
    icon: "simple-icons:github",
    to: "https://github.com",
    class: "hover:text-primary-500"
  }
])
/* endregion */

/* region Meta */
/* endregion */

/* region Lifecycle */
watch(
  () => route.path,
  () => {
    open.value = false
  }
)
/* endregion */

/* region Logic */
/* endregion */
</script>

<template>
  <header class="px-sm fixed inset-x-0 top-2 z-50 mx-auto w-full max-w-(--ui-container) sm:top-4">
    <div
      class="bg-muted px-md py-xs border-muted flex w-full items-center justify-between rounded-full border shadow-lg shadow-neutral-950/5"
    >
      <!-- Left Section -->
      <div class="flex items-center">
        <ClientOnly>
          <USlideover
            v-model:open="open"
            side="left"
            :ui="{ content: 'w-2/3' }"
            :title="t('app.title')"
            :description="t('app.description')"
          >
            <UButton
              icon="lucide:menu"
              color="neutral"
              variant="ghost"
              class="my-auto rounded-full sm:hidden"
              aria-label="Open Menu"
            />
            <template #body>
              <div class="gap-md flex flex-col">
                <UNavigationMenu orientation="vertical" :items="[...leftLinks, ...rightLinks]" />
                <LazyUSeparator />
                <div class="gap-sm flex flex-col">
                  <UButton
                    v-for="link in socialLinks"
                    :key="link.name"
                    size="md"
                    color="neutral"
                    variant="ghost"
                    :icon="link.icon"
                    :label="link.label"
                    :to="link.to"
                    target="_blank"
                    :aria-label="link.name"
                    :class="link.class"
                  />
                </div>
              </div>
            </template>
          </USlideover>
        </ClientOnly>

        <div class="hidden items-center sm:flex">
          <UNavigationMenu :items="leftLinks" variant="link" />
        </div>
      </div>

      <!-- Right Section -->
      <div class="gap-sm flex items-stretch self-stretch">
        <div class="hidden items-center sm:flex">
          <UNavigationMenu :items="rightLinks" variant="link" />
        </div>

        <div class="flex items-stretch gap-1">
          <UColorModeButton size="sm" aria-label="Toggle color mode" />

          <ClientOnly>
            <USelectMenu
              :model-value="locale"
              @update:model-value="setLocale($event as 'en' | 'pt')"
              :items="[
                { code: 'en', name: 'English' },
                { code: 'pt', name: 'Português' }
              ]"
              value-key="code"
              label-key="name"
              icon="i-lucide-languages"
              variant="ghost"
              size="sm"
              class="h-full shrink-0"
              :ui="{
                value: 'hidden',
                content: 'w-48'
              }"
              :aria-label="t('app.header.languagePicker')"
            >
              <template #leading="{ modelValue }">
                <span class="text-xs font-medium">{{ modelValue === "pt" ? "PT" : "EN" }}</span>
              </template>
              <template #item-leading="{ item }">
                <span class="text-xs font-medium">{{ item.code.toUpperCase() }}</span>
              </template>
            </USelectMenu>
          </ClientOnly>

          <div class="gap-xs hidden items-center sm:flex">
            <UButton
              v-for="link in socialLinks"
              :key="link.name"
              size="md"
              color="neutral"
              variant="ghost"
              :icon="link.icon"
              :to="link.to"
              target="_blank"
              :aria-label="link.name"
              :class="link.class"
            />
          </div>
        </div>
      </div>
    </div>
  </header>
</template>
