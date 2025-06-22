import { IModuleService } from "@medusajs/types"
import { generateEntityId } from "@medusajs/utils"
import VariantImage, { VariantImageSchema } from "./models/variant-image"
import { FindConfig } from "@medusajs/framework/types"

type ExtendedFindConfig<T> = FindConfig<T> & {
  where?: Record<string, unknown>
  order?: Record<string, "ASC" | "DESC">
  skip?: number
  take?: number
}

export const VARIANT_IMAGES_MODULE = "variant-images"

class VariantImagesService implements IModuleService {
  protected readonly models = { VariantImage }
  protected manager: any

  constructor({ manager }) {
    this.manager = manager
  }

  __joinerConfig() {
    return {
      serviceName: VARIANT_IMAGES_MODULE,
      alias: [{ name: 'variant_image', entity: 'variant_image' }],
      primaryKeys: ['id'],
      linkableKeys: {
        id: 'id',
        variant_id: 'variant_id',
      },
    }
  }

  async create(data: Partial<VariantImageSchema>): Promise<VariantImageSchema> {
    const toCreate = {
      ...data,
      id: generateEntityId(),
      created_at: new Date(),
      updated_at: new Date(),
    }
    const variantImage = this.manager.create(VariantImage, toCreate)
    await this.manager.persistAndFlush(variantImage)
    return variantImage
  }

  async retrieve(id: string, config?: FindConfig<VariantImageSchema>): Promise<VariantImageSchema> {
    const variantImage = await this.manager.findOne(VariantImage, { id })
    if (!variantImage) {
      throw new Error(`Variant image with id ${id} not found`)
    }
    return variantImage
  }

  async list(config: ExtendedFindConfig<VariantImageSchema> = {}): Promise<[VariantImageSchema[], number]> {
    try {
      // Separate query conditions from options
      const queryConditions = config.where || {}
      const options = {
        offset: config.skip,
        limit: config.take,
      }

      // Add ordering options
      if (config.order) {
        options['orderBy'] = config.order
      }

      const [images, count] = await this.manager.findAndCount(VariantImage, queryConditions, options)
      return [images, count]
    } catch (error) {
      console.error("Error in VariantImagesService.list:", error)
      throw error
    }
  }

  async update(id: string, data: Partial<VariantImageSchema>): Promise<VariantImageSchema> {
    const variantImage = await this.manager.findOne(VariantImage, { id })
    if (!variantImage) {
      throw new Error(`Variant image with id ${id} not found`)
    }
    
    const updateData = {
      ...data,
      updated_at: new Date(),
    }
    
    Object.assign(variantImage, updateData)
    await this.manager.persistAndFlush(variantImage)
    return variantImage
  }

  async delete(id: string): Promise<void> {
    const variantImage = await this.manager.findOne(VariantImage, { id })
    if (variantImage) {
      await this.manager.removeAndFlush(variantImage)
    }
  }

  async attachImagesToVariant(variantId: string, urls: string[]): Promise<VariantImageSchema[]> {
    // Get the current highest display_order for this variant
    const [existingImages] = await this.list({
      where: { variant_id: variantId },
      order: { display_order: 'DESC' },
      take: 1,
    })

    const startOrder = existingImages.length > 0 ? 
      (existingImages[0].display_order || 0) + 1 : 0

    const images = await Promise.all(
      urls.map((url, index) =>
        this.create({
          variant_id: variantId,
          url,
          display_order: startOrder + index,
        })
      )
    )
    return images
  }
}

export default VariantImagesService