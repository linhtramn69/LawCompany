import { useParams } from "react-router-dom";
import { actions, useStore } from "~/store";
import { matterService } from "~/services";
import { useEffect } from "react";
import { faHouse, faReceipt, faTasks } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Card, Col, Descriptions, Divider, Row, Space, Typography } from "antd";
import { Link } from "react-router-dom";
import Title from "antd/es/typography/Title";

function MatterDetail() {

    let { id } = useParams();
    const [state, dispatch] = useStore();


    useEffect(() => {
        const getMatter = async () => {
            dispatch(actions.setMatter((await matterService.getById(id)).data))
        };
        getMatter()
    }, []);

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
                        <Row>
                            <Col md={{ span: 8, push: 1 }}>
                                <Descriptions column={{ md: 4 }}>
                                    <Descriptions.Item span={4} label="Tên vụ việc">{state.matter.ten_vu_viec}</Descriptions.Item>
                                    <Descriptions.Item span={4} label="Lĩnh vực">{state.matter.linh_vuc.ten_linh_vuc}</Descriptions.Item>
                                    <Descriptions.Item span={4} label="Dịch vụ">{state.matter.dich_vu.ten_dv}</Descriptions.Item>
                                </Descriptions>
                            </Col>
                            <Col md={{span: 8, push: 1}}>
                                <Descriptions 
                                    title='Thông tin Khách hàng'
                                    column={{ md: 4 }}>
                                    <Descriptions.Item span={4} label="Họ tên:">{state.matter.khach_hang.ho_ten}</Descriptions.Item>
                                    <Descriptions.Item span={4} label="Số điện thoại">{state.matter.khach_hang.sdt}</Descriptions.Item>
                                    <Descriptions.Item span={4} label="Email">{state.matter.khach_hang.email}</Descriptions.Item>
                                </Descriptions>
                            </Col>
                            <Col md={{span: 8, push: 1}}>
                                <Descriptions 
                                    title='Thông tin Luật sư'
                                    column={{ md: 4 }}>
                                    <Descriptions.Item span={4} label="Họ tên:">{state.matter.luat_su.ho_ten}</Descriptions.Item>
                                    <Descriptions.Item span={4} label="Số điện thoại">{state.matter.luat_su.sdt}</Descriptions.Item>
                                    <Descriptions.Item span={4} label="Email">{state.matter.luat_su.email}</Descriptions.Item>
                                </Descriptions>
                            </Col>
                        </Row>
                        <Link to={`/admin/matters/edit/${id}`}>
                            <Button type="primary" className="btn-primary" >Chỉnh sửa</Button>
                        </Link>
                    </Card>
                    : null
                }
        </>
    );
}

export default MatterDetail;