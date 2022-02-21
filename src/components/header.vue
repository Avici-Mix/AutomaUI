<template>
  <div class="headerBar">
    <img class="icon" src="../images/robotIcon.png" alt="" />
    <div class="text">Aumto</div>
    <el-menu :default-active="defaultIndex" mode="horizontal">
      <el-menu-item index="HomePage">{{ $t("homePage") }}</el-menu-item>
      <el-menu-item index="QuestionPage">{{ $t("QuestionPage") }}</el-menu-item>
      <el-menu-item index="InfoPage">{{ $t("InfoPage") }}</el-menu-item>
    </el-menu>
    <user-bar></user-bar>
  </div>
</template>

<script>
import userBar from "./user/userbar.vue";

export default {
  name: "headBar",
  components: {
    userBar,
  },
  data() {
    return {
      defaultIndex: "HomePage",
      activeIndex2: "1",
    };
  },
};
</script>

<style lang="scss" scoped>
.headerBar {
  display: flex;
  flex-direction: row;
  height: 60px;
  background: white;
  .text {
    display: flex;
    justify-self: center;
    align-self: center;
    color: #fff;
    font-size: 30px;
    margin-right: 30px;
    text-shadow: 0px 0px 10px rgb(0, 0, 0);
  }
  >>> {
    .el-menu.el-menu--horizontal {
      border-bottom: none;
    }
  }
  .icon {
    padding: 10px;
  }
}
</style>  


<i18n>
zh:
  homePage: "首页"
  QuestionPage: "问答"
  InfoPage: "资讯"
en:
  homePage: "Home"
  QuestionPage: "Q&A"
  InfoPage: "information"
</i18n>