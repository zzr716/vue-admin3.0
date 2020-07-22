<template>
  <div>
    <el-form :inline="true" class="demo-form-inline">
      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item label="类型">
            <el-select v-model="value" placeholder="请选择">
              <el-option
                v-for="item in options.categroy"
                :key="item.value"
                :label="item.category_name"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="2">
          <el-button @click="dialogInfo = true">新增</el-button>
        </el-col>
      </el-row>
    </el-form>
    <el-table :data="tableData.item" border style="width: 100%">
      <el-table-column prop="createDate" label="日期" width="180"></el-table-column>
      <el-table-column prop="content" label="姓名" width="180"></el-table-column>
      <el-table-column prop="title" label="地址"></el-table-column>
      <el-table-column
      fixed="right"
      label="操作"
      width="100">
      <template slot-scope="scope">
        <el-button type="text" size="small">查看</el-button>
        <el-button type="text" size="small">编辑</el-button>
      </template>
    </el-table-column>
    </el-table>
    <div class="block">
    <span class="demonstration">完整功能</span>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="1"
      :page-sizes="[10, 20, 30, 40]"
      :page-size="10"
      layout="total, sizes, prev, pager, next, jumper"
      :total="30">
    </el-pagination>
  </div>
    <DialogInfo :category="options.categroy" :flag.sync="dialogInfo" @close="close" />
  </div>
</template>

<script>
import DialogInfo from "./dialog/index.vue";
import {
  ref,
  reactive,
  isRef,
  toRefs,
  onMounted,
  watch
} from "@vue/composition-api";
import { GetCategory, GetList } from "@/api/news";
import { global } from "@/utils/global_v3.0.js";
import { common } from "@/api/common";
import categroyVue from "./categroy.vue";

export default {
  name: "infoIndex",
  components: {
    DialogInfo
  },
  setup(props, { root }) {
    const { confirm } = global();
    confirm();

    const { getInfoCategory, category } = common();

    const options = reactive({
      categroy: []
    });
    const value = ref("");
    const dialogInfo = ref(false);
    const total = ref('');
    const tableData = reactive({
      item: []
    });
    const handleSizeChange = (val) => {
      console.log(333)
        console.log(`每页 ${val} 条`);
      }
    const handleCurrentChange = (val) => {
      console.log(444)
        console.log(`当前页: ${val}`);
      }
    const close = () => {
      console.log(999);
      dialogInfo.value = false;
    };
    const getCategory = () => {
      console.log(111);
      GetCategory({})
        .then(response => {
          console.log(response.data.data.data);
          options.categroy = response.data.data.data;
        })
        .catch(error => {});
    };
    const getList = () => {
      let requestData = {
        categoryId: "",
        startTiem: "",
        endTime: "",
        title: "",
        id: "",
        pageNumber: 1,
        pageSize: 10
      };
      GetList(requestData)
        .then(response => {
          console.log(response.data.data.data);
          tableData.item = response.data.data.data;
          console.log(response.data.data.total);
          total.value = response.data.data.total
        })
        .catch(error => {});
    };
    /**
     * 生命周期
     */
    onMounted(() => {
      // getCategory()
      getInfoCategory();
      getList();
    });
    /**
     * watch
     */
    watch(
      () => category.item,
      value => {
        console.log(value);
        options.categroy = value;
      }
    );
    return {
      options,
      tableData,
      total,
      value,
      dialogInfo,
      close
    };
  }
};
</script>
<style lang="scss" scoped>
</style>