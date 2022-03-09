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
              src="../../images/default_avatar.jpg"
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
        </div>
        <div class="article_body">
          <markdown-editor
            :editor="article.editor"
            editable="false"
          ></markdown-editor>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.main {
  background: #f5f5f5;
  position: relative;
}
.article {
  margin: 16px 0;
  flex-flow: column;
  background: white;
  position: absolute;
  left: 50%;
  transform: translate(-50%);
  width: 900px;
  display: flex;
  padding: 10px;
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
import markdownEditor from "../markdown/markdownEditor.vue";
export default {
  name: "articleDetailMain",
  components: {
    HeadBar,
    markdownEditor,
  },
  data() {
    return {
      article: {
        id: "",
        title: "",
        commentCounts: 0,
        viewCounts: 0,
        summary: "",
        author: {},
        tags: [],
        category: {},
        createDate: "",
        editor: {
          value: "",
          toolbarsFlag: false,
          subfield: false,
          defaultOpen: "preview",
          previewBackground: "#fff",
          boxShadowStyle: "none",
        },
      },
      comments: [],
      comment: {
        article: {},
        content: "",
      },
    };
  },
  created() {
    this.fetchDetail();
  },
  methods: {
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
  },
};
</script>

<i18n>
zh:
 read: 阅读
en:
 read: read
</i18n>
