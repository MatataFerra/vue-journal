/* eslint-disable no-unused-vars */
export const setEntries = (state, entries) => {
  state.entries = [...state.entries, ...entries];
  state.isLoading = false;
};
export const updateEntry = (state, entry) => {
  state.entries = state.entries.map((item) => (item.id === entry.id ? entry : item));
  state.isLoading = false;
};
export const addEntry = (state, entry) => {
  state.entries = [entry, ...state.entries];
  state.isLoading = false;
};
export const deleteEntry = (state, id) => {
  state.entries = state.entries.filter((entry) => entry.id !== id);
  state.isLoading = false;
};
