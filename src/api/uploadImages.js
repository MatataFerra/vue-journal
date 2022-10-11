import axios from 'axios';

const baseUrl = 'https://api.cloudinary.com/v1_1/docq8rbdu/image/upload';
const uploadPreset = 'vue-curso';

const uploadImage = async (file) => {
  if (!file) return;

  const formData = new FormData();
  formData.append('upload_preset', uploadPreset);
  formData.append('file', file);

  try {
    const {
      data: { secure_url },
    } = await axios.post(baseUrl, formData);
    return secure_url;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export default uploadImage;
