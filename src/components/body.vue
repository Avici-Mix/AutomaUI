<template>
  <div class="body">
    <list></list>
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
};
</script>
