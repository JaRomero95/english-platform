# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2021_12_11_175749) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "flash_card_categories", force: :cascade do |t|
    t.integer "user_id", null: false
    t.string "name"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["user_id"], name: "index_flash_card_categories_on_user_id"
  end

  create_table "flash_cards", force: :cascade do |t|
    t.text "question_text", default: ""
    t.string "question_img_url", default: ""
    t.text "answer_text", default: ""
    t.string "answer_img_url", default: ""
    t.integer "user_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.integer "flash_card_category_id"
    t.datetime "last_answer_datetime"
    t.integer "question_font_scale_percent", default: 50
    t.integer "answer_font_scale_percent", default: 50
    t.index ["flash_card_category_id"], name: "index_flash_cards_on_flash_card_category_id"
    t.index ["user_id"], name: "index_flash_cards_on_user_id"
  end

  create_table "irregular_verb_users", force: :cascade do |t|
    t.integer "user_id", null: false
    t.integer "irregular_verb_id", null: false
    t.integer "answers", default: 0
    t.integer "correct_answers", default: 0
    t.integer "wrong_answers", default: 0
    t.datetime "last_answer_datetime"
    t.string "last_answer_result"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["irregular_verb_id"], name: "index_irregular_verb_users_on_irregular_verb_id"
    t.index ["user_id"], name: "index_irregular_verb_users_on_user_id"
  end

  create_table "irregular_verbs", force: :cascade do |t|
    t.string "base"
    t.string "past_tense"
    t.string "past_participle"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "users", force: :cascade do |t|
    t.string "email"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.string "password_digest"
  end

  add_foreign_key "flash_card_categories", "users"
  add_foreign_key "flash_cards", "flash_card_categories"
  add_foreign_key "flash_cards", "users"
  add_foreign_key "irregular_verb_users", "irregular_verbs"
  add_foreign_key "irregular_verb_users", "users"
end
