CREATE TABLE "user" (
  "id" serial PRIMARY KEY,
  "name" varchar(100),
  "email" varchar(100),
  "password_hash" varchar(100),
  "english_level" varchar(2),
  "technical_knowledge" text,
  "cv_link" text
);

CREATE TABLE "roles" (
  "id" serial PRIMARY KEY,
  "role" varchar(12)
);

CREATE TABLE "permissions" (
  "id" serial PRIMARY KEY,
  "permission" varchar(50)
);

CREATE TABLE "capabilities" (
  "id" serial PRIMARY KEY,
  "action" varchar(20)
);

CREATE TABLE "permissions_capabilities" (
  "permission_id" int4,
  "capability_id" int4
);

CREATE TABLE "roles_permissions" (
  "role_id" int4,
  "permission_id" int4
);

CREATE TABLE "user_roles" (
  "user_id" int4,
  "role_id" int4
);

CREATE TABLE "accounts" (
  "id" serial PRIMARY KEY,
  "account_name" varchar(100),
  "client_name" varchar(100),
  "operation_manager_name" varchar(100)
);

CREATE TABLE "teams" (
  "id" serial PRIMARY KEY,
  "team_name" varchar(100)
);

CREATE TABLE "account_teams" (
  "id" serial PRIMARY KEY,
  "team_id" int4,
  "account_id" int4
);

CREATE TABLE "team_users" (
  "id" serial PRIMARY KEY,
  "team_id" int4,
  "user_dates_id" int4,
  "user_id" int4
);

CREATE TABLE "user_team_changes_logs" (
  "id" serial PRIMARY KEY,
  "log" text,
  "from_team" int4,
  "to_team" int4
);

CREATE TABLE "user_team_dates" (
  "id" serial PRIMARY KEY,
  "start_date" date,
  "finish_date" date
);

ALTER TABLE "permissions_capabilities" ADD FOREIGN KEY ("permission_id") REFERENCES "permissions" ("id");

ALTER TABLE "permissions_capabilities" ADD FOREIGN KEY ("capability_id") REFERENCES "capabilities" ("id");

ALTER TABLE "roles_permissions" ADD FOREIGN KEY ("permission_id") REFERENCES "permissions" ("id");

ALTER TABLE "roles_permissions" ADD FOREIGN KEY ("role_id") REFERENCES "roles" ("id");

ALTER TABLE "user_roles" ADD FOREIGN KEY ("user_id") REFERENCES "user" ("id");

ALTER TABLE "user_roles" ADD FOREIGN KEY ("role_id") REFERENCES "roles" ("id");

ALTER TABLE "account_teams" ADD FOREIGN KEY ("team_id") REFERENCES "teams" ("id");

ALTER TABLE "account_teams" ADD FOREIGN KEY ("account_id") REFERENCES "accounts" ("id");

ALTER TABLE "team_users" ADD FOREIGN KEY ("user_id") REFERENCES "user" ("id");

ALTER TABLE "team_users" ADD FOREIGN KEY ("team_id") REFERENCES "teams" ("id");

ALTER TABLE "team_users" ADD FOREIGN KEY ("user_dates_id") REFERENCES "user_team_dates" ("id");

ALTER TABLE "user_team_changes_logs" ADD FOREIGN KEY ("from_team") REFERENCES "team_users" ("id");

ALTER TABLE "user_team_changes_logs" ADD FOREIGN KEY ("to_team") REFERENCES "team_users" ("id");