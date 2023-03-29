import { useStore, actions } from "~/store";
import { quoteService, serviceService, timePayService, typeServiceService, } from "~/services";
import { useState, useEffect } from "react";
import { Button, Col, Row, Divider, Form, InputNumber, Select, Space, Typography, Descriptions } from "antd";
import Title from "antd/es/typography/Title";
import TextArea from "antd/es/input/TextArea"
import Message from "~/components/Message";
import { useNavigate } from "react-router-dom";
const { Text } = Typography;
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
const mess = [
    '',
    'Gửi báo giá thành công!',
    'Gửi báo giá thất bại!'
]
const staff = {
    ho_ten: 'Tran Thi Kim Linh',
    sdt: '0776560825',
    email: 'kimlinhtr@gmail.com',
    chuc_vu: 'Luật sư'
}
function FormQuotes({ quote }) {
    let navigate = useNavigate();
    const [form] = Form.useForm();
    const [state, dispatch] = useStore();
    const arrTypeServices = [];
    const arrServices = [];
    const arrCustomer = [];
    const arrTimePay = []
    const [timePay, setTimePay] = useState([])
    const [typeService, setTypeService] = useState(null);
    const [service, setService] = useState(null);
    const [donGia, setDonGia] = useState(0);
    const [isSubmit, setisSubmit] = useState(null);

    useEffect(() => {
        const getTypeServices = async () => {
            dispatch(actions.setTypeServices((await typeServiceService.get()).data))
        };
        getTypeServices()
    }, [dispatch]);

    useEffect(() => {
        const getTimePay = async () => {
            setTimePay((await timePayService.get()).data)
        }
        getTimePay();
    }, [])
    timePay.map((value) => {
        return (
            arrTimePay.push({
                value: value.ten,
                label: value.ten
            })
        )
    })

    state.type_services.map((value) => {
        return (
            arrTypeServices.push({
                value: JSON.stringify(value),
                label: value.ten_linh_vuc
            })
        )
    })

    const handleChangeTypeService = async (value) => {
        console.log(value);
        const type = {
            id: JSON.parse(value)._id,
            ten_linh_vuc: JSON.parse(value).ten_linh_vuc
        }
        setTypeService(type)
        dispatch(actions.setServices((await serviceService.getByType(type.id)).data));

    }
    const handleChangeService = (value) => {
        console.log(value);
        const sv = {
            id: JSON.parse(value)._id,
            ten_dv: JSON.parse(value).ten_dv,
            don_gia: JSON.parse(value).don_gia_dv
        }
        setDonGia(sv.don_gia);
        setService(sv);
        console.log(service);
    }

    state.services.map((value) => {
        return (
            arrServices.push({
                value: JSON.stringify(value),
                label: value.ten_dv
            })
        )
    })
    state.users.map((value) => {

        if (value.account.quyen === 0) {
            arrCustomer.push({
                value: JSON.stringify(value),
                label: value.ho_ten
            })
        }
        return arrCustomer
    })
    const handleAdd = async (data) => {
        console.log(data);
        try {
            const result = await quoteService.create(data);
            setisSubmit(1);
            navigate(`/admin/quotes/${result.data.insertedId}`);
        }
        catch (error) {
            console.log(error);
        }

    }
    const handleEdit = async (data) => {
        try {
            await quoteService.update(quote._id, data);
            setisSubmit(1);
            navigate(`/admin/quotes/${quote._id}`);
        }
        catch (error) {
            console.log(error);
        }
    }
    const onFinish = (values) => {
        console.log(values);
        const customer = quote ? { ...quote } : {
            khach_hang: {
                ho_ten: JSON.parse(values.customer).ho_ten,
                sdt: JSON.parse(values.customer).account.sdt,
                email: JSON.parse(values.customer).email
            }
        };
        const data = {
            ...customer,
            nguoi_lap_phieu: { ...staff },
            linh_vuc: { ...typeService },
            dich_vu: { ...service },
            ngay_lap_phieu: new Date(),
            tong_gia_du_kien: values.price,
            dieu_khoan_thanh_toan: values.payTime,
            ghi_chu: values.note,
            status: 1
        }
        quote ? handleEdit(data) : handleAdd(data)
    }

    return (
        <>
            <Form
                {...formItemLayout}

                fields={
                    quote && quote.status > 0 ? [
                        {
                            name: ['price'],
                            value: donGia ? donGia : quote.tong_gia_du_kien,
                        },
                        {
                            name: ['typeService'],
                            value: typeService ? typeService.ten_linh_vuc : quote.linh_vuc.ten_linh_vuc,
                        },
                        {
                            name: ['service'],
                            value: service ? service.ten_dv : quote.dich_vu.ten_dv,
                        },
                        {
                            name: ['payTime'],
                            value: quote.dieu_khoan_thanh_toan,
                        }
                    ] : [
                        {
                            name: ['price'],
                            value: donGia
                        }
                    ]}

                form={form}
                onFinish={onFinish}
            >
                <Space>
                    <Button type="primary" htmlType="submit" className="btn-primary">GỬI EMAIL</Button>
                    <Button type="primary" htmlType="submit" className="btn-primary">LƯU</Button>
                </Space>
                <Divider />
                <Row>
                    {quote ?
                        <Col md={{ span: 11, push: 1 }} style={{ borderRight: '1px solid #d8d8d8' }}>
                            <Descriptions title="KHÁCH HÀNG"
                                column={{
                                    lg: 4,
                                    md: 4,
                                    sm: 2,
                                }}>
                                <Descriptions.Item span={2} label="Họ tên">{quote.khach_hang.ho_ten}</Descriptions.Item>
                                <Descriptions.Item span={2} label="Số điện thoại">{quote.khach_hang.sdt}</Descriptions.Item>
                                <Descriptions.Item span={2} label="Email">{quote.khach_hang.email}</Descriptions.Item>
                                <Descriptions.Item span={2} label="Vấn đề">{quote.van_de}</Descriptions.Item>
                            </Descriptions>

                        </Col> :
                        <Col md={{ span: 11, pull: 1 }} style={{ borderRight: '1px solid #d8d8d8' }}>
                            <Form.Item
                                label="Khách hàng"
                                name="customer">
                                <Select
                                    showSearch
                                    allowClear
                                    style={{
                                        width: '80%',
                                    }}
                                    optionFilterProp="children"
                                    filterOption={(input, option) => (option?.label ?? '').includes(input)}
                                    filterSort={(optionA, optionB) =>
                                        (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                                    }
                                    options={arrCustomer}
                                />
                            </Form.Item>

                        </Col>
                    }
                    <Col md={{ span: 12, push: 2 }}>
                        <Descriptions title="NHÂN VIÊN"
                            column={{
                                lg: 4,
                                md: 4,
                                sm: 2,
                            }}>
                            <Descriptions.Item span={2} label="Họ tên">{staff.ho_ten}</Descriptions.Item>
                            <Descriptions.Item span={2} label="Số điện thoại">{staff.sdt}</Descriptions.Item>
                            <Descriptions.Item span={2} label="Chức vụ">{staff.chuc_vu}</Descriptions.Item>
                            <Descriptions.Item span={2} label="Email">{staff.email}</Descriptions.Item>
                        </Descriptions>
                    </Col>
                </Row>
                <Divider />
                <Title level={5} style={{ marginLeft: 50, marginBottom: 20 }}>THÔNG TIN CHI TIẾT</Title>
                <Row>
                    <Col md={{ span: 12, pull: 2 }}>
                        <Form.Item
                            label="Lĩnh vực"
                            name="typeService">
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
                                options={arrTypeServices}
                                onChange={handleChangeTypeService}
                            />
                        </Form.Item>
                        <Form.Item
                            label="Dịch vụ"
                            name="service">
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
                                options={arrServices}
                                onChange={handleChangeService}
                            />
                        </Form.Item>
                        <Form.Item
                            label="Tổng giá"
                            name="price">
                            <InputNumber
                                style={{
                                    width: 310,
                                }}
                                bordered={false}
                                formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                parser={(value) => value.replace(/\$\s?|(,*)/g, '')}
                                addonAfter='VNĐ'
                            />
                        </Form.Item>
                    </Col>
                    <Col md={{ span: 12, pull: 1 }}>
                        <Form.Item
                            label="Điều khoản thanh toán"
                            name="payTime">
                            <Select
                                options={arrTimePay}
                            />
                        </Form.Item>
                        <Form.Item
                            label="Ghi chú"
                            name="note">
                            <TextArea />
                        </Form.Item>
                        <br />

                    </Col>

                </Row>
                <Divider />
                <Text style={{ marginLeft: 30 }} keyboard italic>
                    Lưu ý: Giá thành dịch vụ có thể sẽ có sự thay đổi tuỳ theo tính chất vụ việc.
                    Để có giá thành chính xác nhất,
                </Text> <br />
                <Text style={{ marginLeft: 30 }} keyboard italic>
                    hãy trực tiếp cho chúng tôi biết cụ thể vấn đề của bạn.
                </Text>
            </Form>
            <Message props={isSubmit} mess={mess[isSubmit]} />
        </>
    );
}

export default FormQuotes;