<template>
  <el-dialog
    :title="$t('login')"
    :visible.sync="visible"
    width="30%"
    :close-on-click-modal="false"
  >
    <el-form ref="form" :model="form">
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
      <el-button type="primary" @click="visible = false">{{
        $t("comfirm")
      }}</el-button>
    </span>
    <register ref="register"></register>
  </el-dialog>
</template>

<script>
import Register from "./register.vue";
export default {
  components: {
    Register,
  },
  data() {
    return {
      visible: false,
      form: {
        account: "",
        password: "",
      },
    };
  },
  methods: {
    toRegister() {
      const { register } = this.$refs;
      if (register) {
        register.visible = true;
      }
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
en:
  login: login
  account: Username/email address
  password: password
  register: Click on the register
  cancel: cancel
  comfirm: comfirm
</i18n>
