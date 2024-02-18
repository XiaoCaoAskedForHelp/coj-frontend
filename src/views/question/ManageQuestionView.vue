<template>
  <div id="manageQuestionView">
    <h2>题目管理</h2>
    <a-table
      :ref="tableRef"
      :columns="columns"
      :data="dataList"
      :pagination="{
        showTotal: true,
        total: total,
        pageSize: searchParams.pageSize,
        current: searchParams.current,
      }"
    >
      <template #optional="{ record }">
        <a-space>
          <a-button type="primary" @click="doUpdate(record)"> 修改</a-button>
          <a-button status="danger" @click="doDelete(record)"> 删除</a-button>
        </a-space>
      </template>
    </a-table>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import message from "@arco-design/web-vue/es/message";
import { useRouter } from "vue-router";
import { QuestionControllerService } from "../../../generated/services/QuestionControllerService";
import { Question } from "../../../generated/models/Question";

const columns = [
  {
    title: "id",
    dataIndex: "id",
  },
  {
    title: "标题",
    dataIndex: "title",
  },
  {
    title: "标签",
    dataIndex: "tags",
  },
  {
    title: "答案",
    dataIndex: "answer",
  },
  {
    title: "判题配置",
    dataIndex: "judgeConfig",
  },
  {
    title: "判题用例",
    dataIndex: "judgeCase",
  },
  {
    title: "提交次数",
    dataIndex: "submitNum",
  },
  {
    title: "通过次数",
    dataIndex: "acceptNum",
  },
  {
    title: "创建时间",
    dataIndex: "createTime",
  },
  {
    title: "更新时间",
    dataIndex: "updateTime",
  },
  {
    title: "操作",
    slotName: "optional",
  },
];
const dataList = ref([]);
const total = ref(0);
const tableRef = ref();

const searchParams = ref({
  current: 1,
  pageSize: 10,
});

const loadData = async () => {
  const res = await QuestionControllerService.listQuestionByPageUsingPost(
    searchParams.value
  );
  if (res.code === 0) {
    dataList.value = res.data.records;
    total.value = res.data.total;
  } else {
    message.error("获取题目列表失败！" + res.message);
  }
};

onMounted(() => {
  loadData();
});

const router = useRouter();

const doUpdate = (question: Question) => {
  router.push({
    path: "/question/update",
    query: {
      id: question.id,
    },
  });
};

const doDelete = async (question: Question) => {
  const res = await QuestionControllerService.deleteQuestionUsingPost({
    id: question.id,
  });
  if (res.code === 0) {
    message.success("删除成功！");
    loadData();
  } else {
    message.error("删除失败！" + res.message);
  }
};
</script>

<style scoped>
#manageQuestionView {
}
</style>
