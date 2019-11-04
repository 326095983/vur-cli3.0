<template>
  <div class="usertwo">
    <el-dialog :title="dialog.title" v-loading="showloading" element-loading-text="数据加载中" :visible.sync="dialog.show" width="50%" center>
      <div class="form">
        <el-form
          ref="form"
          :model="formData"
          :rules="form_rules"
          label-width="100px"
          style="margin:10px;width:auto"
        >
          <el-form-item prop="name" label="姓名:">
            <el-input v-model="formData.name"></el-input>
          </el-form-item>
          <el-form-item prop="mobile" label="手机号:">
            <el-input v-model="formData.mobile"></el-input>
          </el-form-item>
          <el-form-item prop="idCard" label="身份证:">
            <el-input v-model="formData.idCard"></el-input>
          </el-form-item>
          <el-form-item prop="sex" label="性别:">
            <el-radio-group v-model="formData.sex">
              <el-radio label="1">男</el-radio>
              <el-radio label="2">女</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item prop="status" label="状态:">
            <el-radio-group v-model="formData.status">
              <el-radio label="1">启用</el-radio>
              <el-radio label="2">禁用</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item prop="roleId" label="用户角色:">
            <el-select v-model="formData.roleId" placeholder="请选择">
              <el-option
                v-for="item in roleId_list"
                :key="item.id"
                :value="item.id"
                :label="item.content"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button @click="dialog.show = false">取消</el-button>
            <el-button type="primary" @click="onSubmit('form')">提交</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-dialog>
  </div>
</template>
<script>
export default {
  props: {
    dialog: Object
  },
  data() {
    let mobile = (rule, value, callback) => {
      if (value == "") {
        callback(new Error("手机号不能为空"));
      } else if (!this.$regular.checkPhone().test(value)) {
        callback(new Error("手机号格式错误，请重新输入"));
      } else {
        callback();
      }
    };
    let idCard = (rule, value, callback) => {
      if (value == "") {
        callback(new Error("身份证不能为空"));
      } else if (!this.$regular.checkCard().test(value)) {
        callback(new Error("身份证格式错误，请重新输入"));
      } else {
        callback();
      }
    };
    return {
      roleId_list: [],
      formData: {
        idCard: "", //身份证号
        mobile: "", //手机号
        sex: "", //性别
        status: "", //状态
        roleId: "", //角色id
        id: "", //用户id
        name: "" //姓名
      },
      form_rules: {
        name: { required: true, message: "请输入姓名", trigger: "blur" },
        mobile: { required: true, validator: mobile, trigger: "blur" }, //手机号要控制格式
        idCard: { required: true, validator: idCard, trigger: "blur" }, //身份证校验要有正则
        sex: { required: true, message: "请勾选性别", trigger: "blur" },
        status: { required: true, message: "请勾选状态", trigger: "blur" },
        roleId: { required: true, message: "请选择用户角色", trigger: "blur" }
      },
      showloading: false
    };
  },
  methods: {
    // 新增修改 用户信息
    onSubmit() {
      this.$refs["form"].validate(async valid => {
        if (valid) {
          let url = "";
          let result = "";
          this.showloading = true;
          if (this.dialog.userId) {
            //修改
            url = `/user/update`;
            result = await this.$request.httpRequest("PUT", url, this.formData);
          } else {
            // 新增
            url = "/user/save";
            result = await this.$request.httpRequest("POST", url, this.formData);
          }
          if (result.code == 200) {
            //添加成功
            this.$message({
              message: result.msg,
              type: "success"
            });
            this.showloading = false;
            this.dialog.show = false;
            this.$emit("update");
          } else {
            this.$message({ type: "error", message: result.msg });
            this.showloading = false;
          }
        }
      });
    },
    // 获取全部用户信息
    async getlist() {
      let url = `/user/get/${this.dialog.userId}`;
      let result = await this.$request.httpRequest("GET", url);
      if (result.code == 200) {
        this.formData.idCard = result.data.idCard;
        this.formData.name = result.data.name;
        this.formData.status = result.data.status;
        this.formData.sex = result.data.sex;
        this.formData.roleId = result.data.roleId;
        this.formData.id = result.data.id;
        this.formData.mobile = result.data.mobile;
      } else {
        this.$message({ type: "error", message: result.msg });
      }
    },
    // 获取用户角色
    async getroleid_list() {
      let url = "/role/queryList";
      let result = await this.$request.httpRequest("POST", url, {});
      if (result.code == 200) {
        this.roleId_list = result.data;
      } else {
        this.$message({ type: "error", message: result.msg });
      }
    }
  },
  mounted() {
    this.getroleid_list();
    if (this.dialog.userId) {
      this.getlist();
    }
  }
};
</script>
