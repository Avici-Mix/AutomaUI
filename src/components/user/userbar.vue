<template>
  <div class="main">
    <div class="userbar" @click="clickLogin">
      <i class="el-icon-user-solid icon"></i>
      <div class="text">{{ $t("login") }}</div>
    </div>
    <user-bar ref="login"></user-bar>
  </div>
</template>

<style lang="scss" scoped>
.main {
  margin-right: 30px;
  margin-left: auto;
  display: flex;
}
.userbar {
  margin: 10px;
  padding: 0 10px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-items: center;
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
  },
};
</script>


<i18n>
zh:
  login: "登录"
en:
  login: "login"

</i18n>

