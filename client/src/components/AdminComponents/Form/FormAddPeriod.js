import { Button, Form, Modal, Popconfirm, Select, Table, Space, Divider, InputNumber} from "antd";
import Title from "antd/es/typography/Title";
import { useState } from "react";
function FormAddPeriod() {
    const [dataSource, setDataSource] = useState([]);
    const [open, setOpen] = useState(false);
    const [edit, setEdit] = useState(null);
    const arr = [
        {
            label: '123',
            value: '123'
        },
        {
            label: '456',
            value: '456'
        }
    ]
    const handleDelete = (key) => {
        const newData = dataSource.filter((item) => item.key !== key);
        setDataSource(newData);
    };
    const handleAdd = (values) => {
        setOpen(false);
        console.log(values);
        setDataSource([...dataSource, values])
    }
    const handleUpdate = (newVal) => {
        setOpen(false);
    }
    const onFinish = (values) => {
        const newVal = {
            key: values.periodID,
            periodID: values.periodID,
            periodName: values.periodName,
            amount: values.amount,
            unit: 'Giờ',
            price: 100000,
            discount: values.discount,
            vat: values.vat
        }
        edit ? handleUpdate(newVal) : handleAdd(newVal)

    };
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    const columns = [
        {
            title: 'STT',
            dataIndex: 'index',
        },
        {
            title: 'Mã quy trình',
            dataIndex: 'periodID',
        },
        {
            title: 'Tên quy trình',
            dataIndex: 'periodName',
        },
        {
            title: 'Số lượng',
            dataIndex: 'amount',
        },
        {
            title: 'Đơn vị tính',
            dataIndex: 'unit',
        },
        {
            title: 'Đơn giá',
            dataIndex: 'price',
        },
        {
            title: 'Chiết khấu',
            dataIndex: 'discount',
        },
        {
            title: 'Thuế',
            dataIndex: 'vat',
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
    console.log(edit);
    return (
        <>
            <Button type="primary" onClick={() => {
                setEdit(null)
                console.log(edit);
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
                        maxWidth: 600,
                    }}
                    fields={
                        edit ? [
                            {
                                name: ["periodName"],
                                value: edit.periodName,
                            },
                            {
                                name: ["periodID"],
                                value: edit.periodID
                            },
                            {
                                name: ["amount"],
                                value: edit.amount
                            },
                            {
                                name: ["price"],
                                value: edit.price
                            },
                            {
                                name: ["discount"],
                                value: edit.discount
                            },
                            {
                                name: ["vat"],
                                value: edit.vat
                            }
                        ] : null
                    }

                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                >
                    <Form.Item
                        label="Tên quy tình"
                        name="periodName"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your password!',
                            },
                        ]}
                    >
                        <Select options={arr} />
                    </Form.Item>  
                    <Form.Item
                        label="Mã quy trình"
                        name="periodID"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your username!',
                            },
                        ]}
                    >
                        <Select options={arr} />
                    </Form.Item>

                                      
                    <Form.Item
                        label="Số lượng"
                        name="amount"
                    >
                        <InputNumber min={1} max={10}/>
                    </Form.Item>
                    <Form.Item
                        label="Chiết khấu"
                        name="discount"
                    >
                        <InputNumber min={0} max={10}/>
                    </Form.Item>
                    <Form.Item
                        label="Thuế"
                        name="vat"
                    >
                        <Select options={arr}/>
                    </Form.Item>
                    <Form.Item
                        wrapperCol={{
                            offset: 8,
                            span: 16,
                        }}
                    >
                        <Button type="primary" htmlType="submit">
                            Submit
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
            <Table dataSource={dataSource} columns={columns} />
        </>
    );
}

export default FormAddPeriod;