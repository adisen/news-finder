import React from "react";
import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <nav className='navbar navbar-dark bg-dark'>
      <div className='container'>
        <Link className='navbar-brand' to='/'>
          News Search
        </Link>
        {/* <button
        class='navbar-toggler'
        type='button'
        data-toggle='collapse'
        data-target='#navbarText'
        aria-controls='navbarText'
        aria-expanded='false'
        aria-label='Toggle navigation'>
        <span class='navbar-toggler-icon'></span>
      </button> */}
        {/* <div class='navbar' id='navbarText'>
          <ul class='navbar-nav mr-auto'>
            <li class='nav-item active'>
              <Link class='nav-link' href='#'>
                Home <span class='sr-only'>(current)</span>
              </Link>
            </li>
            <li class='nav-item'>
              <Link class='nav-link' to='/about'>
                About
              </Link>
            </li>
          </ul>
        </div> */}
      </div>
    </nav>
  );
};

export default NavBar;
