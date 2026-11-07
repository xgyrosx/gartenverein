import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_news_category" AS ENUM('aktuelles', 'vereinsleben', 'garten', 'hinweis');
  CREATE TYPE "public"."enum__news_v_version_category" AS ENUM('aktuelles', 'vereinsleben', 'garten', 'hinweis');
  CREATE TYPE "public"."enum_startseite_quick_links_icon" AS ENUM('sprout', 'calendar', 'document', 'house', 'book', 'bug', 'images', 'megaphone');
  CREATE TYPE "public"."enum_startseite_quick_links_link_type" AS ENUM('seite', 'adresse');
  CREATE TYPE "public"."enum_startseite_garden_links_icon" AS ENUM('sprout', 'calendar', 'document', 'house', 'book', 'bug', 'images', 'megaphone');
  CREATE TYPE "public"."enum_startseite_garden_links_link_type" AS ENUM('seite', 'adresse');
  CREATE TYPE "public"."enum_startseite_hero_primary_link_type" AS ENUM('seite', 'adresse');
  CREATE TYPE "public"."enum_startseite_hero_secondary_link_type" AS ENUM('seite', 'adresse');
  CREATE TYPE "public"."enum_startseite_join_primary_link_type" AS ENUM('seite', 'adresse');
  CREATE TYPE "public"."enum_startseite_join_secondary_link_type" AS ENUM('seite', 'adresse');
  CREATE TABLE "startseite_quick_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon" "enum_startseite_quick_links_icon" DEFAULT 'sprout' NOT NULL,
  	"title" varchar NOT NULL,
  	"text" varchar,
  	"link_type" "enum_startseite_quick_links_link_type" DEFAULT 'seite' NOT NULL,
  	"page_id" integer,
  	"url" varchar
  );
  
  CREATE TABLE "startseite_garden_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon" "enum_startseite_garden_links_icon" DEFAULT 'sprout' NOT NULL,
  	"title" varchar NOT NULL,
  	"text" varchar,
  	"link_type" "enum_startseite_garden_links_link_type" DEFAULT 'seite' NOT NULL,
  	"page_id" integer,
  	"url" varchar
  );
  
  CREATE TABLE "startseite" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"utility_slogan" varchar,
  	"hero_title" varchar,
  	"hero_intro" varchar,
  	"hero_image_id" integer,
  	"hero_primary_label" varchar NOT NULL,
  	"hero_primary_link_type" "enum_startseite_hero_primary_link_type" DEFAULT 'seite' NOT NULL,
  	"hero_primary_page_id" integer,
  	"hero_primary_url" varchar,
  	"hero_secondary_label" varchar NOT NULL,
  	"hero_secondary_link_type" "enum_startseite_hero_secondary_link_type" DEFAULT 'seite' NOT NULL,
  	"hero_secondary_page_id" integer,
  	"hero_secondary_url" varchar,
  	"garden_title" varchar,
  	"join_title" varchar,
  	"join_text" varchar,
  	"join_primary_label" varchar NOT NULL,
  	"join_primary_link_type" "enum_startseite_join_primary_link_type" DEFAULT 'seite' NOT NULL,
  	"join_primary_page_id" integer,
  	"join_primary_url" varchar,
  	"join_secondary_label" varchar NOT NULL,
  	"join_secondary_link_type" "enum_startseite_join_secondary_link_type" DEFAULT 'seite' NOT NULL,
  	"join_secondary_page_id" integer,
  	"join_secondary_url" varchar,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  ALTER TABLE "news" ADD COLUMN "category" "enum_news_category" DEFAULT 'aktuelles';
  ALTER TABLE "_news_v" ADD COLUMN "version_category" "enum__news_v_version_category" DEFAULT 'aktuelles';
  ALTER TABLE "startseite_quick_links" ADD CONSTRAINT "startseite_quick_links_page_id_seiten_id_fk" FOREIGN KEY ("page_id") REFERENCES "public"."seiten"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "startseite_quick_links" ADD CONSTRAINT "startseite_quick_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."startseite"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "startseite_garden_links" ADD CONSTRAINT "startseite_garden_links_page_id_seiten_id_fk" FOREIGN KEY ("page_id") REFERENCES "public"."seiten"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "startseite_garden_links" ADD CONSTRAINT "startseite_garden_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."startseite"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "startseite" ADD CONSTRAINT "startseite_hero_image_id_media_id_fk" FOREIGN KEY ("hero_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "startseite" ADD CONSTRAINT "startseite_hero_primary_page_id_seiten_id_fk" FOREIGN KEY ("hero_primary_page_id") REFERENCES "public"."seiten"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "startseite" ADD CONSTRAINT "startseite_hero_secondary_page_id_seiten_id_fk" FOREIGN KEY ("hero_secondary_page_id") REFERENCES "public"."seiten"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "startseite" ADD CONSTRAINT "startseite_join_primary_page_id_seiten_id_fk" FOREIGN KEY ("join_primary_page_id") REFERENCES "public"."seiten"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "startseite" ADD CONSTRAINT "startseite_join_secondary_page_id_seiten_id_fk" FOREIGN KEY ("join_secondary_page_id") REFERENCES "public"."seiten"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "startseite_quick_links_order_idx" ON "startseite_quick_links" USING btree ("_order");
  CREATE INDEX "startseite_quick_links_parent_id_idx" ON "startseite_quick_links" USING btree ("_parent_id");
  CREATE INDEX "startseite_quick_links_page_idx" ON "startseite_quick_links" USING btree ("page_id");
  CREATE INDEX "startseite_garden_links_order_idx" ON "startseite_garden_links" USING btree ("_order");
  CREATE INDEX "startseite_garden_links_parent_id_idx" ON "startseite_garden_links" USING btree ("_parent_id");
  CREATE INDEX "startseite_garden_links_page_idx" ON "startseite_garden_links" USING btree ("page_id");
  CREATE INDEX "startseite_hero_image_idx" ON "startseite" USING btree ("hero_image_id");
  CREATE INDEX "startseite_hero_primary_hero_primary_page_idx" ON "startseite" USING btree ("hero_primary_page_id");
  CREATE INDEX "startseite_hero_secondary_hero_secondary_page_idx" ON "startseite" USING btree ("hero_secondary_page_id");
  CREATE INDEX "startseite_join_primary_join_primary_page_idx" ON "startseite" USING btree ("join_primary_page_id");
  CREATE INDEX "startseite_join_secondary_join_secondary_page_idx" ON "startseite" USING btree ("join_secondary_page_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "startseite_quick_links" CASCADE;
  DROP TABLE "startseite_garden_links" CASCADE;
  DROP TABLE "startseite" CASCADE;
  ALTER TABLE "news" DROP COLUMN "category";
  ALTER TABLE "_news_v" DROP COLUMN "version_category";
  DROP TYPE "public"."enum_news_category";
  DROP TYPE "public"."enum__news_v_version_category";
  DROP TYPE "public"."enum_startseite_quick_links_icon";
  DROP TYPE "public"."enum_startseite_quick_links_link_type";
  DROP TYPE "public"."enum_startseite_garden_links_icon";
  DROP TYPE "public"."enum_startseite_garden_links_link_type";
  DROP TYPE "public"."enum_startseite_hero_primary_link_type";
  DROP TYPE "public"."enum_startseite_hero_secondary_link_type";
  DROP TYPE "public"."enum_startseite_join_primary_link_type";
  DROP TYPE "public"."enum_startseite_join_secondary_link_type";`)
}
