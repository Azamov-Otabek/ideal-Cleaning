export interface post {
    name: string;
    owner_email: string;
    price: number;
}

export interface idDelete{
    id:string;
}

export interface get{
    page:number;
    limit:number;
    owner_email:string;
}

export interface search extends get{
    name:string;
}

export interface put{
    id:string;
    name:string;
    owner_email:string;
    price:number;
}




export interface Reques{
    delete: (data:idDelete) => any;
    get: (data:get) => any;
    post: (data:post) => any;
    put: (data:put) => any;
    search: (data:search) => any;
}
