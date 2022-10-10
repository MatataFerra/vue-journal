<template>
  <template v-if="entry">
    <div class="entry-title d-flex justify-content-between p-2">
      <div>
        <span class="text-success fs-5 fw-bold">{{ date.day }}</span>
        <span class="mx-1 fs-2">{{ date.month }}</span>
        <span class="mx-2 fw-light">{{ date.yearDay }}</span>
      </div>

      <div class="d-flex gap-2">
        <button class="btn btn-outline-primary btn-danger text-white">
          Borrar
          <i class="fa fa-trash-alt"></i>
        </button>
        <button class="btn btn-outline-primary btn-info text-black">
          Subir foto
          <i class="fa fa-upload"></i>
        </button>
      </div>
    </div>

    <hr />
    <div class="d-flex flex-column px-3 h-75">
      <textarea name="text" id="" placeholder="¿Qué sucedió hoy?" v-model="entry.text"></textarea>
    </div>

    <Fab icon="fa-save" />

    <img src="https://picsum.photos/800" alt="Image" class="img-thumbnail" />
  </template>
</template>

<script>
import Fab from '../components/Fab.vue';
import { mapGetters } from 'vuex';
import getMonthYear from '../helpers/getDayMonthYear';
export default {
  props: {
    id: {
      type: String,
      required: true,
    },
  },
  components: { Fab },

  data() {
    return {
      entry: null,
    };
  },

  methods: {
    loadEntry() {
      const entry = this.getEntryById(this.id);
      if (!entry) return this.$router.push({ name: 'no-entry' });

      this.entry = entry;
    },
  },

  computed: {
    ...mapGetters('journal', ['getEntryById']),
    date() {
      const entryDate = getMonthYear(this.entry.date);
      return entryDate;
    },
  },

  created() {
    this.loadEntry();
  },

  watch: {
    id() {
      this.loadEntry();
    },
  },
};
</script>

<style lang="scss" scoped>
textarea {
  font-size: 20px;
  border: none;
  height: 100%;

  &:focus {
    outline: none;
  }
}

img {
  width: 200px;
  position: fixed;
  bottom: 150px;
  right: 20px;
  box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.5);
}
</style>
