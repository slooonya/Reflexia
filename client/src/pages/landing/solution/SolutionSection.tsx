import ProblemImage from '../../../assets/images/test-image6.png';
import SolutionImage from '../../../assets/images/test-image2.jpg';
import './SolutionSection.css';

export function SolutionSection() {
  return (
    <section className="solution" id="solution">
      <div className="solution-top">
        <h2>Internet Bad</h2>
        <p>Go touch some grass.</p>
      </div>

      <div className="problem-solution-container">
        <div className="wide-polaroid">
          <img src={ProblemImage} alt="" />
          <h3>The pain point</h3>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui quos dolores distinctio provident cupiditate itaque aliquam? Quibusdam neque sunt necessitatibus quaerat aliquid optio? Distinctio nemo deleniti, animi praesentium maxime tempore.</p>
        </div>

        <div className="wide-polaroid">
          <img src={SolutionImage} alt="" />
          <h3>The solution</h3>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis nulla quidem distinctio vero, tempore praesentium maiores quasi quis ea nihil repudiandae temporibus. Tenetur in maxime optio exercitationem facere, rerum repellendus!</p>
        </div>
      </div>
      

    </section>
  );
}