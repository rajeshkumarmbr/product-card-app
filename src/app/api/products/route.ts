import { NextResponse } from 'next/server';
import { Product } from '@/lib/types';

const products: Product[] = [
  {
    id: 1,
    title: 'Premium Wireless Headphones',
    description: 'High-quality noise-cancelling headphones with 30-hour battery life and premium sound quality.',
    price: 299.99,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&q=80',
    rating: 5,
    inStock: true,
    onSale: true,
    salePercentage: 15,
  },
  {
    id: 2,
    title: 'Smart Watch Pro',
    description: 'Advanced fitness tracking, heart rate monitoring, and smartphone notifications on your wrist.',
    price: 399.99,
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&q=80',
    rating: 4,
    inStock: true,
  },
  {
    id: 3,
    title: 'Designer Backpack',
    description: 'Stylish and functional backpack with laptop compartment and water-resistant material.',
    price: 89.99,
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&q=80',
    rating: 4,
    inStock: false,
  },
];

export async function GET() {
  return NextResponse.json(products);
}

export const dynamic = 'force-dynamic';