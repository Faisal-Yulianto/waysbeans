import { prisma } from '../libs/prisma';
import { AddCartDto,updateCartItemDto } from '../dto/cartDto';

// Fungsi untuk menambah item ke keranjang
export const addToCart = async ({ userId, productId, quantity }: AddCartDto) => {
  const cart = await prisma.cart.findFirst({
    where: { userId },
    include: { items: true },
  });

  // Jika user belum memiliki keranjang, buat keranjang baru
  if (!cart) {
    const newCart = await prisma.cart.create({
      data: {
        userId,
        items: {
          create: {
            productId,
            quantity,
          },
        },
      },
      include: { items: true },
    });
    return newCart;
  }

  // Cari jika produk sudah ada dalam keranjang
  const existingCartItem = cart.items.find(item => item.productId === productId);
  if (existingCartItem) {
    // Jika produk sudah ada, update jumlahnya
    return prisma.cartItem.update({
      where: { id: existingCartItem.id },
      data: { quantity: existingCartItem.quantity + quantity },
    });
  }

  // Jika produk belum ada, tambahkan produk ke dalam keranjang
  return prisma.cartItem.create({
    data: {
      cartId: cart.id,
      productId,
      quantity,
    },
  });
};

// Fungsi untuk mengupdate jumlah item di keranjang
export const updateCartItem = async ({ userId, productId, quantity }: updateCartItemDto) => {
  const cart = await prisma.cart.findFirst({
    where: { userId },
    include: { items: true },
  });

  if (!cart) {
    throw new Error('Cart not found');
  }

  const cartItem = cart.items.find(item => item.productId === productId);
  if (!cartItem) {
    throw new Error('Product not found in cart');
  }

  return prisma.cartItem.update({
    where: { id: cartItem.id },
    data: { quantity },
  });
};

// Fungsi untuk menghapus item dari keranjang
export const removeFromCart = async (userId: number, productId: number) => {
  const cart = await prisma.cart.findFirst({
    where: { userId },
    include: { items: true },
  });

  if (!cart) {
    throw new Error('Cart not found');
  }

  const cartItem = cart.items.find(item => item.productId === productId);
  if (!cartItem) {
    throw new Error('Product not found in cart');
  }

  return prisma.cartItem.delete({
    where: { id: cartItem.id },
  });
};

// Fungsi untuk mendapatkan semua item di keranjang
export const getCartItems = async (userId: number) => {
  const cart = await prisma.cart.findFirst({
    where: { userId },
    include: { items: { include: { product: true } } },
  });

  if (!cart) {
    throw new Error('Cart not found');
  }

  return cart.items;
};
