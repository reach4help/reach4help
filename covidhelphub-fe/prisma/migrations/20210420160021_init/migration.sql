-- CreateTable
CREATE TABLE "Program" (
    "programUUID" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "ProgramStep" (
    "UUID" TEXT NOT NULL,
    "sequence" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "programUUID" INTEGER,
    FOREIGN KEY ("programUUID") REFERENCES "Program" ("programUUID") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Request" (
    "UUID" TEXT NOT NULL,
    "summary" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "programStepUUID" TEXT,
    FOREIGN KEY ("programStepUUID") REFERENCES "ProgramStep" ("UUID") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "UserProgramAssignment" (
    "UUID" TEXT NOT NULL,
    "isVolunteer" TEXT NOT NULL,
    "isBeneficiary" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "responses" (
    "UUID" TEXT NOT NULL,
    "volunterUUID" TEXT NOT NULL,
    "isWilling" TEXT NOT NULL,
    "responseText" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "ProgramStep.UUID_unique" ON "ProgramStep"("UUID");

-- CreateIndex
CREATE UNIQUE INDEX "Request.UUID_unique" ON "Request"("UUID");

-- CreateIndex
CREATE UNIQUE INDEX "UserProgramAssignment.UUID_unique" ON "UserProgramAssignment"("UUID");

-- CreateIndex
CREATE UNIQUE INDEX "responses.UUID_unique" ON "responses"("UUID");
