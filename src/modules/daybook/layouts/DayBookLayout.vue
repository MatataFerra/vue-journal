<template>
  <NavbarDaybook />
  <div class="d-flex">
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

export default {
  components: {
    NavbarDaybook,
    EntryList,
  },
};
</script>
