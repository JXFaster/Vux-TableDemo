<template>
  <div>
    <p>
      <vxe-button @click="getTreeExpansionEvent">获取已展开</vxe-button>
      <vxe-button @click="expandAllEvent">展开所有</vxe-button>
      <vxe-button @click="claseExpandEvent">关闭所有</vxe-button>
    </p>

    <!-- 

        column-config="{ 
            resizable: true ( 每一列是否启用列宽调整 )
        }"

        树形结构配置项
        tree-config：{
            transform：true ( 自动将列表转为树结构（支持虚拟滚动）)
            rowField：'id'  ( 用于 tree-config.transform，树节点的字段名 )
            parentField：'parentId'  ( 用于 tree-config.transform，树父节点的字段名 )
            expandRowKeys：[24300] (默认展开指定树节点（只会在初始化时被触发一次，需要有 row-config.keyField）)
            expandAll: true, （默认展开所有的节点）
          }
    -->
    <vxe-table
      border="inner"
      ref="tableRef"
      :column-config="{ resizable: true }"
      :row-config="{ keyField: 'id' }"
      :tree-config="{
        transform: true,
        rowField: 'id',
        parentField: 'parentId',
        expandRowKeys: [24300],
        // expandAll: true,
      }"
      :radio-config="{ labelField: 'name' }"
      :data="tableData"
      @toggle-tree-expand="toggleExpandChangeEvent"
    >
      <!-- tree-node 指定为树节点 -->
      <vxe-column field="name" title="Name" tree-node></vxe-column>
      <vxe-column field="size" title="Size"></vxe-column>
      <vxe-column field="type" title="Type"></vxe-column>
      <vxe-column field="date" title="Date"></vxe-column>
    </vxe-table>
  </div>
</template>

<script setup>
import { VXETable } from "vxe-table";
const defaultExpandKeys = ref([24300]);
const tableRef = ref();
const tableData = ref([
  {
    id: 10000,
    parentId: null,
    name: "Test1",
    type: "mp3",
    size: 1024,
    date: "2020-08-01",
  },
  {
    id: 10050,
    parentId: null,
    name: "Test2",
    type: "mp4",
    size: 0,
    date: "2021-04-01",
  },
  {
    id: 24300,
    parentId: 10050,
    name: "Test3",
    type: "avi",
    size: 1024,
    date: "2020-03-01",
  },
  {
    id: 20045,
    parentId: 24300,
    name: "Test4",
    type: "html",
    size: 600,
    date: "2021-04-01",
  },
  {
    id: 10053,
    parentId: 24300,
    name: "Test5",
    type: "avi",
    size: 0,
    date: "2021-04-01",
  },
  {
    id: 24330,
    parentId: 10053,
    name: "Test6",
    type: "txt",
    size: 25,
    date: "2021-10-01",
  },
  {
    id: 21011,
    parentId: 10053,
    name: "Test7",
    type: "pdf",
    size: 512,
    date: "2020-01-01",
  },
  {
    id: 22200,
    parentId: 10053,
    name: "Test8",
    type: "js",
    size: 1024,
    date: "2021-06-01",
  },
  {
    id: 23666,
    parentId: null,
    name: "Test9",
    type: "xlsx",
    size: 2048,
    date: "2020-11-01",
  },
  {
    id: 23677,
    parentId: 23666,
    name: "Test10",
    type: "js",
    size: 1024,
    date: "2021-06-01",
  },
  {
    id: 23671,
    parentId: 23677,
    name: "Test11",
    type: "js",
    size: 1024,
    date: "2021-06-01",
  },
  {
    id: 23672,
    parentId: 23677,
    name: "Test12",
    type: "js",
    size: 1024,
    date: "2021-06-01",
  },
  {
    id: 23688,
    parentId: 23666,
    name: "Test13",
    type: "js",
    size: 1024,
    date: "2021-06-01",
  },
  {
    id: 23681,
    parentId: 23688,
    name: "Test14",
    type: "js",
    size: 1024,
    date: "2021-06-01",
  },
  {
    id: 23682,
    parentId: 23688,
    name: "Test15",
    type: "js",
    size: 1024,
    date: "2021-06-01",
  },
  {
    id: 24555,
    parentId: null,
    name: "Test16",
    type: "avi",
    size: 224,
    date: "2020-10-01",
  },
  {
    id: 24566,
    parentId: 24555,
    name: "Test17",
    type: "js",
    size: 1024,
    date: "2021-06-01",
  },
  {
    id: 24577,
    parentId: 24555,
    name: "Test18",
    type: "js",
    size: 1024,
    date: "2021-06-01",
  },
]);

// 当树节点展开或收起时会触发该事件
const toggleExpandChangeEvent = (params) => {
  const $table = tableRef.value;
  if ($table) {
    const { row, expanded } = params;
    console.log(
      "节点展开事件",
      expanded,
      "获取父节点：",
      $table.getParentRow(row)
    );
  }
};

// 获取已展开的节点的 数量
const getTreeExpansionEvent = () => {
  const $table = tableRef.value;
  if ($table) {
    const treeExpandRecords = $table.getTreeExpandRecords();
    VXETable.modal.alert(treeExpandRecords.length);
  }
};

// 展开所有的节点
const expandAllEvent = () => {
  const $table = tableRef.value;
  if ($table) {
    $table.setAllTreeExpand(true);
  }
};

// 关闭所有的节点
const claseExpandEvent = () => {
  const $table = tableRef.value;
  if ($table) {
    $table.clearTreeExpand();
  }
};
</script>
