export const authFetch = (path, options) => {
  return fetch(`${import.meta.env.VITE_API_HOST}/api` + path, {
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${sessionStorage.getItem("token")}`,
    },
    ...options,
  });
};
