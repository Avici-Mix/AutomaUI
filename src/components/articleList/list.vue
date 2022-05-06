<template>
  <div v-loading="loading">
    <div
      class="article"
      v-for="article in articleList"
      v-bind:key="article.id"
      @click="toDetail(article.id)"
    >
      <div class="article_head">
        <div class="title">{{ article.title }}</div>
        <div class="author">
          <img class="img" :src="article.authorAvatar" />
          <div class="name">{{ article.author }}</div>
        </div>
      </div>
      <div class="article_body">
        <div class="summary">{{ article.summary }}</div>
      </div>
      <div class="article_foot">
        <div class="viewCounts">
          <i class="auto-icon-view"></i>
          <span>{{ article.viewCounts }}</span>
        </div>
        <div class="commentCounts">
          <i class="auto-icon-comment"></i
          ><span>{{ article.commentCounts }}</span>
        </div>
        <el-tag size="mini" v-for="tag in article.tags" v-bind:key="tag.id">{{
          tag.tagName
        }}</el-tag>
      </div>
      <div></div>
    </div>
    <div class="pagination">
      <el-pagination
        @current-change="handleCurrentChange"
        :current-page.sync="currentPage"
        :page-size="10"
        layout="prev, pager, next, jumper"
        :total="pageTotal"
        :hide-on-single-page="true"
      >
      </el-pagination>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.article {
  cursor: pointer;
  background: white;
  padding: 10px 20px;
  &_head {
    display: flex;
    flex-direction: row;
    margin-bottom: 9px;
    .title {
      font-size: 17px;
      font-weight: 600;
    }
    .author {
      display: flex;
      margin-left: auto;
      margin-right: 0;
      font-size: 14px;
      .img {
        height: 25px;
        width: 25px;
        border-radius: 50%;
        margin-right: 5px;
      }
      .name {
        line-height: 25px;
      }
    }
  }
  &_body {
    font-size: 13px;
    color: #86909c;
    margin-bottom: 7px;
  }
  &_foot {
    font-size: 13px;
    display: flex;
    align-items: center;
    color: #4e5969;
    padding-bottom: 17px;
    border-bottom: 1px solid #dbdbdb;

    .viewCounts {
      margin-right: 5px;
    }
    .likeCounts {
      margin-right: 6px;
      & > i {
        margin-right: 2px;
      }
    }
    .commentCounts {
      margin-right: 5px;
      & > i {
        vertical-align: middle;
        margin-right: 2px;
      }
      & > span {
        vertical-align: middle;
      }
    }
    .tag {
      margin-left: 4px;
      color: #2c95fd;
      background: #e6e6e6;
      padding: 3px;
      border-radius: 20%;
    }
  }
}

.pagination >>> .el-pagination {
  padding: 15px 7px;
  background: white;
  display: flex;
  justify-content: center;
}
</style>

<script>
import ArticleService from "../../service/articleService";
import { mapMutations, mapGetters } from "vuex";

export default {
  data() {
    return {
      loading: false,
      articleList: [],
      pageTotal: 0,
      currentPage: 1,
      pageSize: 10,
      categoryId: ""
    };
  },
  computed: {
    ...mapGetters(["viewCountArr"])
  },

  methods: {
    toDetail(id) {
      const that = this;
      this.$router.push({
        name: "view",
        params: {
          id: id
        }
      });
    },
    handleCurrentChange(page) {
      this.getArticleList("", page);
    },

    async getArticleList(id, page) {
      this.loading = true;
      let categoryId = "";
      if (id) {
        this.categoryId = id;
        categoryId = id;
      } else {
        categoryId = this.categoryId;
      }
      let currentPage = "";
      if (page) {
        currentPage = page;
      } else {
        currentPage = this.currentPage;
      }
      this.setCurrentpage(currentPage);
      const params = {
        page: currentPage,
        pageSize: this.pageSize,
        categoryId: categoryId
      };
      try {
        const { data } = await ArticleService.post("", params);
        if (data) {
          this.articleList = data.articleList;
          this.pageTotal = data.length;
          this.handleViewCountArr(data.articleList);
        }
      } catch (err) {
        this.$message.error(err);
      }
      this.loading = false;
    },

    
    async getArticleListByTag(tagId) {
      this.loading = true;
      const params = {
        page: 1,
        pageSize: 100,
        tagId: tagId
      };
      try {
        const { data } = await ArticleService.post("", params);
        if (data) {
          this.articleList = data.articleList;
          this.handleViewCountArr(data.articleList);
        }
      } catch (err) {
        this.$message.error(err);
      }
      this.loading = false;
    },

    handleViewCountArr(list) {
      const that = this;
      let arr = [];
      list.forEach(ele => {
        const temp = {
          id: ele.id,
          viewCount: ele.viewCounts
        };
        arr.push(temp);
      });
      this.setViewCountArr(arr);
    },

    ...mapMutations({
      setCurrentpage: "SET_CASH_CURRENTPAGE",
      setViewCountArr: "SET_VIEWCOUNTARR"
    })
  }
};
</script>
