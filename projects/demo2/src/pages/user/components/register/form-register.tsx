import { Card } from '../../../../core/components/card/card';
import { registerUser } from '../../services/user-services';
import type { RegisterUser } from '../../types/user';

export const FormRegister: React.FC = () => {
    const userData: RegisterUser = {
        username: '',
        email: '',
        password: '',
        isOkConditions: false,
        turn: '',
        course: '',
    };

    const getDataFromHTMLForm = (form: HTMLFormElement): RegisterUser => {
        const formElements: HTMLFormControlsCollection = form.elements;
        const keys = Object.keys(userData) as (keyof RegisterUser)[];

        // const usernameElement = formElements.namedItem(
        //     "username"
        // ) as HTMLInputElement;
        // const emailElement = formElements.namedItem(
        //     "email"
        // ) as HTMLInputElement;
        // const passwordElement = formElements.namedItem(
        //     "password"
        // ) as HTMLInputElement;
        // const isOkConditionsElement = formElements.namedItem(
        //     "isOkConditions"
        // ) as HTMLInputElement;
        // const turnElement = formElements.namedItem("turn") as HTMLInputElement;
        // const courseElement = formElements.namedItem(
        //     "course"
        // ) as HTMLSelectElement;
        // const result = {
        //     username: usernameElement.value,
        //     email: emailElement.value,
        //     password: passwordElement.value,
        //     // como isOkConditions es un booleano, se obtiene del atributo checked
        //     isOkConditions: isOkConditionsElement.checked,
        //     turn: turnElement.value,
        //     course: courseElement.value,
        // };

        const result: Record<string, string | boolean> = {};
        for (const key of keys) {
            const element = formElements.namedItem(key) as HTMLInputElement;
            // Si el elemento es un checkbox, se obtiene el valor del atributo checked
            result[key] =
                typeof userData[key] === 'boolean'
                    ? element.checked
                    : (result[key] = element.value);
        }
        return result as RegisterUser;
    };

    const getDataFromFormData = (formData: FormData): RegisterUser => {
        // const data: Record<string, FormDataEntryValue> =
        //     Object.fromEntries(formData);

        // const result = {
        //     username: data.username as string,
        //     email: data.email as string,
        //     password: data.password as string,
        //     // isOkConditions es un booleano, pero FormData devuelve un string
        //     isOkConditions: data.isCondition === "on",
        //     turn: data.turn as string,
        //     course: data.course as string,
        // };
        // return result;

        const keys = Object.keys(userData) as (keyof RegisterUser)[];
        const result: Record<string, string | boolean> = {};
        for (const key of keys) {
            const value = formData.get(key) as string | boolean;
            // Si el elemento es un checkbox, se obtiene el valor del atributo checked
            result[key] =
                typeof userData[key] === 'boolean' ? value === 'on' : value;
        }
        return result as RegisterUser;
    };

    const handleSubmit = (ev: React.FormEvent<HTMLFormElement>): void => {
        console.log(ev);
        ev.preventDefault();
        const form = ev.currentTarget;
        // Acceso a los datos como elementos del formulario
        const userData1 = getDataFromHTMLForm(form);
        registerUser(userData1).then(() => {
            // form.reset();
            console.log('Enviado (elements): Usuario registrado');
        });

        // Acceso a los datos como FormData
        const formData = new FormData(form);
        const userData2 = getDataFromFormData(formData);
        registerUser(userData2).then(() => {
            form.reset();
            console.log('Enviado (formdata): Usuario registrado');
        });
    };

    return (
        <Card>
            <form
                aria-label="Register Form"
                onSubmit={handleSubmit}
            >
                <h3>Registro</h3>
                <p>Ejemplo de formulario NO controlado'</p>

                <div className="group-control">
                    <input
                        type="text"
                        name="username"
                        placeholder="Dime tu nombre"
                        required
                        defaultValue={userData.username}
                    />
                </div>

                <div className="group-control">
                    <input
                        type="email"
                        name="email"
                        placeholder="Dime tu email"
                        required
                        defaultValue={userData.email}
                    />
                </div>

                <div className="group-control">
                    <input
                        type="password"
                        name="password"
                        placeholder="Dime tu password"
                        required
                        defaultValue={userData.password}
                    />
                </div>

                <div className="group-control">
                    <input
                        type="checkbox"
                        name="isOkConditions"
                        id="cr-is-ok"
                        defaultChecked={userData.isOkConditions}
                    />
                    <label htmlFor="cr-is-ok">Acepto las condiciones...</label>
                </div>

                <fieldset name="turn">
                    <legend>Selecciona un turno</legend>
                    <input type="radio" name="turn" id="cr-turno-m" value="M" />
                    <label htmlFor="cr-turno-m">Mañana</label>
                    <input type="radio" name="turn" id="cr-turno-t" value="T" />
                    <label htmlFor="cr-turno-t">Tarde</label>
                    <input type="radio" name="turn" id="cr-turno-n" value="N" />
                    <label htmlFor="cr-turno-n">Noche</label>
                </fieldset>

                <label htmlFor="cr-course">Elige un curso</label>
                <select
                    name="course"
                    id="cr-course"
                    defaultValue={userData.course}
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
