import React, { useState } from 'react';
import './App.css';
import { Input, Button } from 'antd';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

function ScreenHome(props) {

  const [signUpUsername, setSignUpUsername] = useState();
  const [signUpEmail, setSignUpEmail] = useState();
  const [signUpPassword, setSignUpPassword] = useState();

  const [userExists, setUserExists] = useState(false);

  const [signInEmail, setSignInEmail] = useState();
  const [signInPassword, setSignInPassword] = useState();

  var handleSubmitSignUp = async () => {
    const data = await fetch('/sign-up', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body:
        `usernameFrontFront=${signUpUsername}&emailFrontFront=${signUpEmail}&passwordFrontFront=${signUpPassword}`
    });

    const body = await data.json();
    if (body.result == true) {
      setUserExists(true);
      props.addToToken(body.token);
    }
  }

  var handleSubmitSignIn = async () => {
    const data = await fetch('/sign-in', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body:
        `emailFrontFront=${signInEmail}&passwordFrontFront=${signInPassword}`
    });

    const body = await data.json();
    if (body.result === true) {
      setUserExists(true);
      props.addToToken(body.token);
    }
  }

  if (userExists) {
    return <Redirect to='/screensource' />
  }

  return (
    <div className="Login-page" >
      {/* SIGN-IN */}
      <div className="Sign">
        <Input className="Login-input" placeholder="arthur@lacapsule.com"
          onChange={(e) => setSignInEmail(e.target.value)}
          value={signInEmail}
        />
        <Input.Password className="Login-input" placeholder="password"
          onChange={(e) => setSignInPassword(e.target.value)}
          value={signInPassword}
        />
        <Button onClick={() => handleSubmitSignIn()} style={{ width: '80px' }} type="primary">Sign-in</Button>
      </div>

      {/* SIGN-UP */}
      <div className="Sign">
        <Input className="Login-input" placeholder="arthur@lacapsule.com"
          onChange={(e) => setSignUpEmail(e.target.value)}
          value={signUpEmail}
        />
        <Input className="Login-input" placeholder="Arthur G"
          onChange={(e) => setSignUpUsername(e.target.value)}
          value={signUpUsername}
        />
        <Input.Password className="Login-input" placeholder="password"
          onChange={(e) => setSignUpPassword(e.target.value)}
          value={signUpPassword}
        />
        <Button onClick={() => handleSubmitSignUp()} style={{ width: '80px' }} type="primary">Sign-up</Button>
      </div>
    </div>
  );
}

function mapDispatchToProps(dispatch) {
  return {
    addToToken: function (token) {
      dispatch({ type: 'addToken', token: token });
    }
  }
}

export default connect(
  null,
  mapDispatchToProps
)(ScreenHome);

   //export default ScreenHome
