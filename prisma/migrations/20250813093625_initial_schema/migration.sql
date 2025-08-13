-- CreateTable
CREATE TABLE "public"."User" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Streams" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "Streams_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Upvotes" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "streamId" INTEGER NOT NULL,

    CONSTRAINT "Upvotes_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "public"."User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Upvotes_userId_streamId_key" ON "public"."Upvotes"("userId", "streamId");

-- AddForeignKey
ALTER TABLE "public"."Streams" ADD CONSTRAINT "Streams_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Upvotes" ADD CONSTRAINT "Upvotes_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Upvotes" ADD CONSTRAINT "Upvotes_streamId_fkey" FOREIGN KEY ("streamId") REFERENCES "public"."Streams"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
