<template>
  <div class="sider">
    <div class="hottag">
      <div class="hottag_title">{{ $t("hottag") }}</div>
      <el-tag
        size="medium"
        class="hottag_tag"
        v-for="tag in hottags"
        v-bind:key="tag.id"
        @click="toTag(tag.id)"
      >
        {{ tag.tagName }}</el-tag
      >
    </div>
    <div class="hotArticle">
      <div class="hotArticle_title">{{ $t("hotArticle") }}</div>
      <div
        class="hotArticle_articel"
        v-for="article in hotArticles"
        v-bind:key="article.id"
        @click="toDetail(article.id)"
      >
        <el-link type="primary">{{ article.title }}</el-link>
      </div>
    </div>
    <div class="archives">
      <div class="archives_title">{{ $t("archives") }}</div>
      <div
        class="archives_articel"
        v-for="archive in archives"
        v-bind:key="archive.id"
      >
        <el-link type="primary"
          >{{ archive.year }}{{ $t("year") }}{{ archive.month
          }}{{ $t("month") }}({{ archive.count }})</el-link
        >
      </div>
    </div>
    <div class="newArticle">
      <div class="newArticle_title">{{ $t("newArticle") }}</div>
      <div
        class="newArticle_articel"
        v-for="article in newArticles"
        v-bind:key="article.id"
        @click="toDetail(article.id)"
      >
        <el-link type="primary">{{ article.title }}</el-link>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.hottag {
  box-shadow: 5px 5px 5pxrgb(238, 229, 229);
  &_title {
    font-size: 19px;
    font-weight: 600;
    margin-bottom: 30px;
  }
  &_tag {
    margin: 2px;
    font-size: 14px;
    cursor: pointer;
  }
  width: 280px;
  background: white;
  padding: 10px 20px 20px 20px;
  margin-left: 16px;
  margin-bottom: 18px;
}

.archives,
.newArticle,
.hotArticle {
  width: 280px;
  background: white;
  padding: 10px 20px 20px 20px;
  margin-left: 16px;
  box-shadow: 5px 5px 5px rgb(238, 229, 229);
  margin-bottom: 18px;
  &_title {
    font-size: 19px;
    font-weight: 600;
    margin-bottom: 30px;
  }
}
</style>

<script>
import tagService from "../../service/tagService.js";
import articleService from "../../service/articleService.js";
export default {
  data() {
    return {
      hottags: [],
      hotArticles: [],
      newArticles: [],
      archives: []
    };
  },
  created() {
    this.getHotTags();
    this.getHotArticle();
    this.getNewArticle();
    this.getArchives();
  },
  methods: {
    toTag(tagId) {
      this.$router.push({
        name: "tag",
        params: {
          tagId: tagId
        }
      });
    },
    toDetail(id) {
      const that = this;
      this.$router.push({
        name: "view",
        params: {
          id: id
        }
      });
    },
    async getHotTags() {
      try {
        const url = "tag/hot";
        const { data } = await tagService.get(url);
        this.hottags = data;
      } catch (error) {
        this.$message.error(error);
      }
    },
    async getHotArticle() {
      try {
        const url = "article/hot";
        const { data } = await articleService.post(url);
        this.hotArticles = data;
      } catch (error) {
        this.$message.error(error);
      }
    },
    async getNewArticle() {
      try {
        const url = "article/new";
        const { data } = await articleService.post(url);
        this.newArticles = data;
      } catch (error) {
        this.$message.error(error);
      }
    },
    async getArchives() {
      try {
        const url = "article/listArchives";
        const { data } = await articleService.post(url);
        this.archives = data;
      } catch (error) {
        this.$message.error(error);
      }
    }
  }
};
</script>

<i18n>
zh:
  hottag: 最热标签
  hotArticle: 最热文章
  newArticle: 最新文章
  archives: 文章归档
  year: 年
  month: 月
en:
  hottag: The hottest tags 
  hotArticle: The hottest articles
  newArticle: The latest article
  archives: The article archive
  year: year
  month: month
</i18n>
