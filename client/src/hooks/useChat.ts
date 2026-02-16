import { useState, useCallback } from "react";
import type { ChatMessage } from "../types/chat";
import { sendReflectionMessage } from "../api/reflection";

export function useChat(insightId: string, step: number) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [botLoading, setBotLoading] = useState(false);

  const hydrate = useCallback((savedMessages) => {
    setMessages(
      savedMessages.map(message => ({
        id: crypto.randomUUID(),
        role: message.role,
        content: message.content
      }))
    )
  }, []);

  async function sendMessage(message: string) {
    const content = message.trim();
    if (!content) return;

    const userMessage: ChatMessage = {
        id: crypto.randomUUID(),
        role: "user",
        content
      };
    
    setMessages(prevMessages => [...prevMessages, userMessage]);

    setBotLoading(true);

    try {
      const reply = await sendReflectionMessage(content, step, insightId);

      const botMessage: ChatMessage = {
        id: crypto.randomUUID(),
        role: "system",
        content: reply
      }

      setMessages(prevMessages => [...prevMessages, botMessage]);
    } catch {
      setMessages(prevMessages => [
        ...prevMessages,
        {
          id: crypto.randomUUID(),
          role: "system",
          content: "Something went wrong"
        }
      ]);
    } finally {
      setBotLoading(false);
    }
  }

  function resetChat() {
    setMessages([]);
  }

  return { messages, botLoading, sendMessage, resetChat,hydrate };
}