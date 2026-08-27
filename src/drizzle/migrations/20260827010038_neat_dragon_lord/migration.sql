ALTER TABLE "tikets" RENAME TO "tickets";--> statement-breakpoint
ALTER TABLE "tickets" ADD COLUMN "validated_by" uuid;--> statement-breakpoint
ALTER TABLE "events" DROP COLUMN "has_seats";--> statement-breakpoint
ALTER TABLE "tickets" ADD CONSTRAINT "tickets_validated_by_users_id_fkey" FOREIGN KEY ("validated_by") REFERENCES "users"("id");