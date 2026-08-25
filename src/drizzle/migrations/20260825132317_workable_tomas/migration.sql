CREATE TYPE "user_role" AS ENUM('CLIENT', 'ORGANIZER', 'GATEKEEPER');--> statement-breakpoint
CREATE TABLE "users" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
	"name" text NOT NULL,
	"email" text NOT NULL UNIQUE,
	"password_hash" text NOT NULL,
	"role" "user_role" DEFAULT 'CLIENT'::"user_role" NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
