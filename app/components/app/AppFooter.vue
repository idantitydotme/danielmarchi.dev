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
const socialLinks = [
  {
    name: "LinkedIn",
    icon: "simple-icons:linkedin",
    to: "https://linkedin.com",
    class: "hover:text-primary-500",
  },
  {
    name: "GitHub",
    icon: "simple-icons:github",
    to: "https://github.com",
  },
];
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
    </template>
  </UFooter>
</template>

