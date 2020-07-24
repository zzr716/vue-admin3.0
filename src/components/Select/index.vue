<!--  -->
<template>
<el-select v-model="selectedValue">
                <el-option v-for="item in initOptionData" :key="item.value" :value="item.value" :label="item.label"></el-option>
            </el-select>
</template>

<script>
// import { reactive, onMounted } from '@vue/composition-api'
export default {
    name: '',
    props: {
        config: {
            type: Array,
            default: () => {}
        }
    },
    data () {
        return {
            selectedValue: "",
            initOptionData: [],
            option: [
                {value: "name", label: "姓名"},
                {value: "phone", label: "姓名呀"},
                {value: "email", label: "姓名h"}
            ]
        }
    },
    methods: {
        initOption() {
            let initData = this.config
            console.log(initData)
            // 数据校验
            if(initData.length == 0) {
                return false;
            }
            let optionArr = [];
            initData.forEach(item => {
                let arr = this.option.filter(elem => elem.value == item)[0]
                // console.log(arr.length)
                // if(arr.length > 0) {
                    optionArr.push(arr)
                // }
            })
            // 初始化赋值
            this.initOptionData = optionArr;
            this.selectedValue = optionArr[0].value
        }
    },
    watch: {
        config: {
            handler(newValue,oldValue) {
                console.log(newValue)
                this.initOption()
            },
            immediate: true
        }
    },
    // setup(props) {
        
    //     /**
    //      * 初始化下拉选择
    //      */
        
    //     /**
    //      * 组件挂载完成
    //      */
    //     onMounted(() => {
    //         initOption()
    //     })
    //     return {
    //         data
    //     }
    // }
}
</script>

<style scoped>
/* @import url(); 引入css类 */

</style>