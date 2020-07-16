<template>
  <div>
    <el-form :inline="true" class="demo-form-inline">
      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item label="类型">
            <el-select v-model="value" placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="2">
          <el-button @click="dialogInfo = true">新增</el-button>
        </el-col>
      </el-row>
    </el-form>
    <DialogInfo :flag.sync="dialogInfo" @close="close" />
  </div>
</template>

<script>
import DialogInfo from "./dialog/index.vue";
import { ref, reactive, isRef, toRefs, onMounted } from "@vue/composition-api";
import { global } from '@/utils/global_v3.0.js'

export default {
  name: "infoIndex",
  components: {
    DialogInfo
  },
  setup(props, { root }) {
    const { confirm } = global()

    confirm()

    const options = reactive([
      {
        value: "选项1",
        label: "黄金糕"
      },
      {
        value: "选项2",
        label: "双皮奶"
      },
      {
        value: "选项3",
        label: "蚵仔煎"
      },
      {
        value: "选项4",
        label: "龙须面"
      },
      {
        value: "选项5",
        label: "北京烤鸭"
      }
    ]);
    const value = ref("");
    const dialogInfo = ref(false);
    const close = () => {
      console.log(999)
      dialogInfo.value = false
    }
    return {
      options,
      value,
      dialogInfo,
      close
    };
  }
};
</script>
<style lang="scss" scoped>
</style>