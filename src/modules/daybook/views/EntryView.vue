<template>
  <template v-if="entry">
    <div class="entry-title d-flex justify-content-between p-2">
      <div>
        <span class="text-success fs-5 fw-bold">{{ date.day }}</span>
        <span class="mx-1 fs-2">{{ date.month }}</span>
        <span class="mx-2 fw-light">{{ date.yearDay }}</span>
      </div>

      <div class="d-flex gap-2">
        <input
          type="file"
          @change="onSelectedImage"
          ref="imageSelector"
          v-show="false"
          accept="image/png, image/jpg, image/jpeg"
        />

        <button @click="deleteSelectedEntry" class="btn btn-outline-primary btn-danger text-white">
          Borrar
          <i class="fa fa-trash-alt"></i>
        </button>
        <button class="btn btn-outline-primary btn-info text-black" @click="onSelectImage">
          Subir foto
          <i class="fa fa-upload"></i>
        </button>
      </div>
    </div>

    <hr />
    <div class="d-flex flex-column px-3 h-75">
      <textarea name="text" id="" placeholder="¿Qué sucedió hoy?" v-model="entry.text"></textarea>
    </div>

    <Fab icon="fa-save" @on:click="saveEntry" />

    <img
      v-if="entry.picture && !localImage"
      :src="entry.picture"
      alt="Image"
      class="img-thumbnail"
    />
    <img v-if="localImage" :src="localImage" alt="Image" class="img-thumbnail" />
  </template>
</template>

<script>
import Fab from '../components/Fab.vue';
import { mapGetters, mapActions } from 'vuex';
import getMonthYear from '../helpers/getDayMonthYear';
import uploadImage from '@/api/uploadImages';
import Swal from 'sweetalert2';
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
      localImage: null,
      file: null,
    };
  },

  methods: {
    ...mapActions('journal', ['updateEntry', 'createEntry', 'deleteEntry']),
    loadEntry() {
      let entry = {};
      if (this.id === 'new') {
        entry = {
          text: '',
          picture: '',
          date: new Date().getTime(),
        };
      } else {
        entry = this.getEntryById(this.id);
        if (!entry) return this.$router.push({ name: 'no-entry' });
      }

      this.entry = entry;
    },

    async saveEntry() {
      new Swal({
        title: 'Guardando',
        text: 'Espere por favor...',
        allowOutsideClick: false,
      });
      Swal.showLoading();

      const picture = await uploadImage(this.file);
      this.entry.picture = picture;
      this.localImage = picture;

      console.log({ picture, entry: this.entry });

      if (this.entry.id) {
        await this.updateEntry(this.entry);
      } else {
        const newEntry = await this.createEntry(this.entry);
        this.$router.push({ name: 'entry', params: { id: newEntry } });
      }

      this.file = null;

      Swal.fire('Guardado', 'Se guardó correctamente', 'success');
    },

    async deleteSelectedEntry() {
      const result = await Swal.fire({
        title: '¿Estás seguro?',
        text: 'No podrás revertir esta acción',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, borrar',
        cancelButtonText: 'Cancelar',
      });

      if (result.isConfirmed) {
        new Swal({
          title: 'Borrando',
          text: 'Espere por favor...',
          allowOutsideClick: false,
        });

        Swal.showLoading();
        await this.deleteEntry(this.entry);
        this.$router.push({ name: 'no-entry' });

        Swal.fire('Borrado', 'Se borró correctamente', 'success');
      }
    },

    onSelectedImage(event) {
      const file = event.target.files[0];
      if (!file) {
        this.localImage = null;
        this.file = null;
        return;
      }

      this.file = file;

      const reader = new FileReader();
      reader.onload = () => (this.localImage = reader.result);
      reader.readAsDataURL(file);
    },

    onSelectImage() {
      this.$refs.imageSelector.click();
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
