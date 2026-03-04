import { FAQItem } from './FAQItem';
import { faqs } from './faqsData';

import './FAQsSection.css';

export function FAQsSection() {

  return (
    <section className="faqs" id="faqs">
      <div className="faqs-left">
        <h2>Frequently Asked Questions</h2>
        <p>Got questions? We've got the answers to help you get started smoothly.</p>
      </div>

      <div className="faqs-right">
        {faqs.map((faq, index) => (
          <FAQItem key={index} question={faq.question} answer={faq.answer}/>
        ))}
      </div>
    </section>
  );
}