<template>
  <div class="usertwo_container">
    <div class="addbnt">
      <el-form>
        <el-form-item>
          <el-button
            style="float: right"
            type="primary"
            size="small"
            @click="add('', '新增用户档案')"
            >添加
          </el-button>
        </el-form-item>
      </el-form>
    </div>
    <el-table
      :data="uselist"
      v-loading="loading"
      element-loading-text="数据加载中"
      style="width: 100%"
      border
      strip
       empty-text>
      <div slot="empty">
        <div v-if="loading"></div>
        <div v-else>暂无数据</div>
      </div>
      <el-table-column type="index" label="序号" width="70" align="center" >
      </el-table-column>
      <el-table-column prop="name" label="用户名" width="150" align="center" >
      </el-table-column>
      <el-table-column prop="sex" label="性别" width="110" align="center" >
        <template slot-scope="scope">
          <span
          :class="{ blue: scope.row.sex == '1', red: scope.row.sex == '2'}">{{ scope.row.sex == "1" ? "男" : "女"}} </span>
        </template>
      </el-table-column>
      <el-table-column prop="mobile" label="手机号" width="140" align="center" >
      </el-table-column>
      <el-table-column prop="roleName" label="角色名称" width="130" align="center" >
      </el-table-column>
      <el-table-column prop="idCard" label="身份证" width="180" align="center">
      </el-table-column>
      <el-table-column prop="amt" label="余额(元)" width="100" align="center">
        <template slot-scope="scope">
          <span style="color:green">
            {{ $common.formatAmount(scope.row.amt, 2) }}
          </span>
        </template>
      </el-table-column>
      <el-table-column prop="addTime" :formatter="$common.formatTime" label="创建时间" width="170" align="center" >
      </el-table-column>
      <el-table-column prop="status" label="状态" width="120" align="center" >
        <template slot-scope="scope">
          <span
            :class="{
              green: scope.row.status == '1',
              red: scope.row.status == '2'
              }"
            >{{ scope.row.status == 2 ? "禁用" : "启用" }}
          </span>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="150" align="center">
        <template slot-scope="scope">
          <el-button
            size="small"
            type="primary"
            @click="add(scope.row, '修改用户档案')"
            >编辑
          </el-button>
          <el-button size="small" type="danger" @click="handleDelete(scope.row)" >删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <UserModel :dialog="dialog" v-if="dialog.show" @update="refresh" />
  </div>
</template>

<script>
import UserModel from "../../components/UserTwoModel";
export default {
  data() {
    return {
      uselist: [],
      data: {
        pageSize: 10,
        currentPage: 1,
        searchKey: ""
      },
      dialog: {
        show: false,
        title: "",
        userId: ""
      },
      loading: false
    };
  },
  methods: {
    // 获取用户信息
    async getuselist() {
      let url = "/user/queryPage";
      let result = await this.$request.httpRequest("post", url, this.data);
      if (result.code == 200) {
        this.uselist = result.data.datas;
      } else {
        this.$message({ type: "error", message: result.msg });
      }
    },
    // 修改 新增方法
    add(row, title) {
      this.dialog = {
        show: true,
        title: title,
        userId: row.id
      };
    },
    // 刷新列表
    refresh() {
      this.getuselist();
    },
    // 删除方法
    handleDelete(row) {
      this.$confirm(`是否要删除用户列表, 是否继续?`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(async () => {
          this.loading = true;
          let url = `/user/delete/${row.id}`;
          let result = await this.$request.httpRequest("DELETE", url);
          if (result.code == 200) {
            this.$message({ type: "success", message: result.msg });
            this.loading = false;
            this.getuselist();
          } else {
            this.loading = false;
            this.$message({ type: "error", message: result.message.msg });
          }
        })
        .catch(() => {
          this.$message({ type: "error", message: "取消操作了" });
        });
    }
  },
  mounted() {
    this.getuselist();
  },
  components: {
    UserModel
  }
};
</script>

<style scoped>
.usertwo_container {
  padding: 20px;
}
.blue {
  color: blue;
}
.red {
  color: red;
}
.green {
  color: green;
}
</style>
