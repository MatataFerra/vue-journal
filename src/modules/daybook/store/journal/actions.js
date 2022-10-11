/* eslint-disable no-unused-vars */

import journalApi from '@/api/journalApi';

// export const myAction = async ({ commit }) => {}
export const loadEntries = async ({ commit }) => {
  const { data } = await journalApi.get('/entries.json');
  const entries = [];

  if (!data) {
    commit('setEntries', entries);
    return;
  }

  for (let id of Object.keys(data)) {
    entries.push({
      id,
      ...data[id],
    });
  }

  commit('setEntries', entries);
};
export const updateEntry = async ({ commit }, entry) => {
  const dataTosave = { ...entry };
  delete dataTosave.id;

  const { data } = await journalApi.put(`/entries/${entry.id}.json`, dataTosave);

  commit('updateEntry', { id: entry.id, ...data });
};
export const createEntry = async ({ commit }, entry) => {
  const { data } = await journalApi.post('/entries.json', entry);

  commit('addEntry', { id: data.name, ...entry });

  return data.name;
};

export const deleteEntry = async ({ commit }, entry) => {
  await journalApi.delete(`/entries/${entry.id}.json`);

  commit('deleteEntry', entry.id);
};
