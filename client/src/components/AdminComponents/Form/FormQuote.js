import { useStore, actions } from "~/store";
import { quoteService, serviceService, typeServiceService } from "~/services";
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
const time = [
    {
        value: 'now',
        label: 'Thanh toán ngay'
    },
    {
        value: '15days',
        label: '15 ngày'
    },
    {
        value: '21days',
        label: '21 ngày'
    },
    {
        value: '30days',
        label: '30 ngày'
    },
    {
        value: '45days',
        label: '45 ngày'
    },
    {
        value: '2months',
        label: '2 tháng'
    },
    {
        value: 'last-next-month',
        label: 'Cuối tháng kế tiếp'
    },
]
const mess = [
    '',
    'Gửi báo giá thành công!',
    'Gửi báo giá thất bại!'
]
function FormQuotes({ quote }) {
    let navigate = useNavigate();
    const [form] = Form.useForm();
    const [state, dispatch] = useStore();
    const arrTypeServices = [];
    const arrServices = [];
    const arrCustomer = [];
    const [donGia, setDonGia] = useState(0);
    const staff = {
        ho_ten: 'Tran Thi Kim Linh',
        sdt: '0776560825',
        email: 'kimlinhtr@gmail.com',
        chuc_vu: 'Luật sư'
    }
    const [isSubmit, setisSubmit] = useState(null);

    useEffect(() => {
        const getTypeServices = async () => {
            dispatch(actions.setTypeServices((await typeServiceService.get()).data))
        };
        getTypeServices()
    }, [dispatch]);

    state.type_services.map((value) => {
        return (
            arrTypeServices.push({
                value: JSON.stringify(value),
                label: value.ten_linh_vuc
            })
        )
    })

    const handleChangeTypeService = async (value) => {
        const id = JSON.parse(value)._id;
        dispatch(actions.setServices((await serviceService.getByType(id)).data));
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
        if (data === 2) {
            data = {
                status: 2
            }
        }
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
        var d = new Date()
        var dateString = ("0" + d.getDate()).slice(-2) + "-" + ("0" + (d.getMonth() + 1)).slice(-2) + "-" +
            d.getFullYear() + " " + ("0" + d.getHours()).slice(-2) + ":" +
            ("0" + d.getMinutes()).slice(-2) + ':' + ("0" + d.getSeconds()).slice(-2);
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
            linh_vuc: {
                id: JSON.parse(values.typeService)._id,
                ten_linh_vuc: JSON.parse(values.typeService).ten_linh_vuc
            },
            dich_vu: {
                id: JSON.parse(values.service)._id,
                ten_dv: JSON.parse(values.service).ten_dv,
                don_gia: JSON.parse(values.service).don_gia_dv
            },
            ngay_lap_phieu: dateString,
            tong_gia_du_kien: values.price,
            dieu_khoan_thanh_toan: values.payTime,
            ghi_chu: values.note,
            status: 1
        }
        quote ? handleEdit(data) : handleAdd(data)
    }

    return (
        <><Form
            {...formItemLayout}

            fields={
                quote && quote.status > 0 ? [
                    {
                        name: ['price'],
                        value: quote.tong_gia_du_kien,
                    },
                    {
                        name: ['typeService'],
                        value: quote.linh_vuc.ten_linh_vuc,
                    },
                    {
                        name: ['service'],
                        value: quote.dich_vu.ten_dv,
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
                {
                    quote && quote.status === 1 ? <Button type="primary" onClick={() => handleEdit(2)} className="btn-primary">XÁC NHẬN</Button>
                        : 
                       <Space> 
                        <Button type="primary" htmlType="submit" className="btn-primary">GỬI EMAIL</Button> 
                        <Button type="primary" htmlType="submit" className="btn-primary">LƯU</Button> 
                        </Space>
                }
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
                            onChange={(e) => setDonGia(JSON.parse(e).don_gia_dv)}
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
                            options={time}
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