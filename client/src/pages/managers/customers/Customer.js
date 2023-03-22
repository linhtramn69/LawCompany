import { Col, Row, Segmented } from "antd";
import { useEffect, useState } from "react";
import { AppstoreOutlined, BarsOutlined } from '@ant-design/icons';
import { Pagination } from 'antd';
import Filter from "~/components/AdminComponents/Filter";
import TableComponent from "~/components/AdminComponents/Table/Table";
import { Link } from "react-router-dom";
import { CardUser } from "~/components";
import { userService } from '../../../services/index';

function Customer({props, columns}) {
    console.log(columns);
    const [users, setUsers] = useState([]);
    const data = [];
    const [minValue, setMinValue] = useState(0)
    const [maxValue, setMaxValue] = useState(8)
    const [tab, setTab] = useState("Kanban");
    const numEachPage = 8

    const getUsers = async () => {
        setUsers((await userService.get()).data)
    };
    useEffect(() => {
        getUsers();
    }, []);
    let chuc_vu=null;
    let bo_phan=null;
    users.map((value, index) => {
        if (value.account.quyen === props) {
            if(value.account.quyen !== 0){
                chuc_vu = value.chuc_vu.ten_chuc_vu;
                bo_phan = value.bo_phan.ten_bo_phan;
            }
            return (
                data.push({
                    key: index,
                    _id: value._id,
                    name: value.ho_ten,
                    dateOfBirth: value.ngay_sinh,
                    job: value.nghe_nghiep,
                    phone: value.account.sdt,
                    email: value.email,
                    address: value.dia_chi,
                    avatar: value.avatar,
                    typeOfUser: value.loai_user,
                    websiteCompany: value.website_cong_ty,
                    role: value.account.quyen,
                    active: value.active,
                    chucVu: chuc_vu,
                    boPhan: bo_phan
                })
            )
        }
    })

    const handleChange = value => {
        setMinValue((value - 1) * numEachPage);
        setMaxValue(value * numEachPage);
    };

    const seg = <Segmented
        defaultValue="Kanban"
        options={[
            {
                label: 'Kanban',
                value: 'Kanban',
                icon: <AppstoreOutlined />,
            },
            {
                label: 'List',
                value: 'List',
                icon: <BarsOutlined />,
            },
        ]}
        onChange={(e) => setTab(e)}
    />

    return (
        <>
            
            <Filter seg={seg} />
            <br />
            {tab === 'Kanban' ?
                <>
                    <Row>
                        {data &&
                            data.length > 0 &&
                            data.slice(minValue, maxValue).map((value, index) => (
                                <Col
                                    lg={{ span: 8, push: 0 }}
                                    md={{ span: 12, push: 0 }}
                                    sm={{ span: 12, push: 0 }}
                                    xs={{ span: 23, push: 1 }}
                                    key={index}
                                >
                                    <Link to={`${value._id}`}>
                                        <CardUser info={value} />
                                    </Link>
                                </Col>
                            ))}

                    </Row>
                    <Pagination
                        className="pagination"
                        defaultCurrent={1}
                        defaultPageSize={numEachPage}
                        onChange={handleChange}
                        total={16}
                    />
                </>
                : <TableComponent data={data} columns={columns} />
            }
        </>
    );
}

export default Customer;