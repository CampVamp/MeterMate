// Profile.jsx
import "./Profile.css";

const Profile = () => {
  return (
    <div className="profile-container">
      <div className="profile-box">
        <div className="profile-header">
          <h2>My Profile</h2>
          <button className="edit-btn">Edit</button>
        </div>
        <div className="profile-info">
          <div className="profile-picture"></div>
          <h3>Mr. Sanjay Ramasamy</h3>
          <p className="profile-id">GP654337</p>
          <hr />
          <div className="profile-details">
            <p>
              <strong>Location:</strong> 123, Vinayagar Kovil street, Chennai
            </p>
            <p>
              <strong>Email Id:</strong> sanjayramasamy123@gmail.com
            </p>
            <p>
              <strong>Phone No:</strong> 9876541237
            </p>
            <p>
              <strong>Alternate No:</strong> 789456123
            </p>
            <p>
              <strong>Tamper Record:</strong> 1
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
