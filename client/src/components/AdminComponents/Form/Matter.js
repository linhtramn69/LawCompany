import { Button, Col, Form, Input, Radio, Row, Space, Tabs, Select, Divider } from "antd";
import { useEffect, useState } from "react";
import { TableAddFile } from "~/components";
import Description from "../Description";
import FormAddTask from "./FormAddTask";
import FormAddPeriod from "./FormAddPeriod";
import FormAddFee from "./FormAddFee";
import { matterService, serviceService, typeServiceService, userService } from '~/services/index';
import { useNavigate } from "react-router-dom";
const formItemLayout = {
    labelCol: {
        xs: {
            span: 24,
        },
        md: {
            span: 10,
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
const label = [
    'Nội bộ được phép truy cập',
    'Khách hàng được phép truy cập'
]

function FormMatter() {

    const items = [
        {
            key: '1',
            label: `Mô tả`,
            children: <Description />,
        },
        {
            key: '2',
            label: `Giấy tờ`,
            children: <TableAddFile />,
        },
        {
            key: '3',
            label: `Liên hệ`,
            children: <TableAddFile />,
        },
        {
            key: '4',
            label: `Công việc`,
            children: <FormAddTask />,
        },
        {
            key: '5',
            label: `Phí cố định`,
            children: <FormAddPeriod />,
        },
        {
            key: '6',
            label: `Chi phí`,
            children: <FormAddFee />,
        }
    ];
    let navigate = useNavigate();
    const arrCustomer = [];
    const arrStaff = [];
    const [users, setUsers] = useState([]);
    const [value, setValue] = useState(2);
    const [typeServices, setTypeServices] = useState([]);
    const [services, setServices] = useState([]);

    useEffect(() => {
        const getTypeServices = async () => {
            setTypeServices((await typeServiceService.get()).data)
        };
        const getUser = async () => {
            setUsers((await userService.get()).data)
        }
        getUser();
        getTypeServices();
    }, []);
    users.map((value) => {
        if (value.account.quyen === 0) {
            return (
                arrCustomer.push({
                    value: value._id,
                    label: value.ho_ten
                })
            )
        }
        else return (
            arrStaff.push({
                value: value._id,
                label: value.ho_ten
            })
        )
    })
    const arrTypeService = typeServices.map((value) => {
        return ({
            value: value._id,
            label: value.ten_linh_vuc
        })
    })
    const arrService = services.map((value) => {
        return ({
            value: value._id,
            label: value.ten_dv
        })
    })
    const handleChangeTypeService = async (value) => {
        setServices((await serviceService.getByType(value)).data)
    };
    const onAccessChange = (e) => {
        setValue(e.target.value);
    };
    const handleAdd = async (data) => {
        try {
            let result = (await matterService.create(data)).data;
            navigate(`/admin/matter`);
        }
        catch (error) {
            console.log(error);
        }
    }
    const onFinish = (values) => {
        const newData = {
            ...values,
            truy_cap: {
                khach_hang: values.customerAccess,
                nhan_vien: values.staffAccess
            },
            status: '0'
        }
        console.log(newData);
        handleAdd(newData)
    }

    return (
        <>
            <Form
                {...formItemLayout}
                onFinish={onFinish}
            >
                <Row>
                    <Col span={12} pull={2}>
                        <Form.Item
                            label="Tên vụ việc"
                            name="ten_vu_viec"
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            label="Lĩnh vực"
                            name="linh_vuc"
                        >
                            <Select
                                showSearch
                                allowClear
                                style={{
                                    width: '100%',
                                }}
                                optionFilterProp="children"
                                filterOption={(input, option) => (option?.label ?? '').includes(input)}
                                filterSort={(optionA, optionB) =>
                                    (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                                }
                                options={arrTypeService}
                                onChange={handleChangeTypeService}
                            />
                        </Form.Item>
                        <Form.Item
                            label="Dịch vụ"
                            name="dich_vu"
                        >
                            <Select
                                showSearch
                                allowClear
                                style={{
                                    width: '100%',
                                }}
                                optionFilterProp="children"
                                filterOption={(input, option) => (option?.label ?? '').includes(input)}
                                filterSort={(optionA, optionB) =>
                                    (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                                }
                                options={arrService}
                            />
                        </Form.Item>
                        <Form.Item
                            label="Hiển thị"
                            name="show"
                        >
                            <Radio.Group onChange={onAccessChange} value={value}>
                                <Space direction="vertical">
                                    <Radio value={0}>Tài khoản nội bộ được mời</Radio>
                                    <Radio value={1}>Tất cả tài khoản nội bộ và khách hàng được mời</Radio>
                                </Space>
                            </Radio.Group>
                        </Form.Item>
                    </Col>
                    <Col span={12} pull={2}>
                        <Form.Item
                            label="Khách hàng"
                            name="khach_hang"
                        >
                            <Select
                                showSearch
                                allowClear
                                style={{
                                    width: '100%',
                                }}
                                options={arrCustomer}
                            />
                        </Form.Item>
                        <Form.Item
                            label="Luật sư phụ trách"
                            name="luat_su"
                        >
                            <Select
                                showSearch
                                allowClear
                                style={{
                                    width: '100%',
                                }}
                                options={arrStaff}
                            />
                        </Form.Item>
                        {(() => {
                            if (value < 2) {
                                const showCustomer = <Form.Item
                                    label={label[1]}
                                    name="customerAccess"
                                >
                                    <Select
                                        mode="multiple"
                                        showSearch
                                        allowClear
                                        style={{
                                            width: '100%',
                                        }}
                                        options={arrCustomer}
                                    // onChange={handleCustomerChange}
                                    />
                                </Form.Item>
                                const showStaff = <Form.Item
                                    label={label[0]}
                                    name="staffAccess"
                                >
                                    <Select
                                        mode="multiple"
                                        showSearch
                                        allowClear
                                        style={{
                                            width: '100%',
                                        }}
                                        options={arrStaff}
                                    // onChange={handleStaffChange}
                                    />
                                </Form.Item>
                                return (
                                    value === 0 ? showStaff : <>{showStaff} {showCustomer}</>
                                )
                            }
                        })()}
                    </Col>
                </Row>
                <Divider />
                <Form.Item
                    wrapperCol={{
                        md: 24
                    }}>
                    <Tabs style={{ width: '100%' }} type="card" defaultActiveKey="1" items={items} />
                </Form.Item>
                <Form.Item
                    wrapperCol={{
                        offset: 20,
                    }}
                >
                    <Button type="primary" htmlType="submit" className="btn-primary">SAVE</Button>
                </Form.Item>
            </Form>
        </>
    );
}

export default FormMatter;