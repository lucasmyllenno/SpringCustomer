export interface CustomerModel {
    id: number;
    imageURL?: string;
    subscription: string;
    nickname: string;
    name: string;
    status: string;
    createdAt: Date;
    updatedAt: Date;
}
