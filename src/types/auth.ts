// types/auth.ts
export interface AuthData {
    access_token: string;
    country_code: number;
    country_initial: string;
    email: string;
    first_name: string;
    id: number;
    is_deleted: boolean;
    is_login: boolean;
    is_otp_verified: boolean;
    is_profile_completed: boolean;
    last_name: string;
    phone_no: string;
    refresh_token: string;
    role_name: string;
    social_login: string;
    status: string;
    user_lang: string;
    user_role: number;
    uuid: string;
}