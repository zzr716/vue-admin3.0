<!--  -->
<template>
  <div id="nav-wrap">
    <el-menu
      background-color="transparent"
      text-color="#fff"
      active-text-color="#fff"
      default-active="1-4-1"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose"
      :collapse="isCollapse"
      router="true"
    >
        <template v-for="(item, index) in routers">
            <el-submenu v-if="!item.hidden" :key="item.id" :index="index">
                <!--  一级菜单  -->
                <template slot="title">
                <i class="el-icon-location"></i>
                <span slot="title">{{item.meta.name}}</span>
                </template>
                <!-- 子级菜单 -->
                <el-menu-item v-for="subItem in item.children" :key="subItem.id" :index="subItem.path">{{subItem.meta.name}}</el-menu-item>
            </el-submenu>
        </template>
    </el-menu>
  </div>
</template>

<script>
import { ref, reactive, isRef, toRefs, onMounted } from "@vue/composition-api";
export default {
  name: "navMenu",
  setup(props, { root }) {
      /**
       * 数据
       */
    const isCollapse = ref(false);
    console.log(root.$router.options.routes)
    const routers = reactive(root.$router.options.routes)
    /**
     * 函数
     */
    const handleOpen = (key, keyPath) => {
      console.log(key, keyPath);
    };
    const handleClose = (key, keyPath) => {
      console.log(key, keyPath);
    };
    return {
      isCollapse,
      routers,
      handleOpen,
      handleClose
    };
  }
};
</script>
<style lang="scss" scoped>
@import "../../../style/main.scss";
/* @import url(); 引入css类 */
#nav-wrap {
  position: fixed;
  top: 0;
  left: 0;
  width: $navWidth;
  height: 100vh;
  background: #344a5f;
}
</style>