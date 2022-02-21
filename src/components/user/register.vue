<template>
  <el-dialog
    :title="$t('title')"
    :visible.sync="visible"
    width="40%"
    :close-on-click-modal="false"
    append-to-body
  >
    <el-form
      :rules="rules"
      class="form"
      ref="form"
      :model="form"
      label-position="left"
      label-width="80px"
    >
      <el-form-item :label="$t('username')" prop="username">
        <el-input v-model="form.username"></el-input>
      </el-form-item>
      <el-form-item :label="$t('email')" prop="email">
        <el-input v-model="form.email"></el-input>
      </el-form-item>
      <el-form-item :label="$t('password')" prop="password">
        <el-input v-model="form.password"></el-input>
      </el-form-item>
      <el-form-item :label="$t('passwordConfirm')" prop="passwordConfirm">
        <el-input v-model="form.passwordConfirm"></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="visible = false">{{ $t("cancel") }}</el-button>
      <el-button type="primary" @click="submitForm(form)">{{
        $t("register")
      }}</el-button>
    </span>
  </el-dialog>
</template>

<script>
import UserService from "../../service/userService";

export default {
  name: "register",
  created() {
    console.log(11, UserService);
  },
  data() {
    const $t = this.$t.bind(this);
    return {
      visible: false,
      form: {
        username: "",
        email: "",
        password: "",
        passwordConfirm: "",
      },
      rules: {
        username: [
          { required: true, message: $t("rules.noEmpty") },
          {
            min: 1,
            max: 18,
            message: $t("rules.nameLength"),
            trigger: "blur",
          },
        ],
        email: [
          { required: true, message: $t("rules.noEmpty"), trigger: "blur" },
          {
            type: "email",
            message: $t("rules.correctEmail"),
            trigger: ["blur", "change"],
          },
        ],
        password: [
          {
            required: true,
            message: $t("rules.noEmpty"),
            trigger: "blur",
          },
        ],
        passwordConfirm: [
          {
            required: true,
            message: $t("rules.noEmpty"),
            trigger: "blur",
          },
        ],
      },
    };
  },
  methods: {
    submitForm(form) {
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.handleRegister();
        } else {
        }
      });
    },
    handleRegister() {
      if (this.form.password != this.form.passwordConfirm) {
        this.$message.warning(this.$t("rules.passwordDiff"));
        this.form.password = "";
        this.form.passwordConfirm = "";
      }
      const params = {
        username: this.form.username,
        password: this.form.password,
        email: this.form.email,
      };
      try {
        const data = UserService.post(params);
        this.$message.success("")
      } catch (error) {
        this.$message.error(error);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.form {
  font-size: 16px;
}
</style>

<i18n>
zh:
  title: 用户注册
  username: 用户名
  email: 邮箱
  password: 密码
  passwordConfirm: 确认密码
  cancel: 取消
  register: 注册
  rules:
    noEmpty: 不能为空
    nameLength: 长度在 1 到 18 个字符
    correctEmail: 请输入正确的邮箱地址
    passwordDiff: 两次输入的密码不一致
  registerSuccess: 注册成功！
en:
  title: User Registration 
  username: username
  email: email
  password: password
  passwordConfirm: comfirm password
  cancel: cancel
  register: register
  rules:
    noEmpty: can not be empty 
    nameLength: Contains 1 to 18 characters
    correctEmail: Please enter the correct email address
    passwordDiff: Entered passwords differ
  registerSuccess: registered successfully!
</i18n>
