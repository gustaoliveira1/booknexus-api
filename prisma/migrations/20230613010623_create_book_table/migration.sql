-- CreateTable
CREATE TABLE "Book" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "sinopse" TEXT NOT NULL,
    "author" TEXT NOT NULL,
    "genre" TEXT NOT NULL,
    "publicationYear" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Book_id_key" ON "Book"("id");
