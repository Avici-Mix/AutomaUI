<template>
  <div>
    <head-bar></head-bar>
    <div class="main">
      <div class="article" v-if="article">
        <div class="article_title" v-if="article.title">
          {{ article.title }}
        </div>
        <div class="article_info">
          <div class="article_info_left">
            <img
              class="article_author_avatar"
              :src="article.authorAvatar"
              alt=""
            />
          </div>
          <div class="article_info_right">
            <div class="article_author">{{ article.author }}</div>
            <div class="article_info_right_bottom">
              <div class="article_createTime">
                {{ article.createDate | format }}
              </div>
              <div>{{ $t("read") }} {{ article.viewCounts }}</div>
            </div>
          </div>

          <div
            class="article_edit"
            v-if="article.author"
            v-show="user.name == article.author"
          >
            <el-button
              size="mini"
              type="primary"
              icon="el-icon-edit"
              @click="toEdit"
              >{{ $t("edit") }}</el-button
            >
          </div>
        </div>
        <div class="article_body">
          <markdown-editor
            :editor="article.editor"
            editable="false"
          ></markdown-editor>
        </div>
      </div>
      <comments
        :comments="comments"
        :articleId="article.id"
        @fetchComments="fetchComments"
        ref="comment"
      ></comments>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.main {
  background: #f5f5f5;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.article {
  border-radius: 4px;
  margin-bottom: 60px;
  margin-top: 16px;
  flex-flow: column;
  background: white;
  width: 900px;
  display: flex;
  padding: 10px;
  &_edit {
    margin-right: 20px;
    margin-left: auto;
    display: flex;
    align-items: center;
  }
  &_title {
    margin-left: 20px;
    font-size: 34px;
    font-weight: 600;
  }
  &_createTime {
    margin-right: 9px;
  }
  &_info {
    display: flex;
    margin-top: 13px;
    margin-left: 20px;
    &_left {
      display: flex;
      align-items: center;
      margin-right: 7px;
    }
    &_right_bottom {
      font-size: 14px;
      color: #8a919f;
      display: flex;
    }
  }
  &_body {
    // margin-bottom: 200px;
  }
  &_author_avatar {
    width: 37px;
    height: 37px;
    border-radius: 50%;
  }
}
</style>

<script>
import HeadBar from "../header.vue";
import articleService from "../../service/articleService";
import MarkdownEditor from "../markdown/markdownEditor.vue";
import commentService from "../../service/commentService";
import Comments from "./comments.vue";
export default {
  name: "articleDetailMain",
  components: {
    HeadBar,
    MarkdownEditor,
    Comments
  },
  data() {
    return {
      article: {
        id: "",
        title: "",
        commentCounts: 0,
        viewCounts: 0,
        summary: "",
        author: "",
        authorAvatar: "",
        tags: [],
        category: "",
        createDate: "",
        editor: {
          value: "",
          toolbarsFlag: false,
          subfield: false,
          defaultOpen: "preview",
          previewBackground: "#fff",
          boxShadowStyle: "none"
        }
      },
      comments: []
    };
  },
  created() {
    this.fetchDetail();
    this.fetchComments();
  },
  computed: {
    user() {
      let name = this.$store.state.name;
      let avatar = "";
      if (this.$store.state.avatar) {
        avatar = this.$store.state.avatar;
      } else {
        avatar = require("../../images/default_avatar.jpg");
      }
      return { name, avatar };
    }
  },
  methods: {
    toEdit() {
      const that = this;
      console.log("that.article.id", that.article.id);
      this.$router.push({
        name: "publish",
        params: {
          articleId: that.article.id
        }
      });
    },
    async fetchDetail() {
      try {
        const url = `article/view/${this.$route.params.id}`;
        const { data } = await articleService.post(url);
        Object.assign(this.article, data);
        this.article.editor.value = data.body.content;
      } catch (error) {
        this.$message.error(error);
      }
    },
    async fetchComments() {
      try {
        const url = `comments/article/${this.$route.params.id}`;
        const { data } = await commentService.get(url);
        this.comments = data;
        this.AddVisables();
      } catch (err) {
        this.$message({
          type: "error",
          message: err
        });
      }
    },
    AddVisables() {
      if (this.comments.length > 0) {
        this.comments.forEach(comment => {
          // 回复一级评论输入框和文本
          comment.parentVisble = false;
          // comment.textParent = "";
          if (comment.childrens.length > 0) {
            comment.childrens.forEach(children => {
              // 回复二级评论输入框和文本
              children.childVisble = false;
              // children.textChild = "";
            });
          }
        });
      }
    }
  }
};
</script>

<i18n>
zh:
 read: 阅读
 edit: 编辑
en:
 read: read
 edit: 编辑
</i18n>
