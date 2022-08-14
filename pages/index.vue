<template>
<!-- страница с файловой системой -->
  <div class="index container">
    <h1 class="index__header">
      <img
        class="header__image"
        src="~static/images/logo.png"
        alt="logo">
      <span class="header__text">File System _</span>
    </h1>
    <div class="index__content">
      <tree />
    </div>
  </div>
</template>

<script>
import Tree from '../components/Tree';

export default {
  name: 'IndexPage',
  components: {
    // корень файловой системы
    Tree,
  },
};
</script>

<style lang="scss" scoped>
.index {
  max-width: 1000px;
  &__header {
    margin: 20px 0;
  }
  &__content {
    margin: 50px 0;
  }
}
.header {
  &__image {
    width: 30px;
    height: 30px;
  }
  &__text {
    font-size: 30px;
    color: #F36C78;
    font-weight: bold;
  }
}
</style>
