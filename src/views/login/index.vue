<template>
  <div class="login-box">
    <div class="login">
      <h2 class="title">基本后台管理系统</h2>
      <el-form status-icon :model="loginForm" size="medium" :rules="loginRules" ref="loginFormRef">
        <el-form-item prop="mobile">
          <el-input placeholder="请输入手机号" v-model="loginForm.mobile"/>
        </el-form-item>
        <el-form-item prop="password">
          <el-input placeholder="请输入密码" type="password" v-model="loginForm.password"/>
        </el-form-item>
        <el-form-item prop="validateCode">
          <div class="validate-code">
            <el-input class="input" placeholder="请输入验证码" type="password" v-model="loginForm.validateCode"/>
            <img class="image" src="http://captcha.qq.com/getimage?aid=2000201&uin=0&0.4696037055839024">
          </div>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="login">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import {reactive, ref} from "vue";

export default {
  name: "index",
  setup(){
    const loginForm = reactive({
      mobile: '',
      password: '',
      validateCode: ''
    })
    const loginRules = reactive({
      mobile: [
        { required: true, message: '请输入手机号', trigger: 'blur'}
      ],
      password: [
        { required: true, message: '请输入密码', trigger: 'blur'}
      ],
      validateCode: [
        { required: true, message: '请输入验证码', trigger: 'blur'}
      ]
    })
    const loginFormRef = ref()

    const login = () => {
      loginFormRef.value.validate((valid) => {
        if( valid ) {
          alert('login')
        }
      })
      // refs['loginForm'].validate((valid) => {
      //   alert(valid)
      // })
    }

    return{
      loginForm,
      loginRules,
      loginFormRef,
      login
    }
  }
}
</script>

<style scoped lang="scss">
.login-box{
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  .login{
    width: 25%;
    text-align: center;
    background: #FFF;
    min-width: 340px;
    border-radius: 10px;
    padding: 40px;
    .title{
      margin-bottom: 20px;
      font-size: 28px;
    }
    button{
      width: 100%;
    }
    .validate-code{
      display: flex;
      flex-direction: row;
      .image{
        margin-left: 10px;
        height: 36px;
        border-radius: 4px;
        width: calc(30% - 10px);
      }
      .input{
        width: 70%;
      }
    }
  }
}
</style>
