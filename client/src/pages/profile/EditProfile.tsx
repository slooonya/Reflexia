import { Button } from '../../components/Button';
import './EditProfile.css';

export function EditProfile() {
  return (
    <>
      <div className="pfp-controls">
        <div className="pfp-upload">
          <label htmlFor="upload" className="btn primary">
            <input type="file" id="upload" accept="image/*"/>
            <span>Update Photo</span>
          </label>
        </div>
        
        <div className="pfp-remove">
          <Button variant="secondary">Remove Image</Button>
        </div>
      </div>

      <div className="text-fields">
        <input type="text" placeholder="Username" />
        <input type="text" placeholder="Email"/>
        <input type="text" placeholder="Password"/>
        <input type="text" placeholder="Confirm Password" />
      </div>

      <Button>Confirm Changes</Button>
    </>
  );
}