<!--  -->
<template>
<div id="main-wrap">
    <router-view/>
</div>
</template>

<script>
export default {}
</script>
<style lang="scss" scoped>
@import "../../../style/config.scss";
/* @import url(); 引入css类 */
#main-wrap {
    position: fixed;
    left: $navWidth;
    top: 75px;
    right: 0;
    bottom: 0;
    border: 30xp solid #f7f7f7;
    border-bottom: none;
    box-sizing: border;
}
</style>