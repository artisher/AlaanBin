export interface User {
    _id: string;
    id: number;
    fullName: string;
    phoneNumber: string;
    email: string;
    password: string;
    hasActiveSubscription: boolean;
    signUpDate: Date | string;
    subscriptionExpireDate: Date | string;
    favoriteTitle: string[];
    country: string;
    city: string;
    role: string;
}