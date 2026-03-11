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
const { socials } = useAppConfig()
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
        v-for="link in socials"
        :key="link.label"
        v-bind="{ ...link, label: undefined }"
        size="md"
        color="neutral"
        variant="ghost"
        class="hover:text-primary-500"
        :aria-label="link.label"
      />
    </template>
  </UFooter>
</template>
