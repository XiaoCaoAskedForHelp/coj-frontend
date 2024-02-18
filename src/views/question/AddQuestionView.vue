<template>
  <div id="addQuestionView">
    <h2>创建题目</h2>
    <a-form
      :model="form"
      style="margin: auto; width: 70%"
      @submit="handleSubmit()"
      label-align="left"
      auto-label-width
    >
      <a-form-item field="title" label="标题" class="inputBase">
        <a-input v-model="form.title" placeholder="请输入标题" />
      </a-form-item>
      <a-form-item field="answer" label="标签" class="inputBase">
        <a-input-tag v-model="form.tags" placeholder="请输入标签" allow-clear />
      </a-form-item>
      <a-form-item field="content" label="题目内容">
        <MdEditor
          class="editor"
          :value="form.content"
          :handle-change="onContentChange"
        />
      </a-form-item>
      <a-form-item field="answer" label="答案">
        <MdEditor
          class="editor"
          :value="form.answer"
          :handle-change="onAnswerChange"
        />
      </a-form-item>
      <a-form-item label="判题配置" :content-flex="false" :merge-props="false">
        <a-space direction="vertical" fill class="inputBase">
          <a-form-item
            field="judgeConfig.timeLimit"
            validate-trigger="input"
            :rules="[{ required: true, message: '请输入时间消耗' }]"
            label="时间限制"
          >
            <a-input-number
              v-model="form.judgeConfig.timeLimit"
              placeholder="请输入时间消耗"
              model-event="input"
              mode="button"
              size="large"
              min="0"
            />
          </a-form-item>
          <a-form-item
            field="judgeConfig.memoryLimit"
            validate-trigger="input"
            :rules="[{ required: true, message: '请输入内存消耗' }]"
            label="内存限制"
          >
            <a-input-number
              v-model="form.judgeConfig.memoryLimit"
              placeholder="请输入内存消耗"
              model-event="input"
              mode="button"
              size="large"
              min="0"
            />
          </a-form-item>
          <a-form-item
            field="judgeConfig.stackLimit"
            validate-trigger="input"
            :rules="[{ required: true, message: '请输入栈消耗' }]"
            label="堆栈限制"
          >
            <a-input-number
              v-model="form.judgeConfig.stackLimit"
              placeholder="请输入栈消耗"
              model-event="input"
              mode="button"
              size="large"
              min="0"
            />
          </a-form-item>
        </a-space>
      </a-form-item>
      <a-form-item
        label="测试用例配置"
        :content-flex="false"
        :merge-props="false"
      >
        <a-form-item
          v-for="(judgeCaseItem, index) of form.judgeCase"
          :field="`judgeCase[${index}]`"
          :key="index"
          no-style
        >
          <a-space direction="horizontal" fill style="align-items: baseline">
            <a-form-item
              :field="`judgeCase[${index}].input`"
              :label="`输入用例-${index}`"
              :key="index"
            >
              <a-input
                v-model="judgeCaseItem.input"
                placeholder="请输入测试输入用例"
              />
            </a-form-item>
            <a-form-item
              :field="`judgeCase[${index}].input`"
              :label="`输出用例-${index}`"
              :key="index"
            >
              <a-input
                v-model="judgeCaseItem.output"
                placeholder="请输入测试输出用例"
              />
            </a-form-item>
            <a-button
              @click="handleDelete(index)"
              style="align-content: end"
              status="danger"
            >
              Delete
            </a-button>
          </a-space>
        </a-form-item>

        <div style="text-align: left">
          <a-button @click="handleAdd()" type="outline" status="success">
            增加测试用例
          </a-button>
        </div>
      </a-form-item>

      <a-form-item>
        <div style="text-align: center; width: 100%">
          <a-button
            html-type="submit"
            type="primary"
            size="medium"
            style="min-width: 200px"
            >Submit
          </a-button>
        </div>
      </a-form-item>
    </a-form>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import MdEditor from "@/components/MdEditor.vue";
import message from "@arco-design/web-vue/es/message";
import { useRoute } from "vue-router";
import { QuestionControllerService } from "../../../generated/services/QuestionControllerService";

const form = ref({
  answer: "",
  content: "",
  judgeCase: [
    {
      input: "",
      output: "",
    },
  ],
  judgeConfig: {
    memoryLimit: 0,
    stackLimit: 0,
    timeLimit: 0,
  },
  tags: [],
  title: "",
});

console.log(form.value.judgeConfig);

const route = useRoute();
// 如果路由包含updatePage参数，说明是修改页面
const updatePage = route.path.includes("update");

const loadData = async () => {
  const id = route.query.id;
  if (!id) {
    return;
  }
  // Number(id)精度会丢失，所以使用parseInt
  const res = await QuestionControllerService.getQuestionByIdUsingGet(
    id as any
  );
  if (res.code === 0) {
    form.value = res.data as any;
    // json转 js对象
    if (!form.value.judgeCase) {
      form.value.judgeCase = [
        {
          input: "",
          output: "",
        },
      ];
    } else {
      form.value.judgeCase = JSON.parse(form.value.judgeCase as any);
    }
    if (!form.value.judgeConfig) {
      form.value.judgeConfig = {
        memoryLimit: 0,
        stackLimit: 0,
        timeLimit: 0,
      };
    } else {
      form.value.judgeConfig = JSON.parse(form.value.judgeConfig as any);
    }
    if (!form.value.tags) {
      form.value.tags = [];
    } else {
      form.value.tags = JSON.parse(form.value.tags as any);
    }
  } else {
    message.error("获取题目失败！" + res.message);
  }
};

onMounted(() => {
  if (updatePage) {
    loadData();
  }
});

const handleSubmit = async () => {
  // console.log(form.value);
  if (updatePage) {
    const res = await QuestionControllerService.updateQuestionUsingPost(
      form.value
    );
    if (res.code === 0) {
      message.success("题目更新成功");
    } else {
      message.success("题目更新失败！" + res.message);
    }
  } else {
    const res = await QuestionControllerService.addQuestionUsingPost(
      form.value
    );
    if (res.code === 0) {
      message.success("题目添加成功");
    } else {
      message.success("题目添加失败！" + res.message);
    }
  }
};

const handleAdd = () => {
  form.value.judgeCase?.push({
    input: "",
    output: "",
  });
};
const handleDelete = (index: number) => {
  form.value.judgeCase?.splice(index, 1);
};

const onContentChange = (v: string) => {
  form.value.content = v;
};

const onAnswerChange = (v: string) => {
  form.value.answer = v;
};
</script>

<style scoped>
#addQuestionView {
}

.inputBase {
  max-width: 800px;
}

.editor {
  width: 100%;
}
</style>
