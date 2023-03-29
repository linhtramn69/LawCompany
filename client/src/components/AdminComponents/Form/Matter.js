import { Button, Col, Form, Input, Radio, Row, Space, Tabs, Select, Divider } from "antd";
import { useEffect, useState } from "react";
import { TableAddFile } from "~/components";
import Description from "../Description";
import FormAddTask from "./FormAddTask";
import FormAddPeriod from "./FormAddPeriod";
import FormAddFee from "./FormAddFee";
import { useStore } from "~/store";
import { matterService, serviceService, typeServiceService } from '~/services/index';
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
    const arrTypeService = [];
    const arrService = [];
    const arrCustomer = [];
    const arrStaff = [];
    const [state, dispatch] = useStore();
    const [value, setValue] = useState(2);
    const [typeServices, setTypeServices] = useState([]);
    const [services, setServices] = useState([]);
    const [staffChanges, setStaffChanges] = useState([]);
    const [customerChanges, setCustomerChanges] = useState([]);
    let navigate = useNavigate();

    state.users.map((value) => {
        if (value.account.quyen === 0) {
            arrCustomer.push({
                value: JSON.stringify(value),
                label: value.ho_ten
            })
        }
        else {
            arrStaff.push({
                value: JSON.stringify(value),
                label: value.ho_ten
            })
        }
    })
    typeServices.map((value) => {
        return (
            arrTypeService.push({
                value: JSON.stringify(value),
                label: value.ten_linh_vuc
            })
        )
    })
    services.map((value) => {
        return (
            arrService.push({
                value: JSON.stringify(value),
                label: value.ten_dv
            })
        )
    })

    const getTypeServices = async () => {
        setTypeServices((await typeServiceService.get()).data)
    };
    useEffect(() => {
        getTypeServices();
    }, []);
    const handleChangeTypeService = async (value) => {
        const id = JSON.parse(value)._id
        setServices((await serviceService.getByType(id)).data)
    };

    const onAccessChange = (e) => {
        setValue(e.target.value);
    };
    const onChangeTab = (key) => {
        console.log(key);
    };

    const handleStaffChange = (e) => {
        e.map(value => {
            setStaffChanges([...staffChanges, {
                id: JSON.parse(value)._id,
                ho_ten: JSON.parse(value).ho_ten,
                sdt: JSON.parse(value).account.sdt
            }]);
        })
    }
    const handleCustomerChange = (e) => {
        e.map(value => {
            setCustomerChanges([...customerChanges, {
                id: JSON.parse(value)._id,
                ho_ten: JSON.parse(value).ho_ten,
                sdt: JSON.parse(value).account.sdt
            }])
        })
    }
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
        
        const data = {
            ten_vu_viec: values.nameMatter,
            mo_ta_vu_viec: values.Description,
            linh_vuc: {
                id: JSON.parse(values.typeService)._id,
                ten_linh_vuc: JSON.parse(values.typeService).ten_linh_vuc
            },
            dich_vu: {
                id: JSON.parse(values.service)._id,
                ten_dich_vu: JSON.parse(values.service).ten_dv
            },
            truy_cap: {
                staffAccess: staffChanges,
                customerAccess: customerChanges
                // allStaffAccess: 
            },
            khach_hang: {
                id: JSON.parse(values.customer)._id,
                ho_ten: JSON.parse(values.customer).ho_ten,
                sdt: JSON.parse(values.customer).account.sdt
            },
            luat_su: {
                id: JSON.parse(values.law)._id,
                ho_ten: JSON.parse(values.law).ho_ten,
                sdt: JSON.parse(values.law).account.sdt
            }
        }
        // console.log(data);
        // handleAdd(data);

    }
    console.log(Description.editorState);
    return (
        <>
            <Form {...formItemLayout}
                onFinish={onFinish}>
                <Row>
                    <Col span={12} pull={2}>
                        <Form.Item
                            label="Tên vụ việc"
                            name="nameMatter"
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            label="Lĩnh vực"
                            name="typeService"
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
                            name="service"
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
                                    <Radio value={2}>Tất cả tài khoản nội bộ</Radio>
                                </Space>
                            </Radio.Group>
                        </Form.Item>
                    </Col>
                    <Col span={12} pull={2}>
                        <Form.Item
                            label="Khách hàng"
                            name="customer"
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
                            name="law"
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
                            if(value<2){
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
                                    onChange={handleCustomerChange}
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
                                    onChange={handleStaffChange}
                                />
                            </Form.Item>
                                return (
                                    value===0 ? showStaff : <>{showStaff} {showCustomer}</>
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
                    <Tabs style={{ width: '100%' }} type="card" defaultActiveKey="1" items={items} onChange={onChangeTab} />
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