export const notesReducer = (state, action) => {
  const { type } = action;
  if (type === "set") {
    const { data } = action;
    return (state = data);
  }
  if (type === "add") {
    const { data } = action;
    return (state = [data, ...state]);
  }
  if (type === "delete") {
    const { id } = action;
    return state.filter((note) => note.id !== id);
  }
};
