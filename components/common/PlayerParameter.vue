<script setup lang="ts">
import { useParameterStore } from "@/stores/parameterStore";

const parameter = useParameterStore();

</script>

<template>

  <v-col>
    <v-card width="400" class="pa-">
      <div class="d-flex pa-1">
        <v-avatar size="50">
          <v-img :src="parameter.image" position="0 -5px" />
        </v-avatar>
        <div class="ml-2">
          <p class="text-h6">{{ parameter.name }}</p>
          <p class="text-subtitle-2">LV: {{ parameter.level }}</p>
        </div>
        <div class="flex-grow-1 mb-2 d-flex flex-column justify-end">
          <p class="text-subtitle-1 text-end">{{ `${parameter.HP}/ ${parameter.maxHP}` }}</p>
          <v-progress-linear :max="parameter.HP" :min="parameter.maxHP" :model-value="parameter.HP" rounded color="red"
            height="10" />
        </div>
      </div>
      <v-card-text>
        <div class="d-flex parameters">
          <p>
            <v-icon color="grey">mdi-heart</v-icon>
            <span>
              {{ parameter.HP }}
            </span>
          </p>
          <p>
            <v-icon color="grey">mdi-sword</v-icon>
            <span>
              {{ parameter.power }}
            </span>
          </p>
          <p>
            <v-icon color="grey">mdi-security</v-icon>
            <span>
              {{ parameter.defense }}
            </span>
          </p>
        </div>
      </v-card-text>
    </v-card>
  </v-col>
</template>

<style lang="scss" scoped>
.parameters {
  p {
    display: flex;
    margin-right: 10px;
  }

  span {
    font-size: 15px;
  }
}
</style>