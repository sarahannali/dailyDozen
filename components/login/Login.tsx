import React from 'react';
import Image from 'next/image';
import { Button, Typography, Row } from 'antd';
import {
  GoogleAuthProvider, signInWithPopup,
} from 'firebase/auth';
import { auth } from '../../firebase/clientApp';
import classes from './login.module.css';

const { Title, Text } = Typography;

function Login() {
  console.log(auth);
  const provider = new GoogleAuthProvider();

  const handleLogIn = (): void => {
    signInWithPopup(auth, provider)
      .then((result) => {
        console.log(result.user);
      });
  };
  return (
    <div style={{
      height: '100vh', overflow: 'hidden', position: 'relative', backgroundColor: '#f2f9ff',
    }}
    >
      <div className={classes.background}>
        <div className={classes.blob2}>
          <Image src="/svgs/blob2.svg" height={700} width={700} />
        </div>
      </div>
      <div className={classes.background}>
        <div className={classes.blob1}>
          <Image src="/svgs/blob1.svg" height={700} width={700} />
        </div>
      </div>
      <div className={classes.fullScreen}>
        <div className={classes.loginModal}>
          <div>
            <Row justify="center" style={{ marginBottom: '10px' }}>
              <Image src="/images/Icon.png" height={100} width={100} />
            </Row>
            <Row justify="center">
              <Title level={1}>Daily Dozen Meal Planner</Title>
            </Row>
            <Row>
              <Text>
                A meal planning website that integrates plant-based recipes with the
                {' '}
                <a href="https://nutritionfacts.org/daily-dozen-challenge/">Daily Dozen</a>
                {' '}
                nutrition guide.
              </Text>
            </Row>
            <Row justify="center">
              <Button
                icon={(
                  <span className={classes.loginIconDiv}>
                    <Image src="/svgs/GoogleIcon.svg" height={50} width={50} className={classes.loginIcon} />
                  </span>
              )}
                className={classes.loginButton}
                onClick={(ev) => {
                  ev.preventDefault();
                  handleLogIn();
                }}
              >
                <span className={classes.loginText}>
                  Sign in with Google
                </span>
              </Button>
            </Row>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;