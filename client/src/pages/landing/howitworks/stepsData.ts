import HistoryImage from '../../../assets/images/history.png';
import GalleryImage from '../../../assets/images/gallery.png';
import ChatbotImage from '../../../assets/images/chatbot.png';
import SearchIcon from '../../../assets/icons/search-icon.svg';
import UploadIcon from '../../../assets/icons/upload-icon.svg';
import ReflectIcon from '../../../assets/icons/reflect-icon-black.svg';

export const steps = [
  {
    title: "Bring your watch history",
    description: "Upload your YouTube watch history and let Reflexia analyze your viewing to identify recurring topics, themes, interests, and moods.",
    image: HistoryImage,
    icon: UploadIcon
  },
  {
    title: "See your patterns",
    description: "Reflexia generates textual and visual summaries based on the analyzed data, making your viewing patterns easier to explore and reflect on.",
    image: GalleryImage,
    icon: SearchIcon
  },
  {
    title: "Reflect with AI",
    description: "Chat with your AI reflection companion to dig deeper into what you notice, ask questions, and gain new insights into your media habits.",
    image: ChatbotImage,
    icon: ReflectIcon
  }
]

