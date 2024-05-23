import { ref, computed } from "vue";
import { defineStore } from "pinia";
import { PlayerParameter } from "@/classes/parameter/parameter";

// counter-storeの定義
export const useParameterStore = defineStore("parameter", () => {
	// 管理対象の値
	const parameter = ref(new PlayerParameter());

	return { parameter };
});
