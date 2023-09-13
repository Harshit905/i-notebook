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
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import Alert from './components/Alert';
import Contact from './components/Contact';
import NoteState from './context/notes/NoteState';

function App() {
  return (
    <NoteState>
    <Router>
        <Navbar />
        <Alert message={"this is harsh"}/>
        <div className='container-fluid'>
        <Switch>
          <Route exact path="/" component={Home}/>
          <Route exact path="/about" component={About}/>
          {/* <Route exact path="/services" component={Services}/> */}
          <Route exact path="/contact" component={Contact}/>
          {/* <Route exact path="/login" component={Login}/> */}
          
        </Switch>
        </div>
    </Router>
    </NoteState>
  );
}

export default App;
