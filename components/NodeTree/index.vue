<template>
  <!-- узлы ветвей файлового дерева -->
  <li class="node-tree">
    <div
      class="node-tree__name"
      :class="{'node-tree__name_folder': node.type === 'folder'}"
    >
      <div class="w-100">
        <img
          v-if="node.type === 'folder'"
          class="node-tree__icon"
          src="~static/images/folder.png"
          alt="iconType"
        >
        <img
          v-else
          class="node-tree__icon"
          src="~static/images/file.png"
          alt="iconType"
        >
        <!--  название узла    -->
        <span
          :class="{ 'hide' : changeText }"
        >
          {{ node.name }}
        </span>
        <!--  поле ввода нового названия    -->
        <input
          type="text"
          class="node-tree__change-name-input"
          :class="{ 'hide' : !changeText }"
          v-model="text"
        >
      </div>
      <!--  управление узлами    -->
      <div class="node-tree__tools">
        <!--    изменение    -->
        <img
          class="node-tree__tool"
          :class="{ 'node-tree__tool_active': changeText }"
          src="~static/images/change.png"
          alt="change"
          @click="changeNode(node.id, node.name)"
        >
        <!--    удаление    -->
        <img
          class="node-tree__tool"
          src="~static/images/delete.png"
          alt="delete"
          @click="deleteNode(node.id)"
        >
      </div>
    </div>

    <!--  новые узлы добавляются в ветвь пока в атрибуте files у узла есть элементы  -->
    <ul v-if="node.files && node.files.length">
      <node
        v-for="(file, idx) in node.files"
        :key="`nodeTree_${file.name}_${idx}`"
        :node="file"></node>
    </ul>
  </li>
</template>

<script>
export default {
  name: "node",
  props: {
    node: {
      type: Object,
      default: {
        id: 0,
        name: '-',
        type: 'folder',
        files: [],
      },
    },
  },
  data: () => ({
    // отслеживание состояния изменения узла
    changeText: false,
    // текущее название узла отображаемое в поле ввода
    text: '',
    // слепок названия узла для сверки после изменения
    castText: '',
  }),
  methods: {
    // изменение названия узла
    async changeNode(id, name) {
      // если название поменялось после изменения записываем новое название и прекращаем изменение поля
      if (this.changeText && this.text !== this.castText) {
        const payload = {
          id,
          text: this.text,
        }
        await this.$store.dispatch('dirs/changeNode', payload);
      } else {
        // заполняем атрибуты перед изменением поля
        this.castText = name;
        this.text = name;
      }
      this.changeText = !this.changeText;
    },
    // удаление узла
    async deleteNode(id) {
      await this.$store.dispatch('dirs/deleteNode', {id});
    },
  }
}
</script>

<style lang="scss" scoped>
.node-tree {
  width: 100%;
  &__name {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    padding: 3px 10px 3px 10px;
    &_folder {
      border: #F36C78 1px solid;
      border-radius: 5px;
    }
  }
  &__icon {
    width: 25px;
    height: 25px;
    margin: 0 10px 0 0;
  }
  &__tools {
    display: flex;
    align-items: center;
    height: 100%;
  }
  &__tool {
    width: 20px;
    height: 20px;
    margin: 0 0 0 5px;
    cursor: pointer;
    opacity: 0.3;
    transition: opacity 0.2s;
    &:hover {
      opacity: 1;
    }
    &_active {
      opacity: 1;
    }
  }
  &__change-name-input {
    width: 80%;
    margin: 0;
    padding: 0;
    border: none;
    color: #F36C78;
    //border-bottom: #7fc8ff 1px solid;
    &:focus {
      outline: none;
    }
  }
}

.hide {
  display: none;
}
.w-100 {
  width: 100%;
}
</style>
