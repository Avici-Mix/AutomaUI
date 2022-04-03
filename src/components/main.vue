<template>
  <div class="main">
    <el-container>
      <el-header class="header">
        <header-bar @fetchCategory="fetchByCategory($event)"></header-bar>
      </el-header>
      <el-main>
        <body-content ref="body"></body-content>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import HeaderBar from "./header.vue";
import BodyContent from "./body.vue";

export default {
  components: {
    HeaderBar,
    BodyContent,
  },
  methods:{
    fetchByCategory(id){
      const {body} = this.$refs;
      if(body){
        body.fetchArticleByCategory(id);
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.main {
  background-color: #f5f5f5;
  .header {
    padding: 0;
  }
  >>> {
    .main  {
      background-color: #f5f5f5;
    }
  }
}
</style>
