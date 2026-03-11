<script setup lang="ts">
import type { ButtonProps } from "@nuxt/ui"

/* region Props */
/* endregion */

/* region Emits */
/* endregion */

/* region Slots */
/* endregion */

/* region Styles */
/* endregion */

/* region State */
const appConfig = useAppConfig()

const socialLinks = computed(
  () => Object.values(appConfig.socials) as (ButtonProps & { class?: string })[]
)
/* endregion */

/* region Meta */
/* endregion */

/* region Lifecycle */
/* endregion */

/* region Logic */
/* endregion */
</script>

<template>
  <UFooter>
    <template #left>
      <p class="text-muted text-xs">© {{ new Date().getFullYear() }} Daniel Marchi</p>
    </template>

    <template #right>
      <UButton
        v-for="link in socialLinks"
        :key="link.label"
        size="md"
        :variant="link.variant"
        :color="link.color"
        :icon="link.icon"
        :to="link.to"
        :aria-label="link.label"
        :class="link.class"
      />
    </template>
  </UFooter>
</template>
