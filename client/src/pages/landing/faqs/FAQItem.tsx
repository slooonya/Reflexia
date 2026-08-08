import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import AddIcon from "../../../assets/icons/add-icon.svg?react";

import './FAQItem.css';

export function FAQItem({ question, answer }) {
  const [open, setOpen] = useState(false);

  return (
    <motion.div className="faq-item">
      <button className="question" onClick={() => setOpen(!open)}>
        <span>{question}</span>

        <motion.span className="faq-icon" animate={{ rotate: open ? 45 : 0 }} transition={{ duration: 0.2 }}>
          <AddIcon className="faq-icon-svg" />
        </motion.span>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div className="answer" initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} 
                      exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.2 }} layout >
            <p>{answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}