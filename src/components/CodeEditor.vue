<template>
  <div
    id="code-editor"
    ref="codeEidtorRef"
    :style="{ height: editorHeight }"
  ></div>
</template>

<script lang="ts" setup>
import * as monaco from "monaco-editor";
import { onMounted, ref, toRaw, watch } from "vue";
import { defineProps, withDefaults } from "vue/dist/vue";

const codeEidtorRef = ref();
const codeEditor = ref();

interface Props {
  value: string;
  editorHeight: string;
  language?: string;
  handleChange: (v: string) => void;
}

const props = withDefaults(defineProps<Props>(), {
  value: "",
  editorHeight: "400px",
  language: "java",
  handleChange: (v: string) => {
    console.log(v);
  },
});

watch([() => props.language], (newValue) => {
  // console.log(props.language);
  if (!codeEditor.value) return;
  monaco.editor.setModelLanguage(
    toRaw(codeEditor.value).getModel(),
    props.language!
  );
});

onMounted(() => {
  if (!codeEidtorRef.value) return;
  codeEditor.value = monaco.editor.create(codeEidtorRef.value, {
    value: props.value,
    language: props.language,
    automaticLayout: true,
    minimap: {
      enabled: true,
    },
    lineNumbers: "on",
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
