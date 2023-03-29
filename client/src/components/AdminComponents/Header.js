import { Col, Menu, Row, Breadcrumb } from "antd";
import {
  UserOutlined,
  BellFilled,
  SettingOutlined,
  LogoutOutlined,
  HomeOutlined
} from '@ant-design/icons';
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse } from '@fortawesome/free-solid-svg-icons'
import "~/assets/style/Admin/Header.scss"
import Search from "antd/es/transfer/search";
import { Link } from "react-router-dom";
const items = [
  {
    icon: <Link to="/admin">
            <FontAwesomeIcon icon={faHouse} />
          </Link>,
    key: 'title',
    
  },
  {
    label: 'Quản lý chăm sóc khách hàng',
    key: 'customer-service',
  },
  {
    label: 'Dashboard',
    key: 'dashboard',
  },
  {
    label: 'Search',
    key: 'search',
  },
  {
    label: 'Matters',
    key: 'matters',
  },
];
const items1 = [
  {
    key: 'notification',
    icon: <BellFilled />
  },
  {
    label: 'Quản lý văn phòng',
    key: 'user',
    icon: <UserOutlined />,
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
        label: 'Đăng xuất',
        key: 'logout',
        icon: <LogoutOutlined />
      }
    ]
  },


];
const items2 = [
  {
    href: '',
    title: <HomeOutlined />,
  },
  {
    href: '',
    title: (
      <>
        <UserOutlined />
        <span>Application List</span>
      </>
    ),
  },
  {
    title: 'Application',
  },
]
function HeaderAdmin() {
  const [current, setCurrent] = useState('mail');
  const onClick = (e) => {
    setCurrent(e.key);
  };
  const onSearch = (value) => console.log(value);
  return (
    <>
      <Row className="header-admin">
        <Col md={{ span: 14, push: 1 }}>
          <Menu onClick={onClick} className="menu" selectedKeys={[current]} mode="horizontal" items={items} />
        </Col>
        <Col md={{ span: 6, push: 4 }}>
          <Menu onClick={onClick} className="menu" selectedKeys={[current]} mode="horizontal" items={items1} />
        </Col>
      </Row>
      
    </>
  );
}

export default HeaderAdmin;