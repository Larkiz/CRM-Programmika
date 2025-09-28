export const authFetch = (path, options) => {
  return fetch(`${import.meta.env.VITE_API_HOST}/api` + path, {
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${sessionStorage.getItem("token")}`,
    },
    ...options,
  }).then((res) => {
    if (res.status === 403 && location.pathname !== "/auth") {
      location.pathname = "auth";
    }

    return res;
  });
};
