import { useState } from "react";
import type { ChatMessage } from "../types/chat";
// import { sendReflectionMessage } from "../api/reflection";

export function useChat() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [botLoading, setBotLoading] = useState(false);

  async function sendMessage(message) {
    const userMessage: ChatMessage = {
        id: crypto.randomUUID(),
        sender: "user",
        message: message
      };
    
    setMessages(prevMessages => [...prevMessages, userMessage]);

    setBotLoading(true);

    try {
      // const reply = await sendReflectionMessage(message);

      const botMessage: ChatMessage = {
        id: crypto.randomUUID(),
        sender: "bot",
        message: "beep boop" // reply.data.reply
      }

      setMessages(prevMessages => [...prevMessages, botMessage]);
    } catch {
      setMessages(prevMessages => [
        ...prevMessages,
        {
          id: crypto.randomUUID(),
          sender: "bot",
          message: "Something wend wrong"
        }
      ]);
    } finally {
      setBotLoading(false);
    }
  }

  function resetChat() {
    setMessages([]);
  }

  return { messages, botLoading, sendMessage, resetChat };
}