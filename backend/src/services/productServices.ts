import { prisma } from "../libs/prisma";
import uploadImageToCloudinary from "../libs/cloudinary";
import ProductDto from "../dto/productDto";

export const GetProduct = async () => {
  try {
    const ProductData = await prisma.product.findMany()
    return ProductData
  } catch (error) {
    throw new Error('failed to get dat product')
  }
}

export const CreateProduct = async (
  ProductData: ProductDto,
  imageBuffer?: Buffer
) => {
  let imageUrl: string | null = null;

  if (imageBuffer) {
    try {
      const imageResult = await uploadImageToCloudinary(imageBuffer);
      if (!imageResult) {
        throw new Error("failed to upload image");
      }
      imageUrl = imageResult.secure_url;
    } catch (error) {
      console.error("error uploding to cloudinary:", error);
      throw new Error("failed to upload to cloudinary");
    }
  }
  try {
    const NewProduct = await prisma.product.create({
      data: {
        image: imageUrl as string,
        productName: ProductData.productName,
        productDesc: ProductData.productDesc,
        price: +(ProductData.price),
        qty: +(ProductData.qty),
        user: {
          connect: { id: +(ProductData.userId) },
        },
      },
    });
    return NewProduct;
  } catch (error) {
    console.error("error creating product in database", error);
    throw new Error("failed to create product data");
  }
};

export const UpdateProduct = async (
  productId: number,
  UpdateData: Partial<ProductDto>,
  imageBuffer?: Buffer
) => {
  let imageUrl: string | null = null;
  if (imageBuffer) {
    try {
      const imageResult = await uploadImageToCloudinary(imageBuffer);
      if (!imageResult) {
        throw new Error("failed to upload image");
      }
      imageUrl = imageResult.secure_url;
    } catch (error) {
      console.error("error uploding to cloudinary:", error);
      throw new Error("failed to upload to cloudinary");
    }
  }
  try {
    if (imageUrl) {
      UpdateData.image = imageUrl;
    }
    const updatedProductData = {
      ...UpdateData,
      price: UpdateData.price !== undefined ? +UpdateData.price : undefined,
      qty: UpdateData.qty !== undefined ? +UpdateData.qty : undefined,
      categoryId: UpdateData.categoryId !== undefined ? +UpdateData.categoryId : undefined,
      userId: UpdateData.userId !== undefined ? +UpdateData.userId : undefined,
    };

    const UpdateProduct = await prisma.product.update({
      where: { id: productId },
      data: updatedProductData,
    });
    return UpdateProduct;
  } catch (error) {
    console.error("error updating data product", error);
    throw new Error("failed to update product data ");
  }
};

export const DeleteProduct = async (productId: number) => {
  try {
    await prisma.product.delete({
      where: { id: productId },
    });
  } catch (error) {
    console.error("error deleting data product");
    throw new Error("failed to deleting data product");
  }
};
