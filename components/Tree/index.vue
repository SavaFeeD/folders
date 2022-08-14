<template>
  <!-- корень файловой системы -->
  <div class="tree">
    <ul class="tree__list">
      <node-tree
        v-for="(file, idx) in dataDirs"
        :key="`nodeTree_${file.name}_${idx}`"
        :node="file"
      ></node-tree>
    </ul>
  </div>
</template>

<script>
import NodeTree from '~/components/NodeTree';
import {mapGetters} from "vuex";

export default {
  name: "Tree",
  components: {
    NodeTree,
  },
  async created() {
    await this.getDirsData();
  },
  computed: {
    ...mapGetters({
      dataDirs: 'dirs/getDirs',
    }),
  },
  methods: {
    async getDirsData() {
      await this.$store.dispatch('dirs/getDirs')
    },
  },
}
</script>

<style lang="scss" scoped>
.tree {
  &__list {
    padding-right: 30px;
  }
}
</style>
