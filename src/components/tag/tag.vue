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
        :default-active="defaultTag"
        class="el-menu-vertical-demo"
        @select="handleSelect"
      >
        <el-menu-item v-for="tag in tags" v-bind:key="tag.id" :index="tag.id">
          <span slot="title">{{ tag.tagName }}</span>
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
import tagService from "../../service/tagService.js";
export default {
  components: {
    UserBar,
    ArticleList
  },
  created() {
    this.initTags();
  },
  data() {
    return {
      tags: "",
      loading: false,
      defaultTag: ""
    };
  },
  methods: {
    backHome() {
      this.$router.push({ path: `/` });
    },
    handleSelect(key, keyPath) {
      const { list } = this.$refs;
      if (list) {
        list.getArticleListByTag(key);
      }
    },

    async initTags() {
      try {
        this.loading = true;
        const url = "tag";
        const { data } = await tagService.get(url);
        this.tags = data;
        this.fetchArticle();
      } catch (error) {
        this.$message.error(error);
      }
    },
    fetchArticle() {
      if (this.$route.params.tagId) {
        this.defaultTag = this.$route.params.tagId;
      } else {
        this.defaultTag = this.tags[0].id;
      }
      const { list } = this.$refs;
      if (list) {
          list.getArticleListByTag(this.defaultTag);
      }
    }
  }
};
</script>

<i18n>
</i18n>
