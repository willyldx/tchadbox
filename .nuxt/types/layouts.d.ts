import type { ComputedRef, MaybeRef } from 'vue'

type ComponentProps<T> = T extends new(...args: any) => { $props: infer P } ? NonNullable<P>
  : T extends (props: infer P, ...args: any) => any ? P
  : {}

declare module 'nuxt/app' {
  interface NuxtLayouts {
    admin: ComponentProps<typeof import("C:/Users/adoum/Desktop/Free Project/tchadbox/layouts/admin.vue").default>,
    default: ComponentProps<typeof import("C:/Users/adoum/Desktop/Free Project/tchadbox/layouts/default.vue").default>,
    livreur: ComponentProps<typeof import("C:/Users/adoum/Desktop/Free Project/tchadbox/layouts/livreur.vue").default>,
}
  export type LayoutKey = keyof NuxtLayouts extends never ? string : keyof NuxtLayouts
  interface PageMeta {
    layout?: MaybeRef<LayoutKey | false> | ComputedRef<LayoutKey | false>
  }
}