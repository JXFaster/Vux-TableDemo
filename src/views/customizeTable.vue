<template>
  <div class="baseTable">
    <button @click="addLastColumn">增加最后一列</button>
    <button @click="delLastColumn">删除最后一列</button>
    <button @click="toggleFixedColumn(0, 'left')">切换第一列固定</button>
    <button @click="toggleFixedColumn(1, 'left')">切换第二列固定</button>
    <button @click="toggleThreeColumn(2, '300')">修改第三列宽度</button>

    <!-- 表格 -->
    <div class="tableBox">
      <!-- 可以设置大小尺寸：medium / small / mini (不设置的情况下为大)-->
      <!-- show-footer 是否显示表尾（默认为不显示） -->
      <!-- footer-method 表尾的数据获取方法，返回一个二维数组 -->
      <vxe-table
        border
        stripe
        size="medium"
        :data="tableData"
        show-footer
        :footer-method="footerMethod"
        :edit-config="{ mode: 'cell', trigger: 'click' }"
      >
        <vxe-column
          v-for="(item, index) in tableFieldData"
          :key="item.key"
          :type="item.type"
          :field="item.field"
          :title="item.title"
          :width="item.width"
          :fixed="item.fixed"
          :sortable="item.sortable"
          :filters="item.filters"
        >
          <!-- 自定义表头 -->
          <!-- {column, columnIndex, $columnIndex, _columnIndex, $rowIndex} -->
          <template #header="{ column, $rowIndex }">
            <div v-if="column.title == '姓名'">
              {{ column.title }}
            </div>
            <div v-else>{{ column.title }}</div>
          </template>

          <!-- 自定义单元格 -->
          <!-- row, column, columnIndex, $columnIndex, _columnIndex, $rowIndex -->
          <template #default="{ row, column, $rowIndex }">
            <div v-if="column.title == '序号'">
              {{ row.id }}
            </div>
            <div v-if="column.title == '操作'">
              <button>删除</button><button>编辑</button>
            </div>
            <div v-else>{{ row[column.property] }}</div>
          </template>

          <template #edit="{ row, column }">
            <vxe-input v-if="column.type == 'seq'" v-model="row.id"></vxe-input>
          </template>

          <!-- 自定义表尾 -->
          <!-- items, column, columnIndex, _columnIndex, $columnIndex, $rowIndex -->
          <template #footer="{ items, column, _columnIndex }">
            <span v-if="column.type == 'seq'">合计</span>
            <span v-if="column.title == '年龄'"
              >{{ items[_columnIndex] }}
            </span>
          </template>

          <!-- <template #filter="{ $panel, column }">
            <div v-if="column.field == 'age'">
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
            </div>

            <div v-if="column.field == 'role'">
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
            </div>
          </template> -->
        </vxe-column>
      </vxe-table>
    </div>
  </div>
</template>

<script setup>
// 表头数据
const tableFieldData = ref([
  // type为 seq 时 开启序号列 , fixed属性用来固定列
  { key: 0, type: "seq", width: 60, fixed: null, title: "序号" },
  // type为 checkbox 时为复选框
  { key: 1, type: "checkbox", width: 50, fixed: null },
  // type为 radio 时为复选框
  { key: 2, type: "radio", width: 50, fixed: null },
  {
    key: 3,
    field: "name",
    title: "姓名",
    width: 200,
    filters: [{ data: "" }],
  },
  {
    key: 4,
    field: "sex",
    title: "性别",
    width: 200,
    // 筛选的数据 不能单独
    filters: [
      { value: "女", label: "女" },
      { value: "男", label: "男" },
    ],
  },
  {
    key: 5,
    field: "age",
    title: "年龄",
    width: 200,
    // 排序
    sortable: true,
    filters: [{ data: "" }],
  },
  {
    key: 6,
    field: "role",
    title: "职务",
    width: 200,
    filters: [{ data: "" }],
  },
  {
    key: 7,
    field: "address",
    title: "地址",
    width: 200,
  },
  {
    key: 8,
    field: "operation",
    title: "操作",
    width: 200,
  },
]);

// 表格数据
const tableData = ref([
  { id: 1, name: "Test1", role: "开发", sex: "男", age: 28, address: "北京" },
  { id: 2, name: "Test2", role: "测试", sex: "女", age: 22, address: "广州" },
  { id: 3, name: "Test3", role: "产品", sex: "男", age: 32, address: "上海" },
  { id: 4, name: "Test4", role: "设计", sex: "女", age: 24, address: "上海" },
]);

// 表尾
const sumNum = (list, field) => {
  let count = 0;
  list.forEach((item) => {
    count += Number(item[field]);
  });
  return count;
};

const footerMethod = ({ columns, data }) => {
  return [
    columns.map((item) => {
      if (item.type === "seq") {
        return "合计";
      } else if (["age"].includes(item.field)) {
        return sumNum(data, item.field);
      }
      return "-";
    }),
  ];
};

// 筛选职位
const roleList = ref(["开发", "测试", "设计", "产品"]);

// 增加最后一列
const lastNum = ref(1);
const addLastColumn = () => {
  tableFieldData.value.push({
    key: tableFieldData.value[tableFieldData.value.length - 1].key + 1,
    field: `新增_${lastNum.value}`,
    title: `新增_${lastNum.value}`,
    width: 200,
  });

  lastNum.value += 1;
};

// 删除最后一列
const delLastColumn = () => {
  tableFieldData.value.pop();
};

// 切换列固定
const toggleFixedColumn = (index, val) => {
  console.log("val", val);
  tableFieldData.value[index].fixed = tableFieldData.value[index].fixed
    ? null
    : val;
};

// 修改第三列宽度
const toggleThreeColumn = (index, val) => {
  tableFieldData.value[index].width = val;
};
</script>

<style lang="scss" scoped>
.baseTable {
  padding-left: 50px;
  button {
    margin-left: 10px;
    border: none;
    background: #ccc;
    padding: 5px;
    border-radius: 5px;
    cursor: pointer;
  }
  .tableBox {
    width: 1500px;
  }
}
</style>
