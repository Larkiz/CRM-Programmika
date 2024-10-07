export const authFetch = (path, options) => {
  return fetch(`${process.env.REACT_APP_API_HOST}/api` + path, {
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${sessionStorage.getItem("token")}`,
    },
    ...options,
  });
};
