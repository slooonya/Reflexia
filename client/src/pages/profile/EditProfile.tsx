import './EditProfile.css';

export function EditProfile() {
  return (
    <>
      <div className="pfp-controls">
        <div className="pfp-upload">
          <label htmlFor="upload">
            <input type="file" id="upload" accept="image/*"/>
            <span>Update Photo</span>
          </label>
        </div>
        
        <div className="pfp-remove">
          <button>Remove Image</button>
        </div>
      </div>

      <div className="text-fields">
        <input type="text" placeholder="Username" />
        <input type="text" placeholder="Email"/>
        <input type="text" placeholder="Password"/>
        <input type="text" placeholder="Confirm Password" />
      </div>

      <button className="confirm-btn">Confirm Changes</button>
    </>
  );
}