<template>
  <div>
    <section class="hero-gradient text-white py-16 text-center">
      <div class="container-main">
        <h1 class="heading-section text-white">Contactez-nous</h1>
        <p class="text-blue-100 mt-2">Notre équipe est là pour vous aider</p>
      </div>
    </section>

    <div class="container-main py-12">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div class="card p-8">
          <h2 class="text-2xl font-bold text-[var(--color-text)] mb-6">Envoyez un message</h2>
          <form @submit.prevent="submitForm" class="space-y-6">
            <div>
              <label class="label mb-2 block">Nom</label>
              <input v-model="form.name" type="text" class="input" required />
            </div>
            <div>
              <label class="label mb-2 block">Email</label>
              <input v-model="form.email" type="email" class="input" required />
            </div>
            <div>
              <label class="label mb-2 block">Message</label>
              <textarea v-model="form.message" rows="5" class="input resize-none" required></textarea>
            </div>
            <button type="submit" class="btn-primary w-full"><span><Send class="w-5 h-5" />Envoyer</span></button>
          </form>
        </div>

        <div class="space-y-6">
          <div class="card p-8">
            <h2 class="text-2xl font-bold text-[var(--color-text)] mb-6">Coordonnées</h2>
            <div class="space-y-6">
              <div class="flex items-start gap-4">
                <div class="w-12 h-12 rounded-xl bg-[var(--color-primary)]/10 flex items-center justify-center">
                  <Mail class="w-6 h-6 text-[var(--color-primary)]" />
                </div>
                <div>
                  <h3 class="font-medium text-[var(--color-text)]">Email</h3>
                  <a href="mailto:contact@tchadbox.com" class="text-[var(--color-primary)]">contact@tchadbox.com</a>
                </div>
              </div>
              <div class="flex items-start gap-4">
                <div class="w-12 h-12 rounded-xl bg-[var(--color-primary)]/10 flex items-center justify-center">
                  <Phone class="w-6 h-6 text-[var(--color-primary)]" />
                </div>
                <div>
                  <h3 class="font-medium text-[var(--color-text)]">WhatsApp</h3>
                  <a href="#" class="text-[var(--color-primary)]">+33 X XX XX XX XX</a>
                </div>
              </div>
              <div class="flex items-start gap-4">
                <div class="w-12 h-12 rounded-xl bg-[var(--color-primary)]/10 flex items-center justify-center">
                  <MapPin class="w-6 h-6 text-[var(--color-primary)]" />
                </div>
                <div>
                  <h3 class="font-medium text-[var(--color-text)]">Livraison</h3>
                  <p class="text-[var(--color-text-muted)]">N'Djamena, Tchad</p>
                </div>
              </div>
            </div>
          </div>
          <div class="card p-8">
            <h3 class="font-semibold text-[var(--color-text)] mb-4">Horaires</h3>
            <div class="space-y-2 text-[var(--color-text-secondary)]">
              <div class="flex justify-between"><span>Lun - Ven</span><span class="font-medium text-[var(--color-text)]">9h - 18h</span></div>
              <div class="flex justify-between"><span>Samedi</span><span class="font-medium text-[var(--color-text)]">10h - 14h</span></div>
              <div class="flex justify-between"><span>Dimanche</span><span class="font-medium text-[var(--color-text)]">Fermé</span></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Send, Mail, Phone, MapPin } from 'lucide-vue-next'

const toast = useToast()
const form = ref({ name: '', email: '', message: '' })

const submitForm = () => {
  toast.add({ title: 'Message envoyé !', description: 'Nous vous répondrons sous 24h.', icon: 'i-heroicons-check-circle', color: 'green' })
  form.value = { name: '', email: '', message: '' }
}

useHead({ title: 'Contact' })
</script>
