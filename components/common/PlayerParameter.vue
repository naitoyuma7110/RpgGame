<script setup lang="ts">
import { useParameterStore } from "@/stores/parameterStore";

const parameter = useParameterStore();

</script>

<template>
  <div>
    <p>{{ parameter.level }}</p>
    <p>{{ parameter.name }}</p>
    <p>{{ parameter.HP }}/{{ parameter.maxHP }}</p>
    <p>{{ parameter.power }}</p>

  </div>
</template>