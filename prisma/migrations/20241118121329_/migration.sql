-- CreateEnum
CREATE TYPE "Role" AS ENUM ('ADMIN', 'CREATOR', 'USER');

-- CreateEnum
CREATE TYPE "Provider" AS ENUM ('Google', 'Facebook', 'X');

-- CreateEnum
CREATE TYPE "UpvoteType" AS ENUM ('MODELS', 'INTROS', 'SCENES');

-- CreateTable
CREATE TABLE "Token" (
    "id" SERIAL NOT NULL,
    "token" TEXT,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Token_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "role" "Role" NOT NULL,
    "provider" "Provider" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Scenes" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Scenes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Models" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Models_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Intros" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Intros_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Characters" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Characters_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Upvotes" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "modelId" TEXT,
    "sceneId" TEXT,
    "introId" TEXT,
    "characteId" TEXT,
    "upvoteType" "UpvoteType" NOT NULL,

    CONSTRAINT "Upvotes_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Token_token_key" ON "Token"("token");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Upvotes_userId_sceneId_introId_characteId_key" ON "Upvotes"("userId", "sceneId", "introId", "characteId");

-- AddForeignKey
ALTER TABLE "Token" ADD CONSTRAINT "Token_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Scenes" ADD CONSTRAINT "Scenes_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Models" ADD CONSTRAINT "Models_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Intros" ADD CONSTRAINT "Intros_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Characters" ADD CONSTRAINT "Characters_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Upvotes" ADD CONSTRAINT "Upvotes_sceneId_fkey" FOREIGN KEY ("sceneId") REFERENCES "Scenes"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Upvotes" ADD CONSTRAINT "Upvotes_introId_fkey" FOREIGN KEY ("introId") REFERENCES "Intros"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Upvotes" ADD CONSTRAINT "Upvotes_characteId_fkey" FOREIGN KEY ("characteId") REFERENCES "Characters"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Upvotes" ADD CONSTRAINT "Upvotes_modelId_fkey" FOREIGN KEY ("modelId") REFERENCES "Models"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Upvotes" ADD CONSTRAINT "Upvotes_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
