/*
  Warnings:

  - You are about to drop the column `userId` on the `favorite_recipe` table. All the data in the column will be lost.
  - Added the required column `created_by` to the `favorite_recipe` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "favorite_recipe" DROP CONSTRAINT "favorite_recipe_userId_fkey";

-- DropIndex
DROP INDEX "favorite_recipe_userId_idx";

-- AlterTable
ALTER TABLE "favorite_recipe" DROP COLUMN "userId",
ADD COLUMN     "created_by" TEXT NOT NULL;

-- CreateIndex
CREATE INDEX "favorite_recipe_created_by_idx" ON "favorite_recipe"("created_by");

-- AddForeignKey
ALTER TABLE "favorite_recipe" ADD CONSTRAINT "favorite_recipe_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
