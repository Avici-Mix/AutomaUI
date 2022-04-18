<template>
  <div class="comment">
    <div class="comment_write">
      <div class="comment_write_title">{{ $t("comment") }}</div>
      <div class="comment_write_right">
        <img
          class="comment_write_avatar"
          :src="user.avatar || default_avatar"
        />
        <el-input
          @focus="beforeComment"
          class="comment_write_textArea"
          type="textarea"
          :placeholder="$t('placeholderComment')"
          v-model="textarea"
          maxlength="100"
          show-word-limit
          :rows="2"
        >
        </el-input>
      </div>
      <el-button
        class="comment_write_button"
        type="primary"
        @click="CommentArticle"
        >{{ $t("comment") }}</el-button
      >
    </div>
    <div class="comment_title">
      {{ $t("allComment") }} &nbsp;&nbsp;{{ commentCounts }}
    </div>

    <!-- 文章评论 -->
    <div
      class="comment_body"
      v-for="(comment, index) in comments"
      v-bind:key="comment.id"
    >
      <img
        class="comment_body_authorAvatar"
        :src="comment.author.avatar || default_avatar"
        alt=""
      />
      <div class="comment_body_right">
        <div class="comment_body_authorName">{{ comment.author.nickname }}</div>
        <div class="comment_body_content">{{ comment.content }}</div>
        <div class="comment_body_icon">
          <i class="auto-icon-comment" @click="beforeComment('parent', index)"
            ><span
              v-if="comment.childrens.length > 0"
              style="font-size: 15px;vertical-align: baseline;"
              >{{ comment.childrens.length }}</span
            ><span v-else style="vertical-align: bottom">{{
              $t("reply")
            }}</span></i
          >
          <!-- 回复一级评论 -->
          <div
            v-if="visibleArr[index] && visibleArr[index].visible"
            class="text_button"
          >
            <el-input
              class="comment_write_textArea"
              type="textarea"
              :placeholder="$t('placeholderReply')"
              v-model="textValues[index].textParent"
              maxlength="100"
              show-word-limit
              :rows="2"
            >
            </el-input>
            <el-button
              class="comment_write_button"
              type="primary"
              @click="commentParent(comment, index)"
              >{{ $t("reply") }}</el-button
            >
            <el-button
              class="comment_write_button"
              @click="cancleParentReply(index)"
              >{{ $t("cancel") }}</el-button
            >
          </div>
        </div>
        <!-- 二级评论 -->
        <div class="child" v-if="comment.childrens.length > 0">
          <div
            class="child_body"
            v-for="(commentChildren, indx) in comment.childrens"
            v-bind:key="commentChildren.id"
          >
            <img
              class="child_body_authorAvatar"
              :src="commentChildren.author.avatar || default_avatar"
              alt=""
            />
            <div class="child_body_right">
              <div class="child_body_authorName">
                <span style="max-width: 190px;">{{
                  commentChildren.author.nickname
                }}</span>
                <span v-if="commentChildren.toUser.id != '1'">
                  <span style="color: #8a919f;font-size:14px"
                    >&nbsp;&nbsp;{{ $t("reply") }}</span
                  >
                  <span>&nbsp;&nbsp;{{ commentChildren.toUser.nickname }}</span>
                </span>
              </div>
              <div class="child_body_content">
                {{ commentChildren.content }}
              </div>
              <div class="child_body_icon">
                <i
                  class="auto-icon-comment"
                  @click="beforeComment('child', index, indx)"
                  ><span style="vertical-align: bottom">{{
                    $t("reply")
                  }}</span></i
                >
                <!-- 回复二级评论 -->
                <div
                  v-if="
                    visibleArr[index] && visibleArr[index].childrenVis[indx]
                  "
                  class="text_button"
                >
                  <el-input
                    class="comment_write_textArea"
                    type="textarea"
                    :placeholder="$t('placeholderReply')"
                    v-model="textValues[index].childrenText[indx]"
                    maxlength="100"
                    show-word-limit
                    :rows="2"
                  >
                  </el-input>
                  <el-button
                    class="comment_write_button"
                    type="primary"
                    @click="
                      commentChildrenText(comment, commentChildren, index, indx)
                    "
                    >{{ $t("reply") }}</el-button
                  >
                  <el-button
                    class="comment_write_button"
                    @click="cancleParentReply(index)"
                    >{{ $t("cancel") }}</el-button
                  >
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <login-bar ref="login"></login-bar>
  </div>
</template>

<style lang="scss" scoped>
.comment {
  margin-bottom: 30px;
  background: white;
  width: 860px;
  padding: 30px;
  border-radius: 4px;
  &_write {
    margin-bottom: 100px;
    &_title {
      margin-bottom: 20px;
    }
    &_button {
      margin-top: 10px;
      float: right;
      margin-left: 7px;
    }
    &_right {
      display: flex;
    }
    &_textArea {
      margin-top: 10px;
    }
    &_avatar {
      width: 41px;
      height: 41px;
      border-radius: 50%;
      margin-top: 7px;
      margin-right: 12px;
    }
  }
  &_title,
  .comment_write_title {
    font-weight: 600;
    font-size: 23px;
    color: #252933;
  }
  .child {
    margin-top: 10px;
    width: 100%;
    background-color: rgba(247, 248, 250, 0.7);
    padding: 10px;
    border-radius: 5px;
    &_body {
      margin-top: 7px;
      &_icon {
        margin-top: 8px !important;
      }
    }
  }
  &_body {
    margin-top: 26px;
    margin-bottom: 20px;
    &_right {
      margin-right: 20px;
      width: 100%;
      display: block;
    }
  }
  &_body,
  .child_body {
    display: flex;
    margin-bottom: 18px;
    &_icon {
      cursor: pointer;
      color: #8a919f;
      font-size: 14px;
      margin-top: 6px;
      &:hover {
        color: #1171ee;
      }
      & span {
        margin-left: 6px;
        font-size: 14px;
      }
    }
    &_authorAvatar {
      width: 41px;
      height: 41px;
      border-radius: 50%;
      margin-right: 12px;
    }
    &_authorName {
      font-weight: 500;
      font-size: 15px;
      color: #252933;
      line-height: 26px;
    }
    &_content {
      width: 100%;
      font-weight: 400;
      font-size: 14px;
      color: #515767;
      margin-top: 8px;
    }
  }

  .text_button {
    padding-bottom: 50px;
  }

  >>> {
    .el-textarea__inner {
      font-size: 30px;
    }
  }
}
</style>

<script>
import commentService from "../../service/commentService";
import LoginBar from "../user/login.vue";
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      default_avatar: require("../../images/default_avatar.jpg"),
      // 文章评论内容
      textarea: "",
      visibleArr: [],
      textValues: [],
      commentCounts: ""
    };
  },
  components: {
    LoginBar
  },
  props: {
    comments: {
      type: Array
    },
    articleId: {}
  },
  watch: {
    comments: {
      handler(newVal, oldVal) {
        this.handlerVisibleArr(newVal);
      },
      deep: true
    }
  },
  computed: {
    user() {
      let isLogin = this.$store.state.account.length != 0;
      let avatar = this.$store.state.avatar;
      return { isLogin, avatar };
    },
    ...mapGetters(["cash"])
  },
  methods: {
    cancleParentReply(index) {
      const temp = this.comments[index];
      temp.parentVisble = false;
      this.$set(this.comments, index, temp);
    },
    handlerVisibleArr(commentsrNew) {
      let num = 0;
      while (this.visibleArr.length > 0) {
        this.visibleArr.pop();
      }
      commentsrNew.forEach((comment, idx) => {
        num++;

        //    一级评论内容
        const temp = {};
        temp.textParent = "";
        temp.childrenText = [];
        this.textValues.push(temp);

        // 一级评论框是否展示
        const visibles = {};
        visibles.visible = comment.parentVisble;

        visibles.childrenVis = [];
        if (comment.childrens.length > 0) {
          comment.childrens.forEach(children => {
            num++;

            // 二级评论框内容
            const tempText = "";
            this.textValues[idx].childrenText.push(tempText);

            // 二级评论框是否展示
            visibles.childrenVis.push(children.childVisble);
          });
        }
        this.visibleArr.push(visibles);
      });
      this.commentCounts = num;
    },
    beforeComment(str, index, indx) {
      if (!this.user.isLogin) {
        const { login } = this.$refs;
        if (login) {
          login.visible = true;
        }
      }
      if (str == "parent") {
        const temp = this.comments[index];
        temp.parentVisble = true;
        this.$set(this.comments, index, temp);
      }
      if (str == "child") {
        const temp = this.comments[index].childrens[indx];
        temp.childVisble = true;
        this.$set(this.comments[index], indx, temp);
      }
    },

    //评论文章
    async CommentArticle() {
      const $t = this.$t.bind(this);
      if (!this.textarea) {
        this.$message.error($t("commentNoNull"));
      }
      const params = {
        articleId: this.articleId,
        content: this.textarea,
        parent: null,
        toUserId: null,
        articleCategoryId: this.cash.categoryId,
        articlePage: this.cash.currentPage,
        articlePageSize: 10
      };
      const url = "comments/create/change";
      try {
        await commentService.post(url, params);
        this.textarea = "";
        this.$emit("fetchComments");
        this.$message.success($t("commentSuccess"));
      } catch (err) {
        this.$message.error(err);
      }
    },

    // 评论一级评论
    async commentParent(comment, index) {
      const $t = this.$t.bind(this);

      if (!this.textValues[index].textParent) {
        this.$message.error($t("commentNoNull"));
      }
      const params = {
        articleId: this.articleId,
        content: this.textValues[index].textParent,
        parent: comment.id,
        toUserId: null,
        articleCategoryId: this.cash.categoryId,
        articlePage: this.cash.currentPage,
        articlePageSize: 10
      };
      const url = "comments/create/change";
      try {
        await commentService.post(url, params);
        this.textValues[index].textParent = "";
        this.$emit("fetchComments");
        this.$message.success($t("commentSuccess"));
      } catch (err) {
        this.$message.error(err);
      }
    },

    // 评论二级评论
    async commentChildrenText(comment, commentChildren, index, indx) {
      const $t = this.$t.bind(this);

      if (!this.textValues[index].childrenText[indx]) {
        this.$message.error($t("commentNoNull"));
      }
      console.log(commentChildren);
      const params = {
        articleId: this.articleId,
        content: this.textValues[index].childrenText[indx],
        parent: comment.id,
        toUserId: commentChildren.author.id,
        articleCategoryId: this.cash.categoryId,
        articlePage: this.cash.currentPage,
        articlePageSize: 10
      };
      const url = "comments/create/change";
      try {
        await commentService.post(url, params);
        this.textValues[index].childrenText[indx] = "";
        this.$emit("fetchComments");
        this.$message.success($t("commentSuccess"));
      } catch (err) {
        this.$message.error(err);
      }
    }
  }
};
</script>

<i18n>
zh:
 allComment: 全部评论
 comment: 评论
 placeholderComment: 请输入评论内容
 commentNoNull: 评论内容不能为空
 reply: 回复
 placeholderReply: 请输入回复内容
 cancel: 取消
 commentSuccess: 评论成功！
en:
 allComment: All comments   
 comment: comment
 placeholderComment: Please enter comments
 commentNoNull: Comments cannot be empty
 reply: reply
 placeholderReply: Please enter your reply
 cancel: cancel
 commentSuccess: Comment successful!
</i18n>
