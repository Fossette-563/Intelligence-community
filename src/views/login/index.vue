<template>
  <div class="wisdow-login">
    <h1>智慧服务平台</h1>
    <div class="login-box">
      <h3>欢迎登录</h3>
      <el-form ref="loginFormRef" :rules="rules" :model="loginForm">
        <el-form-item prop="username">
          <el-input
            v-model="loginForm.username"
            clearable
            suffix-icon="el-icon-user-solid"
          ></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            v-model="loginForm.password"
            type="password"
            clearable
            suffix-icon="el-icon-s-goods"
          ></el-input>
        </el-form-item>
        <el-form-item prop="captchaImg">
          <el-input
            v-model="loginForm.captchaImg"
            style="width: 150px"
            clearable
          ></el-input>
          <img :src="imgsrc" class="imgcode" @click="refreshImg" />
        </el-form-item>
        <el-form-item>
          <el-button
            type="danger"
            @click="handLogin"
            class="danger"
            :loading="setloading"
            >{{ setloading ? '登录中...' : '立即登录' }}</el-button
          >
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import UserApi from '@/api/user'
import { mapActions } from 'vuex'
import router from '@/router'
import { computed } from 'vue'

export default {
  name: 'loginPage',
  data() {
    return {
      setloading: false,
      imgsrc: '',
      loginForm: {
        username: 'duck',
        password: 'admin888',
        captchaImg: '',
        token: ''
      },
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
        captchaImg: [
          { required: true, message: '请输入验证码', trigger: 'blur' }
        ]
      }
    }
  },
  created() {
    this.handImageCode()
  },
  methods: {
    ...mapActions({
      login: 'user/getLogin',
      UserInfo: 'user/getUserInfo'
    }),
    /**点击刷新图形验证码 */
    refreshImg() {
      this.imgsrc = ''
      this.handImageCode()
    },
    /**获取图形验证码 */
    async handImageCode() {
      const { captchaImg } = await UserApi.imgcode()
      this.imgsrc = captchaImg
    },
    /**表单验证 */
    handLogin() {
      this.$refs.loginFormRef.validate((valid) => {
        if (valid) {
          this.setHandLogin()
        }
      })
    },
    /**登录请求 */
    async setHandLogin() {
      try {
        this.setloading = true
        await this.login(this.loginForm)
        router.push('./')
        this.setUserInfo()
      } catch (error) {
        console.log(error)
      }
      this.setloading = false
    },
    /**用户请求 */
    async setUserInfo() {
      try {
        await this.UserInfo()
      } catch (error) {
        console.log(error)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.wisdow-login {
  position: fixed;
  width: 100%;
  height: 100%;
  background: url(http://zh.9yuecloud.com/img/bg.970bc3a9.jpg) no-repeat 0 0;
  background-size: 100% 100%;
  overflow: hidden;
  h1 {
    color: #fff;
    font-size: 40px;
    text-align: center;
    margin-top: 40px;
  }
  .login-box {
    width: 300px;
    height: 300px;
    margin: auto;
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    h3 {
      color: #fff;
      font-size: 30px;
    }
    .el-form {
      margin-top: 30px;
      .imgcode {
        position: absolute;
        width: 130px;
        height: 40px;
        line-height: 40px;
        margin-left: 20px;
      }
      .danger {
        width: 100%;
      }
    }
  }
}
</style>
