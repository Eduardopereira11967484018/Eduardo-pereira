/*
  Warnings:

  - Added the required column `quantity` to the `ring` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_ring" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "power" TEXT NOT NULL,
    "portador" TEXT NOT NULL,
    "forjadoPor" TEXT NOT NULL,
    "imagem" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL
);
INSERT INTO "new_ring" ("forjadoPor", "id", "imagem", "name", "portador", "power") SELECT "forjadoPor", "id", "imagem", "name", "portador", "power" FROM "ring";
DROP TABLE "ring";
ALTER TABLE "new_ring" RENAME TO "ring";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
