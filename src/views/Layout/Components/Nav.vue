<!--  -->
<template>
  <div id="nav-wrap">
    <el-menu
      background-color="transparent"
      text-color="#fff"
      active-text-color="#fff"
      default-active="1-4-1"
      class="el-menu-vertical-demo"
      :collapse="isCollapse"
      router="true"
    >
      <template v-for="(item, index) in routers">
        <el-submenu v-if="!item.hidden" :key="item.id" :index="index + ''">
          <!--  一级菜单  -->
          <template slot="title">
            <svg-icon :iconClass="item.meta.icon" :className="item.meta.icon" />
            <span slot="title">{{item.meta.name}}</span>
          </template>
          <!-- 子级菜单 -->
          <el-menu-item
            v-for="subItem in item.children"
            :key="subItem.id"
            :index="subItem.path"
          >{{subItem.meta.name}}</el-menu-item>
        </el-submenu>
      </template>
    </el-menu>
  </div>
</template>

<script>
import {
  ref,
  reactive,
  isRef,
  computed,
  toRefs,
  onMounted
} from "@vue/composition-api";
export default {
  name: "navMenu",
  setup(props, { root }) {
    /**
     * 数据
     */
    // const isCollapse = ref(false);
    // console.log(root.$router.options.routes)
    //   console.log(root.$store.state.isCollaps)
    //   console.log(root.$store.getters.count)
    // root.$store.commit('SET_COUNT', 100)
    /**
     * computed监听
     */
    const isCollapse = computed(() => {
      return root.$store.state.isCollaps;
    });
    const routers = reactive(root.$router.options.routes);
    /**
     * 函数
     */
    return {
      isCollapse,
      routers
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
  @include webkit(transition, all .3s ease 0s);
  svg {
    font-size: 20px;
    margin-right: 10px;
  }
}
.open {
  #nav-wrap { width: $navWidth}
}
.close {
  #nav-wrap { width: 64px}
}
</style>