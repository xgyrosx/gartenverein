import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_seiten_blocks_hero_button_link_type" AS ENUM('seite', 'adresse');
  CREATE TYPE "public"."enum_seiten_blocks_bild_text_image_position" AS ENUM('links', 'rechts');
  CREATE TYPE "public"."enum_seiten_blocks_hinweisbox_variant" AS ENUM('info', 'hinweis', 'wichtig');
  CREATE TYPE "public"."enum_seiten_blocks_karten_cards_link_type" AS ENUM('seite', 'adresse');
  CREATE TYPE "public"."enum_seiten_blocks_angebotsliste_type" AS ENUM('parzelle-miete', 'haus-kauf', 'gemeinschaftsgarten');
  CREATE TYPE "public"."enum_seiten_blocks_personenraster_group" AS ENUM('vorstand', 'ansprechperson', 'ehrenmitglied');
  CREATE TYPE "public"."enum_seiten_blocks_dokumentenliste_category" AS ENUM('formular', 'reglement', 'information');
  CREATE TYPE "public"."enum_seiten_blocks_naechste_termine_category" AS ENUM('kurs', 'anlass', 'arbeitseinsatz', 'betrieb');
  CREATE TYPE "public"."enum_seiten_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__seiten_v_blocks_hero_button_link_type" AS ENUM('seite', 'adresse');
  CREATE TYPE "public"."enum__seiten_v_blocks_bild_text_image_position" AS ENUM('links', 'rechts');
  CREATE TYPE "public"."enum__seiten_v_blocks_hinweisbox_variant" AS ENUM('info', 'hinweis', 'wichtig');
  CREATE TYPE "public"."enum__seiten_v_blocks_karten_cards_link_type" AS ENUM('seite', 'adresse');
  CREATE TYPE "public"."enum__seiten_v_blocks_angebotsliste_type" AS ENUM('parzelle-miete', 'haus-kauf', 'gemeinschaftsgarten');
  CREATE TYPE "public"."enum__seiten_v_blocks_personenraster_group" AS ENUM('vorstand', 'ansprechperson', 'ehrenmitglied');
  CREATE TYPE "public"."enum__seiten_v_blocks_dokumentenliste_category" AS ENUM('formular', 'reglement', 'information');
  CREATE TYPE "public"."enum__seiten_v_blocks_naechste_termine_category" AS ENUM('kurs', 'anlass', 'arbeitseinsatz', 'betrieb');
  CREATE TYPE "public"."enum__seiten_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_news_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__news_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_termine_category" AS ENUM('kurs', 'anlass', 'arbeitseinsatz', 'betrieb');
  CREATE TYPE "public"."enum_termine_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__termine_v_version_category" AS ENUM('kurs', 'anlass', 'arbeitseinsatz', 'betrieb');
  CREATE TYPE "public"."enum__termine_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_alben_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__alben_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_areale_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__areale_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_personen_group" AS ENUM('vorstand', 'ansprechperson', 'ehrenmitglied');
  CREATE TYPE "public"."enum_personen_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__personen_v_version_group" AS ENUM('vorstand', 'ansprechperson', 'ehrenmitglied');
  CREATE TYPE "public"."enum__personen_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_ratgeber_months" AS ENUM('1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12');
  CREATE TYPE "public"."enum_ratgeber_category" AS ENUM('boden-duengen', 'pflanzen-ernte', 'unkraut', 'tiere-insekten', 'beeren', 'allgemein');
  CREATE TYPE "public"."enum_ratgeber_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__ratgeber_v_version_months" AS ENUM('1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12');
  CREATE TYPE "public"."enum__ratgeber_v_version_category" AS ENUM('boden-duengen', 'pflanzen-ernte', 'unkraut', 'tiere-insekten', 'beeren', 'allgemein');
  CREATE TYPE "public"."enum__ratgeber_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_gartenangebote_type" AS ENUM('parzelle-miete', 'haus-kauf', 'gemeinschaftsgarten');
  CREATE TYPE "public"."enum_gartenangebote_verfuegbarkeit" AS ENUM('verfuegbar', 'warteliste', 'ausgebucht');
  CREATE TYPE "public"."enum_gartenangebote_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__gartenangebote_v_version_type" AS ENUM('parzelle-miete', 'haus-kauf', 'gemeinschaftsgarten');
  CREATE TYPE "public"."enum__gartenangebote_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_dokumente_category" AS ENUM('formular', 'reglement', 'information');
  CREATE TYPE "public"."enum_dokumente_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__dokumente_v_version_category" AS ENUM('formular', 'reglement', 'information');
  CREATE TYPE "public"."enum__dokumente_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_users_role" AS ENUM('admin', 'redaktion');
  CREATE TYPE "public"."enum_redirects_to_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_navigation_items_children_link_type" AS ENUM('seite', 'adresse');
  CREATE TYPE "public"."enum_navigation_items_link_type" AS ENUM('seite', 'adresse');
  CREATE TYPE "public"."enum_hinweisbanner_type" AS ENUM('info', 'warnung');
  CREATE TYPE "public"."enum_hinweisbanner_link_link_type" AS ENUM('seite', 'adresse');
  CREATE TYPE "public"."enum_fusszeile_legal_links_link_type" AS ENUM('seite', 'adresse');
  CREATE TYPE "public"."enum_fusszeile_partner_links_link_type" AS ENUM('seite', 'adresse');
  CREATE TYPE "public"."enum_oeffnungszeiten_regular_day" AS ENUM('mo', 'di', 'mi', 'do', 'fr', 'sa', 'so');
  CREATE TABLE "seiten_blocks_hero" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"subtitle" varchar,
  	"image_id" integer,
  	"has_button" boolean DEFAULT false,
  	"button_label" varchar,
  	"button_link_type" "enum_seiten_blocks_hero_button_link_type" DEFAULT 'seite',
  	"button_page_id" integer,
  	"button_url" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "seiten_blocks_text" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"content" jsonb,
  	"block_name" varchar
  );
  
  CREATE TABLE "seiten_blocks_bild_text" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"image_position" "enum_seiten_blocks_bild_text_image_position" DEFAULT 'links',
  	"content" jsonb,
  	"block_name" varchar
  );
  
  CREATE TABLE "seiten_blocks_hinweisbox" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"variant" "enum_seiten_blocks_hinweisbox_variant" DEFAULT 'info',
  	"title" varchar,
  	"content" jsonb,
  	"block_name" varchar
  );
  
  CREATE TABLE "seiten_blocks_karten_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"text" varchar,
  	"label" varchar,
  	"link_type" "enum_seiten_blocks_karten_cards_link_type" DEFAULT 'seite',
  	"page_id" integer,
  	"url" varchar
  );
  
  CREATE TABLE "seiten_blocks_karten" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "seiten_blocks_ablauf_steps" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"text" varchar
  );
  
  CREATE TABLE "seiten_blocks_ablauf" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar DEFAULT 'So funktioniert es',
  	"block_name" varchar
  );
  
  CREATE TABLE "seiten_blocks_preistabelle" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar DEFAULT 'Kosten',
  	"block_name" varchar
  );
  
  CREATE TABLE "seiten_blocks_angebotsliste" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar DEFAULT 'Aktuelle Angebote',
  	"type" "enum_seiten_blocks_angebotsliste_type",
  	"block_name" varchar
  );
  
  CREATE TABLE "seiten_blocks_personenraster" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"group" "enum_seiten_blocks_personenraster_group",
  	"block_name" varchar
  );
  
  CREATE TABLE "seiten_blocks_oeffnungszeiten" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar DEFAULT 'Öffnungszeiten',
  	"block_name" varchar
  );
  
  CREATE TABLE "seiten_blocks_kontakt" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar DEFAULT 'So erreichen Sie uns',
  	"block_name" varchar
  );
  
  CREATE TABLE "seiten_blocks_tabelle_rows" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"a" varchar,
  	"b" varchar,
  	"c" varchar
  );
  
  CREATE TABLE "seiten_blocks_tabelle" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"col1" varchar DEFAULT 'Leistung',
  	"col2" varchar DEFAULT 'Preis',
  	"col3" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "seiten_blocks_akkordeon_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"content" jsonb
  );
  
  CREATE TABLE "seiten_blocks_akkordeon" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "seiten_blocks_dokumentenliste" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar DEFAULT 'Dokumente',
  	"category" "enum_seiten_blocks_dokumentenliste_category",
  	"block_name" varchar
  );
  
  CREATE TABLE "seiten_blocks_neue_news" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar DEFAULT 'Neueste News',
  	"count" numeric DEFAULT 3,
  	"block_name" varchar
  );
  
  CREATE TABLE "seiten_blocks_naechste_termine" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar DEFAULT 'Nächste Termine',
  	"count" numeric DEFAULT 3,
  	"category" "enum_seiten_blocks_naechste_termine_category",
  	"block_name" varchar
  );
  
  CREATE TABLE "seiten_blocks_diesen_monat" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar DEFAULT 'Diesen Monat im Garten',
  	"count" numeric DEFAULT 3,
  	"block_name" varchar
  );
  
  CREATE TABLE "seiten" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"slug" varchar,
  	"meta_title" varchar,
  	"meta_description" varchar,
  	"meta_image_id" integer,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_seiten_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "_seiten_v_blocks_hero" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"subtitle" varchar,
  	"image_id" integer,
  	"has_button" boolean DEFAULT false,
  	"button_label" varchar,
  	"button_link_type" "enum__seiten_v_blocks_hero_button_link_type" DEFAULT 'seite',
  	"button_page_id" integer,
  	"button_url" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_seiten_v_blocks_text" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"content" jsonb,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_seiten_v_blocks_bild_text" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"image_position" "enum__seiten_v_blocks_bild_text_image_position" DEFAULT 'links',
  	"content" jsonb,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_seiten_v_blocks_hinweisbox" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"variant" "enum__seiten_v_blocks_hinweisbox_variant" DEFAULT 'info',
  	"title" varchar,
  	"content" jsonb,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_seiten_v_blocks_karten_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"text" varchar,
  	"label" varchar,
  	"link_type" "enum__seiten_v_blocks_karten_cards_link_type" DEFAULT 'seite',
  	"page_id" integer,
  	"url" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_seiten_v_blocks_karten" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_seiten_v_blocks_ablauf_steps" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"text" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_seiten_v_blocks_ablauf" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar DEFAULT 'So funktioniert es',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_seiten_v_blocks_preistabelle" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar DEFAULT 'Kosten',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_seiten_v_blocks_angebotsliste" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar DEFAULT 'Aktuelle Angebote',
  	"type" "enum__seiten_v_blocks_angebotsliste_type",
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_seiten_v_blocks_personenraster" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"group" "enum__seiten_v_blocks_personenraster_group",
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_seiten_v_blocks_oeffnungszeiten" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar DEFAULT 'Öffnungszeiten',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_seiten_v_blocks_kontakt" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar DEFAULT 'So erreichen Sie uns',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_seiten_v_blocks_tabelle_rows" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"a" varchar,
  	"b" varchar,
  	"c" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_seiten_v_blocks_tabelle" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"col1" varchar DEFAULT 'Leistung',
  	"col2" varchar DEFAULT 'Preis',
  	"col3" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_seiten_v_blocks_akkordeon_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"content" jsonb,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_seiten_v_blocks_akkordeon" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_seiten_v_blocks_dokumentenliste" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar DEFAULT 'Dokumente',
  	"category" "enum__seiten_v_blocks_dokumentenliste_category",
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_seiten_v_blocks_neue_news" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar DEFAULT 'Neueste News',
  	"count" numeric DEFAULT 3,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_seiten_v_blocks_naechste_termine" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar DEFAULT 'Nächste Termine',
  	"count" numeric DEFAULT 3,
  	"category" "enum__seiten_v_blocks_naechste_termine_category",
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_seiten_v_blocks_diesen_monat" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar DEFAULT 'Diesen Monat im Garten',
  	"count" numeric DEFAULT 3,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_seiten_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_title" varchar,
  	"version_slug" varchar,
  	"version_meta_title" varchar,
  	"version_meta_description" varchar,
  	"version_meta_image_id" integer,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__seiten_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean
  );
  
  CREATE TABLE "news" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"slug" varchar,
  	"published_at" timestamp(3) with time zone,
  	"teaser" varchar,
  	"image_id" integer,
  	"image_caption" varchar,
  	"content" jsonb,
  	"meta_title" varchar,
  	"meta_description" varchar,
  	"meta_image_id" integer,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_news_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "_news_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_title" varchar,
  	"version_slug" varchar,
  	"version_published_at" timestamp(3) with time zone,
  	"version_teaser" varchar,
  	"version_image_id" integer,
  	"version_image_caption" varchar,
  	"version_content" jsonb,
  	"version_meta_title" varchar,
  	"version_meta_description" varchar,
  	"version_meta_image_id" integer,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__news_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean
  );
  
  CREATE TABLE "termine" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"slug" varchar,
  	"category" "enum_termine_category" DEFAULT 'anlass',
  	"start_date" timestamp(3) with time zone,
  	"end_date" timestamp(3) with time zone,
  	"areal_id" integer,
  	"location" varchar,
  	"registration_required" boolean DEFAULT false,
  	"registration_text" varchar,
  	"registration_url" varchar,
  	"attachment_id" integer,
  	"description" jsonb,
  	"meta_title" varchar,
  	"meta_description" varchar,
  	"meta_image_id" integer,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_termine_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "_termine_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_title" varchar,
  	"version_slug" varchar,
  	"version_category" "enum__termine_v_version_category" DEFAULT 'anlass',
  	"version_start_date" timestamp(3) with time zone,
  	"version_end_date" timestamp(3) with time zone,
  	"version_areal_id" integer,
  	"version_location" varchar,
  	"version_registration_required" boolean DEFAULT false,
  	"version_registration_text" varchar,
  	"version_registration_url" varchar,
  	"version_attachment_id" integer,
  	"version_description" jsonb,
  	"version_meta_title" varchar,
  	"version_meta_description" varchar,
  	"version_meta_image_id" integer,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__termine_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean
  );
  
  CREATE TABLE "alben" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"slug" varchar,
  	"year" numeric,
  	"date" timestamp(3) with time zone,
  	"description" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_alben_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "alben_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"media_id" integer
  );
  
  CREATE TABLE "_alben_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_title" varchar,
  	"version_slug" varchar,
  	"version_year" numeric,
  	"version_date" timestamp(3) with time zone,
  	"version_description" varchar,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__alben_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean
  );
  
  CREATE TABLE "_alben_v_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"media_id" integer
  );
  
  CREATE TABLE "areale" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"slug" varchar,
  	"summary" varchar,
  	"street" varchar,
  	"zip" varchar,
  	"city" varchar,
  	"latitude" numeric,
  	"longitude" numeric,
  	"parking" varchar,
  	"content" jsonb,
  	"meta_title" varchar,
  	"meta_description" varchar,
  	"meta_image_id" integer,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_areale_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "areale_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"media_id" integer
  );
  
  CREATE TABLE "_areale_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_name" varchar,
  	"version_slug" varchar,
  	"version_summary" varchar,
  	"version_street" varchar,
  	"version_zip" varchar,
  	"version_city" varchar,
  	"version_latitude" numeric,
  	"version_longitude" numeric,
  	"version_parking" varchar,
  	"version_content" jsonb,
  	"version_meta_title" varchar,
  	"version_meta_description" varchar,
  	"version_meta_image_id" integer,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__areale_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean
  );
  
  CREATE TABLE "_areale_v_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"media_id" integer
  );
  
  CREATE TABLE "personen" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"role" varchar,
  	"group" "enum_personen_group" DEFAULT 'vorstand',
  	"photo_id" integer,
  	"contact" varchar,
  	"sort" numeric DEFAULT 100,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_personen_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "_personen_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_name" varchar,
  	"version_role" varchar,
  	"version_group" "enum__personen_v_version_group" DEFAULT 'vorstand',
  	"version_photo_id" integer,
  	"version_contact" varchar,
  	"version_sort" numeric DEFAULT 100,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__personen_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean
  );
  
  CREATE TABLE "ratgeber_months" (
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"value" "enum_ratgeber_months",
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "ratgeber" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"slug" varchar,
  	"category" "enum_ratgeber_category" DEFAULT 'allgemein',
  	"teaser" varchar,
  	"image_id" integer,
  	"content" jsonb,
  	"meta_title" varchar,
  	"meta_description" varchar,
  	"meta_image_id" integer,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_ratgeber_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "ratgeber_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"ratgeber_id" integer
  );
  
  CREATE TABLE "_ratgeber_v_version_months" (
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"value" "enum__ratgeber_v_version_months",
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "_ratgeber_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_title" varchar,
  	"version_slug" varchar,
  	"version_category" "enum__ratgeber_v_version_category" DEFAULT 'allgemein',
  	"version_teaser" varchar,
  	"version_image_id" integer,
  	"version_content" jsonb,
  	"version_meta_title" varchar,
  	"version_meta_description" varchar,
  	"version_meta_image_id" integer,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__ratgeber_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean
  );
  
  CREATE TABLE "_ratgeber_v_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"ratgeber_id" integer
  );
  
  CREATE TABLE "gartenangebote" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"type" "enum_gartenangebote_type" DEFAULT 'parzelle-miete',
  	"status" "enum_gartenangebote_verfuegbarkeit" DEFAULT 'verfuegbar',
  	"area" numeric,
  	"areal_id" integer,
  	"hinweis" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_gartenangebote_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "_gartenangebote_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_title" varchar,
  	"version_type" "enum__gartenangebote_v_version_type" DEFAULT 'parzelle-miete',
  	"version_status" "enum_gartenangebote_verfuegbarkeit" DEFAULT 'verfuegbar',
  	"version_area" numeric,
  	"version_areal_id" integer,
  	"version_hinweis" varchar,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__gartenangebote_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean
  );
  
  CREATE TABLE "dokumente" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"category" "enum_dokumente_category" DEFAULT 'information',
  	"version" varchar,
  	"valid_until" timestamp(3) with time zone,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_dokumente_status" DEFAULT 'draft',
  	"url" varchar,
  	"thumbnail_u_r_l" varchar,
  	"filename" varchar,
  	"mime_type" varchar,
  	"filesize" numeric,
  	"width" numeric,
  	"height" numeric,
  	"focal_x" numeric,
  	"focal_y" numeric
  );
  
  CREATE TABLE "_dokumente_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_title" varchar,
  	"version_category" "enum__dokumente_v_version_category" DEFAULT 'information',
  	"version_version" varchar,
  	"version_valid_until" timestamp(3) with time zone,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__dokumente_v_version_status" DEFAULT 'draft',
  	"version_url" varchar,
  	"version_thumbnail_u_r_l" varchar,
  	"version_filename" varchar,
  	"version_mime_type" varchar,
  	"version_filesize" numeric,
  	"version_width" numeric,
  	"version_height" numeric,
  	"version_focal_x" numeric,
  	"version_focal_y" numeric,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean
  );
  
  CREATE TABLE "media" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"alt" varchar NOT NULL,
  	"credit" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"url" varchar,
  	"thumbnail_u_r_l" varchar,
  	"filename" varchar,
  	"mime_type" varchar,
  	"filesize" numeric,
  	"width" numeric,
  	"height" numeric,
  	"focal_x" numeric,
  	"focal_y" numeric,
  	"sizes_thumbnail_url" varchar,
  	"sizes_thumbnail_width" numeric,
  	"sizes_thumbnail_height" numeric,
  	"sizes_thumbnail_mime_type" varchar,
  	"sizes_thumbnail_filesize" numeric,
  	"sizes_thumbnail_filename" varchar,
  	"sizes_karte_url" varchar,
  	"sizes_karte_width" numeric,
  	"sizes_karte_height" numeric,
  	"sizes_karte_mime_type" varchar,
  	"sizes_karte_filesize" numeric,
  	"sizes_karte_filename" varchar,
  	"sizes_gross_url" varchar,
  	"sizes_gross_width" numeric,
  	"sizes_gross_height" numeric,
  	"sizes_gross_mime_type" varchar,
  	"sizes_gross_filesize" numeric,
  	"sizes_gross_filename" varchar
  );
  
  CREATE TABLE "users_sessions" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"created_at" timestamp(3) with time zone,
  	"expires_at" timestamp(3) with time zone NOT NULL
  );
  
  CREATE TABLE "users" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"role" "enum_users_role" DEFAULT 'redaktion' NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"email" varchar NOT NULL,
  	"reset_password_token" varchar,
  	"reset_password_expiration" timestamp(3) with time zone,
  	"salt" varchar,
  	"hash" varchar,
  	"reset_password_requested_at" timestamp(3) with time zone,
  	"login_attempts" numeric DEFAULT 0,
  	"lock_until" timestamp(3) with time zone
  );
  
  CREATE TABLE "suche" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"priority" numeric,
  	"teaser" varchar,
  	"path" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "suche_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"ratgeber_id" integer,
  	"seiten_id" integer
  );
  
  CREATE TABLE "redirects" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"from" varchar NOT NULL,
  	"to_type" "enum_redirects_to_type" DEFAULT 'reference',
  	"to_url" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "redirects_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"seiten_id" integer,
  	"news_id" integer,
  	"termine_id" integer,
  	"areale_id" integer,
  	"ratgeber_id" integer
  );
  
  CREATE TABLE "payload_kv" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar NOT NULL,
  	"data" jsonb NOT NULL
  );
  
  CREATE TABLE "payload_locked_documents" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"global_slug" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_locked_documents_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"seiten_id" integer,
  	"news_id" integer,
  	"termine_id" integer,
  	"alben_id" integer,
  	"areale_id" integer,
  	"personen_id" integer,
  	"ratgeber_id" integer,
  	"gartenangebote_id" integer,
  	"dokumente_id" integer,
  	"media_id" integer,
  	"users_id" integer,
  	"suche_id" integer,
  	"redirects_id" integer
  );
  
  CREATE TABLE "payload_preferences" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar,
  	"value" jsonb,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_preferences_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"users_id" integer
  );
  
  CREATE TABLE "payload_migrations" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"batch" numeric,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "navigation_items_children" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"link_type" "enum_navigation_items_children_link_type" DEFAULT 'seite',
  	"page_id" integer,
  	"url" varchar
  );
  
  CREATE TABLE "navigation_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL,
  	"link_type" "enum_navigation_items_link_type" DEFAULT 'seite' NOT NULL,
  	"page_id" integer,
  	"url" varchar,
  	"highlight" boolean DEFAULT false
  );
  
  CREATE TABLE "navigation" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "hinweisbanner" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"enabled" boolean DEFAULT false,
  	"type" "enum_hinweisbanner_type" DEFAULT 'info' NOT NULL,
  	"text" varchar,
  	"visible_from" timestamp(3) with time zone,
  	"visible_until" timestamp(3) with time zone,
  	"has_link" boolean DEFAULT false,
  	"link_label" varchar,
  	"link_link_type" "enum_hinweisbanner_link_link_type" DEFAULT 'seite',
  	"link_page_id" integer,
  	"link_url" varchar,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "fusszeile_legal_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL,
  	"link_type" "enum_fusszeile_legal_links_link_type" DEFAULT 'seite' NOT NULL,
  	"page_id" integer,
  	"url" varchar
  );
  
  CREATE TABLE "fusszeile_partner_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL,
  	"link_type" "enum_fusszeile_partner_links_link_type" DEFAULT 'seite' NOT NULL,
  	"page_id" integer,
  	"url" varchar
  );
  
  CREATE TABLE "fusszeile" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"text" varchar,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "vereinsdaten" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar DEFAULT 'Gartenverein' NOT NULL,
  	"logo_id" integer,
  	"street" varchar,
  	"zip" varchar,
  	"city" varchar,
  	"email" varchar,
  	"phone" varchar,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "konditionen_pachtarten" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"from" numeric NOT NULL,
  	"to" numeric,
  	"note" varchar
  );
  
  CREATE TABLE "konditionen" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"entry_fee" numeric,
  	"deposit" numeric,
  	"note" varchar,
  	"is_example" boolean DEFAULT true,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "oeffnungszeiten_regular" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"day" "enum_oeffnungszeiten_regular_day" NOT NULL,
  	"from" varchar,
  	"to" varchar,
  	"note" varchar
  );
  
  CREATE TABLE "oeffnungszeiten_exceptions" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"date" timestamp(3) with time zone NOT NULL,
  	"closed" boolean DEFAULT true,
  	"from" varchar,
  	"to" varchar,
  	"note" varchar
  );
  
  CREATE TABLE "oeffnungszeiten" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"general_note" varchar,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  ALTER TABLE "seiten_blocks_hero" ADD CONSTRAINT "seiten_blocks_hero_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "seiten_blocks_hero" ADD CONSTRAINT "seiten_blocks_hero_button_page_id_seiten_id_fk" FOREIGN KEY ("button_page_id") REFERENCES "public"."seiten"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "seiten_blocks_hero" ADD CONSTRAINT "seiten_blocks_hero_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."seiten"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "seiten_blocks_text" ADD CONSTRAINT "seiten_blocks_text_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."seiten"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "seiten_blocks_bild_text" ADD CONSTRAINT "seiten_blocks_bild_text_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "seiten_blocks_bild_text" ADD CONSTRAINT "seiten_blocks_bild_text_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."seiten"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "seiten_blocks_hinweisbox" ADD CONSTRAINT "seiten_blocks_hinweisbox_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."seiten"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "seiten_blocks_karten_cards" ADD CONSTRAINT "seiten_blocks_karten_cards_page_id_seiten_id_fk" FOREIGN KEY ("page_id") REFERENCES "public"."seiten"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "seiten_blocks_karten_cards" ADD CONSTRAINT "seiten_blocks_karten_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."seiten_blocks_karten"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "seiten_blocks_karten" ADD CONSTRAINT "seiten_blocks_karten_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."seiten"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "seiten_blocks_ablauf_steps" ADD CONSTRAINT "seiten_blocks_ablauf_steps_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."seiten_blocks_ablauf"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "seiten_blocks_ablauf" ADD CONSTRAINT "seiten_blocks_ablauf_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."seiten"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "seiten_blocks_preistabelle" ADD CONSTRAINT "seiten_blocks_preistabelle_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."seiten"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "seiten_blocks_angebotsliste" ADD CONSTRAINT "seiten_blocks_angebotsliste_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."seiten"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "seiten_blocks_personenraster" ADD CONSTRAINT "seiten_blocks_personenraster_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."seiten"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "seiten_blocks_oeffnungszeiten" ADD CONSTRAINT "seiten_blocks_oeffnungszeiten_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."seiten"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "seiten_blocks_kontakt" ADD CONSTRAINT "seiten_blocks_kontakt_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."seiten"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "seiten_blocks_tabelle_rows" ADD CONSTRAINT "seiten_blocks_tabelle_rows_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."seiten_blocks_tabelle"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "seiten_blocks_tabelle" ADD CONSTRAINT "seiten_blocks_tabelle_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."seiten"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "seiten_blocks_akkordeon_items" ADD CONSTRAINT "seiten_blocks_akkordeon_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."seiten_blocks_akkordeon"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "seiten_blocks_akkordeon" ADD CONSTRAINT "seiten_blocks_akkordeon_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."seiten"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "seiten_blocks_dokumentenliste" ADD CONSTRAINT "seiten_blocks_dokumentenliste_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."seiten"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "seiten_blocks_neue_news" ADD CONSTRAINT "seiten_blocks_neue_news_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."seiten"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "seiten_blocks_naechste_termine" ADD CONSTRAINT "seiten_blocks_naechste_termine_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."seiten"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "seiten_blocks_diesen_monat" ADD CONSTRAINT "seiten_blocks_diesen_monat_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."seiten"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "seiten" ADD CONSTRAINT "seiten_meta_image_id_media_id_fk" FOREIGN KEY ("meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_seiten_v_blocks_hero" ADD CONSTRAINT "_seiten_v_blocks_hero_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_seiten_v_blocks_hero" ADD CONSTRAINT "_seiten_v_blocks_hero_button_page_id_seiten_id_fk" FOREIGN KEY ("button_page_id") REFERENCES "public"."seiten"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_seiten_v_blocks_hero" ADD CONSTRAINT "_seiten_v_blocks_hero_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_seiten_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_seiten_v_blocks_text" ADD CONSTRAINT "_seiten_v_blocks_text_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_seiten_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_seiten_v_blocks_bild_text" ADD CONSTRAINT "_seiten_v_blocks_bild_text_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_seiten_v_blocks_bild_text" ADD CONSTRAINT "_seiten_v_blocks_bild_text_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_seiten_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_seiten_v_blocks_hinweisbox" ADD CONSTRAINT "_seiten_v_blocks_hinweisbox_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_seiten_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_seiten_v_blocks_karten_cards" ADD CONSTRAINT "_seiten_v_blocks_karten_cards_page_id_seiten_id_fk" FOREIGN KEY ("page_id") REFERENCES "public"."seiten"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_seiten_v_blocks_karten_cards" ADD CONSTRAINT "_seiten_v_blocks_karten_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_seiten_v_blocks_karten"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_seiten_v_blocks_karten" ADD CONSTRAINT "_seiten_v_blocks_karten_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_seiten_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_seiten_v_blocks_ablauf_steps" ADD CONSTRAINT "_seiten_v_blocks_ablauf_steps_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_seiten_v_blocks_ablauf"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_seiten_v_blocks_ablauf" ADD CONSTRAINT "_seiten_v_blocks_ablauf_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_seiten_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_seiten_v_blocks_preistabelle" ADD CONSTRAINT "_seiten_v_blocks_preistabelle_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_seiten_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_seiten_v_blocks_angebotsliste" ADD CONSTRAINT "_seiten_v_blocks_angebotsliste_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_seiten_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_seiten_v_blocks_personenraster" ADD CONSTRAINT "_seiten_v_blocks_personenraster_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_seiten_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_seiten_v_blocks_oeffnungszeiten" ADD CONSTRAINT "_seiten_v_blocks_oeffnungszeiten_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_seiten_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_seiten_v_blocks_kontakt" ADD CONSTRAINT "_seiten_v_blocks_kontakt_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_seiten_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_seiten_v_blocks_tabelle_rows" ADD CONSTRAINT "_seiten_v_blocks_tabelle_rows_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_seiten_v_blocks_tabelle"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_seiten_v_blocks_tabelle" ADD CONSTRAINT "_seiten_v_blocks_tabelle_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_seiten_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_seiten_v_blocks_akkordeon_items" ADD CONSTRAINT "_seiten_v_blocks_akkordeon_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_seiten_v_blocks_akkordeon"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_seiten_v_blocks_akkordeon" ADD CONSTRAINT "_seiten_v_blocks_akkordeon_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_seiten_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_seiten_v_blocks_dokumentenliste" ADD CONSTRAINT "_seiten_v_blocks_dokumentenliste_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_seiten_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_seiten_v_blocks_neue_news" ADD CONSTRAINT "_seiten_v_blocks_neue_news_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_seiten_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_seiten_v_blocks_naechste_termine" ADD CONSTRAINT "_seiten_v_blocks_naechste_termine_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_seiten_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_seiten_v_blocks_diesen_monat" ADD CONSTRAINT "_seiten_v_blocks_diesen_monat_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_seiten_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_seiten_v" ADD CONSTRAINT "_seiten_v_parent_id_seiten_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."seiten"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_seiten_v" ADD CONSTRAINT "_seiten_v_version_meta_image_id_media_id_fk" FOREIGN KEY ("version_meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "news" ADD CONSTRAINT "news_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "news" ADD CONSTRAINT "news_meta_image_id_media_id_fk" FOREIGN KEY ("meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_news_v" ADD CONSTRAINT "_news_v_parent_id_news_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."news"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_news_v" ADD CONSTRAINT "_news_v_version_image_id_media_id_fk" FOREIGN KEY ("version_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_news_v" ADD CONSTRAINT "_news_v_version_meta_image_id_media_id_fk" FOREIGN KEY ("version_meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "termine" ADD CONSTRAINT "termine_areal_id_areale_id_fk" FOREIGN KEY ("areal_id") REFERENCES "public"."areale"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "termine" ADD CONSTRAINT "termine_attachment_id_dokumente_id_fk" FOREIGN KEY ("attachment_id") REFERENCES "public"."dokumente"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "termine" ADD CONSTRAINT "termine_meta_image_id_media_id_fk" FOREIGN KEY ("meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_termine_v" ADD CONSTRAINT "_termine_v_parent_id_termine_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."termine"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_termine_v" ADD CONSTRAINT "_termine_v_version_areal_id_areale_id_fk" FOREIGN KEY ("version_areal_id") REFERENCES "public"."areale"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_termine_v" ADD CONSTRAINT "_termine_v_version_attachment_id_dokumente_id_fk" FOREIGN KEY ("version_attachment_id") REFERENCES "public"."dokumente"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_termine_v" ADD CONSTRAINT "_termine_v_version_meta_image_id_media_id_fk" FOREIGN KEY ("version_meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "alben_rels" ADD CONSTRAINT "alben_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."alben"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "alben_rels" ADD CONSTRAINT "alben_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_alben_v" ADD CONSTRAINT "_alben_v_parent_id_alben_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."alben"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_alben_v_rels" ADD CONSTRAINT "_alben_v_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_alben_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_alben_v_rels" ADD CONSTRAINT "_alben_v_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "areale" ADD CONSTRAINT "areale_meta_image_id_media_id_fk" FOREIGN KEY ("meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "areale_rels" ADD CONSTRAINT "areale_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."areale"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "areale_rels" ADD CONSTRAINT "areale_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_areale_v" ADD CONSTRAINT "_areale_v_parent_id_areale_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."areale"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_areale_v" ADD CONSTRAINT "_areale_v_version_meta_image_id_media_id_fk" FOREIGN KEY ("version_meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_areale_v_rels" ADD CONSTRAINT "_areale_v_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_areale_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_areale_v_rels" ADD CONSTRAINT "_areale_v_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "personen" ADD CONSTRAINT "personen_photo_id_media_id_fk" FOREIGN KEY ("photo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_personen_v" ADD CONSTRAINT "_personen_v_parent_id_personen_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."personen"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_personen_v" ADD CONSTRAINT "_personen_v_version_photo_id_media_id_fk" FOREIGN KEY ("version_photo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "ratgeber_months" ADD CONSTRAINT "ratgeber_months_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."ratgeber"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "ratgeber" ADD CONSTRAINT "ratgeber_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "ratgeber" ADD CONSTRAINT "ratgeber_meta_image_id_media_id_fk" FOREIGN KEY ("meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "ratgeber_rels" ADD CONSTRAINT "ratgeber_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."ratgeber"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "ratgeber_rels" ADD CONSTRAINT "ratgeber_rels_ratgeber_fk" FOREIGN KEY ("ratgeber_id") REFERENCES "public"."ratgeber"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_ratgeber_v_version_months" ADD CONSTRAINT "_ratgeber_v_version_months_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_ratgeber_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_ratgeber_v" ADD CONSTRAINT "_ratgeber_v_parent_id_ratgeber_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."ratgeber"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_ratgeber_v" ADD CONSTRAINT "_ratgeber_v_version_image_id_media_id_fk" FOREIGN KEY ("version_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_ratgeber_v" ADD CONSTRAINT "_ratgeber_v_version_meta_image_id_media_id_fk" FOREIGN KEY ("version_meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_ratgeber_v_rels" ADD CONSTRAINT "_ratgeber_v_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_ratgeber_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_ratgeber_v_rels" ADD CONSTRAINT "_ratgeber_v_rels_ratgeber_fk" FOREIGN KEY ("ratgeber_id") REFERENCES "public"."ratgeber"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "gartenangebote" ADD CONSTRAINT "gartenangebote_areal_id_areale_id_fk" FOREIGN KEY ("areal_id") REFERENCES "public"."areale"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_gartenangebote_v" ADD CONSTRAINT "_gartenangebote_v_parent_id_gartenangebote_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."gartenangebote"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_gartenangebote_v" ADD CONSTRAINT "_gartenangebote_v_version_areal_id_areale_id_fk" FOREIGN KEY ("version_areal_id") REFERENCES "public"."areale"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_dokumente_v" ADD CONSTRAINT "_dokumente_v_parent_id_dokumente_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."dokumente"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "users_sessions" ADD CONSTRAINT "users_sessions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "suche_rels" ADD CONSTRAINT "suche_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."suche"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "suche_rels" ADD CONSTRAINT "suche_rels_ratgeber_fk" FOREIGN KEY ("ratgeber_id") REFERENCES "public"."ratgeber"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "suche_rels" ADD CONSTRAINT "suche_rels_seiten_fk" FOREIGN KEY ("seiten_id") REFERENCES "public"."seiten"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "redirects_rels" ADD CONSTRAINT "redirects_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."redirects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "redirects_rels" ADD CONSTRAINT "redirects_rels_seiten_fk" FOREIGN KEY ("seiten_id") REFERENCES "public"."seiten"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "redirects_rels" ADD CONSTRAINT "redirects_rels_news_fk" FOREIGN KEY ("news_id") REFERENCES "public"."news"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "redirects_rels" ADD CONSTRAINT "redirects_rels_termine_fk" FOREIGN KEY ("termine_id") REFERENCES "public"."termine"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "redirects_rels" ADD CONSTRAINT "redirects_rels_areale_fk" FOREIGN KEY ("areale_id") REFERENCES "public"."areale"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "redirects_rels" ADD CONSTRAINT "redirects_rels_ratgeber_fk" FOREIGN KEY ("ratgeber_id") REFERENCES "public"."ratgeber"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_locked_documents"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_seiten_fk" FOREIGN KEY ("seiten_id") REFERENCES "public"."seiten"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_news_fk" FOREIGN KEY ("news_id") REFERENCES "public"."news"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_termine_fk" FOREIGN KEY ("termine_id") REFERENCES "public"."termine"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_alben_fk" FOREIGN KEY ("alben_id") REFERENCES "public"."alben"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_areale_fk" FOREIGN KEY ("areale_id") REFERENCES "public"."areale"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_personen_fk" FOREIGN KEY ("personen_id") REFERENCES "public"."personen"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_ratgeber_fk" FOREIGN KEY ("ratgeber_id") REFERENCES "public"."ratgeber"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_gartenangebote_fk" FOREIGN KEY ("gartenangebote_id") REFERENCES "public"."gartenangebote"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_dokumente_fk" FOREIGN KEY ("dokumente_id") REFERENCES "public"."dokumente"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_suche_fk" FOREIGN KEY ("suche_id") REFERENCES "public"."suche"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_redirects_fk" FOREIGN KEY ("redirects_id") REFERENCES "public"."redirects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_preferences"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "navigation_items_children" ADD CONSTRAINT "navigation_items_children_page_id_seiten_id_fk" FOREIGN KEY ("page_id") REFERENCES "public"."seiten"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "navigation_items_children" ADD CONSTRAINT "navigation_items_children_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."navigation_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "navigation_items" ADD CONSTRAINT "navigation_items_page_id_seiten_id_fk" FOREIGN KEY ("page_id") REFERENCES "public"."seiten"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "navigation_items" ADD CONSTRAINT "navigation_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."navigation"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "hinweisbanner" ADD CONSTRAINT "hinweisbanner_link_page_id_seiten_id_fk" FOREIGN KEY ("link_page_id") REFERENCES "public"."seiten"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "fusszeile_legal_links" ADD CONSTRAINT "fusszeile_legal_links_page_id_seiten_id_fk" FOREIGN KEY ("page_id") REFERENCES "public"."seiten"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "fusszeile_legal_links" ADD CONSTRAINT "fusszeile_legal_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."fusszeile"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "fusszeile_partner_links" ADD CONSTRAINT "fusszeile_partner_links_page_id_seiten_id_fk" FOREIGN KEY ("page_id") REFERENCES "public"."seiten"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "fusszeile_partner_links" ADD CONSTRAINT "fusszeile_partner_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."fusszeile"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "vereinsdaten" ADD CONSTRAINT "vereinsdaten_logo_id_media_id_fk" FOREIGN KEY ("logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "konditionen_pachtarten" ADD CONSTRAINT "konditionen_pachtarten_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."konditionen"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "oeffnungszeiten_regular" ADD CONSTRAINT "oeffnungszeiten_regular_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."oeffnungszeiten"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "oeffnungszeiten_exceptions" ADD CONSTRAINT "oeffnungszeiten_exceptions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."oeffnungszeiten"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "seiten_blocks_hero_order_idx" ON "seiten_blocks_hero" USING btree ("_order");
  CREATE INDEX "seiten_blocks_hero_parent_id_idx" ON "seiten_blocks_hero" USING btree ("_parent_id");
  CREATE INDEX "seiten_blocks_hero_path_idx" ON "seiten_blocks_hero" USING btree ("_path");
  CREATE INDEX "seiten_blocks_hero_image_idx" ON "seiten_blocks_hero" USING btree ("image_id");
  CREATE INDEX "seiten_blocks_hero_button_button_page_idx" ON "seiten_blocks_hero" USING btree ("button_page_id");
  CREATE INDEX "seiten_blocks_text_order_idx" ON "seiten_blocks_text" USING btree ("_order");
  CREATE INDEX "seiten_blocks_text_parent_id_idx" ON "seiten_blocks_text" USING btree ("_parent_id");
  CREATE INDEX "seiten_blocks_text_path_idx" ON "seiten_blocks_text" USING btree ("_path");
  CREATE INDEX "seiten_blocks_bild_text_order_idx" ON "seiten_blocks_bild_text" USING btree ("_order");
  CREATE INDEX "seiten_blocks_bild_text_parent_id_idx" ON "seiten_blocks_bild_text" USING btree ("_parent_id");
  CREATE INDEX "seiten_blocks_bild_text_path_idx" ON "seiten_blocks_bild_text" USING btree ("_path");
  CREATE INDEX "seiten_blocks_bild_text_image_idx" ON "seiten_blocks_bild_text" USING btree ("image_id");
  CREATE INDEX "seiten_blocks_hinweisbox_order_idx" ON "seiten_blocks_hinweisbox" USING btree ("_order");
  CREATE INDEX "seiten_blocks_hinweisbox_parent_id_idx" ON "seiten_blocks_hinweisbox" USING btree ("_parent_id");
  CREATE INDEX "seiten_blocks_hinweisbox_path_idx" ON "seiten_blocks_hinweisbox" USING btree ("_path");
  CREATE INDEX "seiten_blocks_karten_cards_order_idx" ON "seiten_blocks_karten_cards" USING btree ("_order");
  CREATE INDEX "seiten_blocks_karten_cards_parent_id_idx" ON "seiten_blocks_karten_cards" USING btree ("_parent_id");
  CREATE INDEX "seiten_blocks_karten_cards_page_idx" ON "seiten_blocks_karten_cards" USING btree ("page_id");
  CREATE INDEX "seiten_blocks_karten_order_idx" ON "seiten_blocks_karten" USING btree ("_order");
  CREATE INDEX "seiten_blocks_karten_parent_id_idx" ON "seiten_blocks_karten" USING btree ("_parent_id");
  CREATE INDEX "seiten_blocks_karten_path_idx" ON "seiten_blocks_karten" USING btree ("_path");
  CREATE INDEX "seiten_blocks_ablauf_steps_order_idx" ON "seiten_blocks_ablauf_steps" USING btree ("_order");
  CREATE INDEX "seiten_blocks_ablauf_steps_parent_id_idx" ON "seiten_blocks_ablauf_steps" USING btree ("_parent_id");
  CREATE INDEX "seiten_blocks_ablauf_order_idx" ON "seiten_blocks_ablauf" USING btree ("_order");
  CREATE INDEX "seiten_blocks_ablauf_parent_id_idx" ON "seiten_blocks_ablauf" USING btree ("_parent_id");
  CREATE INDEX "seiten_blocks_ablauf_path_idx" ON "seiten_blocks_ablauf" USING btree ("_path");
  CREATE INDEX "seiten_blocks_preistabelle_order_idx" ON "seiten_blocks_preistabelle" USING btree ("_order");
  CREATE INDEX "seiten_blocks_preistabelle_parent_id_idx" ON "seiten_blocks_preistabelle" USING btree ("_parent_id");
  CREATE INDEX "seiten_blocks_preistabelle_path_idx" ON "seiten_blocks_preistabelle" USING btree ("_path");
  CREATE INDEX "seiten_blocks_angebotsliste_order_idx" ON "seiten_blocks_angebotsliste" USING btree ("_order");
  CREATE INDEX "seiten_blocks_angebotsliste_parent_id_idx" ON "seiten_blocks_angebotsliste" USING btree ("_parent_id");
  CREATE INDEX "seiten_blocks_angebotsliste_path_idx" ON "seiten_blocks_angebotsliste" USING btree ("_path");
  CREATE INDEX "seiten_blocks_personenraster_order_idx" ON "seiten_blocks_personenraster" USING btree ("_order");
  CREATE INDEX "seiten_blocks_personenraster_parent_id_idx" ON "seiten_blocks_personenraster" USING btree ("_parent_id");
  CREATE INDEX "seiten_blocks_personenraster_path_idx" ON "seiten_blocks_personenraster" USING btree ("_path");
  CREATE INDEX "seiten_blocks_oeffnungszeiten_order_idx" ON "seiten_blocks_oeffnungszeiten" USING btree ("_order");
  CREATE INDEX "seiten_blocks_oeffnungszeiten_parent_id_idx" ON "seiten_blocks_oeffnungszeiten" USING btree ("_parent_id");
  CREATE INDEX "seiten_blocks_oeffnungszeiten_path_idx" ON "seiten_blocks_oeffnungszeiten" USING btree ("_path");
  CREATE INDEX "seiten_blocks_kontakt_order_idx" ON "seiten_blocks_kontakt" USING btree ("_order");
  CREATE INDEX "seiten_blocks_kontakt_parent_id_idx" ON "seiten_blocks_kontakt" USING btree ("_parent_id");
  CREATE INDEX "seiten_blocks_kontakt_path_idx" ON "seiten_blocks_kontakt" USING btree ("_path");
  CREATE INDEX "seiten_blocks_tabelle_rows_order_idx" ON "seiten_blocks_tabelle_rows" USING btree ("_order");
  CREATE INDEX "seiten_blocks_tabelle_rows_parent_id_idx" ON "seiten_blocks_tabelle_rows" USING btree ("_parent_id");
  CREATE INDEX "seiten_blocks_tabelle_order_idx" ON "seiten_blocks_tabelle" USING btree ("_order");
  CREATE INDEX "seiten_blocks_tabelle_parent_id_idx" ON "seiten_blocks_tabelle" USING btree ("_parent_id");
  CREATE INDEX "seiten_blocks_tabelle_path_idx" ON "seiten_blocks_tabelle" USING btree ("_path");
  CREATE INDEX "seiten_blocks_akkordeon_items_order_idx" ON "seiten_blocks_akkordeon_items" USING btree ("_order");
  CREATE INDEX "seiten_blocks_akkordeon_items_parent_id_idx" ON "seiten_blocks_akkordeon_items" USING btree ("_parent_id");
  CREATE INDEX "seiten_blocks_akkordeon_order_idx" ON "seiten_blocks_akkordeon" USING btree ("_order");
  CREATE INDEX "seiten_blocks_akkordeon_parent_id_idx" ON "seiten_blocks_akkordeon" USING btree ("_parent_id");
  CREATE INDEX "seiten_blocks_akkordeon_path_idx" ON "seiten_blocks_akkordeon" USING btree ("_path");
  CREATE INDEX "seiten_blocks_dokumentenliste_order_idx" ON "seiten_blocks_dokumentenliste" USING btree ("_order");
  CREATE INDEX "seiten_blocks_dokumentenliste_parent_id_idx" ON "seiten_blocks_dokumentenliste" USING btree ("_parent_id");
  CREATE INDEX "seiten_blocks_dokumentenliste_path_idx" ON "seiten_blocks_dokumentenliste" USING btree ("_path");
  CREATE INDEX "seiten_blocks_neue_news_order_idx" ON "seiten_blocks_neue_news" USING btree ("_order");
  CREATE INDEX "seiten_blocks_neue_news_parent_id_idx" ON "seiten_blocks_neue_news" USING btree ("_parent_id");
  CREATE INDEX "seiten_blocks_neue_news_path_idx" ON "seiten_blocks_neue_news" USING btree ("_path");
  CREATE INDEX "seiten_blocks_naechste_termine_order_idx" ON "seiten_blocks_naechste_termine" USING btree ("_order");
  CREATE INDEX "seiten_blocks_naechste_termine_parent_id_idx" ON "seiten_blocks_naechste_termine" USING btree ("_parent_id");
  CREATE INDEX "seiten_blocks_naechste_termine_path_idx" ON "seiten_blocks_naechste_termine" USING btree ("_path");
  CREATE INDEX "seiten_blocks_diesen_monat_order_idx" ON "seiten_blocks_diesen_monat" USING btree ("_order");
  CREATE INDEX "seiten_blocks_diesen_monat_parent_id_idx" ON "seiten_blocks_diesen_monat" USING btree ("_parent_id");
  CREATE INDEX "seiten_blocks_diesen_monat_path_idx" ON "seiten_blocks_diesen_monat" USING btree ("_path");
  CREATE UNIQUE INDEX "seiten_slug_idx" ON "seiten" USING btree ("slug");
  CREATE INDEX "seiten_meta_meta_image_idx" ON "seiten" USING btree ("meta_image_id");
  CREATE INDEX "seiten_updated_at_idx" ON "seiten" USING btree ("updated_at");
  CREATE INDEX "seiten_created_at_idx" ON "seiten" USING btree ("created_at");
  CREATE INDEX "seiten__status_idx" ON "seiten" USING btree ("_status");
  CREATE INDEX "_seiten_v_blocks_hero_order_idx" ON "_seiten_v_blocks_hero" USING btree ("_order");
  CREATE INDEX "_seiten_v_blocks_hero_parent_id_idx" ON "_seiten_v_blocks_hero" USING btree ("_parent_id");
  CREATE INDEX "_seiten_v_blocks_hero_path_idx" ON "_seiten_v_blocks_hero" USING btree ("_path");
  CREATE INDEX "_seiten_v_blocks_hero_image_idx" ON "_seiten_v_blocks_hero" USING btree ("image_id");
  CREATE INDEX "_seiten_v_blocks_hero_button_button_page_idx" ON "_seiten_v_blocks_hero" USING btree ("button_page_id");
  CREATE INDEX "_seiten_v_blocks_text_order_idx" ON "_seiten_v_blocks_text" USING btree ("_order");
  CREATE INDEX "_seiten_v_blocks_text_parent_id_idx" ON "_seiten_v_blocks_text" USING btree ("_parent_id");
  CREATE INDEX "_seiten_v_blocks_text_path_idx" ON "_seiten_v_blocks_text" USING btree ("_path");
  CREATE INDEX "_seiten_v_blocks_bild_text_order_idx" ON "_seiten_v_blocks_bild_text" USING btree ("_order");
  CREATE INDEX "_seiten_v_blocks_bild_text_parent_id_idx" ON "_seiten_v_blocks_bild_text" USING btree ("_parent_id");
  CREATE INDEX "_seiten_v_blocks_bild_text_path_idx" ON "_seiten_v_blocks_bild_text" USING btree ("_path");
  CREATE INDEX "_seiten_v_blocks_bild_text_image_idx" ON "_seiten_v_blocks_bild_text" USING btree ("image_id");
  CREATE INDEX "_seiten_v_blocks_hinweisbox_order_idx" ON "_seiten_v_blocks_hinweisbox" USING btree ("_order");
  CREATE INDEX "_seiten_v_blocks_hinweisbox_parent_id_idx" ON "_seiten_v_blocks_hinweisbox" USING btree ("_parent_id");
  CREATE INDEX "_seiten_v_blocks_hinweisbox_path_idx" ON "_seiten_v_blocks_hinweisbox" USING btree ("_path");
  CREATE INDEX "_seiten_v_blocks_karten_cards_order_idx" ON "_seiten_v_blocks_karten_cards" USING btree ("_order");
  CREATE INDEX "_seiten_v_blocks_karten_cards_parent_id_idx" ON "_seiten_v_blocks_karten_cards" USING btree ("_parent_id");
  CREATE INDEX "_seiten_v_blocks_karten_cards_page_idx" ON "_seiten_v_blocks_karten_cards" USING btree ("page_id");
  CREATE INDEX "_seiten_v_blocks_karten_order_idx" ON "_seiten_v_blocks_karten" USING btree ("_order");
  CREATE INDEX "_seiten_v_blocks_karten_parent_id_idx" ON "_seiten_v_blocks_karten" USING btree ("_parent_id");
  CREATE INDEX "_seiten_v_blocks_karten_path_idx" ON "_seiten_v_blocks_karten" USING btree ("_path");
  CREATE INDEX "_seiten_v_blocks_ablauf_steps_order_idx" ON "_seiten_v_blocks_ablauf_steps" USING btree ("_order");
  CREATE INDEX "_seiten_v_blocks_ablauf_steps_parent_id_idx" ON "_seiten_v_blocks_ablauf_steps" USING btree ("_parent_id");
  CREATE INDEX "_seiten_v_blocks_ablauf_order_idx" ON "_seiten_v_blocks_ablauf" USING btree ("_order");
  CREATE INDEX "_seiten_v_blocks_ablauf_parent_id_idx" ON "_seiten_v_blocks_ablauf" USING btree ("_parent_id");
  CREATE INDEX "_seiten_v_blocks_ablauf_path_idx" ON "_seiten_v_blocks_ablauf" USING btree ("_path");
  CREATE INDEX "_seiten_v_blocks_preistabelle_order_idx" ON "_seiten_v_blocks_preistabelle" USING btree ("_order");
  CREATE INDEX "_seiten_v_blocks_preistabelle_parent_id_idx" ON "_seiten_v_blocks_preistabelle" USING btree ("_parent_id");
  CREATE INDEX "_seiten_v_blocks_preistabelle_path_idx" ON "_seiten_v_blocks_preistabelle" USING btree ("_path");
  CREATE INDEX "_seiten_v_blocks_angebotsliste_order_idx" ON "_seiten_v_blocks_angebotsliste" USING btree ("_order");
  CREATE INDEX "_seiten_v_blocks_angebotsliste_parent_id_idx" ON "_seiten_v_blocks_angebotsliste" USING btree ("_parent_id");
  CREATE INDEX "_seiten_v_blocks_angebotsliste_path_idx" ON "_seiten_v_blocks_angebotsliste" USING btree ("_path");
  CREATE INDEX "_seiten_v_blocks_personenraster_order_idx" ON "_seiten_v_blocks_personenraster" USING btree ("_order");
  CREATE INDEX "_seiten_v_blocks_personenraster_parent_id_idx" ON "_seiten_v_blocks_personenraster" USING btree ("_parent_id");
  CREATE INDEX "_seiten_v_blocks_personenraster_path_idx" ON "_seiten_v_blocks_personenraster" USING btree ("_path");
  CREATE INDEX "_seiten_v_blocks_oeffnungszeiten_order_idx" ON "_seiten_v_blocks_oeffnungszeiten" USING btree ("_order");
  CREATE INDEX "_seiten_v_blocks_oeffnungszeiten_parent_id_idx" ON "_seiten_v_blocks_oeffnungszeiten" USING btree ("_parent_id");
  CREATE INDEX "_seiten_v_blocks_oeffnungszeiten_path_idx" ON "_seiten_v_blocks_oeffnungszeiten" USING btree ("_path");
  CREATE INDEX "_seiten_v_blocks_kontakt_order_idx" ON "_seiten_v_blocks_kontakt" USING btree ("_order");
  CREATE INDEX "_seiten_v_blocks_kontakt_parent_id_idx" ON "_seiten_v_blocks_kontakt" USING btree ("_parent_id");
  CREATE INDEX "_seiten_v_blocks_kontakt_path_idx" ON "_seiten_v_blocks_kontakt" USING btree ("_path");
  CREATE INDEX "_seiten_v_blocks_tabelle_rows_order_idx" ON "_seiten_v_blocks_tabelle_rows" USING btree ("_order");
  CREATE INDEX "_seiten_v_blocks_tabelle_rows_parent_id_idx" ON "_seiten_v_blocks_tabelle_rows" USING btree ("_parent_id");
  CREATE INDEX "_seiten_v_blocks_tabelle_order_idx" ON "_seiten_v_blocks_tabelle" USING btree ("_order");
  CREATE INDEX "_seiten_v_blocks_tabelle_parent_id_idx" ON "_seiten_v_blocks_tabelle" USING btree ("_parent_id");
  CREATE INDEX "_seiten_v_blocks_tabelle_path_idx" ON "_seiten_v_blocks_tabelle" USING btree ("_path");
  CREATE INDEX "_seiten_v_blocks_akkordeon_items_order_idx" ON "_seiten_v_blocks_akkordeon_items" USING btree ("_order");
  CREATE INDEX "_seiten_v_blocks_akkordeon_items_parent_id_idx" ON "_seiten_v_blocks_akkordeon_items" USING btree ("_parent_id");
  CREATE INDEX "_seiten_v_blocks_akkordeon_order_idx" ON "_seiten_v_blocks_akkordeon" USING btree ("_order");
  CREATE INDEX "_seiten_v_blocks_akkordeon_parent_id_idx" ON "_seiten_v_blocks_akkordeon" USING btree ("_parent_id");
  CREATE INDEX "_seiten_v_blocks_akkordeon_path_idx" ON "_seiten_v_blocks_akkordeon" USING btree ("_path");
  CREATE INDEX "_seiten_v_blocks_dokumentenliste_order_idx" ON "_seiten_v_blocks_dokumentenliste" USING btree ("_order");
  CREATE INDEX "_seiten_v_blocks_dokumentenliste_parent_id_idx" ON "_seiten_v_blocks_dokumentenliste" USING btree ("_parent_id");
  CREATE INDEX "_seiten_v_blocks_dokumentenliste_path_idx" ON "_seiten_v_blocks_dokumentenliste" USING btree ("_path");
  CREATE INDEX "_seiten_v_blocks_neue_news_order_idx" ON "_seiten_v_blocks_neue_news" USING btree ("_order");
  CREATE INDEX "_seiten_v_blocks_neue_news_parent_id_idx" ON "_seiten_v_blocks_neue_news" USING btree ("_parent_id");
  CREATE INDEX "_seiten_v_blocks_neue_news_path_idx" ON "_seiten_v_blocks_neue_news" USING btree ("_path");
  CREATE INDEX "_seiten_v_blocks_naechste_termine_order_idx" ON "_seiten_v_blocks_naechste_termine" USING btree ("_order");
  CREATE INDEX "_seiten_v_blocks_naechste_termine_parent_id_idx" ON "_seiten_v_blocks_naechste_termine" USING btree ("_parent_id");
  CREATE INDEX "_seiten_v_blocks_naechste_termine_path_idx" ON "_seiten_v_blocks_naechste_termine" USING btree ("_path");
  CREATE INDEX "_seiten_v_blocks_diesen_monat_order_idx" ON "_seiten_v_blocks_diesen_monat" USING btree ("_order");
  CREATE INDEX "_seiten_v_blocks_diesen_monat_parent_id_idx" ON "_seiten_v_blocks_diesen_monat" USING btree ("_parent_id");
  CREATE INDEX "_seiten_v_blocks_diesen_monat_path_idx" ON "_seiten_v_blocks_diesen_monat" USING btree ("_path");
  CREATE INDEX "_seiten_v_parent_idx" ON "_seiten_v" USING btree ("parent_id");
  CREATE INDEX "_seiten_v_version_version_slug_idx" ON "_seiten_v" USING btree ("version_slug");
  CREATE INDEX "_seiten_v_version_meta_version_meta_image_idx" ON "_seiten_v" USING btree ("version_meta_image_id");
  CREATE INDEX "_seiten_v_version_version_updated_at_idx" ON "_seiten_v" USING btree ("version_updated_at");
  CREATE INDEX "_seiten_v_version_version_created_at_idx" ON "_seiten_v" USING btree ("version_created_at");
  CREATE INDEX "_seiten_v_version_version__status_idx" ON "_seiten_v" USING btree ("version__status");
  CREATE INDEX "_seiten_v_created_at_idx" ON "_seiten_v" USING btree ("created_at");
  CREATE INDEX "_seiten_v_updated_at_idx" ON "_seiten_v" USING btree ("updated_at");
  CREATE INDEX "_seiten_v_latest_idx" ON "_seiten_v" USING btree ("latest");
  CREATE UNIQUE INDEX "news_slug_idx" ON "news" USING btree ("slug");
  CREATE INDEX "news_image_idx" ON "news" USING btree ("image_id");
  CREATE INDEX "news_meta_meta_image_idx" ON "news" USING btree ("meta_image_id");
  CREATE INDEX "news_updated_at_idx" ON "news" USING btree ("updated_at");
  CREATE INDEX "news_created_at_idx" ON "news" USING btree ("created_at");
  CREATE INDEX "news__status_idx" ON "news" USING btree ("_status");
  CREATE INDEX "_news_v_parent_idx" ON "_news_v" USING btree ("parent_id");
  CREATE INDEX "_news_v_version_version_slug_idx" ON "_news_v" USING btree ("version_slug");
  CREATE INDEX "_news_v_version_version_image_idx" ON "_news_v" USING btree ("version_image_id");
  CREATE INDEX "_news_v_version_meta_version_meta_image_idx" ON "_news_v" USING btree ("version_meta_image_id");
  CREATE INDEX "_news_v_version_version_updated_at_idx" ON "_news_v" USING btree ("version_updated_at");
  CREATE INDEX "_news_v_version_version_created_at_idx" ON "_news_v" USING btree ("version_created_at");
  CREATE INDEX "_news_v_version_version__status_idx" ON "_news_v" USING btree ("version__status");
  CREATE INDEX "_news_v_created_at_idx" ON "_news_v" USING btree ("created_at");
  CREATE INDEX "_news_v_updated_at_idx" ON "_news_v" USING btree ("updated_at");
  CREATE INDEX "_news_v_latest_idx" ON "_news_v" USING btree ("latest");
  CREATE UNIQUE INDEX "termine_slug_idx" ON "termine" USING btree ("slug");
  CREATE INDEX "termine_areal_idx" ON "termine" USING btree ("areal_id");
  CREATE INDEX "termine_attachment_idx" ON "termine" USING btree ("attachment_id");
  CREATE INDEX "termine_meta_meta_image_idx" ON "termine" USING btree ("meta_image_id");
  CREATE INDEX "termine_updated_at_idx" ON "termine" USING btree ("updated_at");
  CREATE INDEX "termine_created_at_idx" ON "termine" USING btree ("created_at");
  CREATE INDEX "termine__status_idx" ON "termine" USING btree ("_status");
  CREATE INDEX "_termine_v_parent_idx" ON "_termine_v" USING btree ("parent_id");
  CREATE INDEX "_termine_v_version_version_slug_idx" ON "_termine_v" USING btree ("version_slug");
  CREATE INDEX "_termine_v_version_version_areal_idx" ON "_termine_v" USING btree ("version_areal_id");
  CREATE INDEX "_termine_v_version_version_attachment_idx" ON "_termine_v" USING btree ("version_attachment_id");
  CREATE INDEX "_termine_v_version_meta_version_meta_image_idx" ON "_termine_v" USING btree ("version_meta_image_id");
  CREATE INDEX "_termine_v_version_version_updated_at_idx" ON "_termine_v" USING btree ("version_updated_at");
  CREATE INDEX "_termine_v_version_version_created_at_idx" ON "_termine_v" USING btree ("version_created_at");
  CREATE INDEX "_termine_v_version_version__status_idx" ON "_termine_v" USING btree ("version__status");
  CREATE INDEX "_termine_v_created_at_idx" ON "_termine_v" USING btree ("created_at");
  CREATE INDEX "_termine_v_updated_at_idx" ON "_termine_v" USING btree ("updated_at");
  CREATE INDEX "_termine_v_latest_idx" ON "_termine_v" USING btree ("latest");
  CREATE UNIQUE INDEX "alben_slug_idx" ON "alben" USING btree ("slug");
  CREATE INDEX "alben_updated_at_idx" ON "alben" USING btree ("updated_at");
  CREATE INDEX "alben_created_at_idx" ON "alben" USING btree ("created_at");
  CREATE INDEX "alben__status_idx" ON "alben" USING btree ("_status");
  CREATE INDEX "alben_rels_order_idx" ON "alben_rels" USING btree ("order");
  CREATE INDEX "alben_rels_parent_idx" ON "alben_rels" USING btree ("parent_id");
  CREATE INDEX "alben_rels_path_idx" ON "alben_rels" USING btree ("path");
  CREATE INDEX "alben_rels_media_id_idx" ON "alben_rels" USING btree ("media_id");
  CREATE INDEX "_alben_v_parent_idx" ON "_alben_v" USING btree ("parent_id");
  CREATE INDEX "_alben_v_version_version_slug_idx" ON "_alben_v" USING btree ("version_slug");
  CREATE INDEX "_alben_v_version_version_updated_at_idx" ON "_alben_v" USING btree ("version_updated_at");
  CREATE INDEX "_alben_v_version_version_created_at_idx" ON "_alben_v" USING btree ("version_created_at");
  CREATE INDEX "_alben_v_version_version__status_idx" ON "_alben_v" USING btree ("version__status");
  CREATE INDEX "_alben_v_created_at_idx" ON "_alben_v" USING btree ("created_at");
  CREATE INDEX "_alben_v_updated_at_idx" ON "_alben_v" USING btree ("updated_at");
  CREATE INDEX "_alben_v_latest_idx" ON "_alben_v" USING btree ("latest");
  CREATE INDEX "_alben_v_rels_order_idx" ON "_alben_v_rels" USING btree ("order");
  CREATE INDEX "_alben_v_rels_parent_idx" ON "_alben_v_rels" USING btree ("parent_id");
  CREATE INDEX "_alben_v_rels_path_idx" ON "_alben_v_rels" USING btree ("path");
  CREATE INDEX "_alben_v_rels_media_id_idx" ON "_alben_v_rels" USING btree ("media_id");
  CREATE UNIQUE INDEX "areale_slug_idx" ON "areale" USING btree ("slug");
  CREATE INDEX "areale_meta_meta_image_idx" ON "areale" USING btree ("meta_image_id");
  CREATE INDEX "areale_updated_at_idx" ON "areale" USING btree ("updated_at");
  CREATE INDEX "areale_created_at_idx" ON "areale" USING btree ("created_at");
  CREATE INDEX "areale__status_idx" ON "areale" USING btree ("_status");
  CREATE INDEX "areale_rels_order_idx" ON "areale_rels" USING btree ("order");
  CREATE INDEX "areale_rels_parent_idx" ON "areale_rels" USING btree ("parent_id");
  CREATE INDEX "areale_rels_path_idx" ON "areale_rels" USING btree ("path");
  CREATE INDEX "areale_rels_media_id_idx" ON "areale_rels" USING btree ("media_id");
  CREATE INDEX "_areale_v_parent_idx" ON "_areale_v" USING btree ("parent_id");
  CREATE INDEX "_areale_v_version_version_slug_idx" ON "_areale_v" USING btree ("version_slug");
  CREATE INDEX "_areale_v_version_meta_version_meta_image_idx" ON "_areale_v" USING btree ("version_meta_image_id");
  CREATE INDEX "_areale_v_version_version_updated_at_idx" ON "_areale_v" USING btree ("version_updated_at");
  CREATE INDEX "_areale_v_version_version_created_at_idx" ON "_areale_v" USING btree ("version_created_at");
  CREATE INDEX "_areale_v_version_version__status_idx" ON "_areale_v" USING btree ("version__status");
  CREATE INDEX "_areale_v_created_at_idx" ON "_areale_v" USING btree ("created_at");
  CREATE INDEX "_areale_v_updated_at_idx" ON "_areale_v" USING btree ("updated_at");
  CREATE INDEX "_areale_v_latest_idx" ON "_areale_v" USING btree ("latest");
  CREATE INDEX "_areale_v_rels_order_idx" ON "_areale_v_rels" USING btree ("order");
  CREATE INDEX "_areale_v_rels_parent_idx" ON "_areale_v_rels" USING btree ("parent_id");
  CREATE INDEX "_areale_v_rels_path_idx" ON "_areale_v_rels" USING btree ("path");
  CREATE INDEX "_areale_v_rels_media_id_idx" ON "_areale_v_rels" USING btree ("media_id");
  CREATE INDEX "personen_photo_idx" ON "personen" USING btree ("photo_id");
  CREATE INDEX "personen_updated_at_idx" ON "personen" USING btree ("updated_at");
  CREATE INDEX "personen_created_at_idx" ON "personen" USING btree ("created_at");
  CREATE INDEX "personen__status_idx" ON "personen" USING btree ("_status");
  CREATE INDEX "_personen_v_parent_idx" ON "_personen_v" USING btree ("parent_id");
  CREATE INDEX "_personen_v_version_version_photo_idx" ON "_personen_v" USING btree ("version_photo_id");
  CREATE INDEX "_personen_v_version_version_updated_at_idx" ON "_personen_v" USING btree ("version_updated_at");
  CREATE INDEX "_personen_v_version_version_created_at_idx" ON "_personen_v" USING btree ("version_created_at");
  CREATE INDEX "_personen_v_version_version__status_idx" ON "_personen_v" USING btree ("version__status");
  CREATE INDEX "_personen_v_created_at_idx" ON "_personen_v" USING btree ("created_at");
  CREATE INDEX "_personen_v_updated_at_idx" ON "_personen_v" USING btree ("updated_at");
  CREATE INDEX "_personen_v_latest_idx" ON "_personen_v" USING btree ("latest");
  CREATE INDEX "ratgeber_months_order_idx" ON "ratgeber_months" USING btree ("order");
  CREATE INDEX "ratgeber_months_parent_idx" ON "ratgeber_months" USING btree ("parent_id");
  CREATE UNIQUE INDEX "ratgeber_slug_idx" ON "ratgeber" USING btree ("slug");
  CREATE INDEX "ratgeber_image_idx" ON "ratgeber" USING btree ("image_id");
  CREATE INDEX "ratgeber_meta_meta_image_idx" ON "ratgeber" USING btree ("meta_image_id");
  CREATE INDEX "ratgeber_updated_at_idx" ON "ratgeber" USING btree ("updated_at");
  CREATE INDEX "ratgeber_created_at_idx" ON "ratgeber" USING btree ("created_at");
  CREATE INDEX "ratgeber__status_idx" ON "ratgeber" USING btree ("_status");
  CREATE INDEX "ratgeber_rels_order_idx" ON "ratgeber_rels" USING btree ("order");
  CREATE INDEX "ratgeber_rels_parent_idx" ON "ratgeber_rels" USING btree ("parent_id");
  CREATE INDEX "ratgeber_rels_path_idx" ON "ratgeber_rels" USING btree ("path");
  CREATE INDEX "ratgeber_rels_ratgeber_id_idx" ON "ratgeber_rels" USING btree ("ratgeber_id");
  CREATE INDEX "_ratgeber_v_version_months_order_idx" ON "_ratgeber_v_version_months" USING btree ("order");
  CREATE INDEX "_ratgeber_v_version_months_parent_idx" ON "_ratgeber_v_version_months" USING btree ("parent_id");
  CREATE INDEX "_ratgeber_v_parent_idx" ON "_ratgeber_v" USING btree ("parent_id");
  CREATE INDEX "_ratgeber_v_version_version_slug_idx" ON "_ratgeber_v" USING btree ("version_slug");
  CREATE INDEX "_ratgeber_v_version_version_image_idx" ON "_ratgeber_v" USING btree ("version_image_id");
  CREATE INDEX "_ratgeber_v_version_meta_version_meta_image_idx" ON "_ratgeber_v" USING btree ("version_meta_image_id");
  CREATE INDEX "_ratgeber_v_version_version_updated_at_idx" ON "_ratgeber_v" USING btree ("version_updated_at");
  CREATE INDEX "_ratgeber_v_version_version_created_at_idx" ON "_ratgeber_v" USING btree ("version_created_at");
  CREATE INDEX "_ratgeber_v_version_version__status_idx" ON "_ratgeber_v" USING btree ("version__status");
  CREATE INDEX "_ratgeber_v_created_at_idx" ON "_ratgeber_v" USING btree ("created_at");
  CREATE INDEX "_ratgeber_v_updated_at_idx" ON "_ratgeber_v" USING btree ("updated_at");
  CREATE INDEX "_ratgeber_v_latest_idx" ON "_ratgeber_v" USING btree ("latest");
  CREATE INDEX "_ratgeber_v_rels_order_idx" ON "_ratgeber_v_rels" USING btree ("order");
  CREATE INDEX "_ratgeber_v_rels_parent_idx" ON "_ratgeber_v_rels" USING btree ("parent_id");
  CREATE INDEX "_ratgeber_v_rels_path_idx" ON "_ratgeber_v_rels" USING btree ("path");
  CREATE INDEX "_ratgeber_v_rels_ratgeber_id_idx" ON "_ratgeber_v_rels" USING btree ("ratgeber_id");
  CREATE INDEX "gartenangebote_areal_idx" ON "gartenangebote" USING btree ("areal_id");
  CREATE INDEX "gartenangebote_updated_at_idx" ON "gartenangebote" USING btree ("updated_at");
  CREATE INDEX "gartenangebote_created_at_idx" ON "gartenangebote" USING btree ("created_at");
  CREATE INDEX "gartenangebote__status_idx" ON "gartenangebote" USING btree ("_status");
  CREATE INDEX "_gartenangebote_v_parent_idx" ON "_gartenangebote_v" USING btree ("parent_id");
  CREATE INDEX "_gartenangebote_v_version_version_areal_idx" ON "_gartenangebote_v" USING btree ("version_areal_id");
  CREATE INDEX "_gartenangebote_v_version_version_updated_at_idx" ON "_gartenangebote_v" USING btree ("version_updated_at");
  CREATE INDEX "_gartenangebote_v_version_version_created_at_idx" ON "_gartenangebote_v" USING btree ("version_created_at");
  CREATE INDEX "_gartenangebote_v_version_version__status_idx" ON "_gartenangebote_v" USING btree ("version__status");
  CREATE INDEX "_gartenangebote_v_created_at_idx" ON "_gartenangebote_v" USING btree ("created_at");
  CREATE INDEX "_gartenangebote_v_updated_at_idx" ON "_gartenangebote_v" USING btree ("updated_at");
  CREATE INDEX "_gartenangebote_v_latest_idx" ON "_gartenangebote_v" USING btree ("latest");
  CREATE INDEX "dokumente_updated_at_idx" ON "dokumente" USING btree ("updated_at");
  CREATE INDEX "dokumente_created_at_idx" ON "dokumente" USING btree ("created_at");
  CREATE INDEX "dokumente__status_idx" ON "dokumente" USING btree ("_status");
  CREATE UNIQUE INDEX "dokumente_filename_idx" ON "dokumente" USING btree ("filename");
  CREATE INDEX "_dokumente_v_parent_idx" ON "_dokumente_v" USING btree ("parent_id");
  CREATE INDEX "_dokumente_v_version_version_updated_at_idx" ON "_dokumente_v" USING btree ("version_updated_at");
  CREATE INDEX "_dokumente_v_version_version_created_at_idx" ON "_dokumente_v" USING btree ("version_created_at");
  CREATE INDEX "_dokumente_v_version_version__status_idx" ON "_dokumente_v" USING btree ("version__status");
  CREATE INDEX "_dokumente_v_version_version_filename_idx" ON "_dokumente_v" USING btree ("version_filename");
  CREATE INDEX "_dokumente_v_created_at_idx" ON "_dokumente_v" USING btree ("created_at");
  CREATE INDEX "_dokumente_v_updated_at_idx" ON "_dokumente_v" USING btree ("updated_at");
  CREATE INDEX "_dokumente_v_latest_idx" ON "_dokumente_v" USING btree ("latest");
  CREATE INDEX "media_updated_at_idx" ON "media" USING btree ("updated_at");
  CREATE INDEX "media_created_at_idx" ON "media" USING btree ("created_at");
  CREATE UNIQUE INDEX "media_filename_idx" ON "media" USING btree ("filename");
  CREATE INDEX "media_sizes_thumbnail_sizes_thumbnail_filename_idx" ON "media" USING btree ("sizes_thumbnail_filename");
  CREATE INDEX "media_sizes_karte_sizes_karte_filename_idx" ON "media" USING btree ("sizes_karte_filename");
  CREATE INDEX "media_sizes_gross_sizes_gross_filename_idx" ON "media" USING btree ("sizes_gross_filename");
  CREATE INDEX "users_sessions_order_idx" ON "users_sessions" USING btree ("_order");
  CREATE INDEX "users_sessions_parent_id_idx" ON "users_sessions" USING btree ("_parent_id");
  CREATE INDEX "users_updated_at_idx" ON "users" USING btree ("updated_at");
  CREATE INDEX "users_created_at_idx" ON "users" USING btree ("created_at");
  CREATE UNIQUE INDEX "users_email_idx" ON "users" USING btree ("email");
  CREATE INDEX "suche_updated_at_idx" ON "suche" USING btree ("updated_at");
  CREATE INDEX "suche_created_at_idx" ON "suche" USING btree ("created_at");
  CREATE INDEX "suche_rels_order_idx" ON "suche_rels" USING btree ("order");
  CREATE INDEX "suche_rels_parent_idx" ON "suche_rels" USING btree ("parent_id");
  CREATE INDEX "suche_rels_path_idx" ON "suche_rels" USING btree ("path");
  CREATE INDEX "suche_rels_ratgeber_id_idx" ON "suche_rels" USING btree ("ratgeber_id");
  CREATE INDEX "suche_rels_seiten_id_idx" ON "suche_rels" USING btree ("seiten_id");
  CREATE UNIQUE INDEX "redirects_from_idx" ON "redirects" USING btree ("from");
  CREATE INDEX "redirects_updated_at_idx" ON "redirects" USING btree ("updated_at");
  CREATE INDEX "redirects_created_at_idx" ON "redirects" USING btree ("created_at");
  CREATE INDEX "redirects_rels_order_idx" ON "redirects_rels" USING btree ("order");
  CREATE INDEX "redirects_rels_parent_idx" ON "redirects_rels" USING btree ("parent_id");
  CREATE INDEX "redirects_rels_path_idx" ON "redirects_rels" USING btree ("path");
  CREATE INDEX "redirects_rels_seiten_id_idx" ON "redirects_rels" USING btree ("seiten_id");
  CREATE INDEX "redirects_rels_news_id_idx" ON "redirects_rels" USING btree ("news_id");
  CREATE INDEX "redirects_rels_termine_id_idx" ON "redirects_rels" USING btree ("termine_id");
  CREATE INDEX "redirects_rels_areale_id_idx" ON "redirects_rels" USING btree ("areale_id");
  CREATE INDEX "redirects_rels_ratgeber_id_idx" ON "redirects_rels" USING btree ("ratgeber_id");
  CREATE UNIQUE INDEX "payload_kv_key_idx" ON "payload_kv" USING btree ("key");
  CREATE INDEX "payload_locked_documents_global_slug_idx" ON "payload_locked_documents" USING btree ("global_slug");
  CREATE INDEX "payload_locked_documents_updated_at_idx" ON "payload_locked_documents" USING btree ("updated_at");
  CREATE INDEX "payload_locked_documents_created_at_idx" ON "payload_locked_documents" USING btree ("created_at");
  CREATE INDEX "payload_locked_documents_rels_order_idx" ON "payload_locked_documents_rels" USING btree ("order");
  CREATE INDEX "payload_locked_documents_rels_parent_idx" ON "payload_locked_documents_rels" USING btree ("parent_id");
  CREATE INDEX "payload_locked_documents_rels_path_idx" ON "payload_locked_documents_rels" USING btree ("path");
  CREATE INDEX "payload_locked_documents_rels_seiten_id_idx" ON "payload_locked_documents_rels" USING btree ("seiten_id");
  CREATE INDEX "payload_locked_documents_rels_news_id_idx" ON "payload_locked_documents_rels" USING btree ("news_id");
  CREATE INDEX "payload_locked_documents_rels_termine_id_idx" ON "payload_locked_documents_rels" USING btree ("termine_id");
  CREATE INDEX "payload_locked_documents_rels_alben_id_idx" ON "payload_locked_documents_rels" USING btree ("alben_id");
  CREATE INDEX "payload_locked_documents_rels_areale_id_idx" ON "payload_locked_documents_rels" USING btree ("areale_id");
  CREATE INDEX "payload_locked_documents_rels_personen_id_idx" ON "payload_locked_documents_rels" USING btree ("personen_id");
  CREATE INDEX "payload_locked_documents_rels_ratgeber_id_idx" ON "payload_locked_documents_rels" USING btree ("ratgeber_id");
  CREATE INDEX "payload_locked_documents_rels_gartenangebote_id_idx" ON "payload_locked_documents_rels" USING btree ("gartenangebote_id");
  CREATE INDEX "payload_locked_documents_rels_dokumente_id_idx" ON "payload_locked_documents_rels" USING btree ("dokumente_id");
  CREATE INDEX "payload_locked_documents_rels_media_id_idx" ON "payload_locked_documents_rels" USING btree ("media_id");
  CREATE INDEX "payload_locked_documents_rels_users_id_idx" ON "payload_locked_documents_rels" USING btree ("users_id");
  CREATE INDEX "payload_locked_documents_rels_suche_id_idx" ON "payload_locked_documents_rels" USING btree ("suche_id");
  CREATE INDEX "payload_locked_documents_rels_redirects_id_idx" ON "payload_locked_documents_rels" USING btree ("redirects_id");
  CREATE INDEX "payload_preferences_key_idx" ON "payload_preferences" USING btree ("key");
  CREATE INDEX "payload_preferences_updated_at_idx" ON "payload_preferences" USING btree ("updated_at");
  CREATE INDEX "payload_preferences_created_at_idx" ON "payload_preferences" USING btree ("created_at");
  CREATE INDEX "payload_preferences_rels_order_idx" ON "payload_preferences_rels" USING btree ("order");
  CREATE INDEX "payload_preferences_rels_parent_idx" ON "payload_preferences_rels" USING btree ("parent_id");
  CREATE INDEX "payload_preferences_rels_path_idx" ON "payload_preferences_rels" USING btree ("path");
  CREATE INDEX "payload_preferences_rels_users_id_idx" ON "payload_preferences_rels" USING btree ("users_id");
  CREATE INDEX "payload_migrations_updated_at_idx" ON "payload_migrations" USING btree ("updated_at");
  CREATE INDEX "payload_migrations_created_at_idx" ON "payload_migrations" USING btree ("created_at");
  CREATE INDEX "navigation_items_children_order_idx" ON "navigation_items_children" USING btree ("_order");
  CREATE INDEX "navigation_items_children_parent_id_idx" ON "navigation_items_children" USING btree ("_parent_id");
  CREATE INDEX "navigation_items_children_page_idx" ON "navigation_items_children" USING btree ("page_id");
  CREATE INDEX "navigation_items_order_idx" ON "navigation_items" USING btree ("_order");
  CREATE INDEX "navigation_items_parent_id_idx" ON "navigation_items" USING btree ("_parent_id");
  CREATE INDEX "navigation_items_page_idx" ON "navigation_items" USING btree ("page_id");
  CREATE INDEX "hinweisbanner_link_link_page_idx" ON "hinweisbanner" USING btree ("link_page_id");
  CREATE INDEX "fusszeile_legal_links_order_idx" ON "fusszeile_legal_links" USING btree ("_order");
  CREATE INDEX "fusszeile_legal_links_parent_id_idx" ON "fusszeile_legal_links" USING btree ("_parent_id");
  CREATE INDEX "fusszeile_legal_links_page_idx" ON "fusszeile_legal_links" USING btree ("page_id");
  CREATE INDEX "fusszeile_partner_links_order_idx" ON "fusszeile_partner_links" USING btree ("_order");
  CREATE INDEX "fusszeile_partner_links_parent_id_idx" ON "fusszeile_partner_links" USING btree ("_parent_id");
  CREATE INDEX "fusszeile_partner_links_page_idx" ON "fusszeile_partner_links" USING btree ("page_id");
  CREATE INDEX "vereinsdaten_logo_idx" ON "vereinsdaten" USING btree ("logo_id");
  CREATE INDEX "konditionen_pachtarten_order_idx" ON "konditionen_pachtarten" USING btree ("_order");
  CREATE INDEX "konditionen_pachtarten_parent_id_idx" ON "konditionen_pachtarten" USING btree ("_parent_id");
  CREATE INDEX "oeffnungszeiten_regular_order_idx" ON "oeffnungszeiten_regular" USING btree ("_order");
  CREATE INDEX "oeffnungszeiten_regular_parent_id_idx" ON "oeffnungszeiten_regular" USING btree ("_parent_id");
  CREATE INDEX "oeffnungszeiten_exceptions_order_idx" ON "oeffnungszeiten_exceptions" USING btree ("_order");
  CREATE INDEX "oeffnungszeiten_exceptions_parent_id_idx" ON "oeffnungszeiten_exceptions" USING btree ("_parent_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "seiten_blocks_hero" CASCADE;
  DROP TABLE "seiten_blocks_text" CASCADE;
  DROP TABLE "seiten_blocks_bild_text" CASCADE;
  DROP TABLE "seiten_blocks_hinweisbox" CASCADE;
  DROP TABLE "seiten_blocks_karten_cards" CASCADE;
  DROP TABLE "seiten_blocks_karten" CASCADE;
  DROP TABLE "seiten_blocks_ablauf_steps" CASCADE;
  DROP TABLE "seiten_blocks_ablauf" CASCADE;
  DROP TABLE "seiten_blocks_preistabelle" CASCADE;
  DROP TABLE "seiten_blocks_angebotsliste" CASCADE;
  DROP TABLE "seiten_blocks_personenraster" CASCADE;
  DROP TABLE "seiten_blocks_oeffnungszeiten" CASCADE;
  DROP TABLE "seiten_blocks_kontakt" CASCADE;
  DROP TABLE "seiten_blocks_tabelle_rows" CASCADE;
  DROP TABLE "seiten_blocks_tabelle" CASCADE;
  DROP TABLE "seiten_blocks_akkordeon_items" CASCADE;
  DROP TABLE "seiten_blocks_akkordeon" CASCADE;
  DROP TABLE "seiten_blocks_dokumentenliste" CASCADE;
  DROP TABLE "seiten_blocks_neue_news" CASCADE;
  DROP TABLE "seiten_blocks_naechste_termine" CASCADE;
  DROP TABLE "seiten_blocks_diesen_monat" CASCADE;
  DROP TABLE "seiten" CASCADE;
  DROP TABLE "_seiten_v_blocks_hero" CASCADE;
  DROP TABLE "_seiten_v_blocks_text" CASCADE;
  DROP TABLE "_seiten_v_blocks_bild_text" CASCADE;
  DROP TABLE "_seiten_v_blocks_hinweisbox" CASCADE;
  DROP TABLE "_seiten_v_blocks_karten_cards" CASCADE;
  DROP TABLE "_seiten_v_blocks_karten" CASCADE;
  DROP TABLE "_seiten_v_blocks_ablauf_steps" CASCADE;
  DROP TABLE "_seiten_v_blocks_ablauf" CASCADE;
  DROP TABLE "_seiten_v_blocks_preistabelle" CASCADE;
  DROP TABLE "_seiten_v_blocks_angebotsliste" CASCADE;
  DROP TABLE "_seiten_v_blocks_personenraster" CASCADE;
  DROP TABLE "_seiten_v_blocks_oeffnungszeiten" CASCADE;
  DROP TABLE "_seiten_v_blocks_kontakt" CASCADE;
  DROP TABLE "_seiten_v_blocks_tabelle_rows" CASCADE;
  DROP TABLE "_seiten_v_blocks_tabelle" CASCADE;
  DROP TABLE "_seiten_v_blocks_akkordeon_items" CASCADE;
  DROP TABLE "_seiten_v_blocks_akkordeon" CASCADE;
  DROP TABLE "_seiten_v_blocks_dokumentenliste" CASCADE;
  DROP TABLE "_seiten_v_blocks_neue_news" CASCADE;
  DROP TABLE "_seiten_v_blocks_naechste_termine" CASCADE;
  DROP TABLE "_seiten_v_blocks_diesen_monat" CASCADE;
  DROP TABLE "_seiten_v" CASCADE;
  DROP TABLE "news" CASCADE;
  DROP TABLE "_news_v" CASCADE;
  DROP TABLE "termine" CASCADE;
  DROP TABLE "_termine_v" CASCADE;
  DROP TABLE "alben" CASCADE;
  DROP TABLE "alben_rels" CASCADE;
  DROP TABLE "_alben_v" CASCADE;
  DROP TABLE "_alben_v_rels" CASCADE;
  DROP TABLE "areale" CASCADE;
  DROP TABLE "areale_rels" CASCADE;
  DROP TABLE "_areale_v" CASCADE;
  DROP TABLE "_areale_v_rels" CASCADE;
  DROP TABLE "personen" CASCADE;
  DROP TABLE "_personen_v" CASCADE;
  DROP TABLE "ratgeber_months" CASCADE;
  DROP TABLE "ratgeber" CASCADE;
  DROP TABLE "ratgeber_rels" CASCADE;
  DROP TABLE "_ratgeber_v_version_months" CASCADE;
  DROP TABLE "_ratgeber_v" CASCADE;
  DROP TABLE "_ratgeber_v_rels" CASCADE;
  DROP TABLE "gartenangebote" CASCADE;
  DROP TABLE "_gartenangebote_v" CASCADE;
  DROP TABLE "dokumente" CASCADE;
  DROP TABLE "_dokumente_v" CASCADE;
  DROP TABLE "media" CASCADE;
  DROP TABLE "users_sessions" CASCADE;
  DROP TABLE "users" CASCADE;
  DROP TABLE "suche" CASCADE;
  DROP TABLE "suche_rels" CASCADE;
  DROP TABLE "redirects" CASCADE;
  DROP TABLE "redirects_rels" CASCADE;
  DROP TABLE "payload_kv" CASCADE;
  DROP TABLE "payload_locked_documents" CASCADE;
  DROP TABLE "payload_locked_documents_rels" CASCADE;
  DROP TABLE "payload_preferences" CASCADE;
  DROP TABLE "payload_preferences_rels" CASCADE;
  DROP TABLE "payload_migrations" CASCADE;
  DROP TABLE "navigation_items_children" CASCADE;
  DROP TABLE "navigation_items" CASCADE;
  DROP TABLE "navigation" CASCADE;
  DROP TABLE "hinweisbanner" CASCADE;
  DROP TABLE "fusszeile_legal_links" CASCADE;
  DROP TABLE "fusszeile_partner_links" CASCADE;
  DROP TABLE "fusszeile" CASCADE;
  DROP TABLE "vereinsdaten" CASCADE;
  DROP TABLE "konditionen_pachtarten" CASCADE;
  DROP TABLE "konditionen" CASCADE;
  DROP TABLE "oeffnungszeiten_regular" CASCADE;
  DROP TABLE "oeffnungszeiten_exceptions" CASCADE;
  DROP TABLE "oeffnungszeiten" CASCADE;
  DROP TYPE "public"."enum_seiten_blocks_hero_button_link_type";
  DROP TYPE "public"."enum_seiten_blocks_bild_text_image_position";
  DROP TYPE "public"."enum_seiten_blocks_hinweisbox_variant";
  DROP TYPE "public"."enum_seiten_blocks_karten_cards_link_type";
  DROP TYPE "public"."enum_seiten_blocks_angebotsliste_type";
  DROP TYPE "public"."enum_seiten_blocks_personenraster_group";
  DROP TYPE "public"."enum_seiten_blocks_dokumentenliste_category";
  DROP TYPE "public"."enum_seiten_blocks_naechste_termine_category";
  DROP TYPE "public"."enum_seiten_status";
  DROP TYPE "public"."enum__seiten_v_blocks_hero_button_link_type";
  DROP TYPE "public"."enum__seiten_v_blocks_bild_text_image_position";
  DROP TYPE "public"."enum__seiten_v_blocks_hinweisbox_variant";
  DROP TYPE "public"."enum__seiten_v_blocks_karten_cards_link_type";
  DROP TYPE "public"."enum__seiten_v_blocks_angebotsliste_type";
  DROP TYPE "public"."enum__seiten_v_blocks_personenraster_group";
  DROP TYPE "public"."enum__seiten_v_blocks_dokumentenliste_category";
  DROP TYPE "public"."enum__seiten_v_blocks_naechste_termine_category";
  DROP TYPE "public"."enum__seiten_v_version_status";
  DROP TYPE "public"."enum_news_status";
  DROP TYPE "public"."enum__news_v_version_status";
  DROP TYPE "public"."enum_termine_category";
  DROP TYPE "public"."enum_termine_status";
  DROP TYPE "public"."enum__termine_v_version_category";
  DROP TYPE "public"."enum__termine_v_version_status";
  DROP TYPE "public"."enum_alben_status";
  DROP TYPE "public"."enum__alben_v_version_status";
  DROP TYPE "public"."enum_areale_status";
  DROP TYPE "public"."enum__areale_v_version_status";
  DROP TYPE "public"."enum_personen_group";
  DROP TYPE "public"."enum_personen_status";
  DROP TYPE "public"."enum__personen_v_version_group";
  DROP TYPE "public"."enum__personen_v_version_status";
  DROP TYPE "public"."enum_ratgeber_months";
  DROP TYPE "public"."enum_ratgeber_category";
  DROP TYPE "public"."enum_ratgeber_status";
  DROP TYPE "public"."enum__ratgeber_v_version_months";
  DROP TYPE "public"."enum__ratgeber_v_version_category";
  DROP TYPE "public"."enum__ratgeber_v_version_status";
  DROP TYPE "public"."enum_gartenangebote_type";
  DROP TYPE "public"."enum_gartenangebote_verfuegbarkeit";
  DROP TYPE "public"."enum_gartenangebote_status";
  DROP TYPE "public"."enum__gartenangebote_v_version_type";
  DROP TYPE "public"."enum__gartenangebote_v_version_status";
  DROP TYPE "public"."enum_dokumente_category";
  DROP TYPE "public"."enum_dokumente_status";
  DROP TYPE "public"."enum__dokumente_v_version_category";
  DROP TYPE "public"."enum__dokumente_v_version_status";
  DROP TYPE "public"."enum_users_role";
  DROP TYPE "public"."enum_redirects_to_type";
  DROP TYPE "public"."enum_navigation_items_children_link_type";
  DROP TYPE "public"."enum_navigation_items_link_type";
  DROP TYPE "public"."enum_hinweisbanner_type";
  DROP TYPE "public"."enum_hinweisbanner_link_link_type";
  DROP TYPE "public"."enum_fusszeile_legal_links_link_type";
  DROP TYPE "public"."enum_fusszeile_partner_links_link_type";
  DROP TYPE "public"."enum_oeffnungszeiten_regular_day";`)
}
