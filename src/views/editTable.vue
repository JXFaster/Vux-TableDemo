<template>
  <div class="editTable_box">
    <!-- edit-config:可编辑配置项 mode:编辑模式  cell:单元格编辑模式  trigger:触发方式 -->
    <vxe-table
      border
      :edit-config="{ mode: 'cell', trigger: 'click' }"
      :data="tableData"
    >
      <vxe-column type="seq" width="60"></vxe-column>
      <vxe-column field="name" title="Name" width="160"></vxe-column>

      <vxe-column field="sex" title="Sex" :edit-render="{}">
        <template #default="{ row }">
          <span>{{ row.sex === "1" ? "男" : "女" }}</span>
        </template>
        <template #edit="{ row }">
          <vxe-select
            v-model="row.sex"
            :options="sexOptions"
            transfer
          ></vxe-select>
        </template>
      </vxe-column>

      <vxe-column field="num" title="Number">
        <template #default="{ row }">
          <span>{{ row.num }}</span>
        </template>
        <template #edit="{ row }">
          <vxe-input v-model="row.num"></vxe-input>
        </template>
      </vxe-column>

      <vxe-column field="age" title="Age"></vxe-column>
      <vxe-column field="address" title="Address"></vxe-column>
    </vxe-table>
  </div>
</template>

<script setup>
const tableData = ref([
  {
    id: 10001,
    name: "Test1",
    role: "Develop",
    sex: "0",
    age: 28,
    num: 234,
    address: "test abc",
  },
  {
    id: 10002,
    name: "Test2",
    role: "Test",
    sex: "1",
    age: 22,
    num: 34,
    address: "Guangzhou",
  },
  {
    id: 10003,
    name: "Test3",
    role: "PM",
    sex: "0",
    age: 32,
    num: 12,
    address: "Shanghai",
  },
]);
const sexOptions = ref([
  { label: "男", value: "1" },
  { label: "女", value: "0" },
]);
</script>

<style lang="scss" scoped></style>
