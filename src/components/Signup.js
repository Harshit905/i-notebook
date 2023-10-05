import React, { useState } from 'react'
import { Link,useHistory } from 'react-router-dom'
import './Login.css';;
const Signup = (props) => {
  
  const [credentials, setCredentials] = useState({ name: "", email: "", password: "", cpassword: "" })
  let history = useHistory();
  const handleSubmit = async (e) => {
    const { name, email, password } = credentials;
    e.preventDefault();
    const response = await fetch("http://localhost:5000/api/auth/createuser", {

      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name, email, password })
    });
    const json = await response.json()
    console.log(json);
    if (json.success) {
      // Save the auth token and redirect
      localStorage.setItem('token', json.authtoken);
      history.push("/");
      props.showAlert("Account Created Successfully","success")
    }
    else {
      props.showAlert("Email Already Exists","danger")
    }
  }

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value })
  }
  return (
    <form onSubmit={handleSubmit}>
      <div class="login1">
        <img id="avatar" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQMr_Ky37u_30imoav7-kzi01LCBOh88WP6hu2r3IkXUJaQsWexdA" alt="avatar" />
        <p className='p_login'><b>Member Signup</b></p>
        <input type="name" value={credentials.name} onChange={onChange} placeholder="Enter your Name" class="login" name="name" id="name" autoFocus required /><br /><br />
        <input type="email" value={credentials.email} onChange={onChange} placeholder="Enter your Email ID" class="login" name="email" id="em" required /><br /><br />
        <input type="password" value={credentials.password} onChange={onChange} placeholder="Enter Password" class="login" name="password" id="password" minLength={5} required /><br /> <br />
        {/* <input type="password" value={credentials.cpassword} onChange={onChange} placeholder="Confirm Password" class="login" name="cpassword" id="cpassword" minLength={5} required /><br /> <br /> */}
        {/* <input type="checkbox" class="login" id="remem" /> <label id="login1">Remember me!</label><br /><br /> */}
        <input type="submit" class="login" id="signin" name="signin" value="Sign Up" /><br />
        <p className='p_login'>Already Have Account?<Link to="/login"> Login</Link></p>
      </div>
    </form>
  )
}

export default Signup
