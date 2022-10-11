<template>
  <NavbarDaybook />

  <div v-if="isLoading" class="spinner">
    <div class="col-3 alert-info text-center mt-5">
      Espere...
      <h3 class="mt-2">
        <i class="fa fa-spin fa-sync"></i>
      </h3>
    </div>
  </div>

  <div v-else class="d-flex">
    <div class="col-4">
      <EntryList />
    </div>
    <div class="col">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import NavbarDaybook from '@/modules/daybook/components/NavbarDaybook.vue';
import EntryList from '../components/EntryList.vue';
import { mapActions, mapState } from 'vuex';

export default {
  components: {
    NavbarDaybook,
    EntryList,
  },

  computed: {
    ...mapState('journal', ['isLoading']),
  },

  methods: {
    ...mapActions('journal', ['loadEntries']),
  },

  created() {
    this.loadEntries();
  },
};
</script>

<style lang="scss" scoped>
.spinner {
  height: calc(100vh - 56px);
  padding: 0;
  margin: 0;
  align-items: center;
  justify-content: center;
  display: flex;
}
</style>
