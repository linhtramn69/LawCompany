import { Button, Col, DatePicker, Divider, Form, Input, Row, Select, Space, Tabs, Typography } from "antd";
import TextArea from "antd/es/input/TextArea";
import FormAddPeriod from "./FormAddPeriod";
const { Text } = Typography;
const formItemLayout = {
    labelCol: {
        xs: {
            span: 24,
        },
        md: {
            span: 10,
        },
    },
    wrapperCol: {
        xs: {
            span: 24
        },
        md: {
            span: 14
        }
    }
};
const items = [
    {
        key: '1',
        label: `Quy trình cụ thể`,
        children: <FormAddPeriod />,
    }
];
function FormQuotes() {
    return (
        <>
            <Form {...formItemLayout}>
                <Space>
                <Button type="primary" className="btn-primary">GỬI EMAIL</Button>
                <Button className="btn-primary">XÁC NHẬN</Button>
                </Space>
                <Divider />
                
                <Row>
                    <Col md={{ span: 12, pull: 2 }}>
                        <Form.Item
                            label="Khách hàng"
                            name="customer">
                            <Select />
                        </Form.Item>
                        <Form.Item
                            label="Người lập báo giá"
                            name="staff">
                            <Input />
                        </Form.Item>
                        <Form.Item
                            label="Lĩnh vực"
                            name="typeService">
                            <Select />
                        </Form.Item>
                        <Form.Item
                            label="Dịch vụ"
                            name="service">
                            <Select />
                        </Form.Item>
                        <Form.Item
                            label="Ghi chú"
                            name="note">
                            <TextArea />
                        </Form.Item>
                    </Col>
                    <Col md={{ span: 12, pull: 1 }}>
                        <Form.Item
                            label="Thời gian hiệu lực"
                            name="time">
                            <DatePicker />
                        </Form.Item>
                        <Form.Item
                            label="Điều khoản thanh toán"
                            name="time">
                            <Select />
                        </Form.Item>
                        <Form.Item
                            label="Tổng giá dự kiến"
                            name="price">
                            <Input />
                        </Form.Item>
                        <br />
                        <Text style={{ marginLeft: 120 }} keyboard italic>Lưu ý: Giá thành dịch vụ có thể sẽ có sự thay đổi tuỳ theo tính chất vụ việc.
                        </Text>

                    </Col>

                </Row>

                <Divider />

                <Form.Item
                    wrapperCol={{
                        md: 24
                    }}>
                    <Tabs style={{ width: '100%' }} type="card" defaultActiveKey="1" items={items} />
                </Form.Item>

            </Form>
        </>
    );
}

export default FormQuotes;