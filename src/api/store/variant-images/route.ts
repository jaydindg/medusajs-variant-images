import type { MedusaRequest, MedusaResponse } from "@medusajs/framework/http"
import { VARIANT_IMAGES_MODULE } from "../../../modules/variant-images/service"
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