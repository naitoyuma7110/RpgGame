<script setup lang="ts">
import { type FieldObject } from '@/classes/field/field';
const fieldObject: FieldObject = useAttrs().fieldObject as FieldObject
</script>

<template>
  <img :src="fieldObject.fieldViewImagePath" />
</template>
<style>
img {
  width: 30px;
  height: 30px;
  object-fit: cover;
}
</style>
