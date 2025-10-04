export interface Product {
    id: number;
    title: string;
    description: string;
    price: number;
    image: string;
    rating?: number;
    inStock: boolean;
    onSale?: boolean;
    salePercentage?: number;
  }