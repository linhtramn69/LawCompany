import { Col, Divider, Row, Form, Input, Modal, Select, Tabs, DatePicker } from "antd";
import TextArea from "antd/es/input/TextArea";
import { useEffect } from "react";
import { useState } from "react";
const { RangePicker } = DatePicker;
const formItemLayout = {
    labelCol: {
        xs: {
            span: 24,
        },
        md: {
            span: 8,
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
function ModalCalendar(props) {
    console.log(props);
    return ( 
        <Modal title="Thêm công việc"  width={1000} {...props}>
                <Form {...formItemLayout}>
                    <Row>
                        <Col span={24} pull={4}><Form.Item
                            label="Tiêu đề"
                            name='tieu_de'>
                            <Input />
                        </Form.Item>
                        </Col>
                    </Row>
                    <Col span={24} pull={4}>
                        <Form.Item
                            label="Tính chất"
                            name='loai_lich'>
                            <Select />
                        </Form.Item>
                    </Col>
                    <Divider />
                    <Tabs
                        type="card"
                        items={[
                            {
                                key: '1',
                                label: `Thông tin khách hàng`,
                                children:
                                    <>
                                        <br />
                                        <Row>
                                            <Col span={12} pull={1}>
                                                <Form.Item
                                                    label="Họ tên"
                                                    name='name'>
                                                    <Input />
                                                </Form.Item>
                                                <Form.Item
                                                    label="Email"
                                                    name='email'>
                                                    <Input />
                                                </Form.Item>
                                            </Col>
                                            <Col span={11} pull={1}>
                                                <Form.Item
                                                label="Số điện thoại"
                                                name='sdt'>
                                                <Input />
                                                </Form.Item>
                                            </Col>
                                        </Row>
                                    </>
                            },
                            {
                                key: '2',
                                label: `Hồ sơ liên quan`,
                                children:
                                    <>
                                        <br />
                                        <Row>
                                            <Col span={12}>
                                                <Form.Item
                                                    label="Dịch vụ"
                                                    name='dich_vu'>
                                                    <Input />
                                                </Form.Item> 
                                                <Form.Item
                                                    label="Lĩnh vực"
                                                    name='linh_vuc'>
                                                    <Input />
                                                </Form.Item>
                                                <Form.Item
                                                    label="Giá dự kiến"
                                                    name='price'>
                                                    <Input />
                                                </Form.Item>
                                                <Form.Item
                                                    label="Điều khoản thanh toán"
                                                    name='linh_vuc'>
                                                    <Input />
                                                </Form.Item>
                                            </Col>
                                            <Col span={12}>
                                                <Form.Item
                                                    label="Vấn đề của khách hàng"
                                                    name='van_de'>
                                                    <TextArea />
                                                </Form.Item>
                                                <Form.Item
                                                    label="Ghi chú"
                                                    name='ghi_chu'>
                                                    <TextArea />
                                                </Form.Item>
                                            </Col>
                                        </Row>
                                    </>
                            },
                            {
                                key: '3',
                                label: `Thông tin chi tiết`,
                                children:
                                    <>
                                        <Row>
                                            <Col span={10}>
                                                <Form.Item
                                                    label="Thời gian"
                                                    name='thoi_gian'>
                                                    <RangePicker showTime />
                                                </Form.Item>
                                                <Form.Item
                                                    label="Mô tả"
                                                    name='mo_ta'>
                                                    <TextArea />
                                                </Form.Item>
                                                <Form.Item
                                                    label="Ghi chú"
                                                    name='ghi_chu'>
                                                    <TextArea />
                                                </Form.Item>
                                            </Col>
                                            <Col span={10} push={1}>
                                                <h4>Phân công cho</h4>
                                                <Divider />
                                                <Form.Item
                                                    label="Phòng ban"
                                                    name='nhan_vien'>
                                                    <Select
                                                        mode="multiple"
                                                        style={{
                                                            width: '100%',
                                                        }}
                                                        placeholder="Please select"
                                                    />
                                                </Form.Item>
                                                <Form.Item
                                                    label="Nhân viên"
                                                    name='nhan_vien'>
                                                    <Select
                                                        mode="multiple"
                                                        style={{
                                                            width: '100%',
                                                        }}
                                                        placeholder="Please select"
                                                    />
                                                </Form.Item>
                                            </Col>
                                        </Row>
                                    </>
                            },
                        ]}
                    />

                </Form>
            </Modal>
     );
     
}

export default ModalCalendar;