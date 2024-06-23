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
          <p class="text-subtitle-1 text-end">{{ `${parameter.HP} / ${parameter.maxHP}` }}</p>
          <v-progress-linear striped :model-value="parameter.HP / parameter.maxHP * 100" rounded color="red"
            height="10" />
        </div>
      </div>
      <v-card-text>
        <div class="d-flex parameters">
          <p>
            <v-icon color="red">mdi-heart</v-icon>
            <span class="text-red">
              {{ parameter.HP }}
            </span>
          </p>
          <p>
            <v-icon color="blue">mdi-sword</v-icon>
            <span class="text-blue">
              {{ parameter.power }}
            </span>
          </p>
          <p>
            <v-icon color="green">mdi-security</v-icon>
            <span class="text-green">
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