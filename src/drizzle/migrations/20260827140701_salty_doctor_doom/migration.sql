ALTER TABLE "tickets" ALTER COLUMN "hash_code" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "tickets" ALTER COLUMN "qr_code_url" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "tickets" ADD CONSTRAINT "tickets_hash_code_key" UNIQUE("hash_code");