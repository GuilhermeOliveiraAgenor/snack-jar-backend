/*
  Warnings:

  - You are about to drop the column `deleted_at` on the `categories` table. All the data in the column will be lost.
  - You are about to drop the column `deleted_at` on the `recipe_ingredients` table. All the data in the column will be lost.
  - You are about to drop the column `deleted_by` on the `recipe_ingredients` table. All the data in the column will be lost.
  - You are about to drop the column `deleted_at` on the `recipe_steps` table. All the data in the column will be lost.
  - You are about to drop the column `deleted_by` on the `recipe_steps` table. All the data in the column will be lost.
  - You are about to drop the `favorite_recipe` table. If the table is not empty, all the data it contains will be lost.
  - Made the column `created_at` on table `categories` required. This step will fail if there are existing NULL values in that column.
  - Made the column `created_at` on table `recipe_ingredients` required. This step will fail if there are existing NULL values in that column.
  - Changed the type of `unit` on the `recipe_ingredients` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Made the column `created_at` on table `recipe_steps` required. This step will fail if there are existing NULL values in that column.
  - Changed the type of `status` on the `recipes` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Made the column `created_at` on table `recipes` required. This step will fail if there are existing NULL values in that column.
  - Made the column `created_at` on table `users` required. This step will fail if there are existing NULL values in that column.

*/
-- CreateEnum
CREATE TYPE "RecipeStatus" AS ENUM ('ACTIVE', 'INACTIVE');

-- CreateEnum
CREATE TYPE "MeasurementUnit" AS ENUM ('G', 'KG', 'MG', 'ML', 'L', 'UN', 'COLHER', 'COLHER_CHA', 'COLHER_SOPA', 'XICARA', 'PITADA');

-- DropForeignKey
ALTER TABLE "favorite_recipe" DROP CONSTRAINT "favorite_recipe_created_by_fkey";

-- DropForeignKey
ALTER TABLE "favorite_recipe" DROP CONSTRAINT "favorite_recipe_recipe_id_fkey";

-- AlterTable
ALTER TABLE "categories" DROP COLUMN "deleted_at",
ALTER COLUMN "created_at" SET NOT NULL;

-- AlterTable
ALTER TABLE "recipe_ingredients" DROP COLUMN "deleted_at",
DROP COLUMN "deleted_by",
ALTER COLUMN "created_at" SET NOT NULL,
DROP COLUMN "unit",
ADD COLUMN     "unit" "MeasurementUnit" NOT NULL;

-- AlterTable
ALTER TABLE "recipe_steps" DROP COLUMN "deleted_at",
DROP COLUMN "deleted_by",
ALTER COLUMN "created_at" SET NOT NULL;

-- AlterTable
ALTER TABLE "recipes" DROP COLUMN "status",
ADD COLUMN     "status" "RecipeStatus" NOT NULL,
ALTER COLUMN "created_at" SET NOT NULL;

-- AlterTable
ALTER TABLE "users" ALTER COLUMN "created_at" SET NOT NULL;

-- DropTable
DROP TABLE "favorite_recipe";

-- DropEnum
DROP TYPE "EnumUnit";

-- CreateTable
CREATE TABLE "favorite_recipes" (
    "id" TEXT NOT NULL,
    "recipe_id" TEXT NOT NULL,
    "created_by" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "favorite_recipes_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "favorite_recipes_recipe_id_idx" ON "favorite_recipes"("recipe_id");

-- CreateIndex
CREATE INDEX "favorite_recipes_created_by_idx" ON "favorite_recipes"("created_by");

-- CreateIndex
CREATE INDEX "recipe_ingredients_created_by_idx" ON "recipe_ingredients"("created_by");

-- CreateIndex
CREATE INDEX "recipe_ingredients_updated_by_idx" ON "recipe_ingredients"("updated_by");

-- CreateIndex
CREATE INDEX "recipe_steps_created_by_idx" ON "recipe_steps"("created_by");

-- CreateIndex
CREATE INDEX "recipe_steps_updated_by_idx" ON "recipe_steps"("updated_by");

-- CreateIndex
CREATE INDEX "recipes_status_idx" ON "recipes"("status");

-- AddForeignKey
ALTER TABLE "recipes" ADD CONSTRAINT "recipes_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "recipes" ADD CONSTRAINT "recipes_updated_by_fkey" FOREIGN KEY ("updated_by") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "recipes" ADD CONSTRAINT "recipes_deleted_by_fkey" FOREIGN KEY ("deleted_by") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "recipe_ingredients" ADD CONSTRAINT "recipe_ingredients_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "recipe_ingredients" ADD CONSTRAINT "recipe_ingredients_updated_by_fkey" FOREIGN KEY ("updated_by") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "recipe_steps" ADD CONSTRAINT "recipe_steps_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "recipe_steps" ADD CONSTRAINT "recipe_steps_updated_by_fkey" FOREIGN KEY ("updated_by") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "favorite_recipes" ADD CONSTRAINT "favorite_recipes_recipe_id_fkey" FOREIGN KEY ("recipe_id") REFERENCES "recipes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "favorite_recipes" ADD CONSTRAINT "favorite_recipes_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
