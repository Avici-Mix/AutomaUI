<template>
  <div class="publish">
    <div class="headerBar">
      <img class="icon" src="../../images/robotIcon.png" @click="backHome" />
      <div class="text" @click="backHome">Aumto</div>
      <div class="headerBar_right">
        <div class="operate">
          <el-button @click="cancel">{{ $t("cancel") }}</el-button>
          <el-button type="primary" @click="showDialog">{{
            $t("publish")
          }}</el-button>
        </div>
        <user-bar></user-bar>
      </div>
    </div>

    <div class="body">
      <div class="title">
        <el-input
          v-model="articleForm.title"
          maxlength="80"
          :placeholder="$t('placeholderTitle')"
        ></el-input>
      </div>

      <div class="markdown">
        <markdown-editor
          class="markdown_editor"
          :editor="articleForm.editor"
        ></markdown-editor>
      </div>

      <el-dialog :title="$t('publishTitle')" :visible.sync="publishVisible">
        <el-form :model="articleForm" ref="articleForm" :rules="rules">
          <el-form-item prop="summary">
            <el-input
              type="textarea"
              :rows="6"
              :placeholder="$t('placeholder.Summary')"
              v-model="articleForm.summary"
            >
            </el-input>
          </el-form-item>

          <el-form-item :label="$t('Classification')" prop="category">
            <el-select
              v-model="articleForm.category"
              :placeholder="$t('categoryPlace')"
            >
              <el-option
                v-for="category in categorys"
                :key="category.id"
                :label="category.categoryName"
                :value="category.categoryName"
              ></el-option>
            </el-select>
          </el-form-item>

          <el-form-item :label="$t('articleLabel')" prop="tags"
            >·
            <el-checkbox-group v-model="articleForm.tags" class="checkbox">
              <el-checkbox
                v-for="tag in tags"
                :key="tag.id"
                :label="tag.id"
                name="tags"
                >{{ tag.tagName }}</el-checkbox
              >
            </el-checkbox-group>
          </el-form-item>
        </el-form>
        <div class="btn">
          <el-button
            type="primary"
            @click="submitFrom(articleForm)"
            style="margin-left:15px"
            >{{ $t("confirmPublish") }}</el-button
          >
          <el-button @click="publishVisible = false">{{
            $t("cancelPublish")
          }}</el-button>
        </div>
      </el-dialog>
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
    height: 65%;
    width: 3%;
  }
}

.body {
  display: flex;
  justify-items: center;
  align-items: center;
  flex-direction: column;
  .title {
    font-size: 19px;
    width: 95%;
    margin-top: 20px;
    margin-bottom: 20px;
    >>> {
      .el-input {
        font-size: 20px;
      }
    }
  }
  .markdown {
    width: 95%;
    &_editor {
      min-height: 540px !important;
    }
  }
}

.btn {
  display: flex;
  flex-direction: row-reverse;
}
>>> {
  .el-checkbox-group {
    margin-top: 10px;
  }
}
</style>

<script>
import UserBar from "../user/userbar.vue";
import MarkdownEditor from "../markdown/markdownEditor.vue";
import headerBar from "../header.vue";
import categoryService from "../../service/categoryService";
import tagService from "../../service/tagService";
import articleService from "../../service/articleService";
import { mapGetters } from "vuex";
export default {
  components: { headerBar, MarkdownEditor, UserBar },
  name: "ArticlePublish",
  created() {
    this.fetchArticle();
  },
  computed: {
    ...mapGetters(["cash", "viewCountArr"])
  },
  data() {
    const $t = this.$t.bind(this);
    return {
      editArticleId: "",
      publishVisible: false,
      categorys: [],
      tags: [],
      articleForm: {
        id: "",
        title: "",
        summary: "",
        category: "",
        tags: [],
        editor: {
          value: "",
          ref: "", //保存mavonEditor实例  实际不该这样
          default_open: "edit",
          toolbars: {
            bold: true, // 粗体
            italic: true, // 斜体
            header: true, // 标题
            underline: true, // 下划线
            strikethrough: true, // 中划线
            mark: true, // 标记
            superscript: true, // 上角标
            subscript: true, // 下角标
            quote: true, // 引用
            ol: true, // 有序列表
            ul: true, // 无序列表
            imagelink: true, // 图片链接
            code: true, // code
            fullscreen: true, // 全屏编辑
            readmodel: true, // 沉浸式阅读
            help: true, // 帮助
            undo: true, // 上一步
            redo: true, // 下一步
            trash: true, // 清空
            navigation: true, // 导航目录
            //subfield: true, // 单双栏模式
            preview: true // 预览
          }
        }
      },
      rules: {
        summary: [
          {
            required: true,
            message: $t("placeholder.Summary"),
            trigger: "blur"
          },
          { max: 80, message: "", trigger: "blur" }
        ],
        category: [
          { required: true, message: $t("categoryPlace"), trigger: "change" }
        ],
        tags: [
          {
            type: "array",
            required: true,
            message: $t("placeholder.label"),
            trigger: "change"
          }
        ]
      }
    };
  },
  methods: {
    async fetchArticle() {
      try {
        const params = {
          categoryId: this.cash.categoryId,
          page: this.cash.currentPage,
          pageSize: 10
        };
        this.editArticleId = this.$route.params.articleId;
        const url = `article/view/${this.editArticleId}`;
        const { data } = await articleService.post(url, params);
        this.articleForm.id = data.id;
        this.articleForm.title = data.title;
        this.articleForm.summary = data.summary;
        this.category = data.category;
        this.tags = data.tags;
        this.articleForm.editor.value = data.body.content;
        this.articleForm.editor.ref.d_render = data.body.contentHtml;
      } catch (error) {}
    },
    async publishArticle() {
      const $t = this.$t.bind(this);
      const that = this;
      const category = this.categorys.find(item => {
        return item.categoryName == that.articleForm.category;
      });
      const tags = [];

      this.tags.forEach(item => {
        that.articleForm.tags.forEach(tag => {
          if (tag == item.id) {
            tags.push(item);
          }
        });
      });
      const params = {
        id: this.articleForm.id,
        title: this.articleForm.title,
        summary: this.articleForm.summary,
        category: category,
        tags: tags,
        body: {
          content: this.articleForm.editor.value,
          contentHtml: this.articleForm.editor.ref.d_render
        }
      };

      const url = "/article/publish";

      try {
        const { data } = await articleService.post(url, params);
        this.$message.success($t("publishSuccess"));
        this.$router.push({ path: `/view/${data.id}` });
      } catch (err) {}
    },
    async fetchCategory() {
      try {
        const { data } = await categoryService.get();
        this.categorys = data;
      } catch (err) {
        this.$message.error(err);
      }
    },
    async fetchTag() {
      try {
        const { data } = await tagService.get();
        this.tags = data;
      } catch (err) {
        this.$message.error(err);
      }
    },
    showDialog() {
      this.fetchTag();
      this.fetchCategory();
      this.publishVisible = true;
    },
    backHome() {
      this.$router.push({ path: `/` });
    },
    cancel() {
      const $t = this.$t.bind(this);
      this.$confirm($t("cancelTip"), $t("tip"), {
        confirmButtonText: $t("confirm"),
        cancelButtonText: $t("cancel"),
        type: "warning"
      }).then(() => {
        this.$router.push("/");
      });
    },
    submitFrom(articleForm) {
      this.$refs.articleForm.validate(valid => {
        if (valid) {
          this.publishArticle();
        } else {
          return false;
        }
      });
    }
  }
};
</script>

<i18n>
zh:
 placeholderTitle: 请输入标题
 cancel: "取消"
 cancelTip: "文章将不会保存, 是否继续?"
 confirm: "确定"
 tip: "提示"
 publish: "发布"
 publishTitle: "摘要 分类 标签"
 placeholder:
  Summary: 请输入文章摘要
  label: 请选择标签
 Classification: 文章分类
 articleLabel: 文章标签
 categoryPlace: 请选择文章分类
 maxlength: 不能大于80个字符
 confirmPublish: 确认发布
 cancelPublish: 取消发布
 publishSuccess: 发布成功!
en:
 placeholderTitle: Please enter a title
 cancel: "cancel"
 cancelTip: "The article will not be saved, continue?"
 confirm: "comfirm"
 tip: "tip"
 publishTitle: "Summary Classification label"
 placeholder:
  Summary: Please enter the summary of the article
  label: Please select the label
 Classification: The article classification
 articleLabel: The article label
 categoryPlace: Please select the article category
 maxlength: The value contains a maximum of 80 characters 
 confirmPublish: confirm 
 cancelPublish: cancel
 publishSuccess: Publish success!
</i18n>
