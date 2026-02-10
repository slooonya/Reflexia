export type Insight = {
  id: string;
  period_type: "week" | "month";
  period_label: string;
  period_start: string;
  period_end: string;
  summary: string;
  image_url: string;
};