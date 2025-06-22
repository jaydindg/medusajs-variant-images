import { Migration } from '@mikro-orm/migrations'

export class VariantImageMigration extends Migration {
  async up(): Promise<void> {
    this.addSql(`
      CREATE TABLE "variant_image" (
        "id" text NOT NULL,
        "variant_id" text NOT NULL,
        "url" text NOT NULL,
        "metadata" jsonb NULL,
        "display_order" integer NOT NULL DEFAULT 0,
        "created_at" timestamptz NOT NULL DEFAULT now(),
        "updated_at" timestamptz NOT NULL DEFAULT now(),
        "deleted_at" timestamptz NULL,
        CONSTRAINT "variant_image_pk" PRIMARY KEY ("id")
      );
    `)

    // Add index on variant_id for faster lookups
    this.addSql(`
      CREATE INDEX "variant_image_variant_id_idx" ON "variant_image" ("variant_id");
    `)
  }

  async down(): Promise<void> {
    this.addSql('DROP TABLE IF EXISTS "variant_image";')
  }
} 