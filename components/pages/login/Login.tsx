import React, { useState, useContext } from 'react';
import Image from 'next/image';
import {
  Button, Typography, Row, Spin,
} from 'antd';
import {
  GoogleAuthProvider, signInWithPopup,
} from 'firebase/auth';
import Head from 'next/head';
import { auth } from 'firebase/clientApp';
import { AuthContext } from 'components/contexts/AuthContext';
import classes from 'components/css/login.module.css';

const { Title, Text } = Typography;

function Login() {
  const [loading, setLoading] = useState(false);
  const { setUser } = useContext(AuthContext);

  const provider = new GoogleAuthProvider();

  const handleLogIn = (): void => {
    setLoading(true);

    signInWithPopup(auth, provider)
      .then((result) => {
        if (setUser) {
          setUser(result.user);
          setLoading(false);
        }
      })
      .catch(() => {
        setLoading(false);
      });
  };

  const loginIcon = (
    <span className={classes.loginIconDiv}>
      <Image src="/svgs/GoogleIcon.svg" height={50} width={50} className={classes.loginIcon} />
    </span>
  );

  return (
    <div className={classes.loginDiv}>
      <Head>
        <title>Meal Planner</title>
        <link rel="icon" href="/images/Icon.png" />
      </Head>
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
      <div />
      <Spin spinning={loading} size="large" className={classes.spin}>
        <div className={classes.fullScreen}>
          <div className={classes.loginModal}>
            <div>
              <Row justify="center" className={classes.iconRow}>
                <Image src="/images/Icon.png" height={100} width={100} />
              </Row>
              <Row justify="center">
                <Title level={1}>Daily Dozen Meal Planner</Title>
              </Row>
              <Row>
                <Text>
                  A meal planning website that integrates plant-based recipes with the
                  {' '}
                  <a
                    href="https://nutritionfacts.org/daily-dozen-challenge/"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Daily Dozen
                  </a>
                  {' '}
                  nutrition guide.
                </Text>
              </Row>
              <Row justify="center">
                <Button
                  icon={loginIcon}
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
      </Spin>
    </div>
  );
}

export default Login;
