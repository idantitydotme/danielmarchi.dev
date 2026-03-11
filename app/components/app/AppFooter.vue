<script setup lang="ts">
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
        v-for="link in appConfig.socials"
        :key="link.label"
        size="md"
        :variant="link.variant"
        :color="link.color"
        :icon="link.icon"
        :to="link.to"
        target="_blank"
        :aria-label="link.label"
        :class="link.class"
      />
    </template>
  </UFooter>
</template>
