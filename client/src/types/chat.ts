export type ChatMessage = {
  id: string;
  sender: "user" | "bot";
  message: string;
}; 