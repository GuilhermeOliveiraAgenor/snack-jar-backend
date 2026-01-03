-- AlterTable
ALTER TABLE "RecipeIngredient" ALTER COLUMN "updated_by" DROP NOT NULL,
ALTER COLUMN "deleted_by" DROP NOT NULL;

-- AlterTable
ALTER TABLE "RecipeStep" ALTER COLUMN "updated_by" DROP NOT NULL,
ALTER COLUMN "deleted_by" DROP NOT NULL;

-- AlterTable
ALTER TABLE "recipes" ALTER COLUMN "updated_by" DROP NOT NULL,
ALTER COLUMN "deleted_by" DROP NOT NULL;
