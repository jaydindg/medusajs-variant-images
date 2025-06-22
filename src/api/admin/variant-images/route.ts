import type { MedusaRequest, MedusaResponse } from "@medusajs/framework/http"
import { VARIANT_IMAGES_MODULE } from "../../../modules/variant-images/service"
import type { VariantImageSchema } from "../../../modules/variant-images/models/variant-image"
import type VariantImagesService from "../../../modules/variant-images/service"

// List variant images
export async function GET(req: MedusaRequest, res: MedusaResponse) {
  const variantImagesService = req.scope.resolve<VariantImagesService>(VARIANT_IMAGES_MODULE)
  
  const { variant_id } = req.query
  const [images, count] = await variantImagesService.list({
    where: variant_id ? { variant_id } : undefined,
  })

  res.json({
    images,
    count,
  })
}

// Create variant image
export async function POST(req: MedusaRequest, res: MedusaResponse) {
  const variantImagesService = req.scope.resolve<VariantImagesService>(VARIANT_IMAGES_MODULE)
  const data = req.body as Partial<VariantImageSchema>
  
  const image = await variantImagesService.create(data)

  res.json({
    image,
  })
}

// Update variant image
export async function PUT(req: MedusaRequest, res: MedusaResponse) {
  const variantImagesService = req.scope.resolve<VariantImagesService>(VARIANT_IMAGES_MODULE)
  const { id } = req.query
  const data = req.body as Partial<VariantImageSchema>
  
  if (!id || typeof id !== 'string') {
    res.status(400).json({ message: 'Image ID is required' })
    return
  }

  const image = await variantImagesService.update(id, data)

  res.json({
    image,
  })
}

// Delete variant image
export async function DELETE(req: MedusaRequest, res: MedusaResponse) {
  const variantImagesService = req.scope.resolve<VariantImagesService>(VARIANT_IMAGES_MODULE)
  const { id } = req.query
  
  if (!id || typeof id !== 'string') {
    res.status(400).json({ message: 'Image ID is required' })
    return
  }

  await variantImagesService.delete(id)

  res.json({
    id,
    object: "variant_image",
    deleted: true,
  })
} 