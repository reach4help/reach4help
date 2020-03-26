CREATE TYPE "auth_type" AS ENUM (
  'facebook'
);

CREATE TABLE "authentication" (
  "id" SERIAL PRIMARY KEY NOT NULL,
  "type" auth_type NOT NULL,
  "access_tokens_hash" VARCHAR NOT NULL,
  "expiration_time" timestamp NOT NULL,
  "last_activity" timestamp NOT NULL,
  "created_at" timestamp NOT NULL,
  "updated_at" timestamp
);

CREATE TABLE "user" (
  "id" SERIAL PRIMARY KEY NOT NULL,
  "authentication_id" BIGINT NOT NULL,
  "contact_id" BIGINT,
  "address_id" BIGINT,
  "profile_photo" VARCHAR,
  "username" VARCHAR NOT NULL,
  "first_name" VARCHAR NOT NULL,
  "middle_name" VARCHAR,
  "last_name" VARCHAR NOT NULL,
  "created_at" timestamp NOT NULL,
  "updated_at" timestamp
);

CREATE TABLE "country" (
  "id" SERIAL PRIMARY KEY,
  "name" VARCHAR,
  "code" VARCHAR,
  "created_at" timestamp NOT NULL,
  "updated_at" timestamp
);

CREATE TABLE "address" (
  "id" SERIAL PRIMARY KEY,
  "address1" VARCHAR NOT NULL,
  "address2" VARCHAR,
  "address3" VARCHAR,
  "locality" VARCHAR NOT NULL,
  "administrative_area_1" VARCHAR,
  "administrative_area_2" VARCHAR,
  "postal_code" VARCHAR,
  "country_id" BIGINT NOT NULL,
  "latlng" POINT NOT NULL,
  "created_at" timestamp NOT NULL,
  "updated_at" timestamp
);

CREATE TABLE "contact" (
  "id" SERIAL PRIMARY KEY,
  "email" VARCHAR NOT NULL,
  "phone" VARCHAR NOT NULL,
  "created_at" timestamp NOT NULL,
  "updated_at" timestamp
);

CREATE TABLE "request" (
  "id" SERIAL PRIMARY KEY,
  "requester_user_id" BIGINT,
  "volunteer_user_id" BIGINT,
  "content" VARCHAR NOT NULL,
  "status" VARCHAR NOT NULL,
  "created_at" timestamp NOT NULL,
  "updated_at" timestamp
);

CREATE TABLE "comment" (
  "id" SERIAL PRIMARY KEY,
  "user_id" BIGINT NOT NULL,
  "request_id" BIGINT NOT NULL,
  "content" text NOT NULL,
  "created_at" timestamp NOT NULL,
  "updated_at" timestamp
);

CREATE TABLE "team" (
  "id" SERIAL PRIMARY KEY,
  "address_id" BIGINT,
  "name" VARCHAR,
  "organization_id" BIGINT,
  "created_at" timestamp NOT NULL,
  "updated_at" timestamp
);

CREATE TABLE "team_user" (
  "id" SERIAL PRIMARY KEY,
  "team_id" BIGINT,
  "user_id" BIGINT,
  "created_at" timestamp NOT NULL,
  "updated_at" timestamp
);

CREATE TABLE "organization" (
  "id" SERIAL PRIMARY KEY,
  "contact_id" BIGINT,
  "address_id" BIGINT,
  "name" VARCHAR,
  "created_at" timestamp NOT NULL,
  "updated_at" timestamp
);

CREATE TABLE "rating" (
  "id" SERIAL PRIMARY KEY,
  "request_id" BIGINT,
  "to_user_id" BIGINT,
  "from_user_id" BIGINT,
  "rating" INT,
  "created_at" timestamp NOT NULL,
  "updated_at" timestamp
);

ALTER TABLE "user" ADD FOREIGN KEY ("id") REFERENCES "comment" ("user_id");

ALTER TABLE "contact" ADD FOREIGN KEY ("id") REFERENCES "user" ("contact_id");

ALTER TABLE "address" ADD FOREIGN KEY ("id") REFERENCES "user" ("address_id");

ALTER TABLE "country" ADD FOREIGN KEY ("id") REFERENCES "address" ("country_id");

ALTER TABLE "authentication" ADD FOREIGN KEY ("id") REFERENCES "user" ("authentication_id");

ALTER TABLE "user" ADD FOREIGN KEY ("id") REFERENCES "request" ("requester_user_id");

ALTER TABLE "user" ADD FOREIGN KEY ("id") REFERENCES "request" ("volunteer_user_id");

ALTER TABLE "request" ADD FOREIGN KEY ("id") REFERENCES "rating" ("request_id");

ALTER TABLE "user" ADD FOREIGN KEY ("id") REFERENCES "rating" ("to_user_id");

ALTER TABLE "user" ADD FOREIGN KEY ("id") REFERENCES "rating" ("from_user_id");

ALTER TABLE "address" ADD FOREIGN KEY ("id") REFERENCES "team" ("address_id");

ALTER TABLE "organization" ADD FOREIGN KEY ("id") REFERENCES "team" ("organization_id");

ALTER TABLE "team" ADD FOREIGN KEY ("id") REFERENCES "team_user" ("team_id");

ALTER TABLE "user" ADD FOREIGN KEY ("id") REFERENCES "team_user" ("user_id");

ALTER TABLE "contact" ADD FOREIGN KEY ("id") REFERENCES "organization" ("contact_id");

ALTER TABLE "address" ADD FOREIGN KEY ("id") REFERENCES "organization" ("address_id");

ALTER TABLE "request" ADD FOREIGN KEY ("id") REFERENCES "comment" ("request_id");

CREATE UNIQUE INDEX "unique_username" ON "user" ("username");
