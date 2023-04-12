import { Button, Form, Modal, Popconfirm, Select, Table, Space, Divider, InputNumber, Input, Row, Col, Checkbox } from "antd";
import { useEffect, useState } from "react";
import customParseFormat from 'dayjs/plugin/customParseFormat';
import dayjs from 'dayjs';
import Title from "antd/es/typography/Title";
import moment from "moment";
import { actions, useStore } from "~/store";

dayjs.extend(customParseFormat);

function FormAddFee({props}) {
    
    const [form] = Form.useForm();
    const [state, dispatch] = useStore();
    const [dataSource, setDataSource] = useState([]);
    const [dataTemp, setDataTemp] = useState(props ? [...props] : []);
    const [open, setOpen] = useState(false);
    const [edit, setEdit] = useState(null);
    const [date, setDate] = useState();

    useEffect(() => {
        dispatch(actions.setFees([...dataTemp]));
    }, [dataTemp])
    useEffect(() => {
        const data = props ? props.map((value) => {
            return ({
                key: value.key,
                ngay_lap: value.ngay_lap,
                mo_ta: value.mo_ta,
                staff: value.nhan_vien,
                don_gia: `${value.don_gia}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',') + ' đ'
            })

        }) : []
        setDataSource(data)
    }, [])

    const handleDelete = (key) => {
        const newData = dataSource.filter((item) => item.key !== key);
        const newDataTemp = dataTemp.filter((item) => item.key !== key);
        setDataSource(newData);
        setDataTemp(newDataTemp);
    };
    const handleAdd = (values) => {
        const key =  moment(values.ngay_lap).format('DDMMYYYYhhmmss')
        setOpen(false);
        setDataSource([...dataSource, {
            ...values,
            key: key,
            staff: values.nhan_vien,
            don_gia: `${values.don_gia}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',') + ' đ',
        }])
        setDataTemp([
            ...dataTemp,
            {
                ...values,
                key: key,
            }
        ])
    }
    const handleUpdate = (value, key) => {
        /** Update dataSoure Table */
        const newVal = {
            ...value,
            key: key,
            staff: value.nhan_vien,
            don_gia: `${value.don_gia}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',') + ' đ'
        }
        const index = dataSource.findIndex((item) => key === item.key);
        const item = dataSource[index];
        dataSource.splice(index, 1, {
            ...item,
            ...newVal,
        });
        /* Update data in MongoDB*/
        dataTemp.splice(index, 1, {
            ...dataTemp[index],
            key: key,
            ...value,
           
        })
        setDataTemp([...dataTemp])
        setDataSource([...dataSource]);
        form.resetFields()
        setOpen(false);
    }
    const onFinish = (values) => {
        const newVal = {
            key: Math.floor(Math.random() * 100000),
            ngay_lap: moment(new Date()).format('DD-MM-YYYY LTS'),
            mo_ta: values.mo_ta,
            don_gia: values.don_gia,
            so_hoa_don: values.idHD,
            hinh_anh: values.hinh_anh,
            vu_viec: state.matter._id,
            nhan_vien: state.matter.luat_su.ho_ten,
            khach_hang: values.customer,
        }
        // console.log(newVal);
        form.resetFields();
        edit ? handleUpdate(newVal, edit.key) : handleAdd(newVal)
    };
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    const columns = [
        {
            title: 'Ngày lập',
            dataIndex: 'ngay_lap',
            width: 200
        },
        {
            title: 'Mô tả',
            dataIndex: 'mo_ta',
            width: 350
        },
        {
            title: 'Nhân viên',
            dataIndex: 'staff',
            width: 250
        },
        {
            title: 'Tổng',
            dataIndex: 'don_gia',
            width: 200
        },
        {
            title: 'Trạng thái',
            dataIndex: 'status',
        },
        {
            title: 'Thao tác',
            dataIndex: 'operation',
            render: (_, record) => (
                <Space split={<Divider type="vertical" />}>
                    <Button onClick={() => {
                        setEdit(record)
                        setOpen(true)
                    }}>Edit</Button>
                    <Popconfirm title="Sure to delete?" onConfirm={() => handleDelete(record.key)}>
                        <Button>Delete</Button>
                    </Popconfirm>
                </Space>)
        },
    ];

    return (
        <>
            <Button type="primary" onClick={() => {
                setEdit(null)
                setOpen(true)
            }}
            >
                Thêm mới
            </Button>
            <Modal
                title={
                    <>
                        <Title level={4}>Thêm công việc</Title>
                        <Divider />
                    </>
                }
                centered
                open={open}
                footer={null}
                width={1000}
                onCancel={() => setOpen(false)}
            >
                <Form
                    name="basic"
                    labelCol={{
                        span: 8,
                    }}
                    wrapperCol={{
                        span: 16,
                    }}
                    style={{
                        maxWidth: 1000,
                    }}
                    form={form}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                    fields={
                        edit ? [
                            {
                                name: ["mo_ta"],
                                value: edit.mo_ta,
                            },
                            {
                                name: ["idHD"],
                                value: edit.so_hoa_don
                            },
                            {
                                name: ["don_gia"],
                                value:(edit.don_gia).replace(/đ|(,*)/g, ''),
                            },
                            {
                                name: ["staff"],
                                value: edit.nhan_vien,
                            },
                            {
                                name: ["matter"],
                                value: edit.vu_viec,
                            },
                        ] : [
                            {
                                name: ['matter'],
                                value: state.matter.ten_vu_viec
                            },
                            {
                                name: ['staff'],
                                value: state.matter.luat_su.ho_ten
                            }
                        ]
                    }
                >
                    <Row>
                        <Col span={24} pull={4}>
                            <Form.Item
                                label="Mô tả"
                                name="mo_ta"
                            >
                                <Input placeholder="VD: Ăn trưa với khách hàng A" />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={10} push={1}>
                            <Form.Item
                                label="Tổng tiền"
                                name="don_gia"
                            >
                                <InputNumber
                                    style={{
                                        width: 250
                                    }}
                                    min={1}
                                    formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                    parser={(value) => value.replace(/\$\s?|(,*)/g, '')}
                                    addonAfter="đ"
                                />
                            </Form.Item>
                            <Form.Item
                                label="Mã / Số hóa đơn"
                                name="idHD"
                            >
                                <Input
                                    style={{
                                        width: 250,
                                    }}
                                />
                            </Form.Item>
                        </Col>
                        <Col span={10} push={2}>
                            <Form.Item
                                label="Vụ việc"
                                name="matter"
                            >
                                <Input
                                    style={{
                                        width: 250,
                                    }}
                                    disabled='true'
                                />
                            </Form.Item>
                            <Form.Item
                                label="Nhân viên"
                                name="staff"
                            >
                                <Input
                                    style={{
                                        width: 250,
                                    }}
                                    disabled='true'
                                />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Divider />
                    <Row>
                        <Col span={10} push={1}>
                            <Form.Item>
                                <Checkbox>
                                    <Title level={5}>Thêm vào hóa đơn khách hàng</Title>
                                </Checkbox>
                            </Form.Item>
                            <Form.Item
                                label="Khách hàng"
                                name="customer"
                            >
                                <Input
                                    style={{
                                        width: 250,
                                    }}
                                />
                            </Form.Item>
                        </Col>
                        <Col span={10} push={2}>
                            <Form.Item>
                                <Title level={5}>Tài khoản bồi hoàn</Title>
                            </Form.Item>
                            <Form.Item
                                label="Ngân hàng"
                                name="nameCreditCard"
                            >
                                <Select  />
                            </Form.Item>
                            <Form.Item
                                label="Tên tài khoản"
                                name="nameCreditCard"
                            >
                                <Input
                                    style={{
                                        width: 250,
                                    }}
                                />
                            </Form.Item>
                            <Form.Item
                                label="Số tài khoản"
                                name="numberCreditCard"
                            >
                                <Input
                                    style={{
                                        width: 250,
                                    }}
                                />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Divider />
                    <Form.Item
                        wrapperCol={{
                            offset: 18,
                            span: 6,
                        }}
                    >
                        <Button type="primary" htmlType="submit">
                            Tạo mới
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
            <Table dataSource={dataSource} columns={columns} />
        </>
    );
}

export default FormAddFee;