<!--  -->
<template>
  <div id="login">
    <div class="login-wrap">
      <ul class="menu-tab">
        <li
          :class="{ current: item.current }"
          v-for="item in menuTab"
          :key="item.id"
          @click="toggleMenu(item)"
        >
          {{ item.txt }}
        </li>
      </ul>
      <!-- 表单 -->
      <el-form
        :model="ruleForm"
        status-icon
        :rules="rules"
        ref="loginForm"
        size="medium"
        class="login-form"
      >
        <el-form-item class="item-from" prop="username">
          <label>邮箱</label>
          <el-input
            type="text"
            v-model="ruleForm.username"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item class="item-from" prop="password">
          <label>密码</label>
          <el-input
            type="password"
            v-model="ruleForm.password"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item class="item-from" prop="passwords" v-show="model === 'register'">
          <label>重复密码</label>
          <el-input
            type="password"
            v-model="ruleForm.passwords"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item class="item-from" prop="code">
          <label>验证码</label>
          <el-row :gutter="20">
            <el-col :span="15">
              <el-input v-model="ruleForm.code"></el-input>
            </el-col>
            <el-col :span="9">
              <el-button type="success" class="block" :disabled="codeButtonStatus.status" @click="getSms()">{{codeButtonStatus.text}}</el-button>
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item>
          <el-button
            type="danger"
            class="login-btn block"
            @click="submitForm('loginForm')"
            :disabled="loginBtnStatus"
            >{{model === "login" ? "登录": "注册"}}</el-button
          >
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import sha1 from 'js-sha1';
import { Login, GetSms } from '@/api/login';
import { reactive, ref, isRef, onMounted } from "@vue/composition-api";
export default {
  setup(props, context) {
    let checkCode = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("年龄不能为空"));
      } else {
        callback();
      }
    };
    let validateUsername = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入用户名"));
      } else {
        callback(); //true
      }
    };
    let validatePassword = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else if (value.length < 6 || value.length > 20) {
        callback(new Error("密码为6至20位数字加字符!"));
      } else {
        callback();
      }
    };
    const menuTab = reactive([
      { txt: "登录", current: true, type: 'login' },
      { txt: "注册", current: false, type: 'register' }
    ]);
    // 模块值  ref（声明基数数据类型变量时使用）
    const model = ref("login");
    const codeButtonStatus = reactive({
      status: false,
      text: '获取验证码'
    });
    // 登录按钮禁用状态
    const loginBtnStatus = ref(false);
    const ruleForm = reactive({
      username: "",
      password: "",
      code: ""
    });
    const rules = reactive({
      username: [{ validator: validateUsername, trigger: "blur" }],
      password: [{ validator: validatePassword, trigger: "blur" }],
      code: [{ validator: checkCode, trigger: "blur" }]
    });
    const login = (() => {
      let requestData = {
        username: ruleForm.username,
        password: sha1(ruleForm.password),
        code: ruleForm.code
      }
      context.root.$store.dispatch('login', requestData).then(response => {
        context.root.$router.push({
          name: 'Console',
          params: {
          }
        })
        console.log('login')
      }).catch(error => {})
      // Login(requestData).then(response => {
      //   context.root.$router.push({
      //     name: 'Console',
      //     params: {
      //     }
      //   })
      //   console.log('login')
      // }).catch(error => {})
    })
    const getSms = (() => {
      if(ruleForm.username == '') {
        context.root.$message.error('请填写验证码');
        return false;
      }
      // 验证一次邮箱格式

      let requestData = {
        username: ruleForm.username, 
        model: model.value
      }
      codeButtonStatus.status = false;
      codeButtonStatus.text = "发送中";
      setTimeout(() => {
        GetSms(requestData).then(response => {
          // console.log(response.data);
          context.root.$message({
            type: 'success',
            message: data.message
          });
          loginBtnStatus.value = false
          countDown(60)
        }).catch(error => {
          console.log(error);
        }, 3000)
      })
    })
    /**
     * 声明函数
     */
    const toggleMenu = data => {
      menuTab.forEach(elem => {
        elem.current = false;
      });
      data.current = true;
      model.value = data.type;
      // 重置表单
      // this.$refs['loginForm'].resetFields(); // 2.0
      context.refs['loginForm'].resetFields();
    };
    /**
     * 提交表单
     */
    const submitForm = formName => {
      // context.refs[formName].validate(valid => {
      //   if (valid) {
          // login()
      //     // 注册成功之后执行下面两个
      //     // toggleMenu(menuTab[0]);
      //     // clearCountDown();
      //   } else {
      //     console.log("error submit!!");
      //     return false;
      //   }
      // });
      context.root.$router.push("/console")
    };
    // 倒计时
    const countDown = ((number) => {
      // 有一个bug，最开始的60和0不见了
      clearInterval(time.value) //是否存在，存在就清楚，可以添加判断，也可以直接先说好
      let time = number
      time.value = setInterval(() => {
        time--;
        if(time === 0) {
          clearInterval(time.value)
          codeButtonStatus.status = false
          codeButtonStatus.text = '再次获取'
        }else{
          codeButtonStatus.text = `倒计时${time}s`
        }
      }, 1000)
    })
    /**
     * 清楚倒计时
     */
    const clearCountDown = (() => {
      // 还原验证码按钮默认状态
      codeButtonStatus.status = false
      codeButtonStatus.text = '获取验证码'
      // 清楚倒计时
      clearInterval(time.value)
    })
    /**
     * 生命周期
     */
    // 挂载完成后
    onMounted(() => {
    });
    return {
      menuTab,
      model,
      rules,
      codeButtonStatus,
      loginBtnStatus,
      ruleForm,
      toggleMenu,
      submitForm,
      getSms,
      checkCode,
      validateUsername,
      validatePassword
    };
  }
};
</script>
<style lang="scss" scoped>
/* @import url(); 引入css类 */
#login {
  height: 100vh;
  background-color: #344a5f;
}
.login-wrap {
  width: 330px;
  margin: auto;
}
.menu-tab {
  text-align: center;
  li {
    display: inline-block;
    width: 88px;
    line-height: 36px;
    font-style: 14px;
    color: #ffffff;
    border-radius: 2px;
  }
  .current {
    background-color: rgba(0, 0, 0, 0.1);
  }
}
.login-form {
  text-align: left;
  margin-top: 29px;
  label {
    display: block;
    color: #ffffff;
    font-style: 14px;
    margin-bottom: 3px;
  }
  .item-from {
    margin-bottom: 13px;
  }
  .block {
    display: block;
    width: 100%;
  }
  .login-btn {
    margin-top: 19px;
  }
}
</style>
