<template>
  <div class="entry-list-container">
    <div class="px-2 pt-2">
      <input type="text" class="form-control" placeholder="Buscar entradas" v-model="term" />
    </div>

    <div class="entry-scrollarea">
      <EntryElement v-for="entry in getEntryByTerm" :key="entry.id" :entry="entry" />
    </div>
  </div>
</template>

<script>
import EntryElement from './EntryElement.vue';
import { mapGetters } from 'vuex';
export default {
  components: { EntryElement },
  computed: {
    ...mapGetters('journal', ['getEntriesByTerm']),
    getEntryByTerm() {
      return this.getEntriesByTerm(this.term);
    },
  },
  data() {
    return {
      term: '',
    };
  },
};
</script>

<style lang="scss" scoped>
.entry-list-container {
  border-right: 1px solid #2c3e58;
  height: calc(100vh - 56px);
}

.entry-scrollarea {
  height: calc(100vh - 56px - 56px);
  overflow-y: scroll;
  padding: 0.5rem 1rem;
}
</style>
