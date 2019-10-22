<template>
<div class="fillContainer">
  <div>
    <el-form :inline="true" ref="add_data">
      <el-form-item class="btnRight">
        <el-button type="primary" size="small" icon="view" @click="handleAdd()">添加</el-button>
      </el-form-item>
    </el-form>
  </div>
  <div class="table_container">
    <el-table
    :data="tableData"
    style="width: 100%"
    border
    max-height="450"
    v-if="tableData.length > 0"
  >
    <el-table-column prop="index" label="序号" width="70" align="center">
    </el-table-column>
    <el-table-column label="创建时间" width="220" align="center">
      <template slot-scope="scope">
        <i class="el-icon-time"></i>
        <span>{{ scope.row.date }}</span>
      </template>
    </el-table-column>
    <el-table-column prop="type" label="收支类型" width="180" align="center">

    </el-table-column>
    <el-table-column prop="describe" label="收支描述" width="180" align="center">

    </el-table-column>
    <el-table-column prop="income" label="收入" width="170" align="center">
      <template slot-scope="scope">
        <span style="color:#00d053">{{ scope.row.income }}</span>
      </template>
    </el-table-column>
    <el-table-column prop="expend" label="支出" width="170" align="center">
      <template slot-scope="scope">
        <span style="color:#f56767">{{ scope.row.expend }}</span>
      </template>
    </el-table-column>
    <el-table-column prop="cash" label="账上现金" width="170" align="center">
      <template slot-scope="scope">
        <span style="color:#4db3ff">{{ scope.row.cash }}</span>
      </template>
    </el-table-column>
    <el-table-column prop="remark" label="备注" width="170" align="center">
      
    </el-table-column>
    <el-table-column label="操作" width="220" align="center">
      <template slot-scope="scope">
        <el-button size="small" type="primary" icon="edit" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
        <el-button size="small" type="danger" icon="delete" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
  </div>
  <Dialog :dialog= "dialog" :formData="formData" @update="getProfile" />
</div>
</template>
<script>
import Dialog from '../../components/Dialog'
export default {
  name: "fundlist",
  data() {
    return {
      formData: {
        type: '',
        describe: '',
        income: '',
        expend: '',
        cash: '',
        remark: ''
      },
      tableData: [
        {
          index: "1",
          date: "2016-05-02",
          type: "支付宝",
          describe: "购买水果",
          income: "100.00",
          expend: "100.00",
          cash: "300.00",
          remark: "明天早上买"
        },
        {
          index: "2",
          date: "2016-05-02",
          type: "支付宝",
          describe: "购买水果",
          income: "500.00",
          expend: "700.00",
          cash: "3000.00",
          remark: ""
        },
        {
          index: "3",
          date: "2016-05-02",
          type: "支付宝",
          describe: "购买水果",
          income: "10.00",
          expend: "880.00",
          cash: "650.00",
          remark: "晚上"
        }
      ],
      dialog: {
        show: false,
        title: '',
        option: 'edit'
      }
    };
  },
  created() {
    //调用获取数据方法
    // this.getProfile();
  },
  methods: {
    //获取数据方法
    async getProfile1() {
      let url = "/owner/queryPage";
      let result = await this.request.httpRequest("POST", url, this.data);
      if (result.code == 200) {
        // this.total = result.data.totalRows
        // this.data.pageSize = result.data.pageSize
        // this.data.currentPage = result.data.currentPage
        // this.getList = result.data.datas
        console.log(result.data);
      } else {
        this.$message({ type: "error", message: result.msg });
      }
    },
    getProfile() {
      console.log('只能这样测试调用获取数据方法');
      
    },
    handleEdit(index, row) {
      //编辑按钮
      // console.log(this.dialog);//为什么可以打印出这样的内容
      this.dialog = {
        show: true,
        title: '修改资金信息',
        option: 'edit'
      };
      this.formData = {
        type: row.type,
        describe: row.describe,
        income: row.income,
        expend: row.expend,
        cash: row.cash,
        remark: row.remark,
        id: row._id
      }
    },
    handleDelete(index, row) {
      // 删除按钮
      // this.$axios.delete(`/api/profiles/delete/${row.id}`).then(res => {
      //   this.$message('删除成功');
      //   this.getProfile();
      // })
      this.$message('删除成功');
    },
    handleAdd() {
      // 添加按钮
      this.dialog = {
        show: true,
        title: '添加资金信息',
        option: 'add'
      },
      this.formData = {
        type: '',
        describe: '',
        income: '',
        expend: '',
        cash: '',
        remark: '',
        id: ''
      }
    }
  },
  components: {
    Dialog
  }
};
</script>

<style scoped>
.fillContainer {
  width: 100%;
  height: 100%;
  padding: 16px;
  box-sizing: border-box;
}
.btnRight {
  float: right;
}
</style>

