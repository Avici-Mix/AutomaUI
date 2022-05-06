<template>
  <div>
    <div class="headerBar">
      <img class="icon" src="../../images/robotIcon.png" @click="backHome" />
      <div class="text" @click="backHome">Automa</div>
      <div class="headerBar_right">
        <user-bar></user-bar>
      </div>
    </div>
    <div class="body">
      <el-menu
        :default-active="defaultArchive"
        class="el-menu-vertical-demo"
        @select="handleSelect"
      >
        <el-menu-item
          v-for="archive in archives"
          v-bind:key="archive.id"
          :index="handleIndex(archive)"
        >
          <span slot="title">
            {{ archive.year }}{{ $t("year") }}{{ archive.month
            }}{{ $t("month") }}</span
          >
        </el-menu-item>
      </el-menu>
      <article-list class="list" ref="list" style="width:949px;"></article-list>
    </div>
  </div>
</template>

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
  .icon {
    cursor: pointer;
    padding: 10px;
  }
}

.body {
  min-height: 620px;
  box-shadow: 5px 5px 5px rgb(238, 229, 229);
  background: white;
  margin: 20px 237px;
  display: flex;
  flex-direction: row;
}
</style>

<script>
import ArticleList from "../articleList/list.vue";
import UserBar from "../user/userbar.vue";
import articleService from "../../service/articleService.js";
export default {
  components: {
    UserBar,
    ArticleList
  },
  created() {
    this.initArchives();
  },
  data() {
    return {
      archives: "",
      loading: false,
      defaultArchive: ""
    };
  },
  methods: {
    backHome() {
      this.$router.push({ path: `/` });
    },
    handleIndex(archive) {
      return String(archive.year) + String(archive.month);
    },

    handleSelect(key, keyPath) {
      const { list } = this.$refs;
      if (list) {
        list.getArticleListByArchive(key.substring(0, 4), key.substring(4));
      }
    },

    async initArchives() {
      try {
        const url = "article/listArchives";
        const { data } = await articleService.post(url);
        this.archives = data;
        this.fetchArticle();
      } catch (error) {
        this.$message.error(error);
      }
    },
    fetchArticle() {
      const { list } = this.$refs;
      let archive = this.$route.params.archives;
      if (archive) {
        this.defaultArchive = String(archive.year) + String(archive.month);
      } else {
        this.defaultArchive =
          String(this.archives[0].year) + String(this.archives[0].month);
      }

      if (list) {
        list.getArticleListByArchive(
          this.defaultArchive.substring(0, 4),
          this.defaultArchive.substring(4)
        );
      }
    }
  }
};
</script>

<i18n>
zh:
  year: 年
  month: 月
en:
  year: year
  month: month
</i18n>
