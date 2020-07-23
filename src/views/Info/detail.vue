<!--  -->
<template>
<div></div>
</template>

<script>
import { ref, reactive, onMounted } from "@vue/composition-api";
export default {
name: "infoDetail",
setup (props, { root }) {
    let id = root.$route.query.id
    return {
        id
    }
}
}
</script>
<style scoped>
/* @import url(); 引入css类 */

</style>