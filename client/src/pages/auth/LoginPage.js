import { Menu, Checkbox, Form, Input, Space } from "antd";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { actions, useStore } from "~/store";
import { userService } from "~/services";
function LoginPage() {
    const [state, dispatch] = useStore();
    const navigate = useNavigate();
    const onFinish = async(values) => {
       try{
        const rs = (await userService.login(values)).data
        dispatch(actions.setUser(rs))
        if(rs.account.quyen == 1)
            navigate('/admin')
        else if(rs.account.quyen == 0)
            navigate('/')
        else navigate('/staff')
       }
       catch(error){
        console.log(error);
       }
    }
    // const handleLogin = () => {
    //     navigate('/admin')
    // }
    return (
        <>

            <div className="auth-page">
                <div className="auth-header" >
                    <h1>Đăng nhập</h1>
                    <Menu
                        defaultSelectedKeys={"1"}
                        className="menu-auth"
                        mode="horizontal"
                    >
                        <Menu.Item key="1">
                            <Link to="/login">Đăng nhập</Link>
                        </Menu.Item>
                        <Menu.Item key="2">
                            <Link to="/register">Đăng ký</Link>
                        </Menu.Item>
                    </Menu>
                </div>
                <div className="auth-content">
                    <Form
                        name="normal_login"
                        className="login-form"
                        labelCol={{
                            span: 6,
                        }}
                        wrapperCol={{
                            span: 16,
                        }}
                        style={{
                            maxWidth: 600,
                        }}
                        initialValues={{
                            remember: true,
                        }}
                        onFinish={onFinish}
                        autoComplete="off"
                    >
                        <Form.Item
                        className="login-form-item"
                            label="Số điện thoại"
                            name="sdt"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your Username!',
                                },
                            ]}
                        >
                            <Input style={{
                                border: '1px solid var(--dark-blue)'
                            }}/>
                        </Form.Item>
                        <Form.Item
                        className="login-form-item"
                            label="Mật khẩu"
                            name="mat_khau"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your Password!',
                                },
                            ]}
                        >
                            <Input.Password
                            style={{
                                border: '1px solid var(--dark-blue)'
                            }}
                                type="password"
                            />
                        </Form.Item>
                        <Form.Item
                            wrapperCol={{
                                offset: 7,
                                span: 16,
                            }}
                        >
                            <Space size={30}>
                                <Form.Item name="remember" valuePropName="checked" noStyle>
                                    <Checkbox>Remember me</Checkbox>
                                </Form.Item>
                                <Link className="login-form-forgot" to="/login">
                                    Forgot password?
                                </Link>
                            </Space>

                        </Form.Item>

                        <Form.Item
                            wrapperCol={{
                                offset: 7,
                                span: 16,
                            }}
                        >
                            <button type="primary" htmltype="submit" className="login-form-button">
                                Đăng nhập
                            </button>
                        </Form.Item>
                    </Form>
                </div>
            </div>
        </>
    );
}

export default LoginPage;