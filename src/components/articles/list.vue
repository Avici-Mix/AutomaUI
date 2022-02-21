<template>
  <div>
    <div
      class="article"
      v-for="article in articleList"
      v-bind:key="article.title"
    >
      <div class="article_head">
        <div class="title">{{ article.title }}</div>
        <div class="author">
          <img class="img" :src="article.author.img" />
          <div class="name">{{ article.author.name }}</div>
        </div>
      </div>
      <div class="article_body">
        <div class="digest">{{ article.digest }}</div>
      </div>
      <div class="article_foot">
        <div class="viewNumber">
          <i class="auto-icon-view"></i>
          <span>{{ article.viewNumber }}</span>
        </div>
        <div class="likeNumber">
          <i class="auto-icon-like"></i><span>{{ article.likeNumber }}</span>
        </div>
        <div class="commentNumber">
          <i class="auto-icon-comment"></i
          ><span>{{ article.commentNumber }}</span>
        </div>
        <div
          class="label"
          v-for="(label, index) in article.label"
          v-bind:key="index"
        >
          {{ label }}
        </div>
      </div>
      <div></div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.article {
  background: white;
  padding: 10px 20px;
  width: 700px;
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
    .viewNumber {
      margin-right: 5px;
    }
    .likeNumber {
      margin-right: 6px;
      & > i {
        margin-right: 2px;
      }
    }
    .commentNumber {
      margin-right: 5px;
      & > i {
        vertical-align: middle;
        margin-right: 2px;
      }
      & > span {
        vertical-align: middle;
      }
    }
    .label {
      margin-left: 4px;
      color: rgb(76, 76, 248);
      background: #e6e6e6;
      padding: 3px;
      border-radius: 20%;
    }
  }
}
</style>

<script>
export default {
  data() {
    return {
      articleList: [
        {
          title: "Web Infra 大咖面对面：聊聊前端的未来 & Vercel",
          digest:
            "听说又有大佬去 Vercel 啦？Vercel 到底拥有什么魅力？拥有多名框架大佬在麾下的 Vercel 对前端的未来又是怎么看的呢？",
          viewNumber: "21",
          commentNumber: "11",
          likeNumber: "6",
          label: ["前端", "Vue"],
          author: {
            name: "码上开花",
            img:
              "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fup.enterdesk.com%2Fedpic%2Fd3%2Fa0%2Fa2%2Fd3a0a268facbcfd843755ee4ecfc27bc.jpg&refer=http%3A%2F%2Fup.enterdesk.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1647965723&t=b7ff79010621735677954a5004575c36",
          },
        },
      ],
    };
  },
};
</script>
