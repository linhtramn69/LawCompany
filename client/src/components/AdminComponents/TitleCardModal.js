import { Col, Row, Steps } from "antd";
import Title from "antd/es/typography/Title";
function TitleCardModal({ title, current }) {
    return (
        <>
            <Row style={{padding: 20}}>
                <Col span={10}>
                    <Title level={3}>{title}</Title>
                </Col>
                <Col span={10} push={4}>
                    <Steps
                    size="small"
                    current={current}
                        type="navigation"
                        items={[
                            {
                                title: 'Tạo mới'
                            },
                            {
                                title: 'Đang thực hiện'
                            },
                            {
                                title: 'Đã đóng'
                            },
                        ]}
                    />
                </Col>
            </Row>
        </>
    );
}

export default TitleCardModal;