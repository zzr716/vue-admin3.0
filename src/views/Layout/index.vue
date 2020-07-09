<!--  -->
<template>
<div id="layout" :class="menuStatus ? 'close': 'open'">
    <LayoutNav/>
    <LayoutHeader/>
    <LayoutMain/>
</div>
</template>

<script>
import { computed } from "@vue/composition-api";
import LayoutHeader from './Components/Header.vue'
import LayoutMain from './Components/Main.vue'
import LayoutNav from './Components/Nav.vue'
export default {
    name: 'layout',
    components: {
        LayoutHeader,
        LayoutMain,
        LayoutNav
    },
    setup(props, { root }){
        console.log(menuStatus)
        const menuStatus = computed(() => root.$store.state.isCollaps)
        console.log(menuStatus)

        return {
            menuStatus
        }
    }
}
</script>
<style scoped>
/* @import url(); 引入css类 */

</style>