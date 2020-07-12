<!--  -->
<template>
<div id="header-wrap">
    <span @click="navMenuState">click</span>
    hh
</div>
</template>

<script>
import { ref, reactive, isRef, toRefs, onMounted } from "@vue/composition-api";
export default {
    name: 'LayoutHeader',
    setup(props, { root }){
        const navMenuState = () => {
            root.$store.commit('app/SET_COLLAPS')
            // root.$store.dispatch('setMenuStatus')
        }
        return {
            navMenuState
        }
    }
}
</script>
<style lang="scss" scoped>
@import "../../../style/config.scss";
/* @import url(); 引入css类 */
#header-wrap {
    position: fixed;
    top: 0;
    right: 0;
    left: $navWidth;
    height: 75px;
    background-color: #ffffff;
    -webkit-box-shadow: 0 3px 16px 0 rgba(0, 0, 0, .1);
    @include webkit(transition, all .3s ease 0s);
}
.open {
    #header-wrap { left: $navWidth;}
}
.close {
    #header-wrap { left: 64px;}
}
</style>