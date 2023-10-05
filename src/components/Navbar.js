import React,{ useState ,useEffect} from 'react';
import {Link,useLocation} from "react-router-dom";
import './Navbar.css'; 
const Navbar = () => {
    const [isNavOpen, setIsNavOpen] = useState(false);

    const togglerClick = () => {
      setIsNavOpen(!isNavOpen);
    };
  
    const navLinkClick = () => {
      if (isNavOpen) {
        togglerClick();
      }
    };

    let location = useLocation();

    React.useEffect(() => {
    //  console.log(location.pathname)
    }, [location]);
  
    return (
        <header className={`header-area ${isNavOpen ? 'nav-open' : ''}`}>
        <div className="navbar-area">
          <div className="container-fluid">
            <nav className={`site-navbar ${isNavOpen ? 'nav-open' : ''}`}>
              <Link to="/" className="site-logo">i-Notebook</Link>
              <ul className={`site-nav ${isNavOpen ? 'open' : ''}`}>
                <li><Link to="/" className={`${location.pathname==="/"?"active-nav":""}`} ><i className="fa-solid fa-house-user"></i>  Home</Link></li>
                <li><Link  to="/about" className={`${location.pathname==="/about"?"active-nav":""}`}><i className="fa fa-file" ></i>  About</Link></li>
                <li><Link  to="/service" className={`${location.pathname==="/service"?"active-nav":""}`}><i className="fa fa-cogs" ></i>  Service</Link></li>
                <li><Link  to="/contact" className={`${location.pathname==="/contact"?"active-nav":""}`}><i className="fa fa-envelope" ></i>  Contact</Link></li>
              </ul>
              <form className='d-flex mx-2'>
                <Link   to="/login" className="mx-1"><i className="fa fa-sign-in"></i>Login</Link>
                <Link  to="/signup" className="mx-1"><i className="fa-solid fa-user-plus"></i>&nbsp;SignUp</Link>
                </form>
              <button className={`nav-toggler ${isNavOpen ? 'toggler-open' : ''}`} onClick={togglerClick}>
                <span></span>
              </button>
            </nav>
          </div>
        </div>
      </header>
    )
}

export default Navbar;
