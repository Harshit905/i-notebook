// import './App.css';
// import {
//   BrowserRouter as Router,
//   Switch,
//   Route,
//   Link
// } from "react-router-dom";
// import Navbar from './components/Navbar';
// import Home from './components/Home';
// import About from './components/About';
// function App() {
//   return (
//     <>
//       <Router>
//         <Navbar />
//         <Switch>
//           <Route path="/">
//             <Home />
//           </Route>
//           <Route exact path="/about">
//             <About />
//           </Route>

//         </Switch>
//       </Router>

//     </>
//   );
// }

// export default App;


import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import React,{ useState} from 'react'
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import Alert from './components/Alert';
import Contact from './components/Contact';
import NoteState from './context/notes/NoteState';
import Signup from './components/Signup';
import Login from './components/Login';

function App() {
  const [alert, setAlert] = useState(null);

  const showAlert = (message, type)=>{
      setAlert({
        msg: message,
        type: type
      })
      setTimeout(() => {
          setAlert(null);
      }, 1500);
  }

  return (
    <NoteState>
    <Router>
        <Navbar />
        <Alert alert={alert}/>
        <div className='container-fluid'>
        <Switch>
          {/* <Route exact path="/" showAlert={showAlert}  component={Home}/> */}
          <Route exact path="/" render={() => <Home showAlert={showAlert} />} />
          <Route exact path="/about" component={About}/>
          {/* <Route exact path="/services" component={Services}/> */}
          <Route exact path="/contact" component={Contact}/>
          {/* <Route exact path="/login" showAlert={showAlert}  component={Login}/> */}
          {/* <Route exact path="/signup" showAlert={showAlert} component={Signup}/> */}
          
           <Route exact path="/login" render={() => <Login showAlert={showAlert} />} />
            <Route exact path="/signup" render={() => <Signup showAlert={showAlert} />} />
        </Switch>
        </div>
    </Router>
    </NoteState>
  );
}

export default App;
