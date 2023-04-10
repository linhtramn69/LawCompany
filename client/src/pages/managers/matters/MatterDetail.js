import { Avatar, Button, Card, Col, Descriptions, Divider, List, Row, Space, Table, Tabs, Tag, Tooltip, Typography } from "antd";
import { faHouse, faReceipt, faTasks } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, useParams } from "react-router-dom";
import Title from "antd/es/typography/Title";
import { useEffect, useState } from "react";
import { matterService, stepService, userService } from "~/services";
import { actions, useStore } from "~/store";
import { avatar } from "~/assets/images";
import moment from "moment";
import FormAddFile from "~/components/AdminComponents/Form/FormAddFile";
const item = [
    {
        title: 'Đang thực hiện'
    },
    {
        title: 'Hoàn thành'
    },
    {
        title: 'Đã hủy'
    },
]
const columnsTask = [
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
    }
];
const columnsStep = [
    {
        title: 'Tên quy trình',
        dataIndex: 'periodName',
        width: 650,
        ellipsis: {
            showTitle: false,
        },
        render: (step) => (
            <Tooltip placement="topLeft" title={step}>
                {step}
            </Tooltip>
        ),
    },
    {
        title: 'Đơn vị tính',
        dataIndex: 'unit',
    },
    {
        title: 'Đơn giá',
        dataIndex: 'price',
    },
];
const columnsFees = [
    {
        title: 'Ngày lập',
        dataIndex: 'ngay_lap',
        width: 200
    },
    {
        title: 'Mô tả',
        dataIndex: 'mo_ta',
        width: 350
    },
    {
        title: 'Nhân viên',
        dataIndex: 'staff',
        width: 250
    },
    {
        title: 'Tổng',
        dataIndex: 'don_gia',
        width: 200
    },
    {
        title: 'Trạng thái',
        dataIndex: 'status',
    },
];

function MatterDetail() {

    let { id } = useParams();
    const [state, dispatch] = useStore();
    const [access, setAccess] = useState([]);
    const [dataTask, setDataTask] = useState([]);
    const [dataStep, setDataStep] = useState([]);
    const [dataFee, setDataFee] = useState([]);

    
    useEffect(() => {
        const getMatter = async () => {
            const result = (await matterService.getById(id)).data
            dispatch(actions.setMatter(result))
        }
        getMatter()
    }, [id, dispatch])
    useEffect(() => {
        const getAccess = async () => {
            const arr1 = state.matter.truy_cap.nhan_vien;
            const arr2 = state.matter.truy_cap.khach_hang;
            setAccess((await userService.getByMatter(arr1.concat(arr2))).data)
        }
        dispatch(actions.setTasks(state.matter.cong_viec))
        dispatch(actions.setFiles(state.matter.tai_lieu))
        dispatch(actions.setSteps(state.matter.phi_co_dinh))
        dispatch(actions.setFees(state.matter.chi_phi_phat_sinh))
        getAccess();
    }, [state.matter])
    useEffect(() => {
        const data = state.tasks ? state.tasks.map((value) => {
            return ({
                key: value.key,
                ten_cong_viec: value.ten_cong_viec,
                nguoi_phu_trach: value.nguoi_phu_trach.ho_ten,
                han_chot_cong_viec: moment(value.han_chot_cong_viec).format('DD-MM-YYYY LT')
            })
        }) : []
        const showDataSource = async () => {
            const rs = (await stepService.getByIdChiPhiCoDinh(state.steps)).data
            const dataShow = rs.map((value) => {
                return {
                    _id: value._id,
                    periodName: value.ten_qt,
                    price: value.don_gia_qt,
                    unit: value.don_vi_tinh
                }
            })
            setDataStep(dataShow);
        }
        const dataFee = state.fees ? state.fees.map((value) => {
            return ({
                key: value.key,
                ngay_lap: value.ngay_lap,
                mo_ta: value.mo_ta,
                staff: value.nhan_vien,
                don_gia: `${value.don_gia}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',') + ' đ'
            })
        }) : []
        setDataTask(data);
        showDataSource();
        setDataFee(dataFee);
    }, [state.tasks, state.steps, state.fees])

    
    return (
        <>
            {state.matter._id ?
                <Card

                    title={<Title level={4} style={{ marginTop: 10 }}>Thông tin chi tiết</Title>}
                    extra={
                        <Space split={<Divider type="vertical" />}>
                            <Typography.Link><FontAwesomeIcon icon={faHouse} /> Vụ việc</Typography.Link>
                            <Typography.Link><FontAwesomeIcon icon={faTasks} /> Hợp đồng</Typography.Link>
                            <Typography.Link><FontAwesomeIcon icon={faTasks} /> Báo giá</Typography.Link>
                            <Typography.Link><FontAwesomeIcon icon={faReceipt} /> Hóa đơn</Typography.Link>

                        </Space>
                    }
                >
                    <Descriptions style={{ paddingLeft: 40 }} column={{
                        md: 3,
                    }}>

                        <Descriptions.Item label="Tên vụ việc">{state.matter.ten_vu_viec}</Descriptions.Item>
                        <Descriptions.Item label="Lĩnh vực">{state.matter.linh_vuc.ten_linh_vuc}</Descriptions.Item>
                        <Descriptions.Item label="Dịch vụ">{state.matter.dich_vu.ten_dv}</Descriptions.Item>
                    </Descriptions>
                    <Divider />
                    <Row>
                        <Col md={{ span: 10, push: 1 }}>
                            <Descriptions
                                title="Luật sư phụ trách"
                                column={{
                                    md: 4
                                }}>

                                <Descriptions.Item span={4} label="Họ tên">{state.matter.luat_su.ho_ten}</Descriptions.Item>
                                <Descriptions.Item span={2} label="Số điện thoại">{state.matter.luat_su.account.sdt}</Descriptions.Item>
                                <Descriptions.Item span={2} label="Email">{state.matter.luat_su.email}</Descriptions.Item>
                            </Descriptions>
                        </Col>
                        <Col md={{ span: 10, push: 3 }}>
                            <Descriptions
                                title="Thông tin khách hàng"
                                column={{
                                    md: 4
                                }}>

                                <Descriptions.Item span={4} label="Họ tên">{state.matter.khach_hang.ho_ten}</Descriptions.Item>
                                <Descriptions.Item span={2} label="Số điện thoại">{state.matter.khach_hang.account.sdt}</Descriptions.Item>
                                <Descriptions.Item span={2} label="Email">{state.matter.khach_hang.email}</Descriptions.Item>
                            </Descriptions>
                        </Col>
                    </Row>
                    <Divider />
                    <Tabs type="card" defaultActiveKey="0" items={[
                        {
                            key: 0,
                            label: 'Thiết lập',
                            children:
                                <Descriptions
                                >
                                    <Row style={{ paddingTop: 20 }}>
                                        <Col md={{ span: 10, push: 1 }}>
                                            <Descriptions
                                                title="Thiết lập chi phí"
                                                column={{
                                                    md: 4
                                                }}>

                                                <Descriptions.Item span={4} label="Điều khoản thanh toán">
                                                    {state.matter.dieu_khoan_thanh_toan.ten}
                                                </Descriptions.Item>
                                                <Descriptions.Item span={4} label="Phương thức tính phí">
                                                    {state.matter.phuong_thuc_tinh_phi.ten}
                                                </Descriptions.Item>
                                                <Descriptions.Item span={4} label="Chiết khấu hoa hồng">
                                                    {state.matter.chiet_khau_hoa_hong} %
                                                </Descriptions.Item>
                                            </Descriptions>
                                        </Col>
                                        <Col md={{ span: 10, push: 3 }}>
                                            <Descriptions
                                                title="Quyền truy cập"
                                                column={{
                                                    md: 4
                                                }}>
                                            </Descriptions>
                                            <List
                                                dataSource={access}
                                                renderItem={(item) => (
                                                    <List.Item key={item.ho_ten}>
                                                        <List.Item.Meta
                                                            avatar={<Avatar src={avatar.user} />}
                                                            title={<a href="https://ant.design">{item.ho_ten}</a>}
                                                            description={item.email}
                                                        />
                                                        <div>
                                                            {
                                                                item.account.quyen === 0 ?
                                                                    <Tag color="blue">Khách hàng</Tag>
                                                                    : <Tag color="gold">Nhân viên</Tag>

                                                            }
                                                        </div>
                                                    </List.Item>
                                                )}
                                            />
                                        </Col>
                                    </Row>

                                </Descriptions>
                        },
                        {
                            key: '1',
                            label: `Mô tả`,
                        },
                        {
                            key: '2',
                            label: `Giấy tờ`,
                            children: <FormAddFile props={1} />
                        },
                        {
                            key: '3',
                            label: `Liên hệ`,
                        },
                        {
                            key: '4',
                            label: `Công việc`,
                            children: <Table columns={columnsTask} dataSource={dataTask} />,
                        },
                        {
                            key: '5',
                            label: `Phí cố định`,
                            children: <Table columns={columnsStep} dataSource={dataStep} />,

                        },
                        {
                            key: '6',
                            label: `Chi phí`,
                            children: <Table columns={columnsFees} dataSource={dataFee} />,
                        }
                    ]} />

                    <Link to={`/admin/matters/edit/${id}`}>
                        <Button type="primary" className="btn-primary">Chỉnh sửa</Button>
                    </Link>
                </Card>
                : null
            }
        </>
    );
}

export default MatterDetail;