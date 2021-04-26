-- CreateTable
CREATE TABLE "Volunteer" (
    "isVolunteer" BOOLEAN NOT NULL,
    "UUID" TEXT NOT NULL PRIMARY KEY,
    "address" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "notes" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Beneficiary" (
    "isVolunteer" BOOLEAN NOT NULL,
    "UUID" TEXT NOT NULL PRIMARY KEY,
    "address" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "notes" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Program" (
    "UUID" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "ProgramStep" (
    "UUID" TEXT NOT NULL PRIMARY KEY,
    "sequence" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "programUUID" TEXT NOT NULL,
    FOREIGN KEY ("programUUID") REFERENCES "Program" ("UUID") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Request" (
    "UUID" TEXT NOT NULL PRIMARY KEY,
    "summary" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "programUUID" TEXT NOT NULL,
    "programStepUUID" TEXT NOT NULL,
    "beneficiaryUUID" TEXT NOT NULL,
    "volunteerUUID" TEXT,
    FOREIGN KEY ("programStepUUID") REFERENCES "ProgramStep" ("UUID") ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY ("beneficiaryUUID") REFERENCES "Beneficiary" ("UUID") ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY ("volunteerUUID") REFERENCES "Volunteer" ("UUID") ON DELETE SET NULL ON UPDATE CASCADE,
    FOREIGN KEY ("programUUID") REFERENCES "Program" ("UUID") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "BeneficiaryProgramAssignment" (
    "UUID" TEXT NOT NULL PRIMARY KEY,
    "programUUID" TEXT NOT NULL,
    "beneficiaryUUID" TEXT NOT NULL,
    FOREIGN KEY ("programUUID") REFERENCES "Program" ("UUID") ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY ("beneficiaryUUID") REFERENCES "Beneficiary" ("UUID") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "VolunteerProgramAssignment" (
    "UUID" TEXT NOT NULL PRIMARY KEY,
    "programUUID" TEXT NOT NULL,
    "volunteerUUID" TEXT NOT NULL,
    FOREIGN KEY ("programUUID") REFERENCES "Program" ("UUID") ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY ("volunteerUUID") REFERENCES "Beneficiary" ("UUID") ON DELETE CASCADE ON UPDATE CASCADE
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
