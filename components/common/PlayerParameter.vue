<script setup lang="ts">
import { useParameterStore } from "@/stores/parameterStore";

const parameter = useParameterStore();

</script>

<template>
  <div>
    {{ parameter }}
  </div>
</template>