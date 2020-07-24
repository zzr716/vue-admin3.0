<!--  -->
<template>
<el-select v-model="data.selectedValue">
                <el-option v-for="item in data.initOption" :key="item.value" :value="item.value" :label="item.label"></el-option>
            </el-select>
</template>

<script>
import { reactive, onMounted } from '@vue/composition-api'
export default {
    name: '',
    props: {
        config: {
            type: Array,
            default: () => {}
        }
    },
    setup(props) {
        const data = reactive({
            selectedValue: "",
            initOption: [],
            option: [
                {value: "name", label: "姓名"},
                {value: "phone", label: "姓名呀"},
                {value: "email", label: "姓名h"}
            ]
        })
        /**
         * 初始化下拉选择
         */
        let initOption = () => {
            // 数据校验
            if(props.config.length == 0) {
                return false;
            }
            let optionArr = [];
            props.config.forEach(item => {
                let arr = data.option.filter(elem => elem.value == item)[0]
                console.log(arr.length)
                // if(arr.length > 0) {
                    optionArr.push(arr)
                // }
            })
            // 初始化赋值
            data.initOption = optionArr;
            data.selectedValue = optionArr[0].value
        }
        /**
         * 组件挂载完成
         */
        onMounted(() => {
            initOption()
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