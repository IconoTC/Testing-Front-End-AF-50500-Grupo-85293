export const fetchData = (callback: (data: string) => void): void => {
  setTimeout(() => {
    callback("sample data");
  }, 1000);
}

export const fetchDataPromise = (): Promise<string> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("sample data");
    }, 1000);
  });
};

export const fetchDaPromiseReject = (): Promise<string> => {
  return new Promise((_, reject) => {
    setTimeout(() => {
      reject(new Error("error fetching data"));
    }, 1000);
  });
}
