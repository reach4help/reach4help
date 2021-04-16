-- CreateTable
CREATE TABLE "User" (
    "uuid" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "isVolunteer" BOOLEAN NOT NULL,
    "volunteerNotes" TEXT NOT NULL,
    "isBenificiary" BOOLEAN NOT NULL,
    "beneficiaryNotes" TEXT NOT NULL,
    "newField" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Program" (
    "programuuid" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "PipelineStep" (
    "uuid" TEXT NOT NULL,
    "programuuid" TEXT NOT NULL,
    "sequence" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "description" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Request" (
    "uuid" TEXT NOT NULL,
    "beneficiaryuuid" TEXT NOT NULL,
    "volunteeeruuid" TEXT NOT NULL,
    "summary" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "programuuid" TEXT NOT NULL,
    "pipelineStatusuuid" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "UserProgramAssignment" (
    "uuid" TEXT NOT NULL,
    "isVolunteer" TEXT NOT NULL,
    "isBeneficiary" TEXT NOT NULL,
    "programuuid" TEXT NOT NULL,
    "useruuid" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "User.uuid_unique" ON "User"("uuid");

-- CreateIndex
CREATE UNIQUE INDEX "Program.programuuid_unique" ON "Program"("programuuid");

-- CreateIndex
CREATE UNIQUE INDEX "PipelineStep.uuid_unique" ON "PipelineStep"("uuid");

-- CreateIndex
CREATE UNIQUE INDEX "PipelineStep.programuuid_unique" ON "PipelineStep"("programuuid");

-- CreateIndex
CREATE UNIQUE INDEX "Request.uuid_unique" ON "Request"("uuid");

-- CreateIndex
CREATE UNIQUE INDEX "Request.beneficiaryuuid_unique" ON "Request"("beneficiaryuuid");

-- CreateIndex
CREATE UNIQUE INDEX "Request.volunteeeruuid_unique" ON "Request"("volunteeeruuid");

-- CreateIndex
CREATE UNIQUE INDEX "Request.programuuid_unique" ON "Request"("programuuid");

-- CreateIndex
CREATE UNIQUE INDEX "Request.pipelineStatusuuid_unique" ON "Request"("pipelineStatusuuid");

-- CreateIndex
CREATE UNIQUE INDEX "UserProgramAssignment.uuid_unique" ON "UserProgramAssignment"("uuid");

-- CreateIndex
CREATE UNIQUE INDEX "UserProgramAssignment.programuuid_unique" ON "UserProgramAssignment"("programuuid");

-- CreateIndex
CREATE UNIQUE INDEX "UserProgramAssignment.useruuid_unique" ON "UserProgramAssignment"("useruuid");
