import { Button, Form, Modal, Popconfirm, Select, Table, DatePicker, Space, Divider, Input } from "antd";
import { useLayoutEffect, useState } from "react";
import customParseFormat from 'dayjs/plugin/customParseFormat';
import dayjs from 'dayjs';
import Title from "antd/es/typography/Title";
import { actions, useStore } from "~/store";
import { userService } from "~/services";
import { useEffect } from "react";
import moment from "moment";

dayjs.extend(customParseFormat);
const dateFormat = 'DD-MM-YYYY hh:mm A';
function FormAddTask({ props }) {

    const [state, dispatch] = useStore()
    const [form] = Form.useForm();
    const [dataTemp, setDataTemp] = useState(props ? [...props] : [])
    const [staff, setStaff] = useState([]);
    const [dataSource, setDataSource] = useState([]);
    const [open, setOpen] = useState(false);
    const [edit, setEdit] = useState();
    const [date, setDate] = useState();
    const [phuTrach, setPhuTrach] = useState();
    const [idPhuTrach, setIdPhuTrach] = useState();

    useEffect(() => {
        dispatch(actions.setTasks([...dataTemp]));
    }, [dataTemp])
    useEffect(() => {
        const getStaff = async () => {
            setStaff((await userService.getByMatter(state.matter.truy_cap.nhan_vien)).data)
        }
        getStaff();
    }, [])
    useEffect(() => {
        const getPhuTrachById = async () => {
            setPhuTrach((await userService.getById(idPhuTrach)).data);
        }
        getPhuTrachById()
    }, [idPhuTrach])
    useEffect(() => {
        setEdit(edit ? {
            ...edit,
            han_chot_cong_viec: date ? date : edit.han_chot_cong_viec,
            nguoi_phu_trach: phuTrach.ho_ten
        } : null)
    }, [phuTrach, date])
    useEffect(() => {
        const data = props ? props.map((value) => {
            return ({
                key: value.key,
                ten_cong_viec: value.ten_cong_viec,
                nguoi_phu_trach: value.nguoi_phu_trach.ho_ten,
                han_chot_cong_viec: moment(value.han_chot_cong_viec).format('DD-MM-YYYY LT')
            })

        }) : []
        setDataSource(data)
    }, [])

    const arrStaffDetail = staff.map((value) => {
        return ({
            value: value._id,
            label: value.ho_ten
        })
    })
    const handleChangePhuTrach = (value) => {
        setIdPhuTrach(value);
    }
    const handleDelete = (key) => {
        const newData = dataSource.filter((item) => item.key !== key);
        const data = dataTemp.filter((item) => item.key !== key);
        setDataTemp(data)
        setDataSource(newData);
    };
    const handleAdd = (values, data) => {
        setOpen(false);
        setDataTemp([...dataTemp, {
            ...values,
            nguoi_phu_trach: phuTrach
        }]);
        setDataSource([...dataSource, {
            ...values,
            nguoi_phu_trach: phuTrach.ho_ten,
            han_chot_cong_viec: date
        }])
    }
    const handleUpdate = (value, key) => {
        /** Update dataSoure Table */
        const newVal = {
            ...value,
            han_chot_cong_viec: date ? date :
                moment(edit.han_chot_cong_viec.$d).format('DD-MM-YYYY LT'),
            nguoi_phu_trach: edit.nguoi_phu_trach,
            key: key
        }
        const index = dataSource.findIndex((item) => key === item.key);
        const item = dataSource[index];
        dataSource.splice(index, 1, {
            ...item,
            ...newVal
        });
        /* Update data in MongoDB*/
        dataTemp.splice(index, 1, {
            ...dataTemp[index],
            key: key,
            ...value,
            han_chot_cong_viec: dayjs(value.han_chot_cong_viec, dateFormat),
            nguoi_phu_trach: phuTrach
        })
        setDataTemp([...dataTemp])
        setDataSource([...dataSource]);
        form.resetFields()
        setOpen(false);
    }
    const onSubmit = (values) => {
        const newVal = {
            ten_cong_viec: values.ten_cong_viec,
            key: Math.floor(Math.random() * 100000),
            nguoi_phu_trach: values.nguoi_phu_trach,
            vu_viec: state.matter._id,
            han_chot_cong_viec: values.han_chot_cong_viec
        }
        form.resetFields();
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
                        <Select options={arrStaffDetail} onChange={handleChangePhuTrach} />
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
                        <DatePicker showTime format={dateFormat} onChange={(date, dateString) => setDate(dateString)} />
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