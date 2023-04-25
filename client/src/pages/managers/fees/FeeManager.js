import { Avatar, Button, Col, Divider, Row, Space, } from "antd";
import {
    ReconciliationFilled,
    UsbFilled,
    CalendarFilled,
} from '@ant-design/icons';
import Title from "antd/es/typography/Title";
import CardMatter from "../../../components/AdminComponents/Card/CardMatter";
import { actions, useStore, useToken } from "~/store";
import { useEffect } from "react";
import { feeService } from "~/services";
const styleCol = {
    textAlign: 'center'
}
const url = ['', 'admin', 'ke-toan']
function FeeManager() {
    const { token } = useToken();
    const [state, dispatch] = useStore()
    useEffect(() => {
        const getFees = async () => {
            const fee = (await feeService.get()).data;
            dispatch(actions.setFees(fee));
        }
        getFees();
    }, [])
    const handleTotalFee = (value) => {
        const arr = state.fees.filter(vl => vl.status === value)
        return arr.length
    }
    return (
        <>
            <Space wrap direction="horizontal">
                <Button className="btn-cyan" icon={<UsbFilled />} block>Hóa đơn mới</Button>
                <Button className="btn-cyan" icon={<CalendarFilled />} block>Kết toán mới</Button>
            </Space>
            <Divider />
            <Row>
                <Col md={{ span: 10 }} xs={{ span: 24 }}>
                    <Row>
                        <Col style={{ ...styleCol }} xs={{ span: 4 }}>
                            <Avatar
                                style={{ backgroundColor: `var(--grey)` }}
                                size={50}
                                icon={
                                    <ReconciliationFilled />
                                } />
                            <Title level={5}>Chi phí</Title>
                        </Col>
                        <Col md={{ span: 18, push: 2 }} xs={{ span: 19, push: 1 }}>
                            <Row gutter={[8, 8]}>
                                <CardMatter title="Chưa vào sổ" color={1} total={handleTotalFee(1)} url={`fees/1`} />
                                <CardMatter title="Đã kết toán" total={handleTotalFee(3)} />
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
                                    <ReconciliationFilled />
                                } />
                            <Title level={5}>Vụ việc</Title>
                        </Col>
                        <Col md={{ span: 18, push: 2 }} xs={{ span: 19, push: 1 }}>
                            <Row gutter={[8, 8]}>
                                <CardMatter title="Chưa vào sổ" total={0} url={`/${url[token.account.quyen]}/matter/0`} />
                                <CardMatter title="Chưa thanh toán" total={0} url={`quotes/`} />
                                <CardMatter title="Đã thanh toán" total={0} />
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
                                    <ReconciliationFilled />
                                } />
                            <Title level={5}>Hóa đơn</Title>
                        </Col>
                        <Col md={{ span: 18, push: 2 }} xs={{ span: 19, push: 1 }}>
                            <Row gutter={8}>
                                <CardMatter title="Đã vào sổ" total={0} url={`/ke-toan/bills/0`} />
                                <CardMatter title="Đã kết toán" total={0} />
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
                                    <ReconciliationFilled />
                                } />
                            <Title level={5}>Tiền lương</Title>
                        </Col>
                        <Col md={{ span: 18, push: 2 }} xs={{ span: 19, push: 1 }}>
                            <Row gutter={[8, 8]}>
                                <CardMatter title="Lương cứng" total={0} url={`/ke-toan/fees`} />
                                <CardMatter title="Hoa hồng" total={0} url={`/ke-toan/quotes/`} />
                                <CardMatter title="Nghỉ phép" total={0} />
                            </Row>
                        </Col>
                    </Row>
                    <Divider />

                </Col>
                {/* <Col md={{ span: 12, push: 2 }} xs={{ span: 24 }}>
                    <Chart title="Tổng thu phí vụ việc" data={[10, 15, 18, 30, 32, 39, 45, 69, 54, 23, 12, 36]} />
                    <Divider />
                    <Chart title="Vụ việc tính phí trong năm" data={[10, 15, 18, 30, 32, 39, 45, 69, 54, 23, 12, 36]} />

                </Col> */}
            </Row>
        </>
    );
}

export default FeeManager;