import ProblemImage from '../../../assets/images/problem.png';
import SolutionImage from '../../../assets/images/solution.png';
import './SolutionSection.css';

export function SolutionSection() {
  return (
    <section className="solution" id="solution">
      <div className="solution-top">
        <h2>There's more to <br></br>what we watch</h2>
        <p>Reflexia helps you notice it</p>
      </div>

      <div className="problem-solution-container">
        <div className="wide-polaroid">
          <img src={ProblemImage} alt="" />
          <h3>We consume. We move on</h3>
          <p>We watch videos, follow recommendations, and move from one piece of content to the next, often without giving much thought to what we're consuming. With so much content flowing by, it's easy to lose track of our habits and whether what we're consuming is actually good for us.</p>
        </div>

        <div className="wide-polaroid">
          <img src={SolutionImage} alt="" />
          <h3>A clearer picture</h3>
          <p>Reflexia brings your YouTube viewing together into summaries and visual representations, making your media habits easier to see and understand. You can explore them with an AI reflection companion, who helps you examine what stands out and reflect on whether your media habits support your wellbeing.
            </p>
        </div>
      </div>
    </section>
  );
}