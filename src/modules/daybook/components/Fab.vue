<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <button class="btn btn-primary rounded-circle" @:click="$emit('on:click')">
    <i class="fa fa-2x" :class="icon"></i>
  </button>
</template>

<script>
export default {
  props: {
    icon: {
      type: String,
      default: 'fa-plus',
    },
  },
};
</script>

<style lang="scss" scoped>
button {
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  width: 4rem;
  height: 4rem;
  z-index: 10;
}
</style>
