<template>
  <div class="home">
    <CodeEditor :value="codeValue" :handle-change="handleCodeChange" />
    <MdEditor :value="mdValue" :handle-change="handleMdChange" />
  </div>
</template>

<script lang="ts" setup>
import MdEditor from "@/components/MdEditor.vue";
import { ref } from "vue";
import CodeEditor from "@/components/CodeEditor.vue";

const codeValue = ref("");
const mdValue = ref("");
const handleMdChange = (v: string) => {
  mdValue.value = v;
};
const handleCodeChange = (v: string) => {
  codeValue.value = v;
};
</script>

<style scoped></style>
