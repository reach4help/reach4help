-- CreateTable
CREATE TABLE "User" (
    "UUID" TEXT NOT NULL PRIMARY KEY,
    "address" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "isVolunteer" BOOLEAN NOT NULL,
    "volunteerNotes" TEXT NOT NULL,
    "isBenificiary" BOOLEAN NOT NULL,
    "beneficiaryNotes" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Program" (
    "UUID" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "pipelineUUID" TEXT,
    FOREIGN KEY ("pipelineUUID") REFERENCES "Pipeline" ("UUID") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Pipeline" (
    "UUID" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "PipelineStep" (
    "UUID" TEXT NOT NULL PRIMARY KEY,
    "sequence" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "programUUID" TEXT NOT NULL,
    FOREIGN KEY ("UUID") REFERENCES "Pipeline" ("UUID") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Request" (
    "UUID" TEXT NOT NULL PRIMARY KEY,
    "summary" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "programStepUUID" TEXT,
    "beneficiaryUserUUID" TEXT,
    "assignedUserUUID" TEXT,
    FOREIGN KEY ("programStepUUID") REFERENCES "PipelineStep" ("UUID") ON DELETE SET NULL ON UPDATE CASCADE,
    FOREIGN KEY ("beneficiaryUserUUID") REFERENCES "User" ("UUID") ON DELETE SET NULL ON UPDATE CASCADE,
    FOREIGN KEY ("assignedUserUUID") REFERENCES "User" ("UUID") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "UserProgramAssignment" (
    "UUID" TEXT NOT NULL PRIMARY KEY,
    "isVolunteer" TEXT NOT NULL,
    "isBeneficiary" TEXT NOT NULL,
    "requestUUID" TEXT,
    FOREIGN KEY ("requestUUID") REFERENCES "Request" ("UUID") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "responses" (
    "UUID" TEXT NOT NULL PRIMARY KEY,
    "volunterUUID" TEXT NOT NULL,
    "isWilling" TEXT NOT NULL,
    "responseText" TEXT NOT NULL
);
