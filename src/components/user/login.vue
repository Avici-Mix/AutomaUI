<template>
  <el-dialog
    :title="$t('login')"
    :visible.sync="visible"
    width="30%"
    :close-on-click-modal="false"
        append-to-body
  >
    <el-form ref="form" :model="form" :rules="rules">
      <el-form-item>
        <el-input
          v-model="form.account"
          :placeholder="$t('account')"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-input
          v-model="form.password"
          :placeholder="$t('password')"
        ></el-input>
      </el-form-item>
    </el-form>
    <el-link type="primary" @click="toRegister">{{ $t("register") }}</el-link>
    <span slot="footer" class="dialog-footer">
      <el-button @click="visible = false">{{ $t("cancel") }}</el-button>
      <el-button type="primary" @click="submitForm(form)">{{
        $t("comfirm")
      }}</el-button>
    </span>
    <register ref="register" @closeLogin="closeLogin"></register>
  </el-dialog>
</template>

<script>
import Register from "./register.vue";
export default {
  components: {
    Register,
  },
  data() {
    const $t = this.$t.bind(this);
    return {
      visible: false,
      form: {
        account: "",
        password: "",
      },
      rules: {
        account: [
          { required: true, message: $t("rules.noEmpty") },
          {
            min: 1,
            max: 18,
            message: $t("rules.nameLength"),
            trigger: "blur",
          },
        ],
        password: [
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
          this.handleLogin(form);
        } else {
          return;
        }
      });
    },
    async handleLogin(form) {
      const $t = this.$t.bind(this);
      const that = this;
      const params = {
        password: form.password,
        account: form.account,
      };
      try {
        that.$store
          .dispatch("login", params)
          .then(() => {
            that.$message({
              message: $t("loginSuccess"),
              type: "success",
              showClose: true,
            });
            that.$store
              .dispatch("getUserInfo")
              .then(() => {})
              .catch(() => {
                that.$message({
                  type: "warning",
                  showClose: true,
                  message: $t("LoginDate"),
                });
              });
            that.visible = false;
          })
          .catch((error) => {
            if (error !== "error") {
              that.$message({ message: error, type: "error", showClose: true });
            }
          });
      } catch (error) {
        this.$message.error(error);
      }
    },
    toRegister() {
      const { register } = this.$refs;
      if (register) {
        register.visible = true;
      }
    },
    closeLogin() {
      this.visible = false;
    },
  },
};
</script>

<i18n>
zh:
  login: 登录
  account: 用户名/邮箱
  password: 密码
  register: 点击注册
  cancel: 取消
  comfirm: 确认
  rules:
    noEmpty: 不能为空
  LoginDate: 登录已过期
  loginSuccess: 登录成功！
en:
  login: login
  account: Username/email address
  password: password
  register: Click on the register
  cancel: cancel
  comfirm: comfirm
  rules:
    noEmpty: can not be empty 
  LoginDate: 登录已过期
  loginSuccess: Login successful
</i18n>
