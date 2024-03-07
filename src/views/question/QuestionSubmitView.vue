<template>
  <div id="questionSubmitView">
    <h2>题目管理</h2>
    <a-form :model="searchParams" layout="inline" style="min-width: 240px">
      <a-form-item field="language" label="编程语言">
        <a-select
          :style="{ width: '150px' }"
          placeholder="选择编程语言"
          v-model="searchParams.language"
          allow-clear
        >
          <a-option>java</a-option>
          <a-option>cpp</a-option>
          <a-option>go</a-option>
          <a-option>csharp</a-option>
          <a-option>html</a-option>
        </a-select>
      </a-form-item>
      <a-form-item field="questionId" label="题目ID">
        <a-input
          v-model="searchParams.questionId"
          placeholder="请输入题目ID..."
        />
      </a-form-item>
      <a-form-item>
        <a-button type="primary" @click="doSearch()">Submit</a-button>
      </a-form-item>
    </a-form>
    <!--{{ searchParams }}-->
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
      <template #judgeInfo="{ record }">
        {{ record.judgeInfo }}
      </template>
      <template #status="{ record }">
        {{ record.status }}
      </template>
      <template #submitTime="{ record }">
        {{ moment(record.createTime).format("YYYY-MM-DD") }}
      </template>
    </a-table>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, watchEffect } from "vue";
import message from "@arco-design/web-vue/es/message";
import moment from "moment";
import { QuestionSubmitControllerService } from "../../../generated/services/QuestionSubmitControllerService";
import { QuestionSubmitQueryRequest } from "../../../generated/models/QuestionSubmitQueryRequest";

const columns = [
  {
    title: "提交ID",
    dataIndex: "id",
  },
  {
    title: "编程语言",
    dataIndex: "language",
  },
  {
    title: "判题信息",
    slotName: "judgeInfo",
  },
  {
    title: "判题状态",
    slotName: "status",
  },
  {
    title: "题目ID",
    dataIndex: "questionId",
  },
  {
    title: "提交者ID",
    dataIndex: "userId",
  },
  {
    title: "提交时间",
    slotName: "submitTime",
  },
];
const dataList = ref([]);
const total = ref(0);
const tableRef = ref();

const searchParams = ref<QuestionSubmitQueryRequest>({
  current: 1,
  pageSize: 10,
  language: undefined,
  questionId: undefined,
  sortField: "createTime",
  sortOrder: "descend",
});

const loadData = async () => {
  const res =
    await QuestionSubmitControllerService.listQuestionSubmitVoByPageUsingPost(
      searchParams.value
    );
  // 这种方式会一直触发请求，可能是因为watchEffect监听
  // const res =
  //   await QuestionSubmitControllerService.listQuestionSubmitVoByPageUsingPost({
  //     ...searchParams.value,
  //     sortField: "createTime",
  //     sortOrder: "descend",
  //   });
  if (res.code === 0) {
    dataList.value = res.data.records;
    total.value = parseInt(res.data.total);
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
#questionSubmitView {
  max-width: 1280px;
  margin: 0 auto;
}
</style>
