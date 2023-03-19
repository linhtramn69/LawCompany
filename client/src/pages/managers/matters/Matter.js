import { Button, Col, Row, Segmented, Space } from "antd";
import {
    ReconciliationFilled ,
    CreditCardFilled,
    UsbFilled,
    CalendarFilled,
    AppstoreOutlined,
    BarsOutlined
} from '@ant-design/icons';
import { Filter } from "~/components";
import { useState } from "react";
import BreadcrumpAdmin from "~/components/AdminComponents/Breadcump";
function Matters() {
    return (
        <>
        <BreadcrumpAdmin/>
            <Row>
                <Col md={{ span: 4 }}>
                    <Space direction="vertical" style={{
                        width: '100%',
                    }}>
                        <Button className="btn-cyan" icon={<ReconciliationFilled  />} block>Vụ việc mới</Button>
                        <Button className="btn-cyan" icon={<CreditCardFilled  />} block>Công việc mới</Button>
                        <Button className="btn-cyan" icon={<UsbFilled  />} block>Chi phí mới</Button>
                        <Button className="btn-cyan" icon={<CalendarFilled  />} block>Tạo nhật ký làm việc</Button>
                    </Space>

                </Col>
                <Col>
                <Space direction="horizontal">
                    <h3>Icon</h3>
                    <h4>Ok</h4>
                </Space>
                </Col>
                <Col>
                </Col>
            </Row>
        </>
    );
}

export default Matters;