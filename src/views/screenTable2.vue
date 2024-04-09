<template>
  <div>
    <vxe-toolbar>
      <template #buttons>
        <vxe-button @click="filterNameEvent">筛选 Name</vxe-button>
        <vxe-button @click="filterAgeEvent">筛选 Age</vxe-button>
        <vxe-button @click="updateNameFilterEvent"
          >更改 Name 的筛选条件</vxe-button
        >
        <vxe-button @click="clearFilterEvent1">清除 Age 的筛选条件</vxe-button>
        <vxe-button @click="clearFilterEvent2()">清除所有的筛选条件</vxe-button>
        <vxe-button @click="openFilterEvent">弹出筛选面板</vxe-button>
        <vxe-button @click="closeFilterEvent">关闭筛选面板</vxe-button>
      </template>
    </vxe-toolbar>

    <vxe-table
      border
      ref="tableRef"
      height="700"
      :row-config="{ isHover: true }"
      :data="tableData"
    >
      <vxe-column type="seq" width="60"></vxe-column>

      <!-- 姓名 -->
      <vxe-column
        field="name"
        title="姓名"
        :filters="nameOptions"
        :filter-method="filterNameMethod"
      ></vxe-column>
      <!-- 职位 -->
      <vxe-column
        field="role"
        title="职位"
        :filters="roleOptions"
        :filter-method="filterRoleMethod"
        sortable
      >
        <template #filter="{ $panel, column }">
          <!-- changeOption 更新选项的状态 -->
          <!-- confirmFilter() 确认筛选 -->
          <!-- resetFilter() 清除筛选条件 -->
          <select
            class="my-select"
            v-model="item.data"
            v-for="(item, index) in column.filters"
            :key="index"
            @change="$panel.changeOption($event, !!item.data, item)"
          >
            <option
              v-for="(label, cIndex) in roleList"
              :key="cIndex"
              :value="label"
            >
              {{ label }}
            </option>
          </select>
        </template>
      </vxe-column>

      <!-- 性别 -->
      <vxe-column
        field="sex"
        title="性别"
        :filter-multiple="false"
        :filters="sexOptions"
        sortable
      ></vxe-column>

      <!-- 年龄 -->
      <vxe-column
        field="age"
        title="年龄"
        :filters="ageOptions"
        :filter-method="filterAgeMethod"
        :filter-recover-method="filterAgeRecoverMethod"
      >
        <template #header="{ column, $rowIndex }">
          <input type="text" v-model="column.field" />
        </template>
        <template #filter="{ $panel, column }">
          <input
            class="my-input"
            type="type"
            v-for="(item, index) in column.filters"
            :key="index"
            v-model="item.data"
            @input="$panel.changeOption($event, !!item.data, item)"
            @keyup.enter="$panel.confirmFilter()"
            placeholder="按回车确认筛选"
          />
        </template>
      </vxe-column>
      <vxe-column field="time" title="Time" sortable></vxe-column>
    </vxe-table>
  </div>
</template>

<script setup>
// XEUtils 是一个函数库
import XEUtils from "xe-utils";
// 表格dom
const tableRef = ref();
// 表格数据
const tableData = ref([]);
// 获取表格数据
const findList = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      tableData.value = [
        {
          id: 10001,
          name: "Test10",
          role: "Develop",
          sex: "Man",
          age: 28,
          address: "test abc",
        },
        {
          id: 10002,
          name: "Test",
          role: "Test",
          sex: "Women",
          age: 22,
          address: "Guangzhou",
        },
        {
          id: 10003,
          name: "Test2",
          role: "PM",
          sex: "Man",
          age: 32,
          address: "Shanghai",
        },
        {
          id: 10004,
          name: "Test7",
          role: "Designer",
          sex: "Women",
          age: 36,
          address: "Guangzhou",
        },
        {
          id: 10005,
          name: "Test50",
          role: "Develop",
          sex: "Women",
          age: 24,
          address: "Shanghai",
        },
        {
          id: 10006,
          name: "Test60",
          role: "Designer",
          sex: "Man",
          age: 34,
          address: "test abc",
        },
        {
          id: 10007,
          name: "Test3",
          role: "PM",
          sex: "Man",
          age: 32,
          address: "Shanghai",
        },
        {
          id: 10008,
          name: "Test4",
          role: "Designer",
          sex: "Man",
          age: 30,
          address: "Guangzhou",
        },
        {
          id: 10009,
          name: "Test8",
          role: "Test",
          sex: "Women",
          age: 28,
          address: "test abc",
        },
        {
          id: 100010,
          name: "Test1000",
          role: "Test",
          sex: "Man",
          age: 24,
          address: "Shanghai",
        },
      ];

      resolve(tableData.value);
    }, 300);
  });
};
findList();

// ---------------------------------------------------- 姓名
// 筛选条件
const nameOptions = ref([
  { label: "包含 6", value: "6", checked: false },
  { label: "包含 4", value: "4", checked: false },
]);
const filterNameMethod = ({ row, value }) => {
  // ------------ 转为字符串-------------- 转为小写
  return XEUtils.toValueString(row.name).toLowerCase().indexOf(value) > -1;
};

// ---------------------------------------------------- 职位
// 筛选条件
const roleOptions = ref([{ data: "" }]);
// 筛选条件下拉框数据
const roleList = ref(["", "Develop", "PM", "Test"]);
const filterRoleMethod = ({ option, row, cellValue }) => {
  console.log("cellValue", cellValue);
  return row.role === option.data;
};

// ---------------------------------------------------- 性别
const sexOptions = ref([
  { label: "Man", value: "Man" },
  { label: "Women", value: "Women" },
]);

// ---------------------------------------------------- 年龄
// 筛选条件
const ageOptions = ref([{ data: "" }]);
// 筛选的方法
const filterAgeMethod = ({ option, row }) => {
  return row.age === Number(option.data);
};
// 自定义筛选复原方法
const filterAgeRecoverMethod = ({ option }) => {
  // 如果是自定义筛选模板，当为点击确认时，该选项将被恢复为默认值
  option.data = "";
};

// 筛选 Name
const filterNameEvent = () => {
  const $table = tableRef.value;
  if ($table) {
    console.log("$table", $table);
    // -------------------根据列的字段名获取列
    const column = $table.getColumnByField("name");
    if (column) {
      console.log("column", column);
      // 修改第二个选项为勾选状态
      column.filters[1].checked = true;

      // 如果是直接修复筛选条件，则需要手动调用 updateData 处理表格数据
      $table.updateData();
    }
  }
};

// 筛选 Age
const filterAgeEvent = () => {
  const $table = tableRef.value;
  if ($table) {
    const column = $table.getColumnByField("age");
    if (column) {
      // 修改第一个选项为勾选状态
      const option = column.filters[0];
      option.data = "32";
      option.checked = true;
      // 如果是直接修复筛选条件，则需要手动调用 updateData 处理表格数据
      $table.updateData();
    }
  }
};

// 更改 Name 的筛选条件
const updateNameFilterEvent = () => {
  // 修改筛选列表，并默认设置为选中状态
  nameOptions.value = [
    { label: "包含 0", value: "0", checked: false },
    { label: "包含 1", value: "1", checked: false },
    // --------------------------- 默认选中value为2的筛选条件
    { label: "包含 2", value: "2", checked: true },
    { label: "包含 3", value: "3", checked: false },
    { label: "包含 4", value: "4", checked: false },
  ];
};

// 清除 Age 的筛选条件
const clearFilterEvent1 = () => {
  const $table = tableRef.value;
  if ($table) {
    // ----手动清空筛选条件
    $table.clearFilter($table.getColumnByField("age"));
  }
};

// 清除所有的筛选条件
const clearFilterEvent2 = () => {
  const $table = tableRef.value;
  if ($table) {
    $table.clearFilter();
  }
};

// 弹出筛选面板
const openFilterEvent = () => {
  const $table = tableRef.value;
  if ($table) {
    // 用于 filters，手动弹出筛选面板
    $table.openFilter("age");
  }
};

// 关闭筛选面板
const closeFilterEvent = () => {
  const $table = tableRef.value;
  if ($table) {
    $table.closeFilter();
  }
};
</script>

<style lang="scss" scoped></style>
