<script setup lang="ts">
const router = useRouter()
const route = useRoute()

if (route.path === '/') {
  router.push('/field')
}
</script>

<template>
  <NuxtLayout :name="'default'">
    <NuxtPage />
  </NuxtLayout>
</template>
