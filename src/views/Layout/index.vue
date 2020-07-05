<!--  -->
<template>
<div>
    <LayoutNav/>
    <LayoutHeader/>
    <LayoutMain/>
</div>
</template>

<script>
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
    setup(){}
}
</script>
<style scoped>
/* @import url(); 引入css类 */

</style>