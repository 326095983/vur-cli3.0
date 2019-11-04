<template>
  <div class="head-nav">
    <el-row>
      <el-col :span="12" class="logo-container">
        <img src="../assets/logo200.png" class="logo" alt />
        <span class="title">XX在线管理后台系统</span>
      </el-col>
      <el-col :span="12" class="user">
        <div class="userinfo">
          <img src="../assets/use.jpeg" alt class="avatar" />
          <div class="welcome">
            <p class="name comename">欢迎</p>
            <p class="name avataname">{{user.name}}</p> 
          </div>
          <span class="username">
            <!-- 下拉箭头 -->
            <el-dropdown trigger="click" @command="setDialogInfo">
              <span class="el-dropdown-link">
                <i class="el-icon-caret-bottom el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="info">个人信息</el-dropdown-item>
                <el-dropdown-item command="logout">退出</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </span>
        </div>
      
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "HeadNav",
  data() {
    return {
      user: {
        name: "张三"
      }
    };
  },
  methods: {
    setDialogInfo(cmditem) {
      switch (cmditem) {
        case "info":
          this.showInfoList();
          break;
        case "logout":
          this.logout();
          break;
      }
    },
    showInfoList() {
      this.$router.push("/infoshow");
    },
    logout() {
      console.log("退出");
    }
  }
};
</script>

<style scoped>
.head-nav {
  width: 100%;
  /* min-width: 600px; */
  padding: 5px;
  background: #324057;
  color: #fff;
  border-bottom: 1px solid #1f2d3d;
}
.logo-container {
  height: 60px;
  line-height: 60px;
  /* min-width: 400px; */
}
.logo {
  height: 50px;
  width: 50px;
  margin-left: 5px;
  vertical-align: middle;
  display: inline-block;
  border-radius: 50%;
}
.title {
  margin-left: 10px;
  vertical-align: middle;
  font-size: 20px;
  letter-spacing: 3px;
}
.user {
  line-height: 60px;
}
.userinfo {
  float: right;
  margin-right: 20px;
}
.avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  vertical-align: middle;
  display: inline-block;
}
.welcome {
  display: inline-block;
  width: auto;
  vertical-align: middle;
  padding: 0 5px;
}
.name {
  line-height: 20px;
  text-align: center;
  font-size: 14px;
}
.comename {
  font-size: 12px;
}
.avataname {
  color: #409eff;
  font-weight: bolder;
}
.username {
  cursor: pointer;
  margin-right: 5px;
}
.el-dropdown-link {
  cursor: pointer;
  color: #fff;
}
.el-icon-arrow-down {
  font-size: 14px;
}
</style>