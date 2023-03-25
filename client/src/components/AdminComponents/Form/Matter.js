import { Button, Col, Form, Input, Radio, Row, Space, Tabs, Select, Divider } from "antd";
import { useEffect, useState } from "react";
import { TableAddFile } from "~/components";
import { Editor } from 'react-draft-wysiwyg';
import FormAddTask from "./FormAddTask";
import FormAddPeriod from "./FormAddPeriod";
import FormAddFee from "./FormAddFee";
import { useStore } from "~/store";
import { serviceService, typeServiceService } from '~/services/index';
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
            children: <Editor />,
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

    const getTypeServices = async () => {
        setTypeServices((await typeServiceService.get()).data)
    };
    useEffect(() => {
        getTypeServices();
    }, []);
    const handleChangeTypeService = async (value) => {
        setServices((await serviceService.getByType(value)).data)
    };
    state.users.map((value) => {
        if (value.account.quyen == 0) {
            arrCustomer.push({
                value: value._id,
                label: value.ho_ten
            })
        }
        else {
            arrStaff.push({
                value: value._id,
                label: value.ho_ten
            })
        }
    })
    typeServices.map((value) => {
        return (
            arrTypeService.push({
                value: value._id,
                label: value.ten_linh_vuc
            })
        )
    })
    services.map((value) => {
        return (
            arrService.push({
                value: value._id,
                label: value.ten_dv
            })
        )
    })
    const onChange = (e) => {
        console.log('radio checked', e.target.value);
        setValue(e.target.value);
    };
    const onChangeTab = (key) => {
        console.log(key);
    };
    const onFinish = (values) => {
        
        console.log(values);
    }
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
                            <Radio.Group onChange={onChange} value={value}>
                                <Space direction="vertical">
                                    <Radio value={0}>Tài khoản nội bộ đã mời</Radio>
                                    <Radio value={1}>Tài khoản khách hàng đã mời</Radio>
                                    <Radio value={2}>Tất cả người dùng nội bộ</Radio>
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
                            name="name"
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
                        {value < 2 ?
                            <Form.Item
                                label={label[value]}
                                name="nameShow"
                            >
                                <Select
                                    mode="multiple"
                                    showSearch
                                    allowClear
                                    style={{
                                        width: '100%',
                                    }}
                                    options={value === 1 ? arrCustomer : arrStaff}
                                />
                            </Form.Item>
                            : <></>
                        }
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