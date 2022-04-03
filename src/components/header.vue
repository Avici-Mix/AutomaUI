<template>
  <div class="headerBar">
    <img class="icon" src="../images/robotIcon.png" @click="backHome" />
    <div class="text" @click="backHome">Aumto</div>
    <el-menu
      :default-active="defaultIndex"
      mode="horizontal"
      @select="handleSelect"
    >
      <el-menu-item
        :index="category.id"
        v-for="category in categoryArr"
        v-bind:key="category.id"
        >{{ category.categoryName }}</el-menu-item
      >
    </el-menu>
    <div class="headerBar_right">
      <div
        class="writeArticle"
        v-if="user.isLogin && isPublish"
        @click="toPublish"
      >
        {{ $t("writeArticle") }}
      </div>
      <user-bar></user-bar>
    </div>
  </div>
</template>

<script>
import userBar from "./user/userbar.vue";
import CategoryService from "../service/categoryService";

export default {
  name: "headBar",
  components: {
    userBar,
  },
  props: {
    isPublish: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      defaultIndex: "",
      activeIndex2: "1",
      categoryArr: [],
    };
  },
  computed: {
    user() {
      let isLogin = this.$store.state.account.length != 0;
      return { isLogin };
    },
  },
  created() {
    this.getCategory();
  },
  methods: {
    backHome() {
      this.$router.push({ path: `/` });
    },
    toPublish() {
      this.$router.push({ path: `/publish` });
    },
    handleSelect(key, keyPath) {
      this.$emit("fetchCategory", key);
    },
    async getCategory() {
      try {
        const { data } = await CategoryService.get();
        this.categoryArr = data;
        this.defaultIndex = this.categoryArr[0].id;
        this.$emit("fetchCategory", this.defaultIndex);
      } catch (err) {
        this.$messge.error(err);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.headerBar {
  display: flex;
  height: 60px;
  background: white;
  &_right {
    cursor: pointer;
    display: flex;
    margin-right: 30px;
    margin-left: auto;
  }
  .operate {
    display: flex;
    align-items: center;
    justify-items: center;
    margin-right: 27px;
  }
  .writeArticle {
    font-size: 15px;
    background-color: #1e80ff;
    color: #fff;
    display: flex;
    align-self: center;
    padding: 7px 11px;
    border-radius: 3px;
    margin-right: 27px;
  }
  .text {
    cursor: pointer;
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
    cursor: pointer;
    padding: 10px;
  }
}
</style>

<i18n>
zh:
  homePage: "首页"
  QuestionPage: "问答"
  InfoPage: "资讯"
  writeArticle: "写文章"
en:
  homePage: "Home"
  QuestionPage: "Q&A"
  InfoPage: "information"
  writeArticle: "Write Articles"
</i18n>
