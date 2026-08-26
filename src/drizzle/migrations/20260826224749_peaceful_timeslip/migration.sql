CREATE TYPE "order_status" AS ENUM('PENDING', 'APPROVED', 'CANCELLED');--> statement-breakpoint
CREATE TYPE "seat_status" AS ENUM('AVAILABLE', 'RESERVED', 'SOLD');--> statement-breakpoint
CREATE TYPE "ticket_status" AS ENUM('VALID', 'USED', 'CANCELLED');--> statement-breakpoint
CREATE TABLE "events" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
	"organizer_id" uuid NOT NULL,
	"title" text NOT NULL,
	"description" text,
	"date_time" timestamp with time zone NOT NULL,
	"location" text NOT NULL,
	"banner_url" text,
	"capacity" integer NOT NULL,
	"price" real NOT NULL,
	"event_provider" text,
	"external_id" text,
	"has_seats" boolean DEFAULT false NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "orders" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
	"user_id" uuid NOT NULL,
	"status" "order_status" DEFAULT 'PENDING'::"order_status" NOT NULL,
	"price" real NOT NULL,
	"event_id" uuid NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "seats" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
	"event_id" uuid NOT NULL,
	"status" "seat_status" DEFAULT 'AVAILABLE'::"seat_status" NOT NULL,
	"seat_number" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "tikets" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
	"order_id" uuid,
	"event_id" uuid NOT NULL,
	"hash_code" text,
	"qr_code_url" text,
	"status" "ticket_status" DEFAULT 'VALID'::"ticket_status" NOT NULL,
	"seat_id" uuid NOT NULL UNIQUE,
	"validated_at" timestamp with time zone
);
--> statement-breakpoint
ALTER TABLE "events" ADD CONSTRAINT "events_organizer_id_users_id_fkey" FOREIGN KEY ("organizer_id") REFERENCES "users"("id") ON DELETE CASCADE;--> statement-breakpoint
ALTER TABLE "orders" ADD CONSTRAINT "orders_user_id_users_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE;--> statement-breakpoint
ALTER TABLE "orders" ADD CONSTRAINT "orders_event_id_events_id_fkey" FOREIGN KEY ("event_id") REFERENCES "events"("id") ON DELETE CASCADE;--> statement-breakpoint
ALTER TABLE "seats" ADD CONSTRAINT "seats_event_id_events_id_fkey" FOREIGN KEY ("event_id") REFERENCES "events"("id") ON DELETE CASCADE;--> statement-breakpoint
ALTER TABLE "tikets" ADD CONSTRAINT "tikets_order_id_orders_id_fkey" FOREIGN KEY ("order_id") REFERENCES "orders"("id") ON DELETE CASCADE;--> statement-breakpoint
ALTER TABLE "tikets" ADD CONSTRAINT "tikets_event_id_events_id_fkey" FOREIGN KEY ("event_id") REFERENCES "events"("id") ON DELETE CASCADE;--> statement-breakpoint
ALTER TABLE "tikets" ADD CONSTRAINT "tikets_seat_id_seats_id_fkey" FOREIGN KEY ("seat_id") REFERENCES "seats"("id");