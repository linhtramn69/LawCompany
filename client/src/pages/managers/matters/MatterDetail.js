import { Avatar, Button, Card, Col, Descriptions, Divider, List, Row, Space, Tabs, Tag, Typography } from "antd";
import { faHouse, faReceipt, faTasks } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, useParams } from "react-router-dom";
import Title from "antd/es/typography/Title";
import { useEffect, useState } from "react";
import { matterService, userService } from "~/services";
import { actions, useStore } from "~/store";
import { avatar } from "~/assets/images";
const item = [
    {
        title: 'Đang thực hiện'
    },
    {
        title: 'Hoàn thành'
    },
    {
        title: 'Đã hủy'
    },
]
function MatterDetail() {

    let { id } = useParams();
    const [state, dispatch] = useStore();
    const [access, setAccess] = useState([]);
    
    useEffect(() => {
        const getMatter = async () => {
            dispatch(actions.setMatter((await matterService.getById(id)).data))
        }
        getMatter()
    }, [])
    useEffect(() => {
        const getAccess = async () => {
            const arr1 = state.matter.truy_cap.nhan_vien;
            const arr2 = state.matter.truy_cap.khach_hang;
            setAccess((await userService.getByMatter(arr1.concat(arr2))).data)
        }
        getAccess();
    }, [state.matter])
    
    return (
        <>
            {state.matter ?
                <Card

                    title={<Title level={4} style={{ marginTop: 10 }}>Thông tin chi tiết</Title>}
                    extra={
                        <Space split={<Divider type="vertical" />}>
                            <Typography.Link><FontAwesomeIcon icon={faHouse} /> Vụ việc</Typography.Link>
                            <Typography.Link><FontAwesomeIcon icon={faTasks} /> Hợp đồng</Typography.Link>
                            <Typography.Link><FontAwesomeIcon icon={faTasks} /> Báo giá</Typography.Link>
                            <Typography.Link><FontAwesomeIcon icon={faReceipt} /> Hóa đơn</Typography.Link>

                        </Space>
                    }
                >
                    <Descriptions style={{ paddingLeft: 40 }} column={{
                        md: 3,
                    }}>

                        <Descriptions.Item label="Tên vụ việc">{state.matter.ten_vu_viec}</Descriptions.Item>
                        <Descriptions.Item label="Lĩnh vực">{state.matter.linh_vuc.ten_linh_vuc}</Descriptions.Item>
                        <Descriptions.Item label="Dịch vụ">{state.matter.dich_vu.ten_dv}</Descriptions.Item>
                    </Descriptions>
                    <Divider />
                    <Row>
                        <Col md={{ span: 10, push: 1 }}>
                            <Descriptions
                                title="Luật sư phụ trách"
                                column={{
                                    md: 4
                                }}>

                                <Descriptions.Item span={4} label="Họ tên">{state.matter.luat_su.ho_ten}</Descriptions.Item>
                                <Descriptions.Item span={2} label="Số điện thoại">{state.matter.luat_su.account.sdt}</Descriptions.Item>
                                <Descriptions.Item span={2} label="Email">{state.matter.luat_su.email}</Descriptions.Item>
                            </Descriptions>
                        </Col>
                        <Col md={{ span: 10, push: 3 }}>
                            <Descriptions
                                title="Thông tin khách hàng"
                                column={{
                                    md: 4
                                }}>

                                <Descriptions.Item span={4} label="Họ tên">{state.matter.khach_hang.ho_ten}</Descriptions.Item>
                                <Descriptions.Item span={2} label="Số điện thoại">{state.matter.khach_hang.account.sdt}</Descriptions.Item>
                                <Descriptions.Item span={2} label="Email">{state.matter.khach_hang.email}</Descriptions.Item>
                            </Descriptions>
                        </Col>
                    </Row>
                    <Divider />
                    <Tabs type="card" defaultActiveKey="0" items={[
                        {
                            key: 0,
                            label: 'Thiết lập',
                            children:
                                <Descriptions
                                >
                                    <Row style={{ paddingTop: 20 }}>
                                        <Col md={{ span: 10, push: 1 }}>
                                            <Descriptions
                                                title="Thiết lập chi phí"
                                                column={{
                                                    md: 4
                                                }}>

                                                <Descriptions.Item span={4} label="Điều khoản thanh toán">
                                                    {state.matter.dieu_khoan_thanh_toan.ten}
                                                </Descriptions.Item>
                                                <Descriptions.Item span={4} label="Phương thức tính phí">
                                                    {state.matter.phuong_thuc_tinh_phi.ten}
                                                </Descriptions.Item>
                                                <Descriptions.Item span={4} label="Chiết khấu hoa hồng">
                                                    {state.matter.chiet_khau_hoa_hong} %
                                                </Descriptions.Item>
                                            </Descriptions>
                                        </Col>
                                        <Col md={{ span: 10, push: 3 }}>
                                            <Descriptions
                                                title="Quyền truy cập"
                                                column={{
                                                    md: 4
                                                }}>
                                            </Descriptions>
                                            <List
                                                dataSource={access}
                                                renderItem={(item) => (
                                                    <List.Item key={item.ho_ten}>
                                                        <List.Item.Meta
                                                            avatar={<Avatar src={avatar.user} />}
                                                            title={<a href="https://ant.design">{item.ho_ten}</a>}
                                                            description={item.email}
                                                        />
                                                        <div>
                                                            {
                                                                item.account.quyen === 0 ?
                                                                    <Tag color="blue">Khách hàng</Tag>
                                                                    : <Tag color="gold">Nhân viên</Tag>

                                                            }
                                                        </div>
                                                    </List.Item>
                                                )}
                                            />
                                        </Col>
                                    </Row>

                                </Descriptions>
                        },
                        {
                            key: '1',
                            label: `Mô tả`,
                        },
                        {
                            key: '2',
                            label: `Giấy tờ`,
                        },
                        {
                            key: '3',
                            label: `Liên hệ`,
                        },
                        {
                            key: '4',
                            label: `Công việc`,
                        },
                        {
                            key: '5',
                            label: `Phí cố định`,
                        },
                        {
                            key: '6',
                            label: `Chi phí`,
                        }
                    ]} />

                    <Link to={`/admin/matters/edit/${id}`}>
                        <Button type="primary" className="btn-primary">Chỉnh sửa</Button>
                    </Link>
                </Card> : null
            }
        </>
    );
}

export default MatterDetail;