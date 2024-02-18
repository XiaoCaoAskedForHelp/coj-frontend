<template>
  <div id="code-editor" ref="codeEidtorRef" style="height: 400px"></div>
</template>

<script lang="ts" setup>
import * as monaco from "monaco-editor";
import { onMounted, ref, toRaw } from "vue";
import { defineProps, withDefaults } from "vue/dist/vue";

const codeEidtorRef = ref();
const codeEditor = ref();

interface Props {
  value: string;
  handleChange: (v: string) => void;
}

const props = withDefaults(defineProps<Props>(), {
  value: "",
  handleChange: (v: string) => {
    console.log(v);
  },
});

onMounted(() => {
  if (!codeEidtorRef.value) return;
  codeEditor.value = monaco.editor.create(codeEidtorRef.value, {
    value: props.value,
    language: "java",
    automaticLayout: true,
    minimap: {
      enabled: true,
    },
    lineNumbers: "off",
    roundedSelection: false,
    scrollBeyondLastLine: false,
    readOnly: false,
    theme: "vs-dark",
    colorDecorators: true,
  });

  codeEditor.value.onDidChangeModelContent(() => {
    props.handleChange(toRaw(codeEditor.value).getValue());
  });
});
</script>

<style scoped></style>
