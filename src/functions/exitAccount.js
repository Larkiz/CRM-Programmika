export const exitAccount = (nav) => {
  sessionStorage.clear();
  localStorage.clear();
  return nav;
};
