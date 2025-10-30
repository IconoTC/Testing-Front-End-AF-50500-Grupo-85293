export const getDataFromHTMLForm = <T extends Record<string, string | boolean>>(
    form: HTMLFormElement,
    data: T
): T => {
    const formElements: HTMLFormControlsCollection = form.elements;
    const keys = Object.keys(data);
    const result: Record<string, string | boolean> = {};

    keys.forEach((key) => {
        const element = formElements.namedItem(key) as HTMLInputElement;
        // Si el elemento es un checkbox, se obtiene el valor del atributo checked
        result[key] =
            typeof result[key] === 'boolean' ? element.checked : element.value;
    });

    return result as T;
};

export const getDataFromFormData = <T extends Record<string, string | boolean>>(
    formData: FormData,
    data: T
): T => {
    const keys = Object.keys(data);
    const result: Record<string, string | boolean> = {};
    keys.forEach((key) => {
        const value = formData.get(key) as string | boolean;
        // Si el elemento es un checkbox, se obtiene el valor del atributo checked
        result[key] = typeof data[key] === 'boolean' ? value === 'on' : value;
    });
    return result as T;
};

