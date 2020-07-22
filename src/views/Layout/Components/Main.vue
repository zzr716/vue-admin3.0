<!--  -->
<template>
<div id="main-wrap">
    <router-view/>
</div>
</template>

<script>
export default {
    name: 'layoutMain',
    setup(props, { root }) {
        const bbb = root.$store.state.login.aaa
        console.log(bbb)
    }
}
</script>
<style lang="scss" scoped>
@import "../../../style/config.scss";
/* @import url(); 引入css类 */
#main-wrap {
    position: fixed;
    top: 75px;
    right: 0;
    bottom: 0;
    border: 30xp solid #f7f7f7;
    border-bottom: none;
    box-sizing: border;
    @include webkit(transition, all .3s ease 0s);
}
.open {
    #main-wrap { left: $navWidth + 30px;}
}
.close {
    #main-wrap { left: 94px;}
}
</style>