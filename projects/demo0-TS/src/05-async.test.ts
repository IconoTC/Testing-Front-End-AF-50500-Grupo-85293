import { fetchData, fetchDataPromise, fetchDaPromiseReject } from "./05-async.js";

describe('fetchData', () => {
  it('should return data after 1 second', () => {
    const fn = (value: string): void => {
      expect(value).toBe("sample data");
    };
    fetchData(fn);
  });
});

describe('fetchDataPromise resolved OK', () => {
  it('should return data after 1 second', () => {
    fetchDataPromise().then((data) => {
      expect(data).toBe("sample data");
    });
  });
});
describe('fetchDataPromiseReject', () => {
  it('should return an error after 1 second', async () => {
    fetchDaPromiseReject().catch((error: Error) => {
      expect(error.message).toBe("error fetching data");
    });
  });
});

// Usando async/await

describe('fetchDataPromise with async/await', () => {
  it('should return data after 1 second', async () => {
    const data = await fetchDataPromise();
    expect(data).toBe("sample data");
  });
});


describe('fetchDataPromiseReject with async/await', () => {
    it('should return an error after 1 second', async () => {
        await expect(fetchDaPromiseReject()).rejects.toThrow("error fetching data");
    });
});

describe('using async/await with a function that rejects a promise (1)', () => {
    test('la promesa es rechazada con un error', async () => {
        try {
            await fetchDaPromiseReject();
        } catch (error) {
            expect((error as Error).message).toEqual('error fetching data');
        }
    });
});
