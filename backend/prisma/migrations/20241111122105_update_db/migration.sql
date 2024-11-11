-- CreateEnum
CREATE TYPE "TransactionStatus" AS ENUM ('PENDING', 'COMPLETED', 'CANCELED');

-- CreateTable
CREATE TABLE "tb_product" (
    "id" SERIAL NOT NULL,
    "image" TEXT NOT NULL,
    "productName" TEXT NOT NULL,
    "productDesc" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "qty" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "tb_product_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tb_cart" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "tb_cart_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tb_cart_item" (
    "id" SERIAL NOT NULL,
    "cartId" INTEGER NOT NULL,
    "productId" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "tb_cart_item_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tb_oder_itmes" (
    "id" SERIAL NOT NULL,
    "transactionId" INTEGER NOT NULL,
    "prductionId" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL,
    "price" INTEGER NOT NULL,
    "subtotal" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "tb_oder_itmes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tb_transaction" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "totalAmount" DOUBLE PRECISION NOT NULL,
    "status" "TransactionStatus" NOT NULL DEFAULT 'PENDING',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "address" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "posscode" TEXT NOT NULL,
    "imagepayment" TEXT NOT NULL,

    CONSTRAINT "tb_transaction_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "tb_product" ADD CONSTRAINT "tb_product_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tb_cart" ADD CONSTRAINT "tb_cart_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tb_cart_item" ADD CONSTRAINT "tb_cart_item_cartId_fkey" FOREIGN KEY ("cartId") REFERENCES "tb_cart"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tb_cart_item" ADD CONSTRAINT "tb_cart_item_productId_fkey" FOREIGN KEY ("productId") REFERENCES "tb_product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tb_oder_itmes" ADD CONSTRAINT "tb_oder_itmes_transactionId_fkey" FOREIGN KEY ("transactionId") REFERENCES "tb_transaction"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tb_oder_itmes" ADD CONSTRAINT "tb_oder_itmes_prductionId_fkey" FOREIGN KEY ("prductionId") REFERENCES "tb_product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tb_transaction" ADD CONSTRAINT "tb_transaction_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
