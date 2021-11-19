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

ActiveRecord::Schema.define(version: 2021_11_19_201017) do

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
  end

  add_foreign_key "irregular_verb_users", "irregular_verbs"
  add_foreign_key "irregular_verb_users", "users"
end
