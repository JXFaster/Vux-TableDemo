<template>
  <div>
    <!-- 单选 -->
    <div class="radioBox">
      <h2>单选</h2>
      <p>
        <vxe-button @click="getTreeRadioEvent">获取选中</vxe-button>
        <vxe-button @click="getTreeExpansionEvent">获取已展开</vxe-button>
        <vxe-button @click="expandAllEvent">展开所有</vxe-button>
        <vxe-button @click="claseExpandEvent">关闭所有</vxe-button>
      </p>
      <!-- 
          :radio-config="{ 
            labelField: 'name' 单选框显示的字段名，可以直接显示在单选框中

          }"
      -->

      <vxe-table
        show-overflow
        ref="xTreeRef"
        :tree-config="{
          transform: true,
          rowField: 'id',
          parentField: 'parentId',
        }"
        :radio-config="{ labelField: 'name' }"
        :data="tableData"
      >
        <vxe-column type="radio" tree-node></vxe-column>
        <vxe-column field="size" title="Size"></vxe-column>
        <vxe-column field="type" title="Type"></vxe-column>
        <vxe-column field="date" title="Date"></vxe-column>
      </vxe-table>
    </div>

    <!-- 多选 -->
    <div class="checkBox">
      <h2>多选</h2>

      <!-- 
          :row-config="{ 
            isHover: true 当鼠标移到列头时，是否要高亮当前头
            useKey: true 是否需要为每一行的 VNode 设置 key 属性
          }"

          :tree-config="{
          transform: true, 
          accordion: true, 对于同一级的节点，每次只能展开一个
          showLine: true, 显示连接线
          iconOpen: 'vxe-icon-square-minus', 自定义展开节点时的icon
          iconClose: 'vxe-icon-square-plus', 自定义关闭节点时的icon
        }"

      -->
      <vxe-table
        show-overflow
        :row-config="{ isHover: true, useKey: true }"
        :data="checkData"
        :checkbox-config="{ labelField: 'name' }"
        :tree-config="{
          transform: true,
          accordion: true,
          showLine: true,
          iconOpen: 'vxe-icon-square-minus',
          iconClose: 'vxe-icon-square-plus',
        }"
      >
        <vxe-column type="checkbox" tree-node></vxe-column>
        <vxe-column field="size" title="Size"></vxe-column>
        <vxe-column field="type" title="Type"></vxe-column>
        <vxe-column field="date" title="Date"></vxe-column>
      </vxe-table>
    </div>

    <!-- 更多功能 -->
    <div class="moreFn">
      <h2>更多功能</h2>
      <vxe-table
        show-overflow
        ref="moreTreeRef"
        border="inner"
        :row-config="{ isHover: true, useKey: true }"
        :show-header="false"
        :data="moreTableData"
        :checkbox-config="{ labelField: 'name' }"
        :scroll-y="{ enabled: false }"
        :tree-config="{
          transform: true,
          accordion: true,
          showLine: true,
          iconOpen: 'vxe-icon-square-minus-fill',
          iconClose: 'vxe-icon-square-plus-fill',
        }"
      >
        <vxe-column type="checkbox" tree-node>
          <template #default="{ row }">
            <span>
              <template v-if="row.children && row.children.length">
                <i
                  class="tree-node-icon"
                  :class="
                    moreHasRowExpand(row)
                      ? 'vxe-icon-folder-open'
                      : 'vxe-icon-folder'
                  "
                ></i>
              </template>
              <template v-else>
                <i class="tree-node-icon vxe-icon-file-txt"></i>
              </template>
              <span>{{ row.name }}</span>
            </span>
          </template>
        </vxe-column>
        <vxe-column title="操作" width="140">
          <template #default="{ row }">
            <vxe-button type="text" icon="vxe-icon-setting-fill"></vxe-button>
            <vxe-button type="text" icon="vxe-icon-edit"></vxe-button>
            <vxe-button
              type="text"
              icon="vxe-icon-delete"
              @click="moreRemoveRowEvent(row)"
            ></vxe-button>
            <vxe-button type="text" icon="vxe-icon-home-fill"></vxe-button>
          </template>
        </vxe-column>
      </vxe-table>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { VXETable } from "vxe-table";
import XEUtils from "xe-utils";
// ------------------------------------------------------------ 单选表格
const xTreeRef = ref();
const tableData = ref([
  {
    id: 10000,
    parentId: null,
    name: "test abc1",
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
    name: "test abc4",
    type: "html",
    size: 600,
    date: "2021-04-01",
  },
  {
    id: 10053,
    parentId: 24300,
    name: "test abc96",
    type: "avi",
    size: 0,
    date: "2021-04-01",
  },
  {
    id: 24330,
    parentId: 10053,
    name: "test abc5",
    type: "txt",
    size: 25,
    date: "2021-10-01",
  },
  {
    id: 21011,
    parentId: 10053,
    name: "Test6",
    type: "pdf",
    size: 512,
    date: "2020-01-01",
  },
  {
    id: 22200,
    parentId: 10053,
    name: "Test7",
    type: "js",
    size: 1024,
    date: "2021-06-01",
  },
  {
    id: 23666,
    parentId: null,
    name: "Test8",
    type: "xlsx",
    size: 2048,
    date: "2020-11-01",
  },
  {
    id: 23677,
    parentId: 23666,
    name: "Test7",
    type: "js",
    size: 1024,
    date: "2021-06-01",
  },
  {
    id: 23671,
    parentId: 23677,
    name: "Test7",
    type: "js",
    size: 1024,
    date: "2021-06-01",
  },
  {
    id: 23672,
    parentId: 23677,
    name: "Test7",
    type: "js",
    size: 1024,
    date: "2021-06-01",
  },
  {
    id: 23688,
    parentId: 23666,
    name: "Test7",
    type: "js",
    size: 1024,
    date: "2021-06-01",
  },
  {
    id: 23681,
    parentId: 23688,
    name: "Test7",
    type: "js",
    size: 1024,
    date: "2021-06-01",
  },
  {
    id: 23682,
    parentId: 23688,
    name: "Test7",
    type: "js",
    size: 1024,
    date: "2021-06-01",
  },
  {
    id: 24555,
    parentId: null,
    name: "test abc9",
    type: "avi",
    size: 224,
    date: "2020-10-01",
  },
  {
    id: 24566,
    parentId: 24555,
    name: "Test7",
    type: "js",
    size: 1024,
    date: "2021-06-01",
  },
  {
    id: 24577,
    parentId: 24555,
    name: "Test7",
    type: "js",
    size: 1024,
    date: "2021-06-01",
  },
]);
const getTreeRadioEvent = () => {
  const $table = xTreeRef.value;
  if ($table) {
    const selectRow = $table.getRadioRecord();
    VXETable.modal.alert(selectRow ? selectRow.name : "");
  }
};
const getTreeExpansionEvent = () => {
  const $table = xTreeRef.value;
  if ($table) {
    const treeExpandRecords = $table.getTreeExpandRecords();
    VXETable.modal.alert(`${treeExpandRecords.length}`);
  }
};
const expandAllEvent = () => {
  const $table = xTreeRef.value;
  if ($table) {
    $table.setAllTreeExpand(true);
  }
};
const claseExpandEvent = () => {
  const $table = xTreeRef.value;
  if ($table) {
    $table.clearTreeExpand();
  }
};

// ------------------------------------------------------------ 多选表格
const checkData = ref([
  {
    id: 10000,
    parentId: null,
    name: "test abc1",
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
    name: "test abc4",
    type: "html",
    size: 600,
    date: "2021-04-01",
  },
  {
    id: 10053,
    parentId: 24300,
    name: "test abc96",
    type: "avi",
    size: 0,
    date: "2021-04-01",
  },
  {
    id: 24330,
    parentId: 10053,
    name: "test abc5",
    type: "txt",
    size: 25,
    date: "2021-10-01",
  },
  {
    id: 21011,
    parentId: 10053,
    name: "Test6",
    type: "pdf",
    size: 512,
    date: "2020-01-01",
  },
  {
    id: 22200,
    parentId: 10053,
    name: "Test7",
    type: "js",
    size: 1024,
    date: "2021-06-01",
  },
  {
    id: 23666,
    parentId: null,
    name: "Test8",
    type: "xlsx",
    size: 2048,
    date: "2020-11-01",
  },
  {
    id: 23677,
    parentId: 23666,
    name: "Test7",
    type: "js",
    size: 1024,
    date: "2021-06-01",
  },
  {
    id: 23671,
    parentId: 23677,
    name: "Test7",
    type: "js",
    size: 1024,
    date: "2021-06-01",
  },
  {
    id: 23672,
    parentId: 23677,
    name: "Test7",
    type: "js",
    size: 1024,
    date: "2021-06-01",
  },
  {
    id: 23688,
    parentId: 23666,
    name: "Test7",
    type: "js",
    size: 1024,
    date: "2021-06-01",
  },
  {
    id: 23681,
    parentId: 23688,
    name: "Test7",
    type: "js",
    size: 1024,
    date: "2021-06-01",
  },
  {
    id: 23682,
    parentId: 23688,
    name: "Test7",
    type: "js",
    size: 1024,
    date: "2021-06-01",
  },
  {
    id: 24555,
    parentId: null,
    name: "test abc9",
    type: "avi",
    size: 224,
    date: "2020-10-01",
  },
  {
    id: 24566,
    parentId: 24555,
    name: "Test7",
    type: "js",
    size: 1024,
    date: "2021-06-01",
  },
  {
    id: 24577,
    parentId: 24555,
    name: "Test7",
    type: "js",
    size: 1024,
    date: "2021-06-01",
  },
]);

// ------------------------------------------------------------ 更多功能表格
const moreTreeRef = ref();
const moreTableData = ref([
  {
    id: 10000,
    parentId: null,
    name: "test abc1",
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
    name: "test abc4",
    type: "html",
    size: 600,
    date: "2021-04-01",
  },
  {
    id: 10053,
    parentId: 24300,
    name: "test abc96",
    type: "avi",
    size: 0,
    date: "2021-04-01",
  },
  {
    id: 24330,
    parentId: 10053,
    name: "test abc5",
    type: "txt",
    size: 25,
    date: "2021-10-01",
  },
  {
    id: 21011,
    parentId: 10053,
    name: "Test6",
    type: "pdf",
    size: 512,
    date: "2020-01-01",
  },
  {
    id: 22200,
    parentId: 10053,
    name: "Test7",
    type: "js",
    size: 1024,
    date: "2021-06-01",
  },
  {
    id: 23666,
    parentId: null,
    name: "Test8",
    type: "xlsx",
    size: 2048,
    date: "2020-11-01",
  },
  {
    id: 23677,
    parentId: 23666,
    name: "Test7",
    type: "js",
    size: 1024,
    date: "2021-06-01",
  },
  {
    id: 23671,
    parentId: 23677,
    name: "Test7",
    type: "js",
    size: 1024,
    date: "2021-06-01",
  },
  {
    id: 23672,
    parentId: 23677,
    name: "Test7",
    type: "js",
    size: 1024,
    date: "2021-06-01",
  },
  {
    id: 23688,
    parentId: 23666,
    name: "Test7",
    type: "js",
    size: 1024,
    date: "2021-06-01",
  },
  {
    id: 23681,
    parentId: 23688,
    name: "Test7",
    type: "js",
    size: 1024,
    date: "2021-06-01",
  },
  {
    id: 23682,
    parentId: 23688,
    name: "Test7",
    type: "js",
    size: 1024,
    date: "2021-06-01",
  },
  {
    id: 24555,
    parentId: null,
    name: "test abc9",
    type: "avi",
    size: 224,
    date: "2020-10-01",
  },
  {
    id: 24566,
    parentId: 24555,
    name: "Test7",
    type: "js",
    size: 1024,
    date: "2021-06-01",
  },
  {
    id: 24577,
    parentId: 24555,
    name: "Test7",
    type: "js",
    size: 1024,
    date: "2021-06-01",
  },
]);
const moreHasRowExpand = (row) => {
  const $table = xTreeRef.value;
  if ($table) {
    return $table.isTreeExpandByRow(row);
  }
  return false;
};
const moreRemoveRowEvent = async (row) => {
  const type = await VXETable.modal.confirm("您确定要删除吗？");
  if (type === "confirm") {
    const matchObj = XEUtils.findTree(
      tableData.value,
      (item) => item.id === row.id
    );
    if (matchObj) {
      console.log("matchObj =>", matchObj);
      // 从树节点中移除
      matchObj.items.splice(matchObj.index, 1);
    }

    // const rowIndex = moreTableData.value.findIndex((item) => item.id == row.id);
    // if (rowIndex) {
    //   console.log("rowIndex =>", rowIndex);
    //   // 从树节点中移除
    //   moreTableData.value.splice(rowIndex, 1);
    // }
  }
};
</script>
<style lang="scss" scoped>
h2 {
  margin-top: 20px;
}
</style>
