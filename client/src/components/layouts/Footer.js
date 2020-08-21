import React from "react";
import { Link } from "react-router-dom";
import moment from "moment";

const Footer = () => {
  return (
    <footer className='text-light pt-4 pb-4'>
      <div className='container'>
        <div className='row'>
          <div className='col-lg col-sm-12'>
            <h6>
              Made with <i className='fas fa-heart text-danger'></i> &#169;{" "}
              {moment(Date.now()).format("YYYY")} Newz Jacker
            </h6>
            <div>
              <Link to='' className='text-light mr-3'>
                Terms of Service
              </Link>
              <Link to='' className='text-light'>
                Privacy Policy
              </Link>
            </div>
          </div>
          {/* <div className='col-lg col-sm-12 text-right mt-4'>
            <a href='!#'>
              <i className='fab fa-facebook-square fa-3x mr-3'></i>
            </a>
            <a href='!#'>
              <i className='fab fa-twitter-square fa-3x mr-3'></i>
            </a>
            <a href='!#'>
              <i className='fab fa-linkedin fa-3x'></i>
            </a>
          </div>*/}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
