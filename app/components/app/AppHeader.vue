<script setup lang="ts">
import type { NavigationMenuItem, ButtonProps } from "@nuxt/ui";

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
    to: localePath("/"),
  },
  {
    label: t("app.header.projects"),
    to: localePath("/projects"),
  },
  {
    label: t("app.header.blog"),
    to: localePath("/blog"),
  },
  {
    label: t("app.header.about"),
    to: localePath("/about"),
  },
])

const rightLinks = computed<NavigationMenuItem[]>(() => [
  {
    label: t("app.header.resume"),
    to: localePath("/resume"),
  },
  {
    label: t("app.header.contact"),
    to: localePath("/contact"),
  },
])

const socialLinks = computed<ButtonProps[]>(() => [
  {
    label: "LinkedIn",
    icon: "simple-icons:linkedin",
    to: "https://linkedin.com",
    class: "hover:text-primary-500",
  },
  {
    label: "GitHub",
    icon: "simple-icons:github",
    to: "https://github.com",
    class: "hover:text-primary-500",
  }
])
/* endregion */

/* region Meta */
/* endregion */

/* region Lifecycle */
watch(
  () => route.path,
  () => {
    open.value = false;
  },
)
/* endregion */

/* region Logic */
/* endregion */
</script>

<template>
  <header
    class="fixed top-2 sm:top-4 z-50 inset-x-0 mx-auto w-full max-w-(--ui-container) px-sm"
  >
      <div
        class="flex w-full items-center justify-between bg-muted rounded-full px-md py-xs border border-muted shadow-lg shadow-neutral-950/5"
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
                class="rounded-full my-auto sm:hidden"
                aria-label="Open Menu"
              />
              <template #body>
                <div class="flex flex-col gap-md">
                  <UNavigationMenu orientation="vertical" :items="[...leftLinks, ...rightLinks]"/>
                  <LazyUSeparator />
                  <div class="flex flex-col gap-sm">
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

          <div class="hidden sm:flex items-center">
            <UNavigationMenu
              :items="leftLinks"
              variant="link"
            />
          </div>
        </div>

        <!-- Right Section -->
        <div class="flex self-stretch items-stretch gap-sm">
          <div class="hidden sm:flex items-center">
            <UNavigationMenu
              :items="rightLinks"
              variant="link"
            />
          </div>

          <div class="flex items-stretch gap-1">
            <UColorModeButton size="sm" aria-label="Toggle color mode"/>

            <ClientOnly>
              <USelectMenu
                :model-value="locale"
                @update:model-value="setLocale($event as 'en' | 'pt')"
                :items="[
                  { code: 'en', name: 'English' },
                  { code: 'pt', name: 'Português' },
                ]"
                value-key="code"
                label-key="name"
                icon="i-lucide-languages"
                variant="ghost"
                size="sm"
                class="shrink-0 h-full"
                :ui="{
                  value: 'hidden',
                  content: 'w-48',
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

            <div class="hidden sm:flex items-center gap-xs">
              <UButton
                v-for="link in socialLinks"
                :key="link.name"
                size="sm"
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
