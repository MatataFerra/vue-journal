import axios from 'axios';

const journalApi = axios.create({
  baseURL: 'https://vue-demo-402ff-default-rtdb.firebaseio.com',
});

export default journalApi;
