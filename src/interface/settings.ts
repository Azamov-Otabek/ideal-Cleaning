export interface MyAccaunt {
    id: string;
    access_token: string;
    created_at: Date;
    email: string;
    full_name: string;
    phone_number: string;
    refresh_token: string;
    updated_at: Date;
    password: string;
}


export interface UpdatePassword{
    password: string;
    new_password: string;
    verify_password: string;
}