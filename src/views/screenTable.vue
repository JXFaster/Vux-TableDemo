<template>
  <div>
    <p>
      <vxe-button @click="updateNameFilterOpts">更新name筛选条件</vxe-button>
    </p>

    <!-- filter-multiple可以决定是否选择多选 -->
    <vxe-table
      border
      ref="xTable1"
      :row-config="{ isHover: true }"
      :data="tableData"
      @filter-visible="filterVisibleEvent"
      @filter-change="filterChangeEvent"
    >
      <vxe-column field="id" title="ID"></vxe-column>
      <vxe-column
        field="name"
        title="姓名"
        sortable
        :filters="nameOptions"
        :filter-method="filterNameMethod"
      ></vxe-column>
      <vxe-column
        field="sex"
        title="性别"
        sortable
        :filters="sexOptions"
        :filter-multiple="false"
      ></vxe-column>
      <vxe-column
        field="age"
        title="年龄"
        :filters="ageOptions"
        :filter-method="filterAgeMethod"
      >
        <template #filter="{ $panel, column }">
          <input
            type="type"
            v-for="(option, index) in column.filters"
            :key="index"
            v-model="option.data"
            @input="$panel.changeOption($event, !!option.data, option)"
            @keyup.enter="$panel.confirmFilter()"
            placeholder="按回车确认筛选"
          />
        </template>
      </vxe-column>
      <vxe-column field="time" title="时间" sortable></vxe-column>
    </vxe-table>
  </div>
</template>

<script setup>
const xTable1 = ref();
// 表格数据
const tableData = ref([
  {
    id: 10001,
    name: "Test1",
    role: "Develop",
    sex: "0",
    age: 28,
    address: "test abc",
  },
  {
    id: 10002,
    name: "Test2",
    role: "Test",
    sex: "1",
    age: 22,
    address: "Guangzhou",
  },
  {
    id: 10003,
    name: "Test3",
    role: "PM",
    sex: "0",
    age: 32,
    address: "Shanghai",
  },
  {
    id: 10004,
    name: "Test4",
    role: "Designer",
    sex: "1",
    age: 24,
    address: "Shanghai",
  },
  {
    id: 10005,
    name: "Test5",
    role: "Develop",
    sex: "0",
    age: 32,
    address: "Shenzhen",
  },
  {
    id: 10006,
    name: "Test6",
    role: "Designer",
    sex: "0",
    age: 28,
    address: "Shanghai",
  },
]);

// ------------------------------------------- 姓名筛选
// 筛选条件
const nameOptions = ref([]);
// 筛选方法
const filterNameMethod = ({ value, row }) => {
  return row.id >= value;
};
// 更改姓名的筛选条件
const updateNameFilterOpts = () => {
  nameOptions.value = [
    { label: "id大于10002", value: 10002 },
    { label: "id大于10003", value: 10003 },
  ];
};

// ------------------------------------------- 性别筛选
// 筛选条件
const sexOptions = ref([
  { label: "Man", value: "1" },
  { label: "Woman", value: "0" },
]);

// ------------------------------------------- 年龄筛选
// 筛选条件
const ageOptions = ref([{ data: "" }]);
// 筛选方法
const filterAgeMethod = ({ option, row }) => {
  console.log("option", option);
  return row.age === Number(option.data);
};

// 在筛选框弹出 或 隐藏时触发
const filterVisibleEvent = (data) => {
  console.log("打开了筛选框");
  console.log("data", data);
  //   console.log("column", column);
  //   console.log("visible", visible);
};

// 只在筛选的值发生变化 并且 点击筛选后才触发
const filterChangeEvent = (data) => {
  console.log("关闭了筛选框");
  console.log("data", data);

  //   console.log(`${column.field} 筛选了数据`);
};
</script>

<style lang="scss" scoped></style>
