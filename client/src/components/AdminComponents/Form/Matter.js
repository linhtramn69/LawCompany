import { Button, Col, Form, Input, Radio, Row, Space, Tabs, Select, Divider, InputNumber } from "antd";
import { useEffect, useState } from "react";
import { TableAddFile } from "~/components";
import Description from "../Description";
import FormAddTask from "./FormAddTask";
import FormAddPeriod from "./FormAddPeriod";
import FormAddFee from "./FormAddFee";
import { matterService, serviceService, typeServiceService, userService } from '~/services/index';
import { useNavigate } from "react-router-dom";
import { useStore } from "~/store";
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
const pttp = [
    {
        value: 0,
        label: 'Chi phí cố định',
    },
    {
        value: 1,
        label: 'Tính phí theo thời gian',
    },
]
const dktt = [
    {
        value: 0,
        label: 'Thanh toán ngay'
    },
    {
        value: 1,
        label: 'Thanh toán khi kết thúc'
    },
    {
        value: 2,
        label: 'Cọc trước 50%'
    }
]
function FormMatter({ props }) {
    const matter = { ...props }
    console.log(matter);
    const arrCustomer = [];
    const arrStaff = [];
    const arrCustomerAccess = [];
    const arrStaffAccess = [];
    const [users, setUsers] = useState([]);
    const [value, setValue] = useState(matter ? 1 : 0);
    const [typeServices, setTypeServices] = useState([]);
    const [services, setServices] = useState([]);
    const [access, setAccess] = useState([]);
    let navigate = useNavigate();
    useEffect(() => {
        const getTypeServices = async () => {
            setTypeServices((await typeServiceService.get()).data)
        };
        const getUser = async () => {
            setUsers((await userService.get()).data)
        }
        const getAccess = async () => {
            setAccess((await userService.getByMatter(
                [
                    ...matter.truy_cap.nhan_vien, 
                    matter.truy_cap.khach_hang ? {...matter.truy_cap.khach_hang} : null
                ])).data)
        }
        getAccess();
        getUser();
        getTypeServices();
    }, []);
    console.log(access);
    users.map((value) => {
        if (value.account.quyen === 0) {
            arrCustomer.push({
                value: JSON.stringify(value),
                label: value.ho_ten
            })
        }
        else arrStaff.push({
            value: JSON.stringify(value),
            label: value.ho_ten
        })

    })
    const arrTypeService = typeServices.map((value) => {
        return ({
            value: JSON.stringify(value),
            label: value.ten_linh_vuc
        })
    })
    const arrService = services.map((value) => {
        return ({
            value: JSON.stringify(value),
            label: value.ten_dv
        })
    })
    access.map((value) => {
       if(value.account.quyen !== 0){
        arrStaffAccess.push(value.ho_ten)
       } else arrCustomerAccess.push(value.ho_ten)
    })
    console.log(arrStaffAccess);
    const handleChangeTypeService = async (value) => {
        const id = JSON.parse(value)._id
        setServices((await serviceService.getByType(id)).data)
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
            ten_vu_viec: values.ten_vu_viec,
            linh_vuc: {
                _id: JSON.parse(values.linh_vuc)._id,
                ten_linh_vuc: JSON.parse(values.linh_vuc).ten_linh_vuc
            },
            dich_vu: {
                _id: JSON.parse(values.dich_vu)._id,
                ten_dv: JSON.parse(values.dich_vu).ten_dv,
            },
            khach_hang: {
                _id: JSON.parse(values.khach_hang)._id,
                ho_ten: JSON.parse(values.khach_hang).ho_ten,
                sdt: JSON.parse(values.khach_hang).account.sdt,
                email: JSON.parse(values.khach_hang).email
            },
            luat_su: {
                _id: JSON.parse(values.luat_su)._id,
                ho_ten: JSON.parse(values.luat_su).ho_ten,
                sdt: JSON.parse(values.luat_su).account.sdt,
                email: JSON.parse(values.luat_su).email
            },
            truy_cap: {
                khach_hang: values.customerAccess ? [...values.customerAccess.map((value) => {
                    return (JSON.parse(value)._id)})] : null,
                nhan_vien: values.staffAccess ? [...values.staffAccess.map((value) => {
                    return (JSON.parse(value)._id)})] : null
            },
            dieu_khoan_thanh_toan: values.dieu_khoan_thanh_toan,
            phuong_thuc_tinh_phi: values.phuong_thuc_tinh_phi,
            chiet_khau_hoa_hong: values.chiet_khau_hoa_hong,
            status: 0
        }
        // console.log(newData);
        handleAdd(newData)
    }


    return (
        <>
            <Form
                {...formItemLayout}
                onFinish={onFinish}
                fields={props ? [
                    {
                        name: ['ten_vu_viec'],
                        value: matter.ten_vu_viec
                    },
                    {
                        name: ['linh_vuc'],
                        value: matter.linh_vuc.ten_linh_vuc
                    },
                    {
                        name: ['dich_vu'],
                        value: matter.dich_vu.ten_dv
                    },
                    {
                        name: ['khach_hang'],
                        value: matter.khach_hang.ho_ten
                    },
                    {
                        name: ['luat_su'],
                        value: matter.luat_su.ho_ten
                    },
                    {
                        name: ['dieu_khoan_thanh_toan'],
                        value: dktt[matter.dieu_khoan_thanh_toan]
                    },
                    {
                        name: ['phuong_thuc_tinh_phi'],
                        value: pttp[matter.phuong_thuc_tinh_phi]
                    },
                    {
                        name: ['chiet_khau_hoa_hong'],
                        value: matter.chiet_khau_hoa_hong
                    },
                    {
                        name: ['show'],
                        value: matter.truy_cap.khach_hang ? 1 : 0
                    },
                    {
                        name: ['staffAccess'],
                        value: arrStaffAccess
                    },
                    {
                        name: ['customerAccess'],
                        value: arrCustomerAccess
                    },
                ] : null}

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

                    </Col>
                </Row>
                <Divider />
                <Tabs style={{ width: '100%' }} type="card" defaultActiveKey="0" items={[
                    {
                        key: '0',
                        label: `Thiết lập`,
                        children: <Row style={{ paddingTop: 30 }}>
                            <Col md={{ span: 10 }}>
                                <Form.Item
                                    name='dieu_khoan_thanh_toan'
                                    label="Điều khoản thanh toán">
                                    <Select options={dktt} />
                                </Form.Item>
                                <Form.Item
                                    name='phuong_thuc_tinh_phi'
                                    label="Phương thức tính phí">
                                    <Select options={pttp} />
                                </Form.Item>
                                <Form.Item
                                    name='chiet_khau_hoa_hong'
                                    label="Chiết khấu hoa hồng">
                                    <InputNumber
                                        bordered='false'
                                        defaultValue={0}
                                        min={0}
                                        max={100}
                                        formatter={(value) => `${value}%`}
                                        parser={(value) => value.replace('%', '')}
                                    />
                                </Form.Item>
                            </Col>
                            <Col md={{ span: 12 }}>
                                <Form.Item
                                    label="Hiển thị"
                                    name="show"
                                >
                                    <Radio.Group onChange={onAccessChange} value={value}>
                                        <Space direction="vertical">
                                            <Radio value={0}>Tài khoản nội bộ được mời</Radio>
                                            <Radio value={1}>Tài khoản nội bộ và khách hàng được mời</Radio>
                                        </Space>
                                    </Radio.Group>
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
                                            />
                                        </Form.Item>
                                        return (
                                            value === 0 ? showStaff : <>{showStaff} {showCustomer}</>
                                        )
                                    }
                                })()}
                            </Col>
                        </Row>,
                    },
                    {
                        key: '1',
                        label: `Mô tả`,
                        children: <Description />,
                    },
                    {
                        key: '2',
                        label: `Giấy tờ`,
                        children: <TableAddFile />,
                        disabled: matter ? false : true
                    },
                    {
                        key: '3',
                        label: `Liên hệ`,
                        children: <TableAddFile />,
                        disabled: matter ? false : true
                    },
                    {
                        key: '4',
                        label: `Công việc`,
                        children: <FormAddTask />,
                        disabled: matter ? false : true
                    },
                    {
                        key: '5',
                        label: `Phí cố định`,
                        children: <FormAddPeriod />,
                        disabled: matter ? false : true
                    },
                    {
                        key: '6',
                        label: `Chi phí`,
                        children: <FormAddFee />,
                        disabled: matter ? false : true
                    }
                ]} />
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