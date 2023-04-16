import { Card, Col, Descriptions, message, Divider, Row, Space, Popconfirm, Badge, Button } from "antd";
import { faCircleCheck, faMoneyBillTransfer, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { feeService, matterService } from "~/services";
import { useState } from "react";
import { actions, useStore } from "~/store";
import moment from "moment";

function FeeDetail() {

    let { id } = useParams();
    const [state, dispatch] = useStore();
    const [fee, setFee] = useState({})
    const [messageApi, contextHolder] = message.useMessage();
    const success = () => {
        messageApi.open({
            type: 'success',
            content: 'Cập nhật hoá đơn thành công',
        });
    };
    const error = () => {
        messageApi.open({
            type: 'error',
            content: 'Cập nhật hoá đơn có lỗi',
        });
    };

    useEffect(() => {
        const getFee = async () => {
            setFee((await feeService.getById(id)).data)
        }
        getFee()
    }, [])
    useEffect(() => {
        const getMatter = async () => {
            const result = (await matterService.getById(fee.vu_viec)).data
            dispatch(actions.setMatter(result))
        }
        getMatter()
    }, [fee])

    const handleOk = async (value) => {
        try {
            const rs = (await feeService.update(id, { status: value })).data
            success()
            setFee(rs)
        }
        catch (err) {
            error()
        }
    }

    return (
        <>
            {contextHolder}
            {fee.nhan_vien && state.matter._id ?
                <Card
                    title={
                        fee.status === 0 ? <Badge status="processing" text="Đang chờ xử lý" />
                            : fee.status === 1 ? <Badge status="warning" text="Đã duyệt" />
                                : fee.status === 2 ? <Badge status="success" text="Đã kết toán" />
                                    : <Badge status="error" text="Đã từ chối" />
                    }
                    extra={
                        <Space>
                            {
                                fee.status === 0 ?
                                    <>
                                        <Popconfirm
                                            placement="topRight"
                                            title="Bạn có chắc duyệt hoá đơn ?"
                                            okText="Xác nhận"
                                            cancelText="Hủy"
                                            onConfirm={() => handleOk(1)}
                                        >
                                            <Button
                                                className="btn btn-status"
                                                icon={<FontAwesomeIcon
                                                    style={{
                                                        color: '#389e0d',
                                                        marginRight: 10
                                                    }} icon={faCircleCheck} />}>Duyệt hoá đơn</Button>
                                        </Popconfirm>
                                        <Popconfirm
                                            placement="topRight"
                                            title="Bạn có chắc từ chối duyệt hoá đơn này ?"
                                            okText="Xác nhận"
                                            cancelText="Hủy"
                                            onConfirm={() => handleOk(3)}
                                        >
                                            <Button
                                                className="btn btn-status"
                                                icon={<FontAwesomeIcon
                                                    style={{
                                                        color: '#e31616',
                                                        marginRight: 10
                                                    }} icon={faXmark} />}>Huỷ hoá đơn</Button>
                                        </Popconfirm>
                                    </>

                                    : fee.status === 1 ?
                                        <>
                                            <Popconfirm
                                                placement="topRight"
                                                title="Bạn có chắc kết toán hoá đơn ?"
                                                okText="Xác nhận"
                                                cancelText="Hủy"
                                                onConfirm={() => handleOk(2)}
                                            >
                                                <Button className="btn btn-status" icon={<FontAwesomeIcon style={{
                                                    color: '#5ad82c',
                                                    marginRight: 10
                                                }} icon={faMoneyBillTransfer} />}>Kết toán hoá đơn</Button>
                                            </Popconfirm>
                                            <Popconfirm
                                                placement="topRight"
                                                title="Bạn có chắc từ chối duyệt hoá đơn này ?"
                                                okText="Xác nhận"
                                                cancelText="Hủy"
                                                onConfirm={() => handleOk(3)}
                                            >
                                                <Button
                                                    className="btn btn-status"
                                                    icon={<FontAwesomeIcon
                                                        style={{
                                                            color: '#e31616',
                                                            marginRight: 10
                                                        }} icon={faXmark} />}>Huỷ hoá đơn</Button>
                                            </Popconfirm>
                                        </>
                                        : null
                            }


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
                                title="Chi tiết chi phí phát sinh"
                                column={{
                                    md: 4
                                }}>
                                <Descriptions.Item span={4} label="Nhân viên">{fee.nhan_vien.ho_ten}</Descriptions.Item>
                                <Descriptions.Item span={2} label="Mô tả">{fee.mo_ta}</Descriptions.Item>
                                <Descriptions.Item span={2} label="Đơn giá">{fee.don_gia}</Descriptions.Item>
                                <Descriptions.Item span={2} label="Ngày lập">{moment(fee.ngay_lap).format('DD-MM-YYYY LT')}</Descriptions.Item>
                                <Descriptions.Item span={2} label="Mã số hoá đơn">{fee.so_hoa_don}</Descriptions.Item>
                            </Descriptions>
                        </Col>
                        <Col md={{ span: 10, push: 3 }}>
                            <Descriptions
                                title="Thông tin tài khoản kết toán"
                                column={{
                                    md: 4
                                }}>

                                <Descriptions.Item span={4} label="Ngân hàng">{fee.tai_khoan.ngan_hang}</Descriptions.Item>
                                <Descriptions.Item span={2} label="Tên chủ tài khoản">{fee.tai_khoan.chu_tai_khoan}</Descriptions.Item>
                                <Descriptions.Item span={2} label="Số tài khoản">{fee.tai_khoan.so_tai_khoan}</Descriptions.Item>
                            </Descriptions>
                        </Col>
                    </Row>
                    <Divider />
                </Card>
                : null}
        </>
    );
}

export default FeeDetail;