import { RouteConfig } from "@medusajs/admin-sdk"
import { DocumentText } from "@medusajs/icons"
import { Container, Text, Heading } from "@medusajs/ui"

const VariantImagesPage = () => {
  return (
    <Container>
      <div className="flex flex-col items-center justify-center py-8">
        <Heading level="h2">Variant Images</Heading>
        <Text className="mt-4 text-ui-fg-subtle">
          Please navigate to a product variant to manage its images.
        </Text>
      </div>
    </Container>
  )
}

export const config: RouteConfig = {
  label: "Variant Images",
  icon: DocumentText,
}

export default VariantImagesPage 
