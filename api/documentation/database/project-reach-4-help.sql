CREATE TYPE "auth_type" AS ENUM (
    'facebook'
    );

CREATE TYPE "request_status" AS ENUM (
    'pending_cav_assignment',
    'pending_cav_acceptance',
    'accepted',
    'pending_pin_confirmation',
    'completed',
    'reviewed',
    'canceled',
    'rejected'
    );

CREATE TYPE "service_type" AS ENUM (
    'food',
    'supplies',
    'aid',
    'mobility',
    'medicine',
    'manufacturing',
    'financial',
    'information'
    );

CREATE TABLE "authentication"
(
    "id"                 BIGSERIAL PRIMARY KEY NOT NULL,
    "type"               auth_type          NOT NULL,
    "access_tokens_hash" VARCHAR            NOT NULL,
    "expiration_time"    timestamp          NOT NULL,
    "last_activity"      timestamp          NOT NULL,
    "created_at"         timestamp          NOT NULL,
    "updated_at"         timestamp          NOT NULL
);

CREATE TABLE "user"
(
    "id"                BIGSERIAL PRIMARY KEY NOT NULL,
    "authentication_id" BIGINT             NOT NULL,
    "contact_id"        BIGINT,
    "address_id"        BIGINT,
    "profile_photo"     VARCHAR,
    "username"          VARCHAR            NOT NULL,
    "first_name"        VARCHAR            NOT NULL,
    "middle_name"       VARCHAR,
    "last_name"         VARCHAR            NOT NULL,
    "created_at"        timestamp          NOT NULL,
    "updated_at"        timestamp          NOT NULL
);

CREATE TABLE "country"
(
    "id"         BIGSERIAL PRIMARY KEY NOT NULL,
    "name"       VARCHAR            NOT NULL,
    "code"       VARCHAR            NOT NULL,
    "created_at" timestamp          NOT NULL,
    "updated_at" timestamp          NOT NULL
);

CREATE TABLE "address"
(
    "id"                    BIGSERIAL PRIMARY KEY NOT NULL,
    "address1"              VARCHAR            NOT NULL,
    "address2"              VARCHAR,
    "address3"              VARCHAR,
    "locality"              VARCHAR            NOT NULL,
    "administrative_area_1" VARCHAR,
    "administrative_area_2" VARCHAR,
    "postal_code"           VARCHAR,
    "country_id"            BIGINT             NOT NULL,
    "latlng"                POINT              NOT NULL,
    "created_at"            timestamp          NOT NULL,
    "updated_at"            timestamp          NOT NULL
);

CREATE TABLE "contact"
(
    "id"         BIGSERIAL PRIMARY KEY NOT NULL,
    "email"      VARCHAR,
    "phone"      VARCHAR,
    "created_at" timestamp          NOT NULL,
    "updated_at" timestamp          NOT NULL
);

CREATE TABLE "request"
(
    "id"                BIGSERIAL PRIMARY KEY NOT NULL,
    "requester_user_id" BIGINT,
    "volunteer_user_id" BIGINT,
    "content"           VARCHAR            NOT NULL,
    "status"            request_status     NOT NULL,
    "created_at"        timestamp          NOT NULL,
    "updated_at"        timestamp          NOT NULL
);

CREATE TABLE "comment"
(
    "id"         BIGSERIAL PRIMARY KEY NOT NULL,
    "user_id"    BIGINT             NOT NULL,
    "request_id" BIGINT             NOT NULL,
    "content"    text               NOT NULL,
    "created_at" timestamp          NOT NULL,
    "updated_at" timestamp          NOT NULL
);

CREATE TABLE "team"
(
    "id"              BIGSERIAL PRIMARY KEY NOT NULL,
    "address_id"      BIGINT,
    "name"            VARCHAR,
    "organization_id" BIGINT,
    "created_at"      timestamp          NOT NULL,
    "updated_at"      timestamp          NOT NULL
);

CREATE TABLE "team_user"
(
    "team_id"    BIGINT    NOT NULL,
    "user_id"    BIGINT    NOT NULL,
    "created_at" timestamp NOT NULL,
    "updated_at" timestamp NOT NULL,
    PRIMARY KEY ("team_id", "user_id")
);

CREATE TABLE "organization"
(
    "id"         BIGSERIAL PRIMARY KEY NOT NULL,
    "contact_id" BIGINT,
    "address_id" BIGINT,
    "name"       VARCHAR            NOT NULL,
    "created_at" timestamp          NOT NULL,
    "updated_at" timestamp          NOT NULL
);

CREATE TABLE "service"
(
    "id"              BIGSERIAL PRIMARY KEY NOT NULL,
    "organization_id" BIGINT             NOT NULL,
    "type"            service_type       NOT NULL,
    "radius"          INT                NOT NULL,
    "latlng"          POINT              NOT NULL
);

CREATE TABLE "rating"
(
    "id"           BIGSERIAL PRIMARY KEY NOT NULL,
    "request_id"   BIGINT             NOT NULL,
    "to_user_id"   BIGINT             NOT NULL,
    "from_user_id" BIGINT             NOT NULL,
    "rating"       INT                NOT NULL,
    "created_at"   timestamp          NOT NULL,
    "updated_at"   timestamp          NOT NULL
);

ALTER TABLE "user"
    ADD FOREIGN KEY ("id") REFERENCES "comment" ("user_id");

ALTER TABLE "contact"
    ADD FOREIGN KEY ("id") REFERENCES "user" ("contact_id");

ALTER TABLE "address"
    ADD FOREIGN KEY ("id") REFERENCES "user" ("address_id");

ALTER TABLE "country"
    ADD FOREIGN KEY ("id") REFERENCES "address" ("country_id");

ALTER TABLE "authentication"
    ADD FOREIGN KEY ("id") REFERENCES "user" ("authentication_id");

ALTER TABLE "user"
    ADD FOREIGN KEY ("id") REFERENCES "request" ("requester_user_id");

ALTER TABLE "user"
    ADD FOREIGN KEY ("id") REFERENCES "request" ("volunteer_user_id");

ALTER TABLE "request"
    ADD FOREIGN KEY ("id") REFERENCES "rating" ("request_id");

ALTER TABLE "user"
    ADD FOREIGN KEY ("id") REFERENCES "rating" ("to_user_id");

ALTER TABLE "user"
    ADD FOREIGN KEY ("id") REFERENCES "rating" ("from_user_id");

ALTER TABLE "address"
    ADD FOREIGN KEY ("id") REFERENCES "team" ("address_id");

ALTER TABLE "organization"
    ADD FOREIGN KEY ("id") REFERENCES "team" ("organization_id");

ALTER TABLE "team"
    ADD FOREIGN KEY ("id") REFERENCES "team_user" ("team_id");

ALTER TABLE "user"
    ADD FOREIGN KEY ("id") REFERENCES "team_user" ("user_id");

ALTER TABLE "contact"
    ADD FOREIGN KEY ("id") REFERENCES "organization" ("contact_id");

ALTER TABLE "address"
    ADD FOREIGN KEY ("id") REFERENCES "organization" ("address_id");

ALTER TABLE "organization"
    ADD FOREIGN KEY ("id") REFERENCES "service" ("organization_id");

ALTER TABLE "request"
    ADD FOREIGN KEY ("id") REFERENCES "comment" ("request_id");

CREATE UNIQUE INDEX "unique_username" ON "user" ("username");
