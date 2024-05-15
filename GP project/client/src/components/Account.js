import React, {useState} from 'react';
import '../CssFiles/Account.css';

function Account() {
    const [isEditingUsername, setIsEditingUsername] = useState(false);
    const [isEditingPassword, setIsEditingPassword] = useState(false);
    const [currentUsername, setCurrentUsername] = useState('omar');
    const [newUsername, setNewUsername] = useState('');
    const [currentPassword, setCurrentPassword] = useState('*******');
    const [newPassword, setNewPassword] = useState('');
  
    const handleSaveUsername = () => {
      setCurrentUsername(newUsername);
      setIsEditingUsername(false);
    };
  
    const handleSavePassword = () => {
      setCurrentPassword(newPassword);
      setIsEditingPassword(false);
    };
    
    return (
        <div className="pageAcc">
          <h1 className="titleAcc">Account Management</h1>
          <div className="info">
            {!isEditingUsername && !isEditingPassword && (
              <>
                <div className="inputRow">
                  <label className="labelAcc usernameLabel">Username:</label>
                  <input readOnly className="inputAcc userName" value={"omar"} />
                  <button className="changeButton" onClick={() => setIsEditingUsername(true)}>Change</button>
                </div>
                <div className="inputRow">
                  <label className="labelAcc passwordLabel">Password:</label>
                  <input readOnly className="inputAcc passWord" value={"******"} />
                  <button className="changeButton" onClick={() => setIsEditingPassword(true)}>Change</button>
                </div>
                <div className="inputRow">
                  <label className="labelAcc emailLabel">E-mail:</label>
                  <input readOnly className="inputAcc emailAcc" value="omar@gmail.com" />
                </div>
              </>
            )}
    
            {isEditingUsername && (
              <>
                <div className="inputRow">
                  <label className='labelAcc'>Current Username:</label>
                  <input className="inputAcc userName" value={currentUsername} />
                </div>
                <div className="inputRow">
                  <label className='labelAcc'>New Username:</label>
                  <input className="inputAcc userName" value={newUsername} onChange={(e) => setNewUsername(e.target.value)} />
                </div>
                <div className="inputRow inputRowBottom">
                  <button className="saveButton" onClick={handleSaveUsername}>Save</button>
                  <button className="backButton" onClick={() => setIsEditingUsername(false)}>Back</button>
                </div>
              </>
            )}
    
            {isEditingPassword && (
              <>
                <div className="inputRow">
                  <label className='labelAcc'>Current Password:</label>
                  <input className="inputAcc passWord" readOnly value={currentPassword} />
                </div>
                <div className="inputRow">
                  <label className='labelAcc'>New Password:</label>
                  <input className="inputAcc passWord" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
                </div>
                <div className="inputRow inputRowBottom">
                  <button className="saveButton" onClick={handleSavePassword}>Save</button>
                  <button className="backButton" onClick={() => setIsEditingPassword(false)}>Back</button>
                </div>
              </>
            )}
          </div>
        </div>
      );
}

export default Account;