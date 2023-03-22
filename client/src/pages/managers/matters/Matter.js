import { Avatar, Button, Col, Divider, Progress, Row, Space } from "antd";
import {
    ReconciliationFilled,
    CreditCardFilled,
    UsbFilled,
    CalendarFilled,
    TeamOutlined,
} from '@ant-design/icons';
import BreadcrumpAdmin from "~/components/AdminComponents/Breadcump";
import Title from "antd/es/typography/Title";
import CardMatter from "./CardMatter";
import { Link } from "react-router-dom";
const styleCol = {
    textAlign: 'center'
}

function Matter() {
    return (
        <>
            <BreadcrumpAdmin />
            <Space wrap direction="horizontal">
              <Link to="add">
              <Button className="btn-cyan" icon={<ReconciliationFilled />} block>Vụ việc mới</Button>
              </Link>  
                <Button className="btn-cyan" icon={<CreditCardFilled />} block >Công việc mới</Button>
                <Button className="btn-cyan" icon={<UsbFilled />} block>Chi phí mới</Button>
                <Button className="btn-cyan" icon={<CalendarFilled />} block>Tạo nhật ký làm việc</Button>
            </Space>
            <Divider />
            <Row>
                <Col md={{ span: 13 }} xs={{ span: 24 }}>
                    <Row>
                        <Col style={{ ...styleCol }} xs={{ span: 4 }}>
                            <Avatar
                                style={{ backgroundColor: `var(--grey)` }}
                                size={50}
                                icon={
                                    <ReconciliationFilled />
                                } />
                            <Title level={5}>Vụ việc</Title>
                        </Col>
                        <Col md={{ span: 18, push: 2 }} xs={{ span: 19, push: 1 }}>
                            <Row gutter={8}>
                                <CardMatter title="Đang thực hiện" total={0} />
                                <CardMatter title="Tạm ngưng" total={6} />
                                <CardMatter title="Đã đóng" total={0} />
                            </Row>
                        </Col>
                    </Row>
                    <Divider />
                    <Row>
                        <Col style={{ ...styleCol }} xs={4}>
                            <Avatar
                                style={{ backgroundColor: `var(--grey)` }}
                                size={50}
                                icon={
                                    <CreditCardFilled />
                                } />
                            <Title level={5}>Công việc</Title>
                        </Col>
                        <Col md={{ span: 18, push: 2 }} xs={{ span: 19, push: 1 }}>
                            <Row gutter={[8, 8]}>
                                <CardMatter title="Hạn trong tuần" total={0} />
                                <CardMatter title="Hạn hôm nay" total={0} />
                                <CardMatter title="Quá hạn" total={6} />
                                <CardMatter title="Không thời hạn" total={0} />
                                <CardMatter title="Chưa chỉ định" total={0} />
                                <CardMatter title="Đã lưu" total={0} />
                            </Row>
                        </Col>
                    </Row>
                    <Divider></Divider>
                    <Row>
                        <Col style={{ ...styleCol }} xs={{ span: 4 }}>
                            <Avatar
                                style={{ backgroundColor: `var(--grey)` }}
                                size={50}
                                icon={
                                    <TeamOutlined />
                                } />
                            <Title level={5}>Sự kiện</Title>
                        </Col>
                        <Col md={{ span: 18, push: 2 }} xs={{ span: 19, push: 1 }}>
                            <Row gutter={[8, 8]}>
                                <CardMatter title="Hôm nay" total={0} />
                                <CardMatter title="Tuần này" total={6} />
                                <CardMatter title="Tháng này" total={0} />
                            </Row>
                        </Col>
                    </Row>
                    <Divider />
                    <Row>
                        <Col style={{ ...styleCol }} xs={{ span: 4 }}>
                            <Avatar
                                style={{ backgroundColor: `var(--grey)` }}
                                size={50}
                                icon={
                                    <CalendarFilled />
                                } />
                            <Title level={5}>Cuộc gặp</Title>
                        </Col>
                        <Col md={{ span: 18, push: 2 }} xs={{ span: 19, push: 1 }}>
                            <Row gutter={[8, 8]}>
                                <CardMatter title="Hôm nay" total={0} />
                                <CardMatter title="Tuần này" total={0} />
                                <CardMatter title="Tháng này" total={6} />
                            </Row>
                        </Col>
                    </Row>

                </Col>
                <Col md={{ span: 10, push: 1 }} xs={{ span: 24 }}>
                    <Divider>
                        <Title level={4}>Tổng vụ việc tính phí</Title>
                    </Divider>
                    <Row>
                        <Col span={8} push={4}>
                            <Title level={5}>Thời gian tháng này</Title>
                            <Divider />
                            <Progress
                                type="circle"
                                size={150}
                                percent={90}
                                strokeColor={{
                                    '0%': '#108ee9',
                                    '100%': '#87d068',
                                }}
                            />
                        </Col>
                        <Col span={8} push={6}>
                            <Title level={5}>Thời gian tháng này</Title>
                            <Divider />
                            <Progress
                                type="circle"
                                size={150}
                                percent={90}
                                strokeColor={{
                                    '0%': '#108ee9',
                                    '100%': '#87d068',
                                }}
                            />
                        </Col>
                    </Row>
                    <Divider/>
                    <Divider>
                        <Title level={4}>Tổng vụ việc tính phí</Title>
                    </Divider>
                    <Row>
                        <Col span={8} push={4}>
                            <Title level={5}>Thời gian tháng này</Title>
                            <Divider />
                            <Progress
                                type="circle"
                                size={150}
                                percent={90}
                                strokeColor={{
                                    '0%': '#108ee9',
                                    '100%': '#87d068',
                                }}
                            />
                        </Col>
                        <Col span={8} push={6}>
                            <Title level={5}>Thời gian tháng này</Title>
                            <Divider />
                            <Progress
                                type="circle"
                                size={150}
                                percent={90}
                                strokeColor={{
                                    '0%': '#108ee9',
                                    '100%': '#87d068',
                                }}
                            />
                        </Col>
                    </Row>
                </Col>
            </Row>
        </>
    );
}

export default Matter;