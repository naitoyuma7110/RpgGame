import { defineStore } from "pinia";
import { PlayerParameter } from "@/classes/parameter/parameter";

export const useParameterStore = defineStore("parameter", () => {
  const parameter = reactive(new PlayerParameter());

	return { ...toRefs(parameter) };
});
