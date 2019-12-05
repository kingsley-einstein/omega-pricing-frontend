export const intercept = () => {
  const globalFetch = fetch;
  fetch = (input, init) => new Promise(async (resolve) => {
    if (init && init.headers) {
      if (localStorage.getItem("token")) {
        init.headers["Authorization"] = `Bearer ${localStorage.getItem("token")}`;
      }
    }
    const responseFromServer = await globalFetch(input, init);
    if (responseFromServer.status === 401) {
      localStorage.clear();
      window.location.href = "/login";
    }
    resolve(responseFromServer);
  });
};
