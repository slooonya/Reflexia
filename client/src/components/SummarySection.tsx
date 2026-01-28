import { Link } from 'react-router';
import EditIcon from '../assets/icons/edit-icon.svg';
import ReflectIcon from '../assets/icons/reflect-icon.svg';
import './SummarySection.css';

export function SummarySection() {
  return (
    <div className="summary-container">
      <h1>Summary</h1>
      <hr />
      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Placeat cum perspiciatis nihil nesciunt aut? Similique laudantium doloribus voluptatum voluptatem, qui quam delectus illum assumenda aut laboriosam, in omnis dignissimos et!

      Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium minima atque aliquam hic ratione esse explicabo minus quam, obcaecati, deserunt neque vel doloribus odit reprehenderit? Enim error quos libero nostrum.
        
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloremque nulla dolorem laborum soluta dolor odit debitis reprehenderit laudantium eaque, voluptate repellendus. Quo adipisci tempora expedita provident laboriosam cumque, tenetur quia.
      
      Lorem ipsum dolor sit amet consectetur, adipisicing elit. Iusto pariatur itaque cumque, assumenda consequuntur distinctio tempora qui hic illo ipsam deleniti quas. Rerum repellat inventore in vitae dolorum non saepe?
      
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis dolor nihil nisi, dicta saepe impedit dolorem in consequuntur fugiat quis? Perspiciatis labore modi repudiandae. Delectus ea voluptatum numquam perspiciatis tempore.
      </p>

      <div className="action-btns">
        <Link to="/editing" className="action-btn">
          <img src={EditIcon}></img>
          <span>Edit</span>
        </Link>

        <Link to="/reflection" className="action-btn">
          <img src={ReflectIcon}></img>
          <span>Reflect</span>
        </Link>
      </div>
    </div>
  );
}