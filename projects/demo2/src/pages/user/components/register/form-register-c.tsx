import React, { useState } from 'react';
import type { RegisterUser } from '../../types/user';
import { registerUser } from '../../services/user-services';
import { Card } from '../../../../core/components/card/card';

const initialUserData: RegisterUser = {
    username: '',
    email: '',
    password: '',
    isOkConditions: false,
    turn: '',
    course: '',
};

export const FormRegisterC: React.FC = () => {
    const [userData, setUserData] = useState<RegisterUser>(initialUserData);

    const handleChange = (
        event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ): void => {
        const target = event.target;
        setUserData((prevData) => ({
            ...prevData,
            [target.name]:
                target.type === 'checkbox' ? target.checked : target.value,
        }));
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
        event.preventDefault();
        console.log('Formulario completado');
        registerUser(userData).then(() => {
            console.log('Formulario enviado con éxito');
        });
    };

    return (
        <Card>
            <form aria-label="Registration information" onSubmit={handleSubmit}>
                <h3>Registro</h3>
                <p>Ejemplo de formulario controlado en React</p>

                <div className="group-control">
                    <input
                        type="text"
                        name="username"
                        placeholder="Dime tu nombre"
                        required
                        value={userData.username}
                        onChange={handleChange}
                    />
                </div>

                <div className="group-control">
                    <input
                        type="email"
                        name="email"
                        placeholder="Dime tu email"
                        required
                        value={userData.email}
                        onChange={handleChange}
                    />
                </div>

                <div className="group-control">
                    <input
                        type="password"
                        name="password"
                        placeholder="Dime tu password"
                        required
                        value={userData.password}
                        onChange={handleChange}
                    />
                </div>

                <div className="group-control">
                    <input
                        type="checkbox"
                        name="isOkConditions"
                        id="is-ok"
                        checked={userData.isOkConditions}
                        onChange={handleChange}
                    />
                    <label htmlFor="is-ok">Acepto las condiciones...</label>
                </div>

                <fieldset name="turn">
                    <legend>Selecciona un turno</legend>
                    <input
                        type="radio"
                        name="turn"
                        id="turno-m"
                        value="M"
                        onChange={handleChange}
                    />
                    <label htmlFor="turno-m">Mañana</label>
                    <input
                        type="radio"
                        name="turn"
                        id="turno-t"
                        value="T"
                        onChange={handleChange}
                    />
                    <label htmlFor="turno-t">Tarde</label>
                    <input
                        type="radio"
                        name="turn"
                        id="turno-n"
                        value="N"
                        onChange={handleChange}
                    />
                    <label htmlFor="turno-n">Noche</label>
                </fieldset>

                <label htmlFor="course">Elige un curso</label>
                <select
                    name="course"
                    id="course"
                    value={userData.course}
                    onChange={handleChange}
                >
                    <option value=""></option>
                    <option value="A">Angular</option>
                    <option value="R">React</option>
                    <option value="N">Node</option>
                </select>

                <div>
                    <button type="submit">Enviar</button>
                </div>
            </form>
        </Card>
    );
};
