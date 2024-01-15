// npm install @tsparticles/react // JavaScript
// npm install @tsparticles/react @tsparticles/engine // TypeScript
// npm install tsparticles react-tsparticles // Old edition

import React, { useEffect, useMemo, useState } from 'react';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Form, Input } from 'antd'; // Checkbox
import './login.less';
// import Particles, { initParticlesEngine } from "@tsparticles/react"; // particles背景粒子效果
// import Particles from "react-tsparticles"; // npm i tsparticles@2.0.6
// import { loadAll } from "@/tsparticles/all"; // if you are going to use `loadAll`, install the "@tsparticles/all" package too.
// import { loadFull } from "tsparticles"; // if you are going to use `loadFull`, install the "tsparticles" package too.
// import { loadSlim } from "@tsparticles/slim"; // if you are going to use `loadSlim`, install the "@tsparticles/slim" package too.
// import { loadBasic } from "@tsparticles/basic"; // if you are going to use `loadBasic`, install the "@tsparticles/basic" package too.

const Login = () => {
  const onFinish = (values) => {
    console.log('Received values of form: ', values); // 控制台输出确认输入的账号密码
  };
  /*
  const [init, setInit] = useState(false); // particles背景粒子效果
  // this should be run only once per application lifetime
  useEffect(() => {
    initParticlesEngine(async (engine) => {
      // you can initiate the tsParticles instance (engine) here, adding custom shapes or presets
      // this loads the tsparticles package bundle, it's the easiest method for getting everything ready
      // starting from v2 you can add only the features you need reducing the bundle size
      // await loadAll(engine);
      // await loadFull(engine);
      await loadSlim(engine);
      // await loadBasic(engine);
    }).then(() => {
      setInit(true);
      console.log('init')
    });
  }, []);
  */
 /*
  const particlesInit = async (main) => {
    // you can initialize the tsParticles instance (main) here, adding custom shapes or presets
    // this loads the tsparticles package bundle, it's the easiest method for getting everything ready
    // starting from v2 you can add only the features you need reducing the bundle size
    await loadFull(main);
  };
  const particlesLoaded = (container) => {
    // console.log(container);
  };
  */
  /* 
  const options = useMemo(
    () => ({
      background: {
        color: {
          value: "#0d47a1",
        },
      },
      fpsLimit: 120,
      interactivity: {
        events: {
          onClick: {
            enable: true,
            mode: "push",
          },
          onHover: {
            enable: true,
            mode: "repulse",
          },
        },
        modes: {
          push: {
            quantity: 4,
          },
          repulse: {
            distance: 200,
            duration: 0.4,
          },
        },
      },
      particles: {
        color: {
          value: "#ffffff",
        },
        links: {
          color: "#ffffff",
          distance: 150,
          enable: true,
          opacity: 0.5,
          width: 1,
        },
        move: {
          direction: "none",
          enable: true,
          outModes: {
            default: "bounce",
          },
          random: false,
          speed: 6,
          straight: false,
        },
        number: {
          density: {
            enable: true,
          },
          value: 80,
        },
        opacity: {
          value: 0.5,
        },
        shape: {
          type: "circle",
        },
        size: {
          value: { min: 1, max: 5 },
        },
      },
      detectRetina: true,
    }),
    [],
  );
  if (init) {
  */
  return (
    <div style={{ height: '100vh', background: 'rgba(0, 0, 0, 0.1)' }}>
      {/*
        <Particles
          id="tsparticles"
          particlesLoaded={particlesLoaded}
          options={options}
          // url="http://foo.bar/particles.json"
        />
      */}
      {/*
      <Particles
        id="tsparticles"
        init={particlesInit}
        loaded={particlesLoaded}
        options={{
          "background": {
            "color": {
              "value": "#0d47a1"
            },
            "position": "50% 50%",
            "repeat": "no-repeat",
            "size": "cover"
          },
          "fullScreen": {
            "zIndex": 1
          },
          "interactivity": {
            "events": {
              "onClick": {
                "enable": true,
                "mode": "repulse"
              },
              "onHover": {
                "enable": true,
                "mode": "bubble"
              }
            },
            "modes": {
              "bubble": {
                "distance": 400,
                "duration": 0.3,
                "opacity": 1,
                "size": 4,
                "divs": {
                  "distance": 200,
                  "duration": 0.4,
                  "mix": false,
                  "selectors": []
                }
              },
              "grab": {
                "distance": 400,
                "links": {
                  "opacity": 0.5
                }
              },
              "repulse": {
                "divs": {
                  "distance": 200,
                  "duration": 0.4,
                  "factor": 100,
                  "speed": 1,
                  "maxSpeed": 50,
                  "easing": "ease-out-quad",
                  "selectors": []
                }
              }
            }
          },
          "particles": {
            "links": {
              "color": {
                "value": "#ffffff"
              },
              "distance": 500,
              "opacity": 0.4,
              "width": 2
            },
            "move": {
              "attract": {
                "rotate": {
                  "x": 600,
                  "y": 1200
                }
              },
              "direction": "bottom",
              "enable": true,
              "outModes": {
                "bottom": "out",
                "left": "out",
                "right": "out",
                "top": "out"
              }
            },
            "number": {
              "density": {
                "enable": true
              },
              "value": 400
            },
            "opacity": {
              "random": {
                "enable": true
              },
              "value": {
                "min": 0.1,
                "max": 0.5
              },
              "animation": {
                "speed": 1,
                "minimumValue": 0.1
              }
            },
            "size": {
              "random": {
                "enable": true
              },
              "value": {
                "min": 1,
                "max": 10
              },
              "animation": {
                "speed": 40,
                "minimumValue": 0.1
              }
            }
          }
        }}
      />
      */}
      <Form
        name="normal_login"
        className="login-form"
        // initialValues={{ remember: true, }}
        onFinish={onFinish}
      >
        <div className="logi-title">后台登录</div>
        <Form.Item
          name="username"
          rules={[
            {
              required: true,
              message: 'Please input your Username!',
            },
          ]}
        >
          <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: 'Please input your Password!',
            },
          ]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Password"
          />
        </Form.Item>
        {/*
          <Form.Item>
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox>Remember me</Checkbox>
            </Form.Item>

            <a className="login-form-forgot" href="">
              Forgot password
            </a>
          </Form.Item>
          */}
        <Form.Item>
          <Button type="primary" htmlType="submit" className="login-form-button">
            Log in
          </Button>
          {/* Or <a href="">register now!</a> */}
        </Form.Item>
      </Form>
    </div>
  )
  // }
}

export default Login;