<template>
  <div class="user">
    <div class="user_login" @click="clickLogin" v-if="!user.isLogin">
      <i class="el-icon-user-solid icon"></i>
      <div class="text">{{ $t("login") }}</div>
      <user-bar ref="login"></user-bar>
    </div>
    <div class="user_info" v-if="user.isLogin" @click="logout">
      <img src="../../images/default_avatar.jpg" />
      <div class="user_info_name">{{ user.name }}</div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.user {
  margin-right: 30px;
  margin-left: auto;
  display: flex;
  align-items: center;
  justify-items: center;
  cursor: pointer;

  &_info {
    display: flex;
    justify-self: center;
    align-self: center;
    & img {
      height: 40px;
      width: 40px;
      border-radius: 50%;
    }
    &_name {
      margin-left: 5px;
      font-size: 18px;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
  &_login {
    margin: 10px;
    padding: 10px;
    display: flex;
    cursor: pointer;
    border: solid 1px #2c95fd;
    color: #2c95fd;
    .icon {
      vertical-align: middle;
      padding-top: 3px;
    }
    .text {
      margin-left: 7px;
    }
  }
}
</style>

<script>
import UserBar from "./login.vue";
export default {
  components: {
    UserBar,
  },
  methods: {
    clickLogin() {
      const { login } = this.$refs;
      if (login) {
        login.visible = true;
      }
    },
    logout() {
      const $t = this.$t.bind(this);

      let that = this;
      that
        .$confirm($t('logoutConfirm'), $t('tip'), {
          confirmButtonText: $t('comfirm'),
          cancelButtonText: $t('cancle'),
          type: "warning",
        })
        .then(() => {
          that.$store
            .dispatch("logout")
            .then(() => {
              that.$message({
                type: "success",
                message: $t('logoutSuccess'),
              });
            })
            .catch((error) => {
              if (error !== "error") {
                that.$message({
                  message: error,
                  type: "error",
                  showClose: true,
                });
              }
            });
        });
    },
  },
  computed: {
    user() {
      console.log("user111", this.$store);
      let isLogin = this.$store.state.account.length != 0;
      let name = this.$store.state.name;
      return { isLogin, name };
    },
  },
};
</script>

<i18n>
zh:
  login: "登录"
  tip: "提示"
  logoutConfirm: "是否退出登录?"
  comfirm: 确认
  cancle: 取消
  logoutSuccess: "已退出登录"
en:
  login: "login"
  tip: "tip"
  logoutConfirm: "Log Out or Not?"
  comfirm: comfirm
  cancle: cancel
  logoutSuccess: "Logged out!"
</i18n>
