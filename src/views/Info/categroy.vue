<!--  -->
<template>
  <div id="category">
    <el-button type="danger" @click="addFirst">添加一级分类</el-button>
    <hr class="hr-e9e9e9"/>
    <div>
      <el-row :gutter="30">
        <el-col :span="8">
          <div class="category-wrap">
            <div class="category" v-for="firstItem in category.item" :key="firstItem.id">
              <h4>
                <svg-icon icon-class="jiahao"></svg-icon>
                {{ firstItem.category_name }}
                <div class="button-group">
                  <el-button size="mini" type="danger" round @click="editCategory({data: firstItem, type: 'category_first' })">编辑</el-button>
                  <el-button size="mini" round @click="deleteCategory(firstItem.id)">删除</el-button>
                  <el-button size="mini" type="success" round>添加子级</el-button>
                </div>
              </h4>
              <ul v-if="firstItem.children">
                <li v-for="secondItem in firstItem.children" :key="secondItem.id">
                  {{ secondItem.category_name }}
                  <div class="button-group">
                    <el-button size="mini" type="danger" round>编辑</el-button>
                    <el-button size="mini" round>删除</el-button>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </el-col>
        <el-col :span="16">
          <h4 class="menu-title">一级分类编辑</h4>
          <el-form ref="formLabelAlign" :label-position="labelPosition" class="from-wrap" 
            label-width="142px" :model="formLabelAlign">
            <el-form-item label="一级菜单名称:" v-if="category_first">
              <el-input v-model="formLabelAlign.name" :disabled="category_first_disabled"></el-input>
            </el-form-item>
            <el-form-item label="二级菜单名称:" v-if="category_second">
              <el-input v-model="formLabelAlign.region" :disabled="category_second_disabled"></el-input>
            </el-form-item>
                <el-button type="danger" @click="submit" :loading="submit_loading" :disabled="category_submit_disabled">确认</el-button>
            <el-form-item>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import { ref, reactive, onMounted } from "@vue/composition-api";
import { AddFirstCategory,GetCategory,DeleteCategory,EditCategory } from "@/api/news"
import { global } from '@/utils/global_v3.0.js'

export default {
  name: "category",
  setup(props, { root, refs }) {
    // 
    const { confirm } = global();
    /**
     * data
     */
    const submit_button_type = ref('');
    const labelPosition = ref('right');
    const category_first = ref(true);
    const category_second = ref(true);
    const submit_loading = ref(false);
    const category_first_disabled = ref(true);
    const category_second_disabled = ref(true);
    const category_submit_disabled = ref(true)

    const formLabelAlign = reactive({
          name: '',
          region: '',
          type: ''
        }
    );
    const category = reactive({
      item: [],
      current: []
      })
    
    // methods 挂载完成
    const getCategory = () => {
      console.log(111)
      GetCategory({}).then(response => {
        console.log(response.data.data.data)
        category.item = response.data.data.data
      }).catch(error => {})
    }
    onMounted(() => {
      getCategory()
    })
    const submit = () => {
      if(submit_button_type.value == "catagory_first_add") {
        addFirstCategory()
      }
      if(submit_button_type.value == "category_first") {
        editFirstCategory()
      }
    };
    const addFirst = () => {
      submit_button_type.value = 'catagory_first_add'
      console.log(submit_button_type.value)
      category_first.value = true;
      category_second.value = false;
      category_first_disabled.value = false;
      category_submit_disabled.value = false;
    }
    const addFirstCategory = () => {
      if(!formLabelAlign.name) {
        root.$message({
          message: "分类名称不能为空",
          type: "error"
        })
        return false
      }
      // 按钮加载状态
      submit_loading.value = true
      AddFirstCategory({"categoryName": formLabelAlign.name }).then(response => {
        console.log(response)
        let data = response.data;
        if(data.resCode === 0) {
          root.$message({
            message: data.message,
            type: "success"
          })
          category.item.push(response.data.data)
          // console.log(category.item)
          // getCategory()
        }
        submit_loading.value = false;
        refs.formLabelAlign.resetFields();
      }).catch(error => {
        submit_loading.value = false;
        refs.formLabelAlign.resetFields();
      })
    }
    // 删除
    const deleteCategory = (categoryId) => {
      /**
       * 删除弹窗
      //  */
      // confirm({
      //   content: "确认删除",
      //   tip: "经过",
      //   fn: 
      // })
      DeleteCategory({categoryId: categoryId}).then(response => {
        console.log(response)
        // 两个参数的时候是删除，三个参数的时候替换、插入数据
        // splice(1,2) 从第一个位置删除两个
        // 操作数组 splice("指定起始位置")
        /**
         * 通过索引删除
         * es6 findIndex
         */ 
        // let index = category.item.findIndex(item => item.id == categoryId)
        // console.log(index)
        // category.item.splice(index, 1)
        /**
         * filter 数据量不大的时候这样
         */
        let newData = category.item.filter(item => item.id != categoryId)
        category.item = newData
      }).catch(error => {
        
      })
    }
    // 编辑
    const editCategory = (params) => {
      category_second_disabled.value = false;
      category_first_disabled.value = false;
      category_submit_disabled.value = false;
      formLabelAlign.name = params.data.category_name;
      submit_button_type.value = params.type;
      // 储存当前数据对象
      category.current = params.data;
    }
    const editFirstCategory = () => {
      if(category.current.length == 0) {
        root.$message({
          message: "未选择分类",
          type: "error"
        })
        return false;
      }
      let requestData = {
        id: category.current.id,
        categoryName: formLabelAlign.name
      }
      EditCategory(requestData).then(response => {
        root.$message({
          message: response.data.message,
          type: 'success'
        })
        // let data = category.item.filter(item => item.id == category.current.id)
        // data[0].category_name = response.data.data.data.categoryName
        category.current.category_name = response.data.data.data.categoryName
        // 清除输入框
        formLabelAlign.name = '';
        category.current = []
      }).catch(error => {
        
      })
    }
    return {
        labelPosition,
        submit_button_type,
        formLabelAlign,
        category_first,
        category_submit_disabled,
        category_second_disabled,
        category_first_disabled,
        category_second,
        submit_loading,
        category,
        submit,
        addFirst,
        deleteCategory,
        editCategory
    }
  }
};
</script>
<style lang="scss" scoped>
/* @import url(); 引入css类 */
@import "../../style/config.scss";
#category {
  text-align: left;
}
.hr-e9e9e9 {
    width: calc(100% + 60px);
    margin-left: -30px;
    border: none;
    margin-top: 30px;
    margin-bottom: 30px;
    border-bottom: 1px solid #e9e9e9;
}
.category-wrap {
  div:first-child {
    &:before {
      top: 20px;
    }
  }
  div:last-child {
    &:before {
      bottom: 20px;
    }
  }
}
.menu-title {
  padding-left: 22px;
  line-height: 44px;
  background-color: #f3f3f3;
}
.category {
  position: relative;
  line-height: 44px;
  cursor: pointer;
  &:before {
    content: "";
    position: absolute;
    left: 22px;
    top: 0;
    bottom: 0;
    width: 32px;
    border-left: 1px dotted #000;
  }
  h4 {
    padding-left: 40px;
  }
  svg {
    position: absolute;
    left: 15px;
    top: 15px;
    background-color: #fff;
    font-size: 17px;
  }
  li {
    position: relative;
    padding-left: 36px;
    margin-left: 24px;
    &:before {
      content: "";
      position: absolute;
      left: 0;
      top: -22px;
      width: 32px;
      height: 44px;
      border-bottom: 1px dotted #000;
    }
  }
  h4,
  li {
    @include webkit(transition, all 0.3s ease 0);
    &:hover {
      background-color: #f3f3f3;
      .button-group {
        display: block;
      }
    }
  }
}
.button-group {
  display: none;
  position: absolute;
  right: 11px;
  top: -1px;
  z-index: 2;
  button {
    font-size: 12px;
  }
}
.from-wrap {
    width: 410px;
    padding-top: 36px;
}
</style>