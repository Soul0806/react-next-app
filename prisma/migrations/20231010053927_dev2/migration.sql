/*
  Warnings:

  - You are about to drop the column `place` on the `Record` table. All the data in the column will be lost.
  - Added the required column `area` to the `Record` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Record` DROP COLUMN `place`,
    ADD COLUMN `area` VARCHAR(191) NOT NULL;
