<template>
  <div class="infoshow">
    <el-row class="row-bg" type="flex" justify="center">
      <el-col :span="8">
        <div class="user">
          <img src="../../assets/use.jpeg" alt class="avatar" />
        </div>
      </el-col>
      <el-col :span="16">
        <div class="userinfo">
          <div class="userinfo-container">
            <div class="user-item">
              <i class="glyphicon glyphicon-user"></i>
              <span>张三</span>
            </div>
            <div class="user-item">
              <i class="glyphicon glyphicon-cog"></i>
              <span>管理员</span>
            </div>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
export default {};
</script>
<style scoped>
.infoshow {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
}
.row-bg {
  width: 100%;
  height: 100%;
}
.user {
  text-align: center;
  position: relative;
  top: 30%;
}
.user img {
  width: 150px;
  border-radius: 50%;
}
.userinfo {
  height: 100%;
  background-color: #eee;
}
.userinfo-container {
  position: absolute;
  top: 50%;
  transform: translateY(-90%);
}
.user-item {
  font-size: 20px;
  padding: 15px;
  font-weight: bold;
}
</style>
