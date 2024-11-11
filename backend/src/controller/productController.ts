import { Request, Response } from "express";
import { CreateProduct, DeleteProduct, GetProduct, UpdateProduct } from "../services/productServices";
import ProductDto from "../dto/productDto";

export const handleGetProduct = async (req:Request,res:Response)=>{
  try {
    const data = await GetProduct()
    res.status(200).json(data)
  } catch (error) {
    res.status(400).json({ message: "failed to get product" })
  }
}

export const handldeCreateProduct = async (req: Request, res: Response) => {
  try {
    const data: ProductDto = req.body;
    const imageBuffer = req.file ? req.file.buffer : undefined
    const product = await CreateProduct(data,imageBuffer);
    res.status(200).json({ message: "product created succesfully", product });
  } catch (error) {
    res
      .status(400)
      .json({ error: (error as Error).message || "created product failed" });
  }
};

export const handldeUpdateProduct = async (req:Request,res:Response) => {
  const productId = parseInt(req.params.id)
  const imageBuffer = req.file?.buffer 
  const UpdateData: Partial<ProductDto> = req.body

  try {
    
    const updateProduct = await UpdateProduct(productId, UpdateData,imageBuffer);
    res.status(200).json({ message : "product update succesfully",updateProduct})
  } catch ( error) {
    res.status(400).json({ message : "product failed to update" , UpdateProduct})
  }
}
 export const handleDeleteProduct = async (req:Request,res:Response) => {
  const productId = parseInt(req.params.id)
  try {
    await DeleteProduct(productId)
    res.status(200).json({message: "succesfully delete product"})
  } catch (error) {
    res.status(400).json({ error: (error as Error).message || "deleted product failed" });
  }
 }