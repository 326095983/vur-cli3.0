<template>
  <div class="login">
    <section class="form_container">
      <div class="manage_tip">
        <span class="title">XX在线后台管理系统</span>
        <el-form
          :model="loginUser"
          :rules="rules"
          ref="loginForm"
          label-width="60px"
          class="loginForm"
        >
          <el-form-item label="邮箱" prop="email">
            <el-input v-model="loginUser.email" placeholder="请输入email"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input type="password" v-model="loginUser.password" placeholder="请输入密码"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" class="submit_btn" @click="submitForm('loginForm')">登录</el-button>
          </el-form-item>
          <div class="tiparea">
            <p>
              还没有账号？现在
              <router-link to="/register">注册</router-link>
            </p>
          </div>
        </el-form>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: "login",
  data() {
    return {
      loginUser: {
        email: "",
        password: ""
      },
      rules: {
        email: [
          {
            required: true,
            message: "邮箱根式不正确",
            trigger: "blur"
          }
        ],
        password: [
          {
            required: true,
            message: "密码不能为空",
            trigger: "blur"
          },
          {
            min: 6,
            max: 30,
            message: "长度在6到30个字符之间",
            trigger: "blur"
          }
        ]
      }
    };
  },
  methods: {
    // submitForm(formName) {
    //   this.$refs[formName].validate(valid => {
    //     if (valid) {
    //       this.$axios
    //         .post("/api/auth/login", this.loginUser)
    //         .then(res => {
    //           console.log(res);
    //           //token
    //         });
    //       this.$router.push("./index");
    //     }
    //   });
    // }
    //登录
    async submitForm() {
      let url = "/auth/login"; //请求接口名
      let result = await this.request.httpRequest("POST", url, this.loginUser);
      if (result.code == 200) {
        const { token } = result.data;
        //存储到ls
        localStorage.setItem("eleTpken", token);
      } else {
        this.$message({ type: "error", message: result.msg });
        this.$router.push("/index");
      }
    }
  }
};
</script>

<style scoped>
.login {
  position: relative;
  width: 100%;
  height: 100%;
  background: url("../../assets/bj1.jpg") no-repeat center center;
  background-size: 100% 100%;
}

.form_container {
  width: 370px;
  height: 210px;
  position: absolute;
  top: 20%;
  left: 34%;
  padding: 25px;
  border: radius 5px;
  text-align: center;
}

.form_container .manage_tip .title {
  font-weight: bold;
  font-size: 26px;
  color: #fff;
}

.loginForm {
  margin-top: 50px;
  background-color: #fff;
  padding: 20px 40px 20px 20px;
  border-radius: 5px;
  box-shadow: 0px 1px 1px #ccc;
}
.submit_btn {
  width: 100%;
}
.tiparea {
  text-align: right;
  font-size: 12px;
  color: #333;
}
.tiparea p a {
  color: #409eff;
}
</style>
