import { Module, defineJoinerConfig } from "@medusajs/framework/utils"
import VariantImagesService from "./service"
import VariantImage from "./models/variant-image"
import { VARIANT_IMAGES_MODULE } from "./service"

const moduleDefinition = {
  service: VariantImagesService,
  models: {
    VariantImage,
  },
  definition: {
    isQueryable: true,
    joinerConfig: defineJoinerConfig(VARIANT_IMAGES_MODULE, {
      alias: [{ name: 'variant_image', entity: 'variant_image' }],
      primaryKeys: ['id'],
      linkableKeys: {
        id: 'id',
        variant_id: 'variant_id',
      },
    }),
    queryable: {
      VariantImage: {
        modelName: "variant_image",
        entity: "variant_image",
        primaryKey: "id",
        fields: {
          id: { type: "string" },
          variant_id: { type: "string" },
          url: { type: "string" },
          display_order: { type: "number" },
          metadata: { type: "json", nullable: true },
          created_at: { type: "date" },
          updated_at: { type: "date" },
          deleted_at: { type: "date", nullable: true },
        },
      },
    },
  },
}

export default Module(VARIANT_IMAGES_MODULE, moduleDefinition)
export * from "./models/variant-image" 
