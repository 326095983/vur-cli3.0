<template>
  <el-row class="left_menu">
    <el-col>
      <!-- @close="handleClose" -->
      <el-menu
        class="el-menu-vertical-demo"
        background-color="#324057"
        text-color="#fff"
        active-text-color="#409eff"
      >
        <router-link to="/index">
          <el-menu-item index="0">
            <i class="glyphicon glyphicon-list fa-margin"></i>
            <span slot="title">首页</span>
          </el-menu-item>
        </router-link>
        <template v-for="item in items">
          <el-submenu v-if="item.children" :index="item.path" :key="item.path">
            <template slot="title">
              <i :class="item.icon"></i>
              <span slot="title">{{ item.name }}</span>
            </template>
            <router-link
              v-for="(citem, cindex) in item.children"
              :to="citem.path"
              :key="cindex"
            >
              <el-menu-item :index="citem.path">
                <span slot="title">{{ citem.name }}</span>
              </el-menu-item>
            </router-link>
          </el-submenu>
        </template>
      </el-menu>
    </el-col>
  </el-row>
</template>

<script>
export default {
  name: "left_menu",
  data() {
    return {
      items: [
        {
          icon: "glyphicon glyphicon-usd fa-margin",
          name: "资金管理",
          path: "fund",
          children: [{ path: "fundlist", name: "资金流水" }]
        },
        {
          icon: "glyphicon glyphicon-cog fa-margin",
          name: "信息管理",
          path: "info",
          children: [
            { path: "infoshow", name: "个人信息" },
            { path: "userlist", name: "用户信息" },
            { path: "usertwo", name: "用户信息two" }
          ]
        }
      ]
    };
  }
};
</script>

<style scoped>
.left_menu {
  position: fixed;
  top: 71px;
  box-sizing: border-box;
  border-top: 1px solid rgba(0, 0, 0, 0.3);
  /* box-shadow: 1px 0px 1px #ccc; */
  left: 0;
  min-height: 100%;
  background-color: #324057;
  z-index: 99;
}
.el-menu {
  border: none;
}
.fa-margin {
  margin-right: 5px;
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 180px;
  min-height: 400px;
}
.el-menu-vertical-demo {
  width: 35px;
}
.el-submenu .el-menu-item {
  min-width: 180px;
}
.hiddenDropdown,
.hiddenDropname {
  display: none;
}
a {
  text-decoration: none;
}
</style>
