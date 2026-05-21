export interface IMenuItem  {
   image?: string;
   heading: string;
   description: string;
   price: number;
   category: "sushi" | "drinks";
   isAvailable?: boolean;
}