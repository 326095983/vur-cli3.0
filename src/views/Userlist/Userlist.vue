<template>
  <div class="userlist">
    <div>
      <el-form :inline="true">
        <el-form-item class="btnRight">
          <el-button
            type="primary"
            size="small"
            icon="view"
            @click="handleEdit('', '新增用户档案')"
            >添加
          </el-button>
        </el-form-item>
      </el-form>
    </div>

    <div class="user_contanier">
      <el-table :data="userlist" border stripe style="width: 100%">
        <el-table-column type="index" label="序号" align="center" width="70">
        </el-table-column>
        <el-table-column prop="name" label="用户名" align="center" width="150">
        </el-table-column>
        <el-table-column prop="sex" label="性别" align="center" width="110">
          <template slot-scope="scope">
            <span
              :class="{ blue: scope.row.sex == '1', red: scope.row.sex == '2' }">{{ scope.row.sex == '1' ? '男' : '女' }}
            </span>
          </template>
        </el-table-column>
        <el-table-column prop="mobile" label="手机号" align="center" width="150">
        </el-table-column>
        <el-table-column prop="roleName" label="角色名称" align="center" width="150">
        </el-table-column>
        <el-table-column prop="idCard" label="身份证号" align="center" width="150">
        </el-table-column>
        <el-table-column prop="amt" label="余额(元)" align="center" width="150">
          <template slot-scope="scope">
            <span class="green">{{ scope.row.amt }}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="addTime"
          label="创建时间"
          :formatter="$common.formatTime"
          align="center"
          width="150"
        ></el-table-column>
        <el-table-column prop="status" label="状态" align="center" width="120">
          <template slot-scope="scope">
            <span
              :class= "{green: scope.row.status == '1', red: scope.row.status == '2'}">{{ scope.row.status == 2 ? '禁用' : '启用' }}
            </span>
          </template>
        </el-table-column>
        <el-table-column label="操作" min-width="200" align="center">
          <template slot-scope="scope">
            <el-button
              size="small"
              type="primary"
              @click="handleEdit(scope.row, '修改用户档案')"
              >修改
            </el-button>
            <el-button
              size="small"
              type="danger"
              @click="handleDelete(scope.row)"
              >删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <Userlog
      :dialog="dialog"
      v-if="dialog.show"
      :formData="formData"
      @update="getuselist"
    />
    <!-- 加v-if是因为你这样一进去就会去请求子组件的mounted 跟created 有时候我们进来只是为了看列表 不用v-show 是因为v-show只是用来显示隐藏使用 v-if 会销毁记录  -->
  </div>
</template>
<script>
import Userlog from "../../components/Userlog";
export default {
  data() {
    return {
      userlist: [],
      data: {
        pageSize: 10,
        currentPage: 1,
        searchKey: ""
      },
      dialog: {
        show: false,
        title: "",
        option: ""
      },
      //这个不要写在这里
      formData: {
        // name: "", //用户名
        // mobile: "", //手机号
        // idCard: "", //身份证号
        // sex: "", //性别
        // status: "", //状态
        // roleName: "", //角色名称
        // userId: "" //用户id
      } //这几个这边不用定义，下面就是定义   这种不应该这种做，现在是新增字段少，比如表单字段太多不好维护
    };
  },
  created() {
    this.getuselist();
  },
  methods: {
    //获取用户信息
    async getuselist() {
      let url = "/user/queryPage";
      let result = await this.$request.httpRequest("post", url, this.data);
      if (result.code == 200) {
        this.userlist = result.data.datas;
      } else {
        this.$message({ type: "error", message: result.msg });
      }
    },
    // 修改
    handleEdit(row, title) {
      //写一个就好了
      (this.dialog = {
        show: true,
        title: title
      }),
        (this.formData = {
          name: row.name, //用户名
          mobile: row.mobile, //手机号
          idCard: row.idCard, //身份证号
          sex: row.sex, //性别
          status: row.status, //状态
          roleId: row.roleId, //角色id
          id: row.id || "" //新增不会有id 修改id会有值
        }); //修改的值我建议你去调用接口
    },
    // 删除
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
            this.getuselist();
          } else {
            this.loading = false;
            this.$message({ type: "error", message: result.msg });
          }
        })
        .catch(() => {});
    },
    getRefresh() {
      this.getuselist();
    }
  },
  components: {
    Userlog
  }
};
</script>

<style scoped>
.userlist {
  width: 100%;
  height: 100%;
  padding: 16px;
  box-sizing: border-box;
}
.btnRight {
  float: right;
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
