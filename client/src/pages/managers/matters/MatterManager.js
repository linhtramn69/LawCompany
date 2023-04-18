import { Avatar, Button, Col, Divider, Progress, Row, Space, } from "antd";
import {
    ReconciliationFilled,
    CreditCardFilled,
    UsbFilled,
    CalendarFilled,
    TeamOutlined,
} from '@ant-design/icons';
import Title from "antd/es/typography/Title";
import CardMatter from "../../../components/AdminComponents/Card/CardMatter";
import { Link } from "react-router-dom";
import { actions, useStore, useToken } from "~/store";
import { useEffect } from "react";
import { matterService, taskService } from "~/services";
import { useState } from "react";
import ModalAddTask from "./ModalAddTask";
import ModalAddFee from "./ModalAddFee";
const styleCol = {
    textAlign: 'center'
}
const url = ['', 'admin', 'staff']
function MatterManager() {

    const { token } = useToken();
    const [state, dispatch] = useStore();
    const [isModalOpenTask, setIsModalOpenTask] = useState(false);
    const [isModalOpenFee, setIsModalOpenFee] = useState(false);
    
    const showModalTask = () => {
        setIsModalOpenTask(true)
    }
    const handleCancelTask = () => {
        setIsModalOpenTask(false);
    };
    const showModalFee = () => {
        setIsModalOpenFee(true)
    }
    const handleCancelFee = () => {
        setIsModalOpenFee(false);
    };
    useEffect(() => {
        const getMatters = async () => {
            if (token.account.quyen === 1) {
                const matter = (await matterService.get()).data;
                const task = (await taskService.get()).data;
                dispatch(actions.setMatters(matter));
                dispatch(actions.setTasks(task));
            }
            else {
                const matter = (await matterService.findByIdAccess({ id: token._id })).data;
                const task = (await taskService.getByStaff({ id: token._id })).data;
                dispatch(actions.setMatters(matter));
                dispatch(actions.setTasks(task));
            }
        }
        getMatters();
    }, [])

    const handleTotalMatter = (value) => {
        const arr = state.matters.filter(vl => vl.status === value)
        return arr.length
    }
    const handleTotalTask = (value) => {
        const arr = state.tasks.filter(vl => vl.status === value)
        return arr.length
    }


    return (
        <>
            <Space wrap direction="horizontal">
                { token.account.quyen === 1 ?
                    <Link to="matter/add">
                        <Button className="btn-cyan" icon={<ReconciliationFilled />} block>Vụ việc mới</Button>
                    </Link>
                    : null
                }
                    <Button onClick={showModalTask} className="btn-cyan" icon={<CreditCardFilled />} block >Công việc mới</Button>
                <Button onClick={showModalFee} className="btn-cyan" icon={<UsbFilled />} block>Chi phí mới</Button>
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
                                <CardMatter title="Đang thực hiện" color={0} total={handleTotalMatter(0)} url={`/${url[token.account.quyen]}/matters/0`} />
                                <CardMatter title="Tạm ngưng" color={2} total={handleTotalMatter(2)} url={`/${url[token.account.quyen]}/matters/2`} />
                                <CardMatter title="Hoàn thành" color={1} total={handleTotalMatter(1)} url={`/${url[token.account.quyen]}/matters/1`} />
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
                                <CardMatter title="Được giao" total={handleTotalTask(0)} color={0} url={`/${url[token.account.quyen]}/tasks/0`} />
                                <CardMatter title="Tạm ngưng" total={handleTotalTask(2)} color={2} url={`/${url[token.account.quyen]}/tasks/2`}/>
                                <CardMatter title="Hoàn thành" total={handleTotalTask(1)} color={1} url={`/${url[token.account.quyen]}/tasks/1`}/>
                                <CardMatter title="Hạn hôm nay" total={0} />
                                <CardMatter title="Quá hạn" total={0} />
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
                            <Title level={5}>Lịch hẹn</Title>
                        </Col>
                        <Col md={{ span: 18, push: 2 }} xs={{ span: 19, push: 1 }}>
                            {/* <Row gutter={[8, 8]}>
                                <CardMatter title="Hôm nay" total={0} />
                                <CardMatter title="Tuần này" total={handleTotalTask(0)} status={0} />
                                <CardMatter title="Tháng này" total={0} />
                            </Row> */}
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
                    <Divider />
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
            {isModalOpenTask ? <ModalAddTask open={isModalOpenTask} onCancel={handleCancelTask} /> : null}
            {isModalOpenFee ? <ModalAddFee open={isModalOpenFee} onCancel={handleCancelFee} /> : null}
        </>
    );
}

export default MatterManager;