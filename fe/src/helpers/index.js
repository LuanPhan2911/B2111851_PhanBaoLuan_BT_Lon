export function filterObjectByKeys(obj, keys) {
  return Object.fromEntries(
    Object.entries(obj).filter(([key]) => keys.includes(key))
  );
}
export function asset(url) {
  return `${import.meta.env.VITE_APP_BACKEND_URL}${url}`;
}
