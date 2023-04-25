import { Button, Card, Col, Descriptions, Divider, Form, Input, Modal, Row, Space, Tabs } from "antd";
import { useState } from "react";

function BillDetail() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [form] = Form.useForm();

    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleOpen = () => {
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };
    return (
        <>
            <Card
                title="Chi tiết hoá đơn"
                style={{
                    width: 1200,
                    marginLeft: 100,
                    padding: '0 20px'
                }}
                extra={
                    <Button onClick={showModal} className="btn btn-status">Ghi nhận thanh toán</Button>
                }>
                <Row>
                    <Col md={{ span: 12 }}>
                        <Descriptions
                            column={{
                                md: 2,
                            }}
                            title="Thông tin kết toán">
                            <Descriptions.Item label="Chủ tài khoản">Nguyễn Linh Trâm</Descriptions.Item>
                            <Descriptions.Item label="Số tài khoản">123456789</Descriptions.Item>
                            <Descriptions.Item label="Ngân hàng">Nguyễn Linh Trâm</Descriptions.Item>
                        </Descriptions>
                    </Col>
                    <Col md={{ span: 12, push: 1 }}>
                        <Descriptions
                            column={{
                                md: 2,
                            }}
                            title="Thông tin hoá đơn">
                            <Descriptions.Item label="Nhân viên lập">Nguyễn Linh Trâm</Descriptions.Item>
                            <Descriptions.Item label="Loại hoá đơn">123456789</Descriptions.Item>
                            <Descriptions.Item label="Ngày lập">Nguyễn Linh Trâm</Descriptions.Item>
                        </Descriptions>
                    </Col>
                </Row>
                <Tabs items={[
                    {
                        key: '1',
                        label: `Chi tiết hoá đơn`,
                        children: <Row>
                            <Col md={{ span: 12 }}>
                                <Descriptions
                                    column={{
                                        md: 2,
                                    }}
                                    title="Nội dung">
                                    <Descriptions.Item label="Mô tả">Ăn trưa với khách hàng</Descriptions.Item>
                                    <Descriptions.Item label="Đơn giá">2,000,000 đ</Descriptions.Item>
                                    <Descriptions.Item label="Ngày lập">12-03-2023</Descriptions.Item>
                                </Descriptions>
                            </Col>
                            <Col md={{ span: 12, push: 1 }}>
                                <Descriptions
                                    column={{
                                        md: 2,
                                    }}
                                    title="Thông tin nhân viên">
                                    <Descriptions.Item label="Họ tên">Kim Linh</Descriptions.Item>
                                    <Descriptions.Item label="Email">12-03-2023</Descriptions.Item>
                                    <Descriptions.Item label="Số điện thoại">2,000,000 đ</Descriptions.Item>
                                    <Descriptions.Item label="Chức vụ">2,000,000 đ</Descriptions.Item>
                                    <Descriptions.Item label="Bộ phận">2,000,000 đ</Descriptions.Item>
                                </Descriptions>
                            </Col>
                        </Row>
                    },
                ]} />
                <Divider />
                <Space direction="vertical" style={{ textAlign: 'end', float: 'right' }}>
                    <span>
                        <b style={{ marginRight: 15 }}>Tổng :</b>
                        2,000,000đ</span>
                    <span>
                        <i style={{ marginRight: 15 }}>Trả lúc 12:00 24-05-2023 :</i>
                        2,000,000đ</span>
                    <span>
                        <b style={{ marginRight: 15 }}>Số tiền phải trả:</b>
                        2,000,000đ</span>
                </Space>

            </Card>
            <Modal title="Ghi nhận thanh toán"
                width={600}
                open={isModalOpen}
                onOk={handleOpen}
                onCancel={handleCancel} footer={null}>
                <Form
                    form={form}
                    name="basic"
                    labelCol={{
                        span: 6,
                    }}
                    wrapperCol={{
                        span: 16,
                    }}
                    style={{
                        maxWidth: 1000,
                        marginTop: 30
                    }}
                    autoComplete="off">
                    <Form.Item
                        label="Số tài khoản">
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Chủ tài khoản">
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Ngân hàng">
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Tổng">
                        <Input />
                    </Form.Item>
                    <Form.Item
                     wrapperCol={{
                        offset: 18,
                        span: 6,
                    }}>
                        <Button type="primary">
                            Ghi nhận
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
}

export default BillDetail;