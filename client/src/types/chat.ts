export type ChatMessage = {
  id: string;
  role: "user" | "system";
  content: string;
}; 