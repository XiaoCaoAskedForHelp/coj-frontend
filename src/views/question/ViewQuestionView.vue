<template>
  <div id="viewQuestionView">
    <a-row :gutter="[24, 24]">
      <a-col :md="12" :xs="24">
        <a-tabs default-active-key="question">
          <a-tab-pane key="question" title="题目">
            <a-card v-if="question">
              <template #title>
                <h2>题目：{{ question.title }}</h2>
              </template>
              <template #extra>
                <a-link>提示：请注意时间限制</a-link>
              </template>
              <MdViewer :value="question.content || ''" />
              <a-space wrap>
                <a-tag color="blue" bordered> 标签（题目类型）：</a-tag>
                <a-tag
                  v-for="(tag, index) of question.tags"
                  :key="index"
                  color="green"
                >
                  {{ tag }}
                </a-tag>
              </a-space>
              <a-descriptions
                size="large"
                title="题目限制"
                layout="inline-vertical"
                bordered
                :column="{ xs: 1, md: 3 }"
              >
                <a-descriptions-item label="时间限制">
                  {{ question.judgeConfig.timeLimit }} ms
                </a-descriptions-item>
                <a-descriptions-item label="内存限制">
                  {{ question.judgeConfig.memoryLimit }} KB
                </a-descriptions-item>
                <a-descriptions-item label="堆栈限制">
                  {{ question.judgeConfig.stackLimit }} KB
                </a-descriptions-item>
              </a-descriptions>
            </a-card>
          </a-tab-pane>
          <a-tab-pane key="comment" title="评论" disabled> 评论</a-tab-pane>
          <a-tab-pane key="answer" title="题解"> 答案</a-tab-pane>
        </a-tabs>
      </a-col>
      <a-col :md="12" :xs="24">
        <a-form :model="form" layout="inline" style="min-width: 240px">
          <a-form-item field="language" label="编程语言">
            <a-select
              :style="{ width: '150px' }"
              placeholder="选择编程语言"
              v-model="form.language"
            >
              <a-option>java</a-option>
              <a-option>cpp</a-option>
              <a-option>go</a-option>
              <a-option>csharp</a-option>
              <a-option>html</a-option>
            </a-select>
          </a-form-item>
        </a-form>
        <CodeEditor
          editor-height="700px"
          :language="form.language"
          :value="form.code"
          :handle-change="onCodeChange"
        />
        <a-divider size="0" />
        <div style="text-align: right">
          <a-button
            type="primary"
            style="min-width: 200px; margin-right: 0"
            @click="doSubmit()"
          >
            提交
          </a-button>
        </div>
      </a-col>
    </a-row>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { QuestionVO } from "../../../generated/models/QuestionVO";
import { QuestionControllerService } from "../../../generated/services/QuestionControllerService";
import { defineProps, withDefaults } from "vue";
import message from "@arco-design/web-vue/es/message";
import CodeEditor from "@/components/CodeEditor.vue";
import MdViewer from "@/components/MdViewer.vue";
import { QuestionSubmitControllerService } from "../../../generated/services/QuestionSubmitControllerService";

const question = ref<QuestionVO>();

interface Props {
  id: number;
}

const props = withDefaults(defineProps<Props>(), {
  id: 0,
});

const loadData = async () => {
  console.log(props.id);
  const res = await QuestionControllerService.getQuestionVoByIdUsingGet(
    props.id
  );
  if (res.code === 0) {
    question.value = res.data;
  } else {
    message.error("获取题目详情失败！" + res.message);
  }
};

onMounted(() => {
  loadData();
});

const form = ref({
  code: "",
  language: "java",
});

const onCodeChange = (v: string) => {
  form.value.code = v;
};

const doSubmit = async () => {
  if (!question.value) {
    message.error("题目不存在！");
    return;
  }
  if (form.value.code === "") {
    message.error("代码不能为空！");
    return;
  }
  const res = await QuestionSubmitControllerService.doQuestionSubmitUsingPost({
    questionId: props.id,
    code: form.value.code,
    language: form.value.language,
  });
  if (res.code === 0) {
    message.success("提交成功！");
  } else {
    message.error("提交失败！" + res.message);
  }
};
</script>

<style scoped>
#viewQuestionView {
  max-width: 1400px;
  margin: 0 auto;
}
</style>
