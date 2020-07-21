<template>
  <div>
    <el-dialog title="新增" :visible.sync="dialog_info_flag" 
    :modal-append-to-body="false"
    @open="openDialog"
    @close="close">
      <el-form :model="form">
        <el-form-item label="活动名称" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="活动区域" :label-width="formLabelWidth">
          <el-select v-model="form.region" placeholder="请选择活动区域">
            <el-option v-for="item in categoryOptions.item" :key="item.id" :label="item.category_name" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { ref, reactive, watch } from "@vue/composition-api";

export default {
  name: 'dialogInfo',
  // data () {
  //   return {
  //     dialog_info_flag: false,
  //     form: {
  //         name: '',
  //         region: '',
  //         date1: '',
  //         date2: '',
  //         delivery: false,
  //         type: [],
  //         resource: '',
  //         desc: ''
  //       },
  //       formLabelWidth: '120px'
  //   }
  // },
  // methods: {
  //   close () {
  //     this.dialog_info_flag = false
  //     this.$emit('update:flag', false)
  //     // this.$emit('close', false)
  //   }
  // },
  props: {
    flag: {
      type: Boolean,
      default: false
    },
    category: {
      type: Array,
      default: () => []
    }
  },
  // watch: {
  //   flag: {
  //     handler(newValue, oldValue) {
  //       this.dialog_info_flag = newValue
  //     }
  //   }
  // }
  setup (props, { emit }) {
    const dialog_info_flag = ref(false)
    const form =  reactive({
          name: '',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: ''
        })
    const categoryOptions = reactive({
      item: []
    })
    const formLabelWidth = ref('120px')
    
    // watch
    watch(() => {
      // console.log(props)
      dialog_info_flag.value = props.flag
    })

    // methods
    const close = () => {
      console.log(1)
      dialog_info_flag.value = false
      emit('update:flag', false)
      // emit('close', false)
    }
    const openDialog = () => {
        console.log(props.category)
        categoryOptions.item = props.category
    }
    return {
      dialog_info_flag,
      form,
      categoryOptions,
      formLabelWidth,
      close,
      openDialog
    }
  }
}
</script>
<style lang="scss" scoped>
</style>