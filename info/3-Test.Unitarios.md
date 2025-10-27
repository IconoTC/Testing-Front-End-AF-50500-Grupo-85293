# Tests unitarios de funciones y clases

- [Tests unitarios de funciones y clases](#tests-unitarios-de-funciones-y-clases)
  - [Asincronía en los test unitarios](#asincronía-en-los-test-unitarios)
    - [Callbacks](#callbacks)
    - [Promesas](#promesas)
      - [Async/Await](#asyncawait)
      - [Promesas rechazadas](#promesas-rechazadas)
  - [Mocks y Spies. Matches específicos](#mocks-y-spies-matches-específicos)
    - [Mocking de Funciones](#mocking-de-funciones)
      - [Verificación de Llamadas](#verificación-de-llamadas)
    - [Mocking de Módulos](#mocking-de-módulos)
      - [Mocking de librerías de terceros](#mocking-de-librerías-de-terceros)
      - [Mocking APIS nativas, como Fetch](#mocking-apis-nativas-como-fetch)
    - [Spies en Vitest](#spies-en-vitest)
  - [Testing de aplicaciones orientadas a objetos: Test de clases](#testing-de-aplicaciones-orientadas-a-objetos-test-de-clases)
    - [Test de la capa repository](#test-de-la-capa-repository)
      - [Interface de la entidad Note](#interface-de-la-entidad-note)
      - [Interface genérica de la capa repository](#interface-genérica-de-la-capa-repository)
    - [Test de la de estado](#test-de-la-de-estado)
      - [Mocks de métodos de clases: utilizando prototypes](#mocks-de-métodos-de-clases-utilizando-prototypes)

Los **test unitarios** puros son aquellos que prueban una unidad de código, como una función o un método de una clase, de forma aislada.

En algunos frameworks (e.g. Angular) es habitual utilizar la orientación a objetos, por lo que es común testar clases. En el caso de los **servicios**, estas clases abstraen la lógica a una capa independiente de los componentes y por tanto del UI. En los tests correspondientes, se trata de probar los métodos de la clase de forma aislada, sin tener en cuenta el comportamiento de sus dependencias. Para ello, se suelen utilizar mocks como los ya mencionados para simular el comportamiento de las dependencias de la unidad de código que estamos probando.

En otros frameworks (e.g. React) es más común utilizar funciones puras como servicios que aíslan la lógica de los componentes. En este caso, los test unitarios se centran en probar estas funciones o de forma aislada, asegurándose de que devuelven los resultados esperados para diferentes entradas.

La **testabilidad** del frontend depende de los **patrones** que hayamos empleado a la hora de desarrollar nuestra aplicación. Por ejemplo, si hemos seguido el principio **separación por capas** y de **responsabilidad única**, será más fácil testar cada una de las unidades de código de forma **aislada**. Por otro lado, si hemos seguido el principio de **inyección de dependencias**, será muy fácil disponer de mocks para evitar las interferencias entre diferentes unidades de código. A la hora detestar las distintas capas de la aplicación de forma aislada, veremos que es imprescindible utilizar **mocks** para simular el comportamiento de las dependencias de cada capa.

Una de las características de JavaScript es el carácter **asíncrono** de muchas de sus operaciones, como las llamadas a bases de datos o a servicios externos. Por ello, es importante tener en cuenta la forma de testar estas operaciones asíncronas, utilizando las diferentes formas que nos proporciona JavaScript para manejar la asincronía, como los **callbacks**, las **promesas** o las **funciones async/await**.

## Asincronía en los test unitarios

En aplicaciones en JavaScript, muchas funciones son asíncronas, como las llamadas a APIs. Vitest proporciona la posibilidad de tester las diferentes formas de manejar las operaciones asíncronas, propias del lenguaje como los callbacks, las promesas o las funciones async/await.

### Callbacks

Supongamos que tienes una función fetchData que toma un callback y lo llama con los datos después de una operación asíncrona.

```ts
// 05-async.ts
export function fetchData(callback: (data: string) => void): void {
  setTimeout(() => {
    callback('sample data');
  }, 1000);
}
```

En **Jest**, puedes testar esta función pasando un callback que haga la aserción y llamando a done() para indicar que la prueba ha terminado.

```ts
// 05-async.test.ts
import { fetchData } from './05-async.js';
test('los datos recibidos por el callback son "sample data"', () => {
  function callback(data: string): void {
    expect(data).toBe('sample data');
    done();
  }
  fetchData(callback);
});
```

En **Vitest**, el enfoque es similar, pero la función done() ya no existe. En su lugar, Vitest detecta automáticamente cuando una prueba asíncrona ha terminado.

```ts
// 05-async.test.ts
import { fetchData } from './05-async.js';
test('los datos recibidos por el callback son "sample data"', () => {
  // Creamos el callback
  function callback(data: string): void {
    expect(data).toBe('sample data');
  }
  // Llamamos a la función asíncrona
  fetchData(callback);
});
```

Hoy en día el uso de callbacks para manejar la asincronía es poco común, especialmente en el Frontend, pero es interesante conocer esta forma de testar funciones asíncronas.

### Promesas

Si una función devuelve una promesa, se puede usar .then y .catch para manejar la aserción, de forma similar a como se consumiría la promesa en el código.

Si la promesa se resuelve correctamente, se puede hacer la aserción en el bloque .then.

En **Jest**, es importante devolver la promesa desde el test para que el test espere a que se resuelva antes de considerar que el test ha terminado. En **Vitest**, este paso no es necesario, ya que Vitest detecta automáticamente cuando una prueba asíncrona ha terminado.

```ts
// 05-async.ts
export function fetchDataPromise(): Promise<string> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve('sample data');
    }, 1000);
  });
}
```

```ts
// 05-async.test.js
import { fetchDataPromise } from './05-async.js';
test('los datos son sample data', () => {
  fetchDataPromise().then((data) => {
    expect(data).toBe('sample data');
  });
});
```

#### Async/Await

Vitest también soporta async / await , lo que hace que las pruebas asíncronas sean más legibles. Vitest espera a que se resuelva la promesa devuelta por la función async antes de considerar que el test ha terminado. Esta es la forma habitual en que se escriben los test que incluyen promesas.

```ts
//  05-async.test.js con async/await
import { fetchDataPromise } from './05-async.js';
test('los datos son sample data', async () => {
  const data = await fetchDataPromise();
  expect(data).toBe('sample data');
});
```

#### Promesas rechazadas

Si la promesa es rechazada, se puede manejar el error en el bloque .catch y hacer la aserción correspondiente, o el método rejects de expect. La segunda de las opciones es más específica de Jest y proporciona una sintaxis más clara.

```ts
// 05-async.ts
export function fetchDataPromiseWithError(): Promise<string> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      reject(new Error('error'));
    }, 1000);
  });
}
```

```ts
// 05-async.test.js
test('la promesa es rechazada', () => {
  fetchDataPromiseWithError().catch((error) => {
    expect(error).toEqual(new Error('error'));
  });
});
```

```ts
// 05-async.test.js
import { fetchDataPromiseWithError } from './fetchDataPromiseRejected';
test('la promesa es rechazada', async () => {
  await expect(fetchDataPromiseWithError()).rejects.toEqual(new Error('error'));
  await expect(fetchDataPromiseWithError()).rejects.toThrow('error');
});
```

## Mocks y Spies. Matches específicos

Vitest proporciona una serie de funciones que nos permiten crear mocks y spies, que como ya hemos explicado, nos permiten simular el comportamiento de las funciones y métodos que se utilizan en los test unitarios.

Mocking es una técnica fundamental en las pruebas unitarias y de integración, donde se simulan partes del sistema que no son el foco
de la prueba, permitiendo así aislar y controlar el comportamiento de las unidades bajo prueba.

### Mocking de Funciones

Para crear un mock de función en Vitest, se utiliza vi.fn().
Este método crea una función simulada que puedes controlar y observar durante tus pruebas. Por ejemplo:

```js
// 06-mock.test.js
test('la función es llamada con los argumentos correctos', () => {
  const myMock = vi.fn();
  myMock('arg1', 'arg2');
  expect(myMock).toHaveBeenCalledWith('arg1', 'arg2');
});
```

Por defecto, el mock creado inicialmente carece de ninguna implementación, por lo que no hace nada cuando se le llama, limitándose a devolver undefined, como corresponde a cualquier función void. Sin embargo, el mock incluye numerosos métodos que permiten configurar su comportamiento.

El más genérico de estos métodos es `mockImplementation(fn)`, que permite definir la implementación de la función simulada, junto con su variante `mockImplementationOnce(fn)` que permite definir la implementación que ejecutará el mock la primera vez que se le llame.

Existen además varios atajos para configurar el comportamiento de un mock especificando únicamente su resultado:

- `mockReturnValue(value)`: Configura el valor que devolverá el mock cuando se le llame.
- `mockReturnValueOnce(value)`: Configura el valor que devolverá el mock la primera vez que se le llame.
- `mockResolvedValue(value)`: Configura el valor que devolverá el mock cuando se le llame, en el caso de que devuelva una promesa.
- `mockResolvedValueOnce(value)`: Configura el valor que devolverá el mock la primera vez que se le llame, en el caso de que devuelva una promesa.
- `mockRejectedValue(value)`: Configura el valor que devolverá el mock cuando se le llame, en el caso de que devuelva una promesa rechazada.
- `mockRejectedValueOnce(value)`: Configura el valor que devolverá el mock la primera vez que se le llame, en el caso de que devuelva una promesa rechazada.

Por ejemplo:

```js
test('la función es llamada con los argumentos correctos', () => {
  const myMock = vi
    .fn()
    .mockReturnValueOnce('mocked value')
    .mockReturnValueOnce(true);
  let result = myMock('arg1', 'arg2');
  expect(myMock).toHaveBeenCalledWith('arg1', 'arg2');
  expect(result).toBe('mocked value');
  result = myMock('arg1', 'arg2');
  expect(result).toBe(true);
  result = myMock('arg1', 'arg2');
  expect(result).toBeUndefined();
});
```

En este caso, myMock() devolverá secuencialmente 10 , luego 'true' , y después dejara de devolver valor (undefined).

#### Verificación de Llamadas

Vitest proporciona una serie de métodos que permiten verificar cómo se ha utilizado un mock, cuántas veces se ha llamado y con qué argumentos. Es decir, nos permiten 'espiar' el mock y hacer **assertions** sobre su comportamiento.

- `toBeCalled()`: Verifica si la función simulada fue llamada al menos una vez.
- `toHaveBeenCalledTimes(n)`: Verifica si la función simulada fue llamada exactamente n veces.
- `toHaveBeenLastCalledWith(arg1, arg2, ...)`: Verifica si la última llamada a la función simulada fue con los argumentos especificados.
- `toHaveBeenNthCalledWith(n, arg1, arg2, ...)`: Verifica si la llamada enésima a la función simulada fue con los argumentos especificados.
- `toHaveBeenLastCalledWith(arg1, arg2, ...)`: Verifica si la última llamada a la función simulada fue con los argumentos especificados.
- `toHaveBeenNthCalledWith(n, arg1, arg2, ...)`: Verifica si la llamada enésima a la función simulada fue con los argumentos especificados.
- `toHaveReturned()`: Verifica si la función simulada devolvió un valor.
- `toHaveReturnedTimes(n)`: Verifica cuántas veces la función simulada devolvió un valor.
- `toHaveReturnedWith(value)`: Verifica si la función simulada devolvió un valor específico.
- `toHaveLastReturnedWith(value)`: Verifica si la última vez que la función simulada devolvió un valor específico.
- `toHaveNthReturnedWith(n, value)`: Verifica si la enésima vez que la función simulada devolvió un valor específico.

Los más utilizados entre ellos son toBeCalled , toHaveBeenCalledWith , toHaveBeenLastCalledWith

### Mocking de Módulos

Vitest permite simular módulos enteros mediante `vi.mock('path-del-modulo')`, lo que cambia el comportamiento de todas las funciones y clases que exporta el módulo simulado. Esto es especialmente útil cuando deseas simular el comportamiento de dependencias externas como librerías o módulos que realizan operaciones de entrada/salida.

Por ejemplo, si queremos simular el comportamiento de la función `fetchDataPromise` que hemos visto anteriormente, podemos hacerlo de la siguiente manera:

```ts
import { fetchDataPromise } from './05-async.js';

vi.mock('./05-async.js');
```

Una vez que hemos simulado el módulo, la función `fetchDataPromise` y todas las que contengan se convierte en un mock (tipo `Mock` de Vitest), y carecen de implementación por lo que devuelven undefined.

```ts
test('la función fetchDataPromise es llamada y devuelve undefined', () => {
  const data = fetchDataPromise();
  expect(fetchDataPromise).toHaveBeenCalled();
  expect(data).toBeUndefined();
});
```

Lo interesante es que en cada test podemos configurar el comportamiento de las funciones y clases que exporta el módulo simulado utilizando `mockImplementation` o `mockReturnValue`.

Para que TypeScript no nos de errores al intentar configurar el mock, es necesario indicarle que la función que hemos importado es un mock. Para ello, podemos utilizar una aserción de tipo:

```ts
import { fetchDataPromise } from './05-async.js';
vi.mock('./05-async.js');

test('la función fetchDataPromise es llamada y devuelve el valor simulado', async () => {
  (fetchDataPromise as Mock).mockResolvedValue('mocked data');
  const data = await fetchDataPromise();
  expect(fetchDataPromise).toHaveBeenCalled();
  expect(data).toBe('mocked data');
});
```

#### Mocking de librerías de terceros

En otro ejemplo, podemos ver como se simula el comportamiento de una librería de terceros, como `axios`, que se utiliza para realizar peticiones HTTP:

Para instalar axios en el proyecto de demo1-TS:

```shell
npm install axios
```

Al usar axios tenemos las funciones necesarias para realizar peticiones HTTP, como `axios.get`, `axios.post`, etc. En este caso, vamos a simular el comportamiento de `axios.get` para que devuelva un usuario simulado cuando se llame. Como su tipado es genérico, podemos definir el tipo del usuario que esperamos recibir.

```ts
// 07-get-users.ts
export type User = {
  id: string;
  name: string;
};

const urlUsers = 'https://api.example.com/users/';

export async function getUser(userId: string): Promise<User> {
  const response = await axios.get(`${urlUsers}${userId}`);
  return response.data;
}
```

En el test, simulamos el comportamiento de `axios.get` para que devuelva un usuario simulado cuando se llame.

```ts
// 07-get-users.test.ts
import axios from 'axios';
import { getUser } from './07-get-users';

vi.mock('axios');

type User = {
  id: string;
  name: string;
};

const userMock: User = { name: 'John Doe' } as User;

test('debería obtener el usuario', async () => {
  const userMock: User = { name: 'John Doe' };
  (axios.get as Mock).mockResolvedValue({ data: userMock });

  const result = await getUser('1');
  expect(result).toEqual(userMock);
  expect(axios.get).toHaveBeenCalledTimes(1);
});
```

Como vemos, el mock de un usuario: no tiene que ajustarse al tipo User completo, sino únicamente a las propiedades que se utilizan en el test.

#### Mocking APIS nativas, como Fetch

En el caso de que queramos simular el comportamiento de una API nativa del navegador, como `fetch`, podemos hacerlo de la siguiente manera:

```js
// 07-get-users.ts
const urlUsers = 'https://api.example.com/users/';

export async function fetchUsers(): Promise<User[]> {
  const response = await fetch(urlUsers);
  const data = await response.json();
  return data;
}
```

```js
// 07-get-users.test.ts
import { fetchUsers } from './07-get-users';

describe('fetchUsers', () => {
  beforeEach(() => {
    globalThis.fetch = vi.fn();
  });

  afterEach(() => {
    vi.resetAllMocks();
  });


   test('debería obtener los usuarios', async () => {
        (fetch as Mock).mockResolvedValue({
            json: vi.fn().mockResolvedValue([userMock]),
        });

        const result = await fetchUsers();
        expect(result).toEqual([userMock]);
        expect(fetch).toHaveBeenCalledTimes(1);
    });

    test('debería manejar errores de fetch', async () => {
        (fetch as Mock).mockRejectedValue(new Error('Fetch error'));

        await expect(fetchUsers()).rejects.toThrow('Fetch error');
        await expect(fetchUsers()).rejects.toEqual(new Error('Fetch error'));
        expect(fetch).toHaveBeenCalledTimes(2);
    });
});
```

La creación del mock de fetch se realiza en el hook **beforeEach**, para asegurarnos de que cada test comienza con un mock limpio. En el hook **afterEach**, reseteamos todos los mocks para evitar interferencias entre tests.

### Spies en Vitest

Vitest proporciona una serie de funciones que nos permiten crear spies, que son funciones que nos permiten observar cómo se utilizan otras funciones y métodos en los test unitarios.

- `const spy = vi.spyOn(object, methodName)`: Crea un spy para el método methodName del objeto object.

Por defecto los spies no alteran el comportamiento de las funciones y métodos que espían, pero podemos configurarlos para que devuelvan un valor específico o para que ejecuten una función específica, con lo que estaríamos pasando al terreno de los mocks.

Por ejemplo, si queremos crear un spy para el método play del objeto vídeo, podemos hacerlo de la siguiente manera:

```js
// 08-video.ts
const video = {
  play() {
    return true;
  },
};
```

```js
// 08-video.test.ts
let spy: Mock<() => boolean>;

beforeEach(() => {
  // Aquí podríamos inicializar o resetear estados si fuera necesario
  spy = vi.spyOn(video, 'play');
});

afterEach(() => {
  vi.resetAllMocks();
});

test('plays video', () => {
  const isPlaying = video.play();
  expect(spy).toHaveBeenCalled();
  expect(isPlaying).toBe(true);
});

test('bad plays video', () => {
  spy.mockReturnValue(false);
  const isPlaying = video.play();

  expect(spy).toHaveBeenCalled();
  expect(isPlaying).toBe(false);
});
```

Como vemos, el primer test se limita a espiar el método play del objeto video, mientras que el segundo test configura el spy para que devuelva false cuando se llame a video.play, es decir que se comporta como um mock.

De nuevo , la creación del spy se realiza en el hook **beforeEach**, para asegurarnos de que cada test comienza con un spy limpio. En el hook **afterEach**, reseteamos todos los mocks para evitar interferencias entre tests.

## Testing de aplicaciones orientadas a objetos: Test de clases

La forma de testar clases en JavaScript es similar a la de testar funciones. En este caso, lo que hacemos es instanciar la clase que queremos testar y llamar a sus métodos, comprobando que el resultado es el esperado. Para ello, podemos utilizar Vitest, que nos permite testar clases de la misma forma que testamos funciones.

### Test de la capa repository

Una de las capas más comunes en una aplicación es la capa de acceso a datos, que suele ser un **servicio** utilizado para definir la capa **repository**. En esta capa se suelen implementar los métodos para acceder a una APIs, como por ejemplo, los métodos para insertar, actualizar, borrar o consultar registros en un backend.

A la hora de testar los métodos de la clase que implementa esta capa, debemos tratarlos de forma aislada, sin utilizar las dependencias reales de esta clase, incluyendo sus peticiones a la API, por lo general mediante una librería como Axios a el fetch nativo de JS. Para ello, utilizamos **mocks** para simular el comportamiento de las dependencias de la clase que estamos testando, como hemos visto el los ejemplos anteriores.

Tomemos como ejemplo una clase que implementa la capa repository de una aplicación de notas, que utiliza fetch para acceder a una **API REST** en el backend. El repositorio es una clase que define los métodos necesarios para completar el **CRUD** de la entidad que representa.

#### Interface de la entidad Note

```ts
// note.interface.ts
export interface Note {
  id?: string;
  title: string;
  content: string;
  isImportant?: boolean;
}
```

#### Interface genérica de la capa repository

```ts
// repository.interface.ts
export interface Repo<T extends { id: string | number }, DTO> {
  getAll(): Promise<T[]>;
  findById(id: T['id']): Promise<T | null>;
  save(item: DTO): Promise<T>;
  update(item: T): Promise<void>;
  delete(id: T['id']): Promise<void>;
}
```

Aplicando buenas practicas de diseño, la clase que implementa la capa repository debería depender de una interfaz que defina los métodos necesarios para acceder a la API, en lugar de depender directamente de una librería como Axios o del fetch nativo de JS. De esta forma, podemos cambiar la implementación de la capa de acceso a datos sin afectar al resto de la aplicación.

Simplemente conociendo la interfaz de la capa repository, podemos definir conceptualmente los tests que necesitamos implementar.

```ts
describe('NotesApiRepo', () => {
  describe('getAll', () => {
    it('should return all notes', async () => {
      // Aquí iría el test
      const result = await repoMock.getAll();
      expect(result).toEqual(resultMock);
    });
  });

  describe('getById', () => {
    it('should return a note by id', async () => {
      // Aquí iría el test
      const result = await repoMock.getById('noteId');
      expect(result).toEqual(resultMock);
    });
  });

  describe('create', () => {
    it('should create a new note', async () => {
      // Aquí iría el test
      const result = await repoMock.create(newNote);
      expect(result).toEqual(resultMock);
    });
  });

  describe('update', () => {
    it('should update an existing note', async () => {
      // Aquí iría el test
      const result = await repoMock.update(updatedNote);
      expect(result).toEqual(resultMock);
    });
  });

  describe('delete', () => {
    it('should delete a note by id', async () => {
      // Aquí iría el test
      const result = await repoMock.delete('noteId');
      expect(result).toEqual(resultMock);
    });
  });
});
```

Como vemos, cada uno de los métodos de la clase que implementa la capa repository tiene su propio test, que se encarga de comprobar que el resultado es el esperado. Los tests son prácticamente iguales, ya que todos ellos siguen el mismo patrón: llamar al método de la clase y comprobar que el resultado es el esperado, que en cada caso corresponde al valor devuelto en el correspondiente método mock de acceso a la API.

Con esto vemos como un buen diseño basado en interfaces y en la separación de responsabilidades, nos permite definir de forma sencilla los tests necesarios para comprobar el correcto funcionamiento de cada una de las capas de la aplicación. Estaríamos muy cerca de lo que se denomina **Test Driven Development (TDD)**, donde primero se definen los tests y luego se implementa el código necesario para que estos tests pasen correctamente.

En este caso, vamos a testar el método getAll de la clase NotesApiRepo, que devuelve todas las notas obtenidas de la API.

```js
// notes.api.repo.js
import { Note } from './notes.model.js';

export class NotesApiRepo {
  url = 'http://my.api/notes';

  async getAll(): Promise<Note[]> {
    return fetch(this.url).then((res) => res.json());
  }
}
```

Si nos detenemos en el método getAll, vemos que utiliza fetch con su método por defecto (GET) para realizar una petición GET a la API y devolver el resultado en formato JSON.

Para testar este método, necesitamos simular el comportamiento de fetch, ya que no queremos que el test dependa peticiones reales a la API, que podría fallar y tener un costo, en recursos de red o incluso en dinero si es una API de pago.

```js
import type { Mock } from 'vitest';
import { NotesApiRepo, type Note } from './09-repo-notes.js';

const noteMock: Note = {
    id: '1',
    title: 'Test Note',
    content: 'This is a test note',
    isImportant: true,
};


describe('NotesApiRepo', () => {
    let notesApiRepo: NotesApiRepo;
    let fetchMock: Mock;

    beforeEach(() => {
        notesApiRepo = new NotesApiRepo();
    });

    afterEach(() => {
        fetchMock.mockRestore();
    });

   describe('When calling getAll', () => {
        test('should return an array of notes', async () => {
            fetchMock = vi.spyOn(globalThis, 'fetch').mockResolvedValue({
                ok: true,
                json: async () => [noteMock],
            } as Response);
            const notes = await notesApiRepo.getAll();
            expect(fetchMock).toHaveBeenCalled();
            expect(notes).toEqual([noteMock]);
        });
    });
});
```

En los métodos que dependen de un id, hemos generado un error en caso de que el API nos devuelva un `ok=false` correspondiente a un **404 Not Found**, ya que en este caso no podríamos continuar con la ejecución del método que depende de este id.

```ts
  async findById(id: Note['id']): Promise<Note> {
      return fetch(`${this.url}/${id}`).then((res) => {
          if (!res.ok) {
              throw new Error(`Note with id ${id} not found`);
          }
          return res.json();
      });
  }
```

En estos casos debemos incluir un segundo test para este método, que simule el caso en el que la API devuelve un error.

```ts
describe('When calling findById and a NOT valid id is provided', () => {
  test('should return null', async () => {
    fetchMock = vi.spyOn(globalThis, 'fetch').mockResolvedValue({
      ok: false,
      json: async () => undefined,
    } as Response);
    expect(notesApiRepo.findById('0')).rejects.toThrow(
      'Note with id 0 not found'
    );
    expect(fetchMock).toHaveBeenCalled();
  });
});
```

### Test de la de estado

Otra de las capas que podríamos tener en una aplicación es la capa de estado, que se encarga de gestionar el estado de la aplicación. En esta capa se suelen implementar los métodos para gestionar el estado de la aplicación, como por ejemplo, los métodos para obtener, actualizar o borrar el estado.

Esas operaciones pueden depender de las peticiones HTTP que ya hemos visto en el repository, por lo que tendremos un servicio stateful que depende del servicio repository. Al testarlo, lo que haremos será simular el comportamiento del servicio repository con un mock, para poder testar el servicio stateful de forma aislada.

Por ejemplo, vamos a testar el método load de la clase NotesState, que actualiza el estado con todas las notas que le devuelve el repositorio, que a su vez las obtiene de la API.

Nota: en realidad esta arquitectura da por hecho que podemos modelar el estado en una capa agnóstica al framework, lo cual no suele ser real. Por ejemplo, en Angular esta capa usaría observables de RxJS, mientras que en React usaríamos hooks como useState o useReducer abstraídos en un custom hook.

```js
// notes.controller.js
export class NotesState {
    private _notes: Note[] = [];

    constructor(private notesRepo: Repo<Note, Omit<Note, 'id'>>) {}

   get notes(): Note[] {
        return this._notes;
    }

    async load(): Promise<void> {
        this._notes = await this.notesRepo.getAll();
    }
}
```

Para usar el mock del repositorio, simplemente creamos un objeto que implemente la interfaz del repositorio, pero que en lugar de realizar peticiones HTTP, devuelva valores simulados. Al estar usando en el estado el patrón de **inyección de dependencias**, podemos pasar este mock al constructor de la clase NotesState.

```ts
const mockNotes: Note[] = [
    { id: '1', title: 'Note 1', content: 'Content 1' },
    { id: '2', title: 'Note 2', content: 'Content 2' },
];

describe('NotesState', () => {
    let notesState: NotesState;
    let notesRepoMock: Repo<Note, Omit<Note, 'id'>>;

    beforeEach(() => {
        notesRepoMock = {
            getAll: vi.fn(),
            findById: vi.fn(),
            save: vi.fn(),
            update: vi.fn(),
            delete: vi.fn(),
        };
        notesState = new NotesState(notesRepoMock);
    });

    describe('load', () => {
        test('should load notes from the repository and update the state', async () => {
            (notesRepoMock.getAll as Mock).mockResolvedValue(mockNotes);

            await notesState.load();

            expect(notesRepoMock.getAll).toHaveBeenCalled();
            expect(notesState.notes).toEqual(mockNotes);
        });
    });
});
```

#### Mocks de métodos de clases: utilizando prototypes

En el test de la capa estado, necesitamos simular el comportamiento del método getAll de la capa repo, ya que no queremos que el test dependa de la base de datos. Si no tenemos inyección de dependencias podemos crear un mocks para simular el comportamiento de la clase NotesApiRepo y asignárselo al prototipo de la esa clase.

```js
// notes.state.test.js

import { NotesState } from './notes.state.js';
import { NotesApiRepo } from './notes.mongo.repo.js';

describe('NotesState', () => {
  describe('getAll', () => {
    it('should return all notes', async () => {
      const notesMock = [
        { title: 'note 1', content: 'content 1' },
        { title: 'note 2', content: 'content 2' },
      ];
      NotesApiRepo.prototype.getAll = vi.fn().mockResolvedValue(notesMock);
      const state = new NotesState();
      await state.load();
      expect(state.notes).toEqual(notesMock);
    });
  });
});
```

No es necesario utilizar `vi.mock` para crear el mock del módulo del que importamos NotesApiRepo, ya que podemos hacerlo directamente utilizando `NotesApiRepo.prototype.getAll = vi.fn().mockResolvedValue(notesMock);`. De esta forma, estamos cambiando en el prototipo de la clase la función que será invocada desde cualquiera de las instancias.
