<template>
  <div id="questionsView">
    <h2>题目管理</h2>
    <a-form :model="searchParams" layout="inline" style="min-width: 240px">
      <a-form-item field="title" label="题目名称">
        <a-input v-model="searchParams.title" placeholder="请输入题目名称..." />
      </a-form-item>
      <a-form-item field="tags" label="标签" style="min-width: 240px">
        <a-input-tag v-model="searchParams.tags" placeholder="请输入标签..." />
      </a-form-item>
      <a-form-item>
        <a-button type="primary" @click="doSearch()">Submit</a-button>
      </a-form-item>
    </a-form>
    <a-divider size="0" />
    <a-table
      :ref="tableRef"
      :columns="columns"
      :data="dataList"
      :pagination="{
        showTotal: true,
        total,
        pageSize: searchParams.pageSize,
        current: searchParams.current,
        pageSizeOptions: [2, 5, 10, 20],
        showPageSize: true,
      }"
      @page-change="onPageChange($event)"
      @page-size-change="onPageSizeChange($event)"
    >
      <template #tags="{ record }">
        <a-space wrap>
          <a-tag v-for="(tag, index) of record.tags" :key="index" color="green">
            {{ tag }}
          </a-tag>
        </a-space>
      </template>
      <template #acceptedRate="{ record }">
        {{
          `${record.submitNum ? record.acceptNum / record.submitNum : "0"}% (${
            record.acceptNum
          } / ${record.submitNum})`
        }}
      </template>
      <template #updateTime="{ record }">
        {{ moment(record.updateTime).format("YYYY-MM-DD") }}
      </template>
      <template #optional="{ record }">
        <a-space>
          <a-button type="primary" @click="toQuestionPage(record)"
            >做题
          </a-button>
        </a-space>
      </template>
    </a-table>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, watchEffect } from "vue";
import message from "@arco-design/web-vue/es/message";
import { useRouter } from "vue-router";
import { QuestionControllerService } from "../../../generated/services/QuestionControllerService";
import { Question } from "../../../generated/models/Question";
import moment from "moment";
import { QuestionQueryRequest } from "../../../generated/models/QuestionQueryRequest";

const columns = [
  {
    title: "题号",
    dataIndex: "id",
  },
  {
    title: "题目名称",
    dataIndex: "title",
  },
  {
    title: "标签",
    slotName: "tags",
  },
  {
    title: "通过率",
    slotName: "acceptedRate",
  },
  {
    title: "更新时间",
    slotName: "updateTime",
  },
  {
    title: "操作",
    slotName: "optional",
  },
];
const dataList = ref([]);
const total = ref(0);
const tableRef = ref();

const searchParams = ref<QuestionQueryRequest>({
  current: 1,
  pageSize: 10,
  title: "",
  tags: [],
});

const loadData = async () => {
  const res = await QuestionControllerService.listQuestionVoByPageUsingPost(
    searchParams.value
  );
  if (res.code === 0) {
    dataList.value = res.data.records;
    total.value = res.data.total;
  } else {
    message.error("获取题目列表失败！" + res.message);
  }
};

watchEffect(() => {
  loadData();
});

onMounted(() => {
  loadData();
});

const router = useRouter();

// 跳转到题目页面
const toQuestionPage = (question: Question) => {
  router.push({
    path: `/question/view/${question.id}`,
  });
};

const onPageChange = (page: number) => {
  // 两种方式都可以，一种是直接修改searchParams.value，一种是重新赋值触发watchEffect，第二种方式更推荐
  // searchParams.value.current = page;
  // loadData();
  searchParams.value = {
    ...searchParams.value,
    current: page,
  };
};

const onPageSizeChange = (pageSize: number) => {
  searchParams.value = {
    ...searchParams.value,
    pageSize,
  };
};

/**
 * 搜索，重新加载数据
 */
const doSearch = () => {
  searchParams.value = {
    ...searchParams.value,
    current: 1,
  };
  // 直接loadData不行，如果页号不是1，会导致页号不变，如果搜出的数据不足一页，页面会显示空白
  // loadData();
};
</script>

<style scoped>
#questionsView {
  max-width: 1280px;
  margin: 0 auto;
}
</style>
