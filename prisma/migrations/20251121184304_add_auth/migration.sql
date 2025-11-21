-- CreateTable
CREATE TABLE "Account" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "provider" TEXT NOT NULL,
    "providerAccountId" TEXT NOT NULL,
    "refresh_token" TEXT,
    "access_token" TEXT,
    "expires_at" INTEGER,
    "token_type" TEXT,
    "scope" TEXT,
    "id_token" TEXT,
    "session_state" TEXT,
    CONSTRAINT "Account_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Session" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "sessionToken" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "expires" DATETIME NOT NULL,
    CONSTRAINT "Session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT,
    "email" TEXT,
    "emailVerified" DATETIME,
    "image" TEXT,
    "password" TEXT,
    "role" TEXT NOT NULL DEFAULT 'USER',
    "isApproved" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "VerificationToken" (
    "identifier" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "expires" DATETIME NOT NULL
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Flight" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "date" DATETIME NOT NULL,
    "departurePlace" TEXT NOT NULL,
    "departureTime" TEXT NOT NULL,
    "arrivalPlace" TEXT NOT NULL,
    "arrivalTime" TEXT NOT NULL,
    "aircraftModel" TEXT NOT NULL,
    "aircraftReg" TEXT NOT NULL,
    "singlePilotSE" INTEGER NOT NULL DEFAULT 0,
    "singlePilotME" INTEGER NOT NULL DEFAULT 0,
    "multiPilot" INTEGER NOT NULL DEFAULT 0,
    "totalTime" INTEGER NOT NULL DEFAULT 0,
    "picName" TEXT NOT NULL,
    "landingsDay" INTEGER NOT NULL DEFAULT 0,
    "landingsNight" INTEGER NOT NULL DEFAULT 0,
    "nightTime" INTEGER NOT NULL DEFAULT 0,
    "ifrTime" INTEGER NOT NULL DEFAULT 0,
    "picTime" INTEGER NOT NULL DEFAULT 0,
    "copilotTime" INTEGER NOT NULL DEFAULT 0,
    "dualTime" INTEGER NOT NULL DEFAULT 0,
    "instructorTime" INTEGER NOT NULL DEFAULT 0,
    "remarks" TEXT,
    "userId" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Flight_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Flight" ("aircraftModel", "aircraftReg", "arrivalPlace", "arrivalTime", "copilotTime", "createdAt", "date", "departurePlace", "departureTime", "dualTime", "id", "ifrTime", "instructorTime", "landingsDay", "landingsNight", "multiPilot", "nightTime", "picName", "picTime", "remarks", "singlePilotME", "singlePilotSE", "totalTime", "updatedAt") SELECT "aircraftModel", "aircraftReg", "arrivalPlace", "arrivalTime", "copilotTime", "createdAt", "date", "departurePlace", "departureTime", "dualTime", "id", "ifrTime", "instructorTime", "landingsDay", "landingsNight", "multiPilot", "nightTime", "picName", "picTime", "remarks", "singlePilotME", "singlePilotSE", "totalTime", "updatedAt" FROM "Flight";
DROP TABLE "Flight";
ALTER TABLE "new_Flight" RENAME TO "Flight";
CREATE TABLE "new_Settings" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "rowsPerPage" INTEGER NOT NULL DEFAULT 14,
    "language" TEXT NOT NULL DEFAULT 'en',
    "userId" TEXT,
    CONSTRAINT "Settings_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Settings" ("id", "rowsPerPage") SELECT "id", "rowsPerPage" FROM "Settings";
DROP TABLE "Settings";
ALTER TABLE "new_Settings" RENAME TO "Settings";
CREATE UNIQUE INDEX "Settings_userId_key" ON "Settings"("userId");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

-- CreateIndex
CREATE UNIQUE INDEX "Account_provider_providerAccountId_key" ON "Account"("provider", "providerAccountId");

-- CreateIndex
CREATE UNIQUE INDEX "Session_sessionToken_key" ON "Session"("sessionToken");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "VerificationToken_token_key" ON "VerificationToken"("token");

-- CreateIndex
CREATE UNIQUE INDEX "VerificationToken_identifier_token_key" ON "VerificationToken"("identifier", "token");
