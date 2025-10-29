import type { Login, RegisterUser, User } from "../types/user"

export const registerUser = async (userData: RegisterUser): Promise<void> => {
    // Simular una llamada a un servicio externo, como una API
    console.log('Usuario registrado', userData);
};

export const loginUser = (loginData: Login): Promise<User> => {
  console.log('Iniciando sesión', loginData);
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // Simular respuesta del servidor
      if (
        loginData.email === 'pepe@sample.com' &&
        loginData.passwd === '12345'
      ) {
        console.log('Inicio de sesión exitoso');
        resolve({
          id: 1,
          name: 'Pepe Pérez',
          email: loginData.email,
        });
      } else {
        console.log('Credenciales inválidas');
        reject(new Error('Credenciales inválidas'));
      }
    }, 1000);
  });
};
