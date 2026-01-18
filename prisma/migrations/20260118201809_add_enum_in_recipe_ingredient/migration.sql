/*
  Warnings:

  - Changed the type of `unit` on the `recipe_ingredients` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "EnumUnit" AS ENUM ('g', 'kg', 'mg', 'ml', 'l', 'un', 'colher', 'colher_cha', 'colher_sopa', 'xicara', 'pitada');

-- AlterTable
ALTER TABLE "recipe_ingredients" DROP COLUMN "unit",
ADD COLUMN     "unit" "EnumUnit" NOT NULL;
