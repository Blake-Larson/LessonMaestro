-- CreateTable
CREATE TABLE "Student" (
    "id" STRING NOT NULL,
    "name" STRING NOT NULL,
    "age" INT4,
    "phone" STRING,
    "email" STRING,
    "contact" STRING,
    "instrument" STRING,
    "status" BOOL NOT NULL DEFAULT true,
    "image" STRING,
    "userId" STRING NOT NULL,

    CONSTRAINT "Student_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Music" (
    "id" STRING NOT NULL,
    "title" STRING NOT NULL,
    "composer" STRING,
    "year" STRING,
    "userId" STRING NOT NULL,

    CONSTRAINT "Music_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Lesson" (
    "id" STRING NOT NULL,
    "attendance" STRING NOT NULL,
    "payment" STRING NOT NULL,
    "archived" BOOL NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "userId" STRING NOT NULL,
    "studentId" STRING NOT NULL,

    CONSTRAINT "Lesson_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Work" (
    "id" STRING NOT NULL,
    "text" STRING NOT NULL,
    "studentId" STRING NOT NULL,

    CONSTRAINT "Work_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Todo" (
    "id" STRING NOT NULL,
    "text" STRING NOT NULL,
    "completed" BOOL NOT NULL,
    "userId" STRING NOT NULL,

    CONSTRAINT "Todo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_MusicToStudent" (
    "A" STRING NOT NULL,
    "B" STRING NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Work_id_studentId_key" ON "Work"("id", "studentId");

-- CreateIndex
CREATE UNIQUE INDEX "Todo_text_userId_key" ON "Todo"("text", "userId");

-- CreateIndex
CREATE UNIQUE INDEX "_MusicToStudent_AB_unique" ON "_MusicToStudent"("A", "B");

-- CreateIndex
CREATE INDEX "_MusicToStudent_B_index" ON "_MusicToStudent"("B");

-- AddForeignKey
ALTER TABLE "Lesson" ADD CONSTRAINT "Lesson_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Work" ADD CONSTRAINT "Work_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_MusicToStudent" ADD CONSTRAINT "_MusicToStudent_A_fkey" FOREIGN KEY ("A") REFERENCES "Music"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_MusicToStudent" ADD CONSTRAINT "_MusicToStudent_B_fkey" FOREIGN KEY ("B") REFERENCES "Student"("id") ON DELETE CASCADE ON UPDATE CASCADE;
