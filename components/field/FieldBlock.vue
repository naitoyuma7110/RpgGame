<script setup lang="ts">
const props = defineProps(['fieldObject'])
const { fieldObject } = toRefs(props)
</script>

<template>
  <img v-if="fieldObject" :src="fieldObject.fieldViewImagePath" />
</template>
<style>
img {
  width: 30px;
  height: 30px;
  object-fit: cover;
}
</style>
