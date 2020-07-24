<!--  -->
<template>
<div>
    <el-row :gutter="16">
        <el-col :span="1">关键字：</el-col>
        <el-col :span="3">
            <!-- <el-select v-model="data.selectedValue">
                <el-option v-for="item in data.option" :key="item.value" :value="item.value" :label="item.label"></el-option>
            </el-select> -->
            <Select :config="data.configOption"/>
        </el-col>
        <el-col :span="4">
            <el-button class="fr">添加用户</el-button>
        </el-col>
    </el-row>
</div>  
</template>

<script>
import { reactive } from '@vue/composition-api'
import Select from '@/components/Select/index.vue'
export default {
    name: 'userInfo',
    components: {
        Select
    },
    setup(props) {
        const data = reactive({
            configOption: ["name", "phone"],
            selectedValue: "",
            option: [
                {value: "name", label: "姓名"},
                {value: "name", label: "姓名"},
                {value: "name", label: "姓名"}
            ]
        })
        return {
            data
        }
    }
}
</script>
<style scoped>
/* @import url(); 引入css类 */

</style>