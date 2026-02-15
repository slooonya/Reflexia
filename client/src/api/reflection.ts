import axios from "axios";

export async function sendReflectionMessage(message: string) {
  const response = await axios.post("/api/reflection/chat", { message });
  return response.data.reply;
}