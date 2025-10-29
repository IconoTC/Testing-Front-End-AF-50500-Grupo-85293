export type RegisterUser = {
    username: string;
    email: string;
    password: string;
    isOkConditions: boolean;
    turn: string;
    course: string;
};

export type Login = {
    email: string;
    passwd: string;
};

export type User = {
    id: number;
    name: string;
    email: string;
};
