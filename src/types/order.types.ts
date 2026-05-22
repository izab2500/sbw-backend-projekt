export interface ICreateOrder {
    customerName: string;
    phoneNumber: string;

    items: {
        menuItemId: string;
        quantity: number;
    }[];
}