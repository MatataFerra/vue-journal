<template>
  <div class="no-entry d-flex justify-content-center">
    <h2 class="align-self-center text-center">
      Select an entry
      <br />
      or create a new one!
    </h2>
  </div>
  <Fab @on:click="goToCreateEntry" />
</template>

<script>
import Fab from '@/modules/daybook/components/Fab.vue';
export default {
  components: {
    Fab,
  },

  methods: {
    goToCreateEntry() {
      this.$router.push({ name: 'entry', params: { id: 'new' } });
    },
  },
};
</script>

<style lang="scss" scoped>
div {
  height: 100%;
}
</style>
