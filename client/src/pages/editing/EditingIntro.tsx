import { PromptInput } from "../../components/PromptInput";
import './EditingIntro.css';

export function EditingIntro({ onSubmit }) {
  return (
    <div className="editing-intro">
      <h1>Fix <br />Reflective <br />Image</h1>

      <ul className="edit-prompts">
        <li>Is there anything in the image that <b>feels off or does not match</b> what you experienced?</li>
        <li>Are there any <b>details you want added or removed</b> to make the scene feel more accurate or meaningful?</li>
        <li>Do the characters or objects <b>look the way you imagined?</b> If not, what would you change about them?</li>
      </ul>

      <PromptInput placeholder={"Enter a description..."} onSubmit={onSubmit} disabled={undefined}/>
    </div>
  );
}