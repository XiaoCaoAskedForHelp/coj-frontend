<template>
  <Viewer :value="value" :plugins="plugins" />
</template>

<script setup lang="ts">
import gfm from "@bytemd/plugin-gfm";
import { defineProps, withDefaults } from "vue";
import highlight from "@bytemd/plugin-highlight";
import { Viewer } from "@bytemd/vue-next";

// 定义组件属性类型
interface Props {
  value: string;
}

const plugins = [gfm(), highlight()];

const props = withDefaults(defineProps<Props>(), {
  value: "",
});
</script>

<!--隐藏编辑器右侧的源代码按钮-->
<style>
.bytemd-toolbar-icon.bytemd-tippy.bytemd-tippy-right:last-child {
  display: none;
}
</style>
