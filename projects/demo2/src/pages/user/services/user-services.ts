import type { RegisterUser} from "../types/user"

export const registerUser = async (userData: RegisterUser): Promise<void> => {
    // Simular una llamada a un servicio externo, como una API
    console.log('Usuario registrado', userData);
};


