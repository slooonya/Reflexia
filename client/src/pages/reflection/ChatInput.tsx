import { PromptInput } from "../../components/PromptInput";

export function ChatInput({ placeholder, chatMessages, setChatMessages, setHasStarted }) {

  function sendMessage(message) {
    setHasStarted(true);

    const newChatMessages = [
      ...chatMessages,
      {
        id: crypto.randomUUID(),
        sender: "user",
        message: message
      }
    ];
    
    setChatMessages(newChatMessages);

    setChatMessages([
      ...newChatMessages,
      {
        id: crypto.randomUUID(),
        sender: "bot",
        message: "beep boop"
      }
    ]);
  }

  return (
    <PromptInput placeholder={placeholder} onSubmit={sendMessage}/>
  );
}