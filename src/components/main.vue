<template>
  <div class="main">
    <el-container>
      <el-header class="header">
        <header-bar></header-bar>
      </el-header>
      <el-main class="body">
        <body-content></body-content>
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
};
</script>


<style lang="scss" scoped>
.main {
  .header {
    padding: 0;
  }
  .body {
    height: 100%;
    width: 100%;
    background-color: #f6f6f6;
  }
}
</style>