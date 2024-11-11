import { Request, Response } from 'express';
import { addToCart, updateCartItem, removeFromCart, getCartItems } from '../services/cartServices';
import { AddCartDto, updateCartItemDto } from '../dto/cartDto';

export const addToCartController = async (req: Request, res: Response) => {
  const { userId, productId, quantity }: AddCartDto = req.body;

  try {
    const cartItem = await addToCart({ userId, productId, quantity });
    res.status(201).json(cartItem);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message || "add cart failed" });
  }
};

export const updateCartController = async (req: Request, res: Response) => {
  const { userId, productId, quantity }: updateCartItemDto = req.body;

  try {
    const updatedItem = await updateCartItem({ userId, productId, quantity });
    res.status(200).json(updatedItem);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message || "cart update failed" });
  }
};

export const removeFromCartController = async (req: Request, res: Response) => {
  const { userId, productId } = req.params;

  try {
    await removeFromCart(Number(userId), Number(productId));
    res.status(200).json({ message: 'Item removed from cart' });
  } catch (error) {
    res.status(500).json({error: (error as Error).message || "cart remove failed" });
  }
};

export const getCartController = async (req: Request, res: Response) => {
  const { userId } = req.params;

  try {
    const cartItems = await getCartItems(Number(userId));
    res.status(200).json(cartItems);
  } catch (error) {
    res.status(500).json({error: (error as Error).message || "get cart failed" });
  }
};


