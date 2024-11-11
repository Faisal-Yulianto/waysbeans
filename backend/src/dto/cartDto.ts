export interface AddCartDto {
    userId: number;
    productId: number;
    quantity: number;
}

export interface updateCartItemDto {
    userId: number; 
    productId: number;
    quantity: number;
}