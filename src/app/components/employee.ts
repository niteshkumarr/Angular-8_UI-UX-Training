export interface Employee {
    id: number;
    firstName: string;
    lastName: string;
    empEmail: string;
    designation: string;
    address: string;
    gender: string;
}

export interface EmpLogin {
    id: number;
    username: string;
    password: string;
    authdata?: string;
}