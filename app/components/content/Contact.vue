<script setup lang="ts">
import type { Collections } from "@nuxt/content"
import { z } from "zod"

/* region Props */
export interface ContactItem {
  icon: string
  label: string
  value: string
}

export interface ContactProps {
  contactItems?: ContactItem[]
  recipientEmail?: string
}

const { contactItems, recipientEmail } = defineProps<ContactProps>()
/* endregion */

/* region Emits */
/* endregion */

/* region Slots */
/* endregion */

/* region Styles */
/* endregion */

/* region State */
const { t, locale } = useI18n()
const route = useRoute()
const toast = useToast()
const { socials } = useAppConfig()

// Fetch page data as fallback if props are not provided (MDC context)
const { data: pageData } = await useAsyncData(
  `contact-data-${route.path}-${locale.value}`,
  async () => {
    // Try the specific contact collection first
    const contactCollection = `${locale.value}_contact` as keyof Collections
    const content = await queryCollection(contactCollection).path(route.path).first()

    if (content) return content

    // Fallback to pages collection
    const pagesCollection = `${locale.value}_pages` as keyof Collections
    return await queryCollection(pagesCollection).path(route.path).first()
  }
)

const contactFormSchema = z.object({
  name: z.string().min(2, t("pages.contact.sections.form.fields.name.error")),
  email: z.string().email(t("pages.contact.sections.form.fields.email.error")),
  message: z.string().min(10, t("pages.contact.sections.form.fields.message.error"))
})

const state = ref({
  name: "",
  email: "",
  message: ""
})

const isLoading = ref(false)

const contactInfo = computed(() => {
  // 1. Check explicit props (from MDC block parameters)
  const rawItemsFromProps = contactItems ?? []
  const itemsFromProps = Array.isArray(rawItemsFromProps)
    ? rawItemsFromProps.filter((i) => i && typeof i === "object" && i.icon && i.label && i.value)
    : []
  if (itemsFromProps.length > 0) return itemsFromProps

  // 2. Check page metadata (from Studio/Frontmatter)
  const rawItemsFromPage = (pageData.value as any)?.contactItems ?? []
  const itemsFromPage = Array.isArray(rawItemsFromPage)
    ? rawItemsFromPage.filter(
        (i: any) => i && typeof i === "object" && i.icon && i.label && i.value
      )
    : []
  if (itemsFromPage.length > 0) return itemsFromPage

  // 3. Ultimate fallback to i18n
  return [
    {
      icon: "lucide:mail",
      label: t("pages.contact.sections.details.email"),
      value: t("pages.contact.sections.details.emailValue")
    },
    {
      icon: "simple-icons:whatsapp",
      label: t("pages.contact.sections.details.whatsapp"),
      value: t("pages.contact.sections.details.whatsappValue")
    }
  ]
})
/* endregion */

/* region Meta */
/* endregion */

/* region Lifecycle */
/* endregion */

/* region Logic */
async function onSubmit() {
  isLoading.value = true

  const { name, email, message } = state.value
  const targetEmail =
    recipientEmail ||
    (pageData.value as any)?.recipientEmail ||
    t("pages.contact.sections.details.emailValue")
  const subject = encodeURIComponent(`Contact from ${name}`)
  const body = encodeURIComponent(`${message}\n\n---\nFrom: ${name}\nEmail: ${email}`)

  window.location.href = `mailto:${targetEmail}?subject=${subject}&body=${body}`

  isLoading.value = false
  toast.add({
    color: "success",
    title: t("pages.contact.sections.form.success.title"),
    description: t("pages.contact.sections.form.success.description")
  })

  state.value.name = ""
  state.value.email = ""
  state.value.message = ""
}
/* endregion */
</script>

<template>
  <UPageSection>
    <template #title>
      <slot name="title" />
    </template>
    <template #description>
      <slot name="description" />
    </template>

    <div class="flex flex-col gap-12 lg:flex-row lg:items-start lg:gap-16">
      <!-- Details Section (Mobile First) -->
      <div class="order-first flex flex-col gap-8 lg:order-last lg:w-[calc(40%-4rem)]">
        <h3 class="text-2xl font-semibold">{{ t("pages.contact.sections.details.title") }}</h3>
        <div class="space-y-8">
          <ul class="space-y-6">
            <li v-for="(item, index) in contactInfo" :key="index" class="flex items-start">
              <UIcon :name="item.icon" class="text-primary mr-3 h-6 w-6 shrink-0" />
              <div>
                <h4 class="font-medium">
                  {{ item.label }}
                </h4>
                <p class="text-muted">
                  {{ item.value }}
                </p>
              </div>
            </li>
          </ul>

          <USeparator />

          <div class="flex flex-col gap-4">
            <h4 class="text-sm font-medium">
              {{ t("pages.contact.sections.details.socials") }}
            </h4>
            <div class="flex flex-row flex-wrap gap-2">
              <UButton
                v-for="link in socials"
                :key="link.label"
                v-bind="{ ...link, label: undefined }"
                size="xl"
                color="neutral"
                variant="ghost"
                class="hover:text-primary-500"
                :aria-label="link.label"
              />
            </div>
          </div>
        </div>
      </div>

      <!-- Form Section -->
      <div class="flex flex-col gap-8 lg:w-3/5">
        <h3 class="text-2xl font-semibold">{{ t("pages.contact.sections.form.title") }}</h3>

        <UForm
          :schema="contactFormSchema"
          :state="state"
          class="flex flex-col gap-6"
          @submit="onSubmit"
        >
          <UFormField
            :label="t('pages.contact.sections.form.fields.name.label')"
            name="name"
            required
          >
            <UInput
              v-model="state.name"
              icon="lucide:user"
              :placeholder="t('pages.contact.sections.form.fields.name.placeholder')"
              class="w-full"
            />
          </UFormField>

          <UFormField
            :label="t('pages.contact.sections.form.fields.email.label')"
            name="email"
            required
            class="w-full"
          >
            <UInput
              v-model="state.email"
              icon="lucide:mail"
              :placeholder="t('pages.contact.sections.form.fields.email.placeholder')"
              type="email"
              class="w-full"
            />
          </UFormField>

          <UFormField
            :label="t('pages.contact.sections.form.fields.message.label')"
            name="message"
            required
            class="w-full"
          >
            <UTextarea
              v-model="state.message"
              :placeholder="t('pages.contact.sections.form.fields.message.placeholder')"
              :rows="8"
              class="w-full"
            />
          </UFormField>

          <UButton
            type="submit"
            :loading="isLoading"
            icon="lucide:send"
            size="lg"
            block
            class="mt-2"
          >
            {{ t("pages.contact.sections.form.fields.submit") }}
          </UButton>
        </UForm>
      </div>
    </div>
  </UPageSection>
</template>

<style scoped></style>

<style scoped></style>
