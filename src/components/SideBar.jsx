import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import '../css/Sidebar.css';
import { AuthContext } from './AuthProvider';

function SideBar() {
  const { isAuth, setIsAuth } = useContext(AuthContext);

  return (
    <div>
      <nav className="sidebar">
        <div>
          <h5>SocialBee</h5>
        </div>
        {isAuth && (
          <>
            <div>
              <Link to="/">
                <div className="icon-text-container">
                <span className="material-symbols-rounded">
home
</span>
                  <div>Home</div>
                </div>
              </Link>
            </div>
            <div>
              <Link to="/profile">
                <div className="icon-text-container">
                  <span className="material-symbols-rounded">account_circle</span>
                  <div>Profile</div>
                </div>
              </Link>
            </div>
            <div>
              <Link to="/create">
                <div className="icon-text-container">
                  <span className="material-symbols-rounded">add_circle</span>
                  <div>Create</div>
                </div>
              </Link>
            </div>
            <div>
              <Link to="/search">
                <div className="icon-text-container">
                  <span className="material-symbols-rounded">search</span>
                  <div>Search</div>
                </div>
              </Link>
            </div>
            <Link
              to="/login"
              onClick={() => {
                localStorage.removeItem('token');
                localStorage.removeItem('userId')
                setIsAuth(false);
              }}
            >
              <div className="icon-text-container">
                <span className="material-symbols-rounded">logout</span>
                <div>Logout</div>
              </div>
            </Link>
          </>
        )}
        {!isAuth && (
          <>
            <div>
              <Link to="/login">
                <div className="icon-text-container">
                  <span className="material-symbols-rounded">login</span>
                  <div>Login</div>
                </div>
              </Link>
            </div>
            <div>
              <Link to="/register">
                <div className="icon-text-container">
                  <span className="material-symbols-rounded">how_to_reg</span>
                  <div>Signup</div>
                </div>
              </Link>
            </div>
          </>
        )}
      </nav>
    </div>
  );
}

export default SideBar;
