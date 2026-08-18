export type RequestType = "bug" | "film" | "contact";

export type RequestStatus =
    | "pending"
    | "reviewing"
    | "resolved"
    | "rejected";

export interface RequestUser {
    _id: string;
    fullName: string;
    email: string;
    phoneNumber: string;
}

export interface UserRequest {
    _id: string;
    type: RequestType;
    user: RequestUser | null;
    name: string;
    email: string;
    subject: string;
    message: string;
    movieTitle: string;
    page: string;
    status: RequestStatus;
    createdAt: string;
    updatedAt: string;
}