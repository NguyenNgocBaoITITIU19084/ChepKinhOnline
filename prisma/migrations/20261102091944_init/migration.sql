-- CreateEnum
CREATE TYPE "CopyStatus" AS ENUM ('IN_PROGRESS', 'COMPLETED');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Sutra" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "content" TEXT NOT NULL,
    "language" TEXT NOT NULL DEFAULT 'vi',
    "isPublished" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Sutra_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CopySession" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "sutraId" TEXT NOT NULL,
    "typedText" TEXT NOT NULL DEFAULT '',
    "progress" INTEGER NOT NULL DEFAULT 0,
    "status" "CopyStatus" NOT NULL DEFAULT 'IN_PROGRESS',
    "startedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "completedAt" TIMESTAMP(3),
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CopySession_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Sutra_slug_key" ON "Sutra"("slug");

-- CreateIndex
CREATE INDEX "CopySession_userId_idx" ON "CopySession"("userId");

-- CreateIndex
CREATE INDEX "CopySession_sutraId_idx" ON "CopySession"("sutraId");

-- AddForeignKey
ALTER TABLE "CopySession" ADD CONSTRAINT "CopySession_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CopySession" ADD CONSTRAINT "CopySession_sutraId_fkey" FOREIGN KEY ("sutraId") REFERENCES "Sutra"("id") ON DELETE CASCADE ON UPDATE CASCADE;
