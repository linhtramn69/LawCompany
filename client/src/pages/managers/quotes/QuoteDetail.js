import { useState } from "react";
import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { quoteService } from "~/services";
import { Button, Card, Col, Descriptions, Divider, Row, Space, Typography } from "antd";
import { TitleCardModal } from "~/components";
import ModalCalendar from "./ModalCalendar";

const { Text } = Typography;

const item = [
    {
        title: 'Yêu cầu báo giá'
    },
    {
        title: 'Đã gửi báo giá'
    },
    {
        title: 'Đã tạo lịch hẹn'
    },
]

function QuoteDetail() {
    let { id } = useParams();
    const [quote, setQuote] = useState({
        khach_hang: {},
    });
    useEffect(() => {
        const getQuote = async () => {
            setQuote((await quoteService.getById(id)).data)
        }
        getQuote();
    }, [id])
    const [isModalOpen, setIsModalOpen] = useState(false);
    const showModal = () => {
        setIsModalOpen(true)
    }
    const handleOk = () => {
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };
    return (
        <>
            <Card style={{ paddingLeft: 20 }}
                title={
                    <TitleCardModal
                        title={quote.status === 0 ? 'YÊU CẦU BÁO GIÁ' : 'THÔNG TIN BÁO GIÁ'}
                        item={item}
                        current={quote ? quote.status : 0}
                    />}>
                <Space size={10}>
                    {quote.status < 2 ?
                        <Link to={`/admin/quotes/edit/${id}`}>
                            <Button type="primary" className="btn-primary">
                                {quote.status === 0 ? 'TẠO BÁO GIÁ' : 'CHỈNH SỬA'}
                            </Button>
                        </Link>
                        : null}
                    {quote.status === 1 ?
                        <Button type="primary" className="btn-primary" onClick={showModal}>
                            TẠO LỊCH HẸN
                        </Button>
                        : null}
                </Space>
                <Divider />
                <Row>
                    <Col md={{ span: 12 }} style={{ borderRight: '1px solid #d8d8d8' }}>
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
                    </Col>
                    <Col md={{ span: 10, push: 1 }}>
                        <Descriptions title="NHÂN VIÊN"
                            column={{
                                lg: 4,
                                md: 4,
                                sm: 2,
                            }}>
                            <Descriptions.Item span={2} label="Họ tên">{quote.status > 0 ? quote.nguoi_lap_phieu.ho_ten : null}</Descriptions.Item>
                            <Descriptions.Item span={2} label="Chức vụ">{quote.status > 0 ? quote.nguoi_lap_phieu.chuc_vu : null}</Descriptions.Item>
                            <Descriptions.Item span={2} label="Số điện thoại">{quote.status > 0 ? quote.nguoi_lap_phieu.sdt : null}</Descriptions.Item>
                            <Descriptions.Item span={2} label="Email">{quote.status > 0 ? quote.nguoi_lap_phieu.email : null}</Descriptions.Item>
                        </Descriptions>
                    </Col>
                </Row>
                <Divider />
                <Descriptions title="Thông tin chi tiết"
                    column={{
                        lg: 4,
                        md: 4,
                        sm: 2,
                    }}>
                    <Descriptions.Item span={2} label="Lĩnh vực">{quote.status > 0 ? quote.linh_vuc.ten_linh_vuc : null}</Descriptions.Item>
                    <Descriptions.Item span={2} label="Điều khoản thanh toán">{quote.status > 0 ? quote.dieu_khoan_thanh_toan : null}</Descriptions.Item>
                    <Descriptions.Item span={2} label="Dịch vụ">{quote.status > 0 ? quote.dich_vu.ten_dv : null}</Descriptions.Item>
                    <Descriptions.Item span={2} label="Ghi chú">{quote.status > 0 ? quote.ghi_chu : null}</Descriptions.Item>
                    <Descriptions.Item span={2} label="Tổng giá">{quote.status > 0 ? quote.tong_gia_du_kien : null}</Descriptions.Item>
                </Descriptions>
                <Divider />
                <Text code italic>
                    Lưu ý: Giá thành dịch vụ có thể sẽ có sự thay đổi tuỳ theo tính chất vụ việc.
                    Để có giá thành chính xác nhất, hãy trao đổi trực tiếp cụ thể vấn đề của bạn.
                </Text>
            </Card>
                <ModalCalendar quote={quote} open={isModalOpen} onOk={handleOk} onCancel={handleCancel}/> 

        </>
    );
}

export default QuoteDetail;