<template>
  <div
    class="mb-3 pointer p-2 entry-container"
    @click="$router.push({ name: 'entry', params: { id: entry.id } })"
  >
    <div class="entry-title d-flex">
      <span class="text-success fs-5 fw-bold">{{ day }}</span>
      <span class="mx-1 fs-2">{{ months }}</span>
      <span class="mx-2 fw-light">{{ year }}</span>
    </div>

    <div class="entry-description">
      {{ shortText }}
    </div>
  </div>
</template>

<script>
const months = [
  'Enero',
  'Febrero',
  'Marzo',
  'Abril',
  'Mayo',
  'Junio',
  'Julio',
  'Agosto',
  'Septiembre',
  'Octubre',
  'Noviembre',
  'Diciembre',
];
const days = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
export default {
  props: {
    entry: {
      type: Object,
      required: true,
    },
  },

  computed: {
    shortText() {
      return this.entry.text.substring(0, 50) + '...';
    },

    day() {
      const date = new Date(this.entry.date);
      return date.getDate();
    },

    months() {
      const date = new Date(this.entry.date);
      return months[date.getMonth()];
    },
    year() {
      const date = new Date(this.entry.date);
      return `${date.getFullYear()}, ${days[date.getDay()]}`;
    },
  },
};
</script>

<style lang="scss" scoped>
.entry-container {
  border: 1px solid #2c3e58;
  border-radius: 10px;
  transition: all 0.3s ease;

  &:hover {
    background-color: lighten($color: #2c3e58, $amount: 10%);
    color: #fff;
  }
}
</style>
