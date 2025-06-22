import { model } from "@medusajs/framework/utils"

const VariantImage = model.define("variant_image", {
  id: model.id().primaryKey(),
  variant_id: model.text(),
  url: model.text(),
  metadata: model.json().nullable(),
  display_order: model.number().default(0),
})

export type VariantImageSchema = {
  id: string
  variant_id: string
  url: string
  metadata: Record<string, unknown> | null
  display_order: number
  created_at: Date
  updated_at: Date
  deleted_at: Date | null
}

export default VariantImage 
