export default interface FlashCard {
  id?: number;
  question_text: string;
  question_img_url: string;
  answer_text: string;
  answer_img_url: string;
  flash_card_category_id: number | null;
  last_answer_datetime?: string | null;
}
