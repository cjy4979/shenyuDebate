import React, { useEffect, useState } from 'react'
import onlineLogo from '../../images/online.png'
import styles from './Login.less'
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { Form, Input, Button, Checkbox, Card, message } from 'antd';
import { setCookie, getCookie, removeCookie } from '../../utils/auth'

export default function Login(props: { history: string[]; }) {
    const [name, setName] = useState('')
    const [password, setPassword] = useState('')
    const [checkType, setType] = useState(true)
    const [form] = Form.useForm()

    useEffect(() => {
        if (localStorage.getItem('check') === '1') {
            if (localStorage.getItem('username') !== '' && localStorage.getItem('password') !== '') {
                form.setFieldsValue({
                    username: localStorage.getItem('username'),
                    password: localStorage.getItem('password'),
                })
            }
        }
    },[])
    // 判断浏览器函数
    function isMobile() {
        if (window.navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i)) {
            props.history.push('/statisitcs');//跳转
            return true; // 移动端
            
        } else {
            props.history.push('/statistics');//跳转
            return false; // PC端
            
        }
    }

    const onFinish = (values: { username: string; password: string; }) => {
        setName(values.username);
        setPassword(values.password);
        if (values) {
            fetch('http://localhost:80/api/login', {
                method: 'post',
                body: JSON.stringify(values),
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(
                response => response.json()
            ).then(
                data =>{
                    if(data.status === 0){
                        message.success('登录成功');
                        setCookie('rights',data.data)
                        if (checkType === true) {
                            //记住密码
                            setCookie('username', values.username);
                            localStorage.setItem('username', values.username);
                            setCookie('password', values.password);
                            localStorage.setItem('password', values.password);
                            localStorage.setItem("check", '1');
                        } else {
                            removeCookie('username');
                            removeCookie('password');
                            localStorage.removeItem("check");
                            localStorage.removeItem("username");
                            localStorage.removeItem("password");
                        }
                       isMobile()

                    }else {
                        message.info('用户名或密码错误');
                    }
                }
            )
        }

    };
    const onChange = (e: { target: { checked: any; }; }) => {
        setType(e.target.checked);
    };

    return (
        <div className={styles.bg} >
            <div className={styles.main} >
                <img className={styles.logo} src={onlineLogo} alt="online" />

                <p className={styles.title} >深语10.0-萌宠主题</p>

                <Card className={styles.card}>
                    <Form
                        form={form}
                        name="normal_login"

                        initialValues={{
                            remember: true,
                        }}
                        onFinish={onFinish}
                    >
                        <Form.Item
                            name="username"
                            rules={[
                                {
                                    required: true,
                                    message: '请输入用户名!',
                                },
                            ]}
                        >
                            <Input prefix={<UserOutlined className="site-form-item-icon" />}
                                size="large"
                                placeholder="用户名"
                                style={{ borderStyle: "none", borderBottom: "1px solid #dbdbdb" }}
                            />
                        </Form.Item>
                        <Form.Item
                            name="password"
                            rules={[
                                {
                                    required: true,
                                    message: '请输入密码!',
                                },
                            ]}
                        >
                            <Input
                                prefix={<LockOutlined className="site-form-item-icon" />}
                                type="password"
                                placeholder="密码"
                                size="large"
                                style={{ borderStyle: "none", borderBottom: "1px solid #dbdbdb" }}

                            />
                        </Form.Item>
                        <Form.Item>
                            <Form.Item name="remember" valuePropName="checked" noStyle>
                                <Checkbox onChange={onChange}>记住我</Checkbox>
                            </Form.Item>
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" danger htmlType="submit" className="login-form-button" style={{ width: "40%" }}>
                                登录
                                </Button>
                        </Form.Item>
                    </Form>
                </Card>
            </div>

        </div>

    )
}


function value(value: any) {
    throw new Error('Function not implemented.');
}

function setFieldsValue(arg0: { username: string; password: string; }) {
    throw new Error('Function not implemented.');
}

