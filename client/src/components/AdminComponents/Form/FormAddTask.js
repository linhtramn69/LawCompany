import { Button, Form, Modal, Popconfirm, Select, Table, DatePicker, Space, Divider, Input } from "antd";
import { useState } from "react";
import customParseFormat from 'dayjs/plugin/customParseFormat';
import dayjs from 'dayjs';
import Title from "antd/es/typography/Title";
import { useStore } from "~/store";
import { userService } from "~/services";
import { useEffect } from "react";

dayjs.extend(customParseFormat);
const dateFormat = 'YYYY-MM-DD hh:mm A';

function FormAddTask() {
    const [state, dispatch] = useStore()
    const [staff, setStaff] = useState([]);
    const [dataSource, setDataSource] = useState([]);
    const [open, setOpen] = useState(false);
    const [edit, setEdit] = useState();
    const [date, setDate] = useState();
    const [phuTrach, setPhuTrach] = useState();
    const arrStaff = state.matter.truy_cap.nhan_vien.map((value) => {
        return (value)
    })
    const [leng, setLeng] = useState(arrStaff.length - 1)

    useEffect(() => {
        const getStaff = async () => {
            setStaff((await userService.getByMatter(state.matter.truy_cap.nhan_vien)).data)
        }
        getStaff();
    }, [])
    console.log(staff);
    const arrStaffDetail = staff.map((value) => {
        return ({
            value: value._id,
            label: value.ho_ten
        })
    })

    const handleDelete = (key) => {
        const newData = dataSource.filter((item) => item.key !== key);
        setDataSource(newData);
    };
    const handleAdd = (values, data) => {
        setOpen(false);
        // setEdit(data);
        console.log(values);
        setDataSource([...dataSource, {
            ...values,
            nguoi_phu_trach: values.nguoi_phu_trach.ho_ten
        }])
    }
    const handleFormat = (date, dateString) => {
        setDate(dateString);
    }
    const handleChangePhuTrach = async(value) => {
        setPhuTrach((await userService.getById(value)).data)
        console.log(phuTrach);
    }
    const handleUpdate = (value, key) => {
        const newVal = {
            ...value,
            key: key
        }
        const index = dataSource.findIndex((item) => key === item.key);
        const item = dataSource[index];
        dataSource.splice(index, 1, {
            ...item,
            ...newVal
        });
        setDataSource([...dataSource]);
        setOpen(false);
    }

    const onFinish = (values) => {
        const newVal = {
            key: dataSource.length == 0 ? 0 : dataSource.length,
            ten_cong_viec: values.ten_cong_viec,
            han_chot_cong_viec: date,
            nguoi_phu_trach: {
                _id: phuTrach._id,
                ho_ten: phuTrach.ho_ten
            },
            vu_viec: state.matter._id
        }
        edit ? handleUpdate(newVal, edit.key) : handleAdd(newVal)
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
                    <Button onClick={() => {
                        setEdit({
                            ...record,
                            han_chot_cong_viec: dayjs(record.han_chot_cong_viec, dateFormat)
                        })
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
                    style={
                        {
                            maxWidth: 600
                        }}
                    fields={
                        edit ? [
                            {
                                name: ["ten_cong_viec"],
                                value: edit.ten_cong_viec,
                            },
                            {
                                name: ["nguoi_phu_trach"],
                                value: edit.nguoi_phu_trach,
                            },
                            {
                                name: ["han_chot_cong_viec"],
                                value: dayjs(edit.han_chot_cong_viec, dateFormat),

                            }
                        ] : null
                    }
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                >
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
                        label="Phân công cho"
                        name="nguoi_phu_trach"
                        rules={[
                            {
                                required: true,
                                message: 'Vui lòng chọn nhân viên phụ trách',
                            },
                        ]}
                        
                    >
                        <Select options={arrStaffDetail} onChange={handleChangePhuTrach}/>
                    </Form.Item>
                    <Form.Item
                        label="Hạn chót"
                        name="han_chot_cong_viec"
                    >
                        <DatePicker showTime format={dateFormat} onChange={handleFormat} />
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
