-- CreateTable
CREATE TABLE "Volunteer" (
    "UUID" TEXT NOT NULL PRIMARY KEY,
    "address" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "notes" TEXT NOT NULL,
    "programCode" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Beneficiary" (
    "UUID" TEXT NOT NULL PRIMARY KEY,
    "address" TEXT NOT NULL,
    "email" TEXT,
    "phone" TEXT,
    "notes" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Program" (
    "code" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Steps" (
    "sequence" INTEGER NOT NULL,
    "code" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Request" (
    "UUID" TEXT NOT NULL PRIMARY KEY,
    "summary" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "programCode" TEXT NOT NULL,
    "stepCode" TEXT NOT NULL,
    "beneficiaryUUID" TEXT NOT NULL,
    "volunteerUUID" TEXT,
    FOREIGN KEY ("stepCode") REFERENCES "Steps" ("code") ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY ("beneficiaryUUID") REFERENCES "Beneficiary" ("UUID") ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY ("volunteerUUID") REFERENCES "Volunteer" ("UUID") ON DELETE SET NULL ON UPDATE CASCADE,
    FOREIGN KEY ("programCode") REFERENCES "Program" ("code") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "VolunteerProgramAssignment" (
    "UUID" TEXT NOT NULL PRIMARY KEY,
    "programCode" TEXT NOT NULL,
    "volunteerUUID" TEXT NOT NULL,
    FOREIGN KEY ("programCode") REFERENCES "Program" ("code") ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY ("volunteerUUID") REFERENCES "Volunteer" ("UUID") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Response" (
    "UUID" TEXT NOT NULL PRIMARY KEY,
    "volunterUUID" TEXT NOT NULL,
    "isWilling" TEXT NOT NULL,
    "responseText" TEXT NOT NULL,
    "requestUUID" TEXT,
    FOREIGN KEY ("requestUUID") REFERENCES "Request" ("UUID") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Program.code_unique" ON "Program"("code");

-- CreateIndex
CREATE UNIQUE INDEX "Steps.code_unique" ON "Steps"("code");
