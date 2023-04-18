import { Col, Menu, Row } from "antd";
import {
  UserOutlined,
  BellFilled,
  SettingOutlined,
  LogoutOutlined,
  MailOutlined
} from '@ant-design/icons';
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse } from '@fortawesome/free-solid-svg-icons'
import "~/assets/style/Admin/Header.scss";
import { Link, useNavigate } from "react-router-dom";
import { useToken } from "~/store";
const url = ['', 'admin', 'staff']

function HeaderAdmin() {
  const [current, setCurrent] = useState('mail');
  const { token } = useToken();
  let url = 'admin'
  if(token.chuc_vu.id == 'LS02')
    url = 'staff'
  else if(token.chuc_vu.id == 'TVV02')
    url = 'tu-van-vien'
  else if(token.chuc_vu.id == 'KT02')
    url = 'ke-toan'
  const items = [
    {
      icon:  <Link to={`/${url}`}>
      <FontAwesomeIcon icon={faHouse} />
    </Link>,
      key: 'dashboard',
    },
    {
      label: <Link to={`/${url}/matters/all`}>
        Vụ việc
      </Link>,
      key: 'customer-service',
    },
    {
      label: <Link to={`/${url}/tasks/all`}>
        Công việc
      </Link>,
      key: 'task',
    },
    {
      label: <Link to={`/${url}/calendar`}>
        Lịch hẹn
      </Link>,
      key: 'calendar',
    },
    {
      label: <Link to={`/${url}/quote`}>
        Báo giá
      </Link>,
      key: 'quote',
    },
    {
      label: <Link to={`/${url}/staff`}>
        Nhân viên
      </Link>,
      key: 'staff',
    },
    {
      label: <Link to={`/${url}/customer`}>
        Khách hàng
      </Link>,
      key: 'customer',
    },
    {
      label: <Link to={`/${url}/fee`}>
       Kế toán
      </Link>,
      key: 'fee',
    },
  ];
  const onClick = (e) => {
    setCurrent(e.key);
  };
  const items1 = [
    {
      label: token.email,
      icon: <MailOutlined />,
    },
    {
      label: token.chuc_vu.ten_chuc_vu,
      icon: <UserOutlined />,
    },
    {
      label: token.ho_ten,
      key: 'user',

      children: [
        {
          label: 'Thiết lập tài khoản',
          key: 'settings',
          icon: <SettingOutlined />
        },
        {
          label: 'Cập nhật thông tin',
          key: 'update',
          icon: <SettingOutlined />
        },
        {
          label: <button
          style={{
            border: 0,
            backgroundColor: 'transparent'
          }}
          onClick={() => {
            sessionStorage.removeItem('token')
            window.location.href = '/login'
          }}>Đăng xuất</button>,
          key: 'logout',

          icon: <LogoutOutlined />
        }
      ]
    },


  ];
  return (
    <>
      <Row className="header-admin">
        <Col md={{ span: 16, push: 1}}>
          <Menu onClick={onClick} className="menu" selectedKeys={[current]} mode="horizontal" items={items} />
        </Col>
        <Col md={{ span: 8 }}>
          <Menu onClick={onClick} className="menu" selectedKeys={[current]} mode="horizontal" items={items1} />
        </Col>
      </Row>

    </>
  );
}

export default HeaderAdmin;