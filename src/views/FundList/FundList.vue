<template>
  <div class="fillContainer">
    <div>
      <el-form :inline="true" ref="add_data" :model="search_data">
        <!-- 筛选 -->
        <el-form-item label="按照时间筛选:">
          <el-date-picker
          v-model="search_data.startTime"
          type="datetime"
          placeholder="选择开始时间"
          >
          </el-date-picker>
          --
          <el-date-picker
          v-model="search_data.endTime"
          type="datetime"
          placeholder="选择结束时间"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" size="small" icon="search" @click="handleSearch()">筛选</el-button>
        </el-form-item>
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
        <el-table-column prop="index" label="序号" width="70" align="center"></el-table-column>
        <el-table-column label="创建时间" width="220" align="center">
          <template slot-scope="scope">
            <i class="el-icon-time"></i>
            <span>{{ scope.row.date }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="type" label="收支类型" width="180" align="center"></el-table-column>
        <el-table-column prop="describe" label="收支描述" width="180" align="center"></el-table-column>
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
        <el-table-column prop="remark" label="备注" width="170" align="center"></el-table-column>
        <el-table-column label="操作" width="220" align="center">
          <template slot-scope="scope">
            <el-button
              size="small"
              type="primary"
              icon="edit"
              @click="handleEdit(scope.$index, scope.row)"
            >编辑</el-button>
            <el-button
              size="small"
              type="danger"
              icon="delete"
              @click="handleDelete(scope.$index, scope.row)"
            >删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
        <el-row>
          <el-col :span="24">
            <div class="pagination">
              <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page.sync="paginations.page_index"
                :page-sizes="paginations.page_sizes"
                :page-size="paginations.page_size"
                :layout="paginations.layout"
                :total="paginations.total"
              ></el-pagination>
            </div>
          </el-col>
        </el-row>
    </div>
    <Dialog :dialog="dialog" :formData="formData" @update="getProfile" />
  </div>
</template>
<script>
import Dialog from "../../components/Dialog";
export default {
  name: "fundlist",
  data() {
    return {
      search_data: {
        startTime: '',
        endTime: ''
      },
       data:{
          currentPage:1,
          pageSize:10,
					type:'',
					yearMonth:'',
					name:'',
					status:'',
					domainId:'',
					room:'',
        },
      paginations: {
        page_index: 1, //当前位于那页
        total: 0, //总数
        page_size: 5, // 一页显示多少条
        page_sizes: [5, 10, 15, 20], // 每页显示多少条
        layout: "total, sizes, prev, pager, next, jumper" // 翻页属性
      },
      formData: {
        type: "",
        describe: "",
        income: "",
        expend: "",
        cash: "",
        remark: ""
      },
      allTableData: [],
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
        },
        {
          index: "4",
          date: "2016-05-02",
          type: "支付宝",
          describe: "购买水果",
          income: "10.00",
          expend: "880.00",
          cash: "650.00",
          remark: "晚上"
        },
        {
          index: "5",
          date: "2016-05-02",
          type: "支付宝",
          describe: "购买水果",
          income: "10.00",
          expend: "880.00",
          cash: "650.00",
          remark: "晚上"
        },
        {
          index: "6",
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
        title: "",
        option: "edit"
      }
    };
  },
  handleSearch() {
    // 筛选数据方法
    console.log(112);
    
  },
  created() {
    //调用获取数据方法
    this.getProfile();
  },
  methods: {
    //获取数据方法
    async getProfile() {
      let url = "/settle/queryPage";
      let result = await this.$request.httpRequest("POST", url, this.data);
      if (result.code == 200) {
        // this.total = result.data.totalRows
        // this.data.pageSize = result.data.pageSize
        // this.data.currentPage = result.data.currentPage
        // this.getList = result.data.datas
        console.log(result.data);
        // this.allTableData = res.data;
        //设置分页数据
        // this.setPaginations();
      } else {
        this.$message({ type: "error", message: result.msg });
      }
    },
    setPaginations() {
      //分页属性
      this.paginations.toatl = this.allTableData.length;
      this.paginations.page_index = 1;
      this.paginations.page_size = 5;
      //设置默认的分页数据
      this.tableData = this.allTableData.filter((item, index) => {
        return index < this.paginations.page_size;
      })
    },
    handleEdit(index, row) {
      //编辑按钮
      // console.log(this.dialog);//为什么可以打印出这样的内容
      this.dialog = {
        show: true,
        title: "修改资金信息",
        option: "edit"
      };
      this.formData = {
        type: row.type,
        describe: row.describe,
        income: row.income,
        expend: row.expend,
        cash: row.cash,
        remark: row.remark,
        id: row._id
      };
    },
    handleDelete(index, row) {
      // 删除按钮
      // this.$axios.delete(`/api/profiles/delete/${row.id}`).then(res => {
      //   this.$message('删除成功');
      //   this.getProfile();
      // })
      this.$message("删除成功");
    },
    handleAdd() {
      // 添加按钮
      (this.dialog = {
        show: true,
        title: "添加资金信息",
        option: "add"
      }),
        (this.formData = {
          type: "",
          describe: "",
          income: "",
          expend: "",
          cash: "",
          remark: "",
          id: ""
        });
    },
    handleSizeChange(page_size) {
      // 切换size
      this.paginations.page_index = 1;
      this.paginations.page_size = page_size;
      this.tableData = this.allTableData.filter((item, index) => {
        return index < page_size;
      })
    },
    handleCurrentChange(page){
      // 指定跳转的页面
      // 获取当前页数
      let index = this.paginations.page_size * (page - 1);
      // 数据的总数
      let nums = this.paginations.page_size * page;
      // 容器
      let tables = [];
      for (let i = index; i < nums; i++) {
        if (this.allTableData[i]) {
          tables.push(this.allTableData[i]);
        }
        this.tableData = tables;
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
.pagination {
  margin-top: 10px;
  float: right;
}
</style>
