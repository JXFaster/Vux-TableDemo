<template>
  <div>
    <vxe-toolbar>
      <template #buttons>
        <vxe-button @click="expandEvent1">切换第二行展开</vxe-button>
        <vxe-button @click="expandEvent2">设置第三、四行展开</vxe-button>
        <vxe-button @click="expandAllEvent">设置所有行展开</vxe-button>
        <vxe-button @click="clearExpandEvent">关闭所有行展开</vxe-button>
      </template>
    </vxe-toolbar>

    <vxe-table
      ref="tableRef"
      border
      auto-resize
      :data="tableData"
      :row-config="{ keyField: 'id' }"
      :expand-config="{
        expandRowKeys: [10004],
        iconOpen: 'vxe-icon-caret-up',
        iconClose: 'vxe-icon-caret-down',
        toggleMethod({ expanded, row }) {
          if (expanded) {
            if (row.sex === 'Man') {
              VXETable.modal.message({
                id: 'openErr',
                content: '不允许展开',
                status: 'error',
              });
              return false;
            }
          } else {
            if (row.sex === 'Women') {
              VXETable.modal.message({
                id: 'closeErr',
                content: '不允许关闭',
                status: 'error',
              });
              return false;
            }
          }
          return true;
        },
        visibleMethod({ row }) {
          if (row.name === 'Test1') {
            return false;
          }
          return true;
        },
      }"
      @toggle-row-expand="toggleExpandChangeEvent"
    >
      <vxe-column type="seq" width="60"></vxe-column>
      <vxe-column type="expand" width="80">
        <template #content="{ row, rowIndex, column, _columnIndex }">
          <div v-if="rowIndex === 1" class="expand-wrapper">
            <h3>h3: {{ _columnIndex }}</h3>
            <vxe-table border :data="otherList">
              <vxe-column field="role" title="Role"></vxe-column>
              <vxe-column field="address" title="Address"></vxe-column>
            </vxe-table>
          </div>
          <div v-else class="expand-wrapper">
            <ul>
              <li>
                <span>ID：</span>
                <span>{{ row.id }}</span>
              </li>
              <li>
                <span>Name：</span>
                <span>{{ row.name }}</span>
              </li>
              <li>
                <span>UpdateTime：</span>
                <span>{{ row.age }}</span>
              </li>
              <li>
                <span>CreateTime：</span>
                <span>{{ row.address }}</span>
              </li>
            </ul>
          </div>
        </template>
      </vxe-column>
      <vxe-column field="name" title="Name" width="400"></vxe-column>
      <vxe-column field="sex" title="Sex" width="400"></vxe-column>
      <vxe-column field="age" title="Age" width="400"></vxe-column>
    </vxe-table>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { VXETable } from "vxe-table";
const tableRef = ref();
// 整体行表格的数据
const tableData = ref([
  {
    id: 10001,
    name: "Test1",
    role: "DevelopDevelopDevelop",
    sex: "Man",
    age: 28,
    address:
      "test abc test abc test abc test abc test abc test abc test abc test abc",
  },
  {
    id: 10002,
    name: "Test2",
    role: "Test",
    sex: "Women",
    age: 22,
    address: "Guangzhou",
  },
  {
    id: 10003,
    name: "Test3",
    role: "PM",
    sex: "Man",
    age: 32,
    address: "Shanghai",
  },
  {
    id: 10004,
    name: "Test4",
    role: "DesignerDesignerDesignerDesigner",
    sex: "Women",
    age: 36,
    address:
      "Guangzhou test abc test abc test abc test abc test abc test abc test abc",
  },
  {
    id: 10005,
    name: "Test5",
    role: "Develop",
    sex: "Women",
    age: 24,
    address: "Shanghai",
  },
  {
    id: 10006,
    name: "Test6",
    role: "Designer",
    sex: "Man",
    age: 34,
    address: "test abc",
  },
]);
// 第二行中表格的数据
const otherList = ref([
  {
    id: 50001,
    name: "Test5001",
    role: "Develop",
    sex: "Man",
    age: 28,
    address: "test abc",
  },
  {
    id: 50002,
    name: "Test5002",
    role: "Test",
    sex: "Women",
    age: 22,
    address: "test abc test abc test abc test abc test abc",
  },
]);

const expandEvent1 = () => {
  const $table = tableRef.value;
  if ($table) {
    $table.toggleRowExpand(tableData.value[1]);
  }
};
const expandEvent2 = () => {
  const $table = tableRef.value;
  if ($table) {
    $table.setRowExpand([tableData.value[2], tableData.value[3]], true);
  }
};
const expandAllEvent = () => {
  const $table = tableRef.value;
  if ($table) {
    $table.setAllRowExpand(true);
  }
};
const clearExpandEvent = () => {
  const $table = tableRef.value;
  if ($table) {
    $table.clearRowExpand();
  }
};
// 展开或关闭 行时触发
const toggleExpandChangeEvent = ({ expanded }) => {
  console.log("行展开事件" + expanded);
};
</script>

<style lang="scss" scoped>
.expand-wrapper {
  padding: 20px;
}
</style>
