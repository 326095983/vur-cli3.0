<template>
  <!-- 添加用户信息 -->
  <div class="dialog">
    <el-dialog
      :title="dialog.title"
      :visible.sync="dialog.show"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      :modal-append-to-body="false"
    >
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
    dialog: Object,
    formData: Object
  },
  data() {
    return {
      // formData:{},//这个不要写在父组件，应该是在这里定义
      //用户角色
      roleId_list: [], //这个有接口可以获取，传值应该是roleId,/role/queryList
      form_rules: {
        name: { required: true, message: "用户名不能为空", trigger: "blur" },
        mobile: { required: true, message: "手机号不能为空", trigger: "blur" },//手机号要控制格式
        idCard: { required: true, message: "身份证号不能为空", trigger: "blur" },//身份证校验要有正则
        sex: { required: true, message: "性别不能为空", trigger: "blur" },
        status: { required: true, message: "状态不能为空", trigger: "blur" },
        roleId: { required: true, message: "用户角色不能为空", trigger: "blur" }
      }
    };
  },
  methods: {
    onSubmit(form) {
      this.$refs[form].validate(async valid => {
        if (valid) {
          let url = "";
          let result = "";
          //添加数据
          if (this.formData.id == "") {
            url = "/user/save";
            result = await this.$request.httpRequest("POST", url, this.formData);
          } else {
            // 修改数据
            url = `/user/update`;
            result = await this.$request.httpRequest("PUT", url, this.formData);
          }
          if (result.code == 200) {
            //添加成功
            this.$message({
              message: result.msg,
              type: "success"
            });
            this.dialog.show = false;
            this.$emit("update");
          } else {
            this.$message({ type: "error", message: result.msg });
          }
        }
      });
    },
    // 获取用户角色
    async getroleId_list() {
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
    this.getroleId_list();
  }
};
</script>
<style scoped>

</style>