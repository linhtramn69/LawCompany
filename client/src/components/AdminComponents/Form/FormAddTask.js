import { Button, Form, Modal, Popconfirm, Select, Table, DatePicker, Space, Divider, Input } from "antd";
import { useLayoutEffect, useState } from "react";
import customParseFormat from 'dayjs/plugin/customParseFormat';
import dayjs from 'dayjs';
import Title from "antd/es/typography/Title";
import { actions, useStore } from "~/store";
import { taskService, userService } from "~/services";
import { useEffect } from "react";
import moment from "moment";

dayjs.extend(customParseFormat);
const dateFormat = 'DD-MM-YYYY hh:mm A';
function FormAddTask() {

    const [state, dispatch] = useStore()
    const [form] = Form.useForm();
    const [open, setOpen] = useState(false);
    const [dataSource, setDataSource] = useState([]);
    const [staff, setStaff] = useState([]);
    const [task, setTask] = useState([]);

    useEffect(() => {
        const getTask = async () => {
            setTask((await taskService.findByMatter({ id: state.matter._id })).data)
        }
        getTask();
        const getStaff = async () => {
            setStaff((await userService.getByMatter(state.matter.truy_cap.nhan_vien)).data)
        }
        getStaff();
    }, [])
    useEffect(() => {
        if (task.length > 0) {
            task.map((value, index) => {
                setDataSource([
                    ...dataSource,
                    {
                        key: index,
                        _id: value._id,
                        ten_cong_viec: value.ten_cong_viec,
                        ngay_giao: value.ngay_giao,
                        nguoi_phu_trach: value.nguoi_phu_trach.ho_ten,
                        status: value.status,
                        han_chot_cong_viec: value.han_chot_cong_viec
                    }
                ])
            })
        }
    }, [task])

    const arrStaff = staff.map((value) => {
        return ({
            value: value._id,
            label: value.ho_ten
        })
    })

    const handleDelete = (key) => {
        const newData = dataSource.filter((item) => item._id !== key);
        setDataSource(newData);
    };
    const handleAdd = async (values) => {
        setOpen(false);
        try {
            let result = (await taskService.create(values)).data;
        }
        catch (err) {
            console.log(err);
        }
    }
    const onSubmit = (values) => {
        const newVal = {
            ten_cong_viec: values.ten_cong_viec,
            nguoi_phu_trach: values.nguoi_phu_trach,
            vu_viec: state.matter._id,
            han_chot_cong_viec: values.han_chot_cong_viec,
            ngay_giao: moment(new Date()).format('DD-MM-YYYY LTS'),
            status: 0
        }
        console.log(newVal);
        form.resetFields();
        handleAdd(newVal)
    };
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    const columns = [
        {
            title: 'Tên công việc',
            dataIndex: 'ten_cong_viec',
        },
        {
            title: 'Phân công cho',
            dataIndex: 'nguoi_phu_trach',
        },
        {
            title: 'Ngày giao',
            dataIndex: 'ngay_giao',
        },
        {
            title: 'Hạn chót',
            dataIndex: 'han_chot_cong_viec',
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
                    <Button>Edit</Button>
                    <Popconfirm title="Sure to delete?" onConfirm={() => handleDelete(record._id)}>
                        <Button>Delete</Button>
                    </Popconfirm>
                </Space>)
        },
    ];

    return (
        <>
            <Button type="primary" onClick={() => {
                setOpen(true)
            }}>
                Thêm công việc
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
                onCancel={() => {
                    form.resetFields()
                    setOpen(false)
                }}
            >
                <Form
                    form={form}
                    name="basic"
                    labelCol={{
                        span: 8,
                    }}
                    wrapperCol={{
                        span: 16,
                    }}
                    style={
                        {
                            maxWidth: 600
                        }}
                    onFinish={onSubmit}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                >
                    <Form.Item
                        label="Phân công cho"
                        name="nguoi_phu_trach"
                        rules={[
                            {
                                required: true,
                                message: 'Vui lòng chọn nhân viên phụ trách',
                            },
                        ]}
                    >
                        <Select options={arrStaff} />
                    </Form.Item>
                    <Form.Item
                        label="Tên công việc"
                        name="ten_cong_viec"
                        rules={[
                            {
                                required: true,
                                message: 'Vui lòng nhập tên công việc!',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Hạn chót"
                        name="han_chot_cong_viec"
                    >
                        <DatePicker showTime format={dateFormat} />
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
export default FormAddTask;