<script setup lang="ts">
import { Field } from '@/classes/field/field';
import { FieldPlayer } from '@/classes/field/character/fieldCharacter';

const field = reactive<Field>(new Field())

const playerPosition = {
  x: 0,
  y: 0
}
const player = reactive<FieldPlayer>(new FieldPlayer(playerPosition))

field.addFieldCharacter(player)

const renderField = ref(field.getRenderField());

watch(player, () => {
  renderField.value = field.getRenderField()
});

</script>

<template>
  <div class="field">
    <div class="field-row" v-for="(row, y)  in renderField" :key="y">
      <span class="field-col" v-for="(fieldObject, x) in row" :key="`${y}-${x}`">
        <FieldBlock :fieldObject="fieldObject"></FieldBlock>
      </span>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.field {

  &-row {
    display: flex;
    margin: 0 auto;
  }

  &-col {
    width: 30px;
    height: 30px;
    border: 1px solid #CCC;
  }
}
</style>