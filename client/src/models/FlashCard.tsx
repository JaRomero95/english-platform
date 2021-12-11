export default interface FlashCard {
  id?: number;
  visible: boolean;
  question_text: string;
  question_img_url: string;
  question_font_scale_percent: number;
  answer_text: string;
  answer_img_url: string;
  answer_font_scale_percent: number;
  flash_card_category_id: number | null;
  last_answer_datetime?: string | null;
}
