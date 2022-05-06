<template>
  <div class="body">
    <list ref="list" style="width:750px; box-shadow: 5px 5px 5px rgb(238, 229, 229);background:white"></list>
    <article-sider></article-sider>
  </div>
</template>

<style lang="scss" scoped>
.body {
  display: flex;
  justify-content: center;
}
</style>

<script>
import List from "./articleList/list.vue";
import articleSider from "./articleList/articleSider.vue";
export default {
  components: {
    List,
    articleSider,
  },
  methods:{
    fetchArticleByCategory(id){
      const {list} = this.$refs;
      if(list){
        list.getArticleList(id);
      }
    }
  }
};
</script>
