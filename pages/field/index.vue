<script setup lang="ts">
import { Field } from '@/classes/field/field';
import { FieldPlayer } from '@/classes/field/character/fieldCharacter';
import type { Delta } from '@/types/util';
import { FieldEnemySlow, FieldEnemyFast } from '@/classes/field/character/fieldCharacter';

const field = reactive<Field>(new Field())

const playerPosition = {
  x: 1,
  y: 1
}
const enemyPosition = {
  x: 19,
  y: 19
}
const enemyPosition2 = {
  x: 1,
  y: 19
}

const player = reactive(new FieldPlayer(playerPosition))
const enemy = reactive(new FieldEnemySlow(enemyPosition))
const enemy2 = reactive(new FieldEnemyFast(enemyPosition2))
field.addFieldCharacter(player)
field.addFieldCharacter(enemy)
field.addFieldCharacter(enemy2)


const handlePlayerMove = (delta: Delta) => {
  player.move(delta)
  enemy.move(player.fieldPosition)
  enemy2.move(player.fieldPosition)
  field.collisionEventOccur()
  field.updateRenderField()
}

const handleKeyPress = (event: KeyboardEvent) => {
  switch (event.key) {
    case "ArrowUp":
      handlePlayerMove({
        x: 0,
        y: -1
      });
      break;
    case "ArrowDown":
      handlePlayerMove({
        x: 0,
        y: 1
      });
      break;
    case "ArrowLeft":
      handlePlayerMove({
        x: -1,
        y: 0
      });
      break;
    case "ArrowRight":
      handlePlayerMove({
        x: 1,
        y: 0
      });
      break;
  }
}
onMounted(() => {
  document.addEventListener("keydown", handleKeyPress);
})

</script>

<template>

  <div class="d-flex pa-10">
    <dir class="me-10">
      <div class="field player-field">
        <div class="field-row" v-for="(row, y)  in field.staticField" :key="y">
          <span class="field-col" v-for="(fieldObject, x) in row" :key="`${y}-${x}`">
            <FieldBlock :fieldObject="fieldObject" />
          </span>
        </div>
      </div>
      <div class="field">
        <div class="field-row" v-for="(row, y)  in field.activeField" :key="y">
          <span class="field-col" v-for="(fieldObject, x) in row" :key="`${y}-${x}`">
            <FieldBlock :fieldObject="fieldObject" />
          </span>
        </div>
      </div>
    </dir>
    <div class="w-25 ms-5 d-flex flex-column">
      <div class="mt-auto py-5">
        <div class="d-flex">
          <div class="d-flex align-center justify-center">
            <v-btn icon="mdi-arrow-left-bold-outline" v-on:click="handlePlayerMove({
              x: -1,
              y: 0
            })"></v-btn>
            <div class="d-flex flex-column">
              <v-btn class="mb-2" icon="mdi-arrow-up-bold-outline" v-on:click="handlePlayerMove({
                x: 0,
                y: -1
              })"></v-btn>
              <v-btn class="mt-2" icon="mdi-arrow-down-bold-outline" v-on:click="handlePlayerMove({
                x: 0,
                y: 1
              })"></v-btn>
            </div>
            <v-btn icon="mdi-arrow-right-bold-outline" v-on:click="handlePlayerMove({
              x: 1,
              y: 0
            })"></v-btn>
          </div>
          <div class="d-flex flex-column align-center mt-5 ms-5">
            <div>
              <v-btn class="mb-2" icon="mdi-rotate-right" v-on:click="console.log('HELLO')"></v-btn>
            </div>
            <div>
              <v-btn class="mx-2" icon="mdi-check-circle-outline" v-on:click="console.log('HELLO')"></v-btn>
              <v-btn class="mx-2" icon="mdi-food-takeout-box-outline" v-on:click="console.log('HELLO')"></v-btn>
            </div>
          </div>
        </div>
      </div>
      <div class="d-flex w-25 me-5">
        <div class="text-center">
          <div class="d-flex mx-4">
            <v-icon icon="mdi-arrow-left-bold-box-outline" size="x-large"></v-icon>
            <v-icon icon="mdi-arrow-down-bold-box-outline" size="x-large"></v-icon>
            <v-icon icon="mdi-arrow-right-bold-box-outline" size="x-large"></v-icon>
          </div>
          <span>移動</span>
        </div>
        <div class="text-center">
          <div class="mx-4">
            <p class="key-icon">SHIFT</p>
          </div>
          <span>ストック</span>
        </div>
        <div class="text-center">
          <div class="mx-4">
            <p class="key-icon">SPACE</p>
          </div>
          <span>回転</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.field {
  position: relative;

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

.player-field {
  position: absolute;
}
</style>