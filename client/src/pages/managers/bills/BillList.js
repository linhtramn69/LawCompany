import { Table, Tag } from "antd";
import { useNavigate } from "react-router-dom";
import { useToken } from "~/store";
const statusText = ['Đã vào sổ', 'Đã kết toán']
const columns = [
    {
        title: 'STT',
        dataIndex: 'index',
        key: 'index',
        width: 60
    },
    {
        title: 'Ngày lập hoá đơn',
        dataIndex: 'date',
        key: 'date',
    },
    {
        title: 'Loại hoá đơn',
        dataIndex: 'type_bill',
        key: 'type_bill',
    },
    {
        title: 'Nhân viên lập',
        dataIndex: 'staff_create',
        key: 'staff_create',
    },
    {
        title: 'Tài khoản',
        dataIndex: 'stk',
        key: 'stk',
    },
    {
        title: 'Ngân hàng',
        dataIndex: 'bank',
        key: 'bank',
    },
    {
        title: 'Chủ tài khoản',
        dataIndex: 'ctk',
        key: 'ctk',
    },
    {
        title: 'Tổng',
        dataIndex: 'money',
        key: 'money',
    },
    {
        title: 'Trạng thái',
        dataIndex: 'status',
        key: 'status',
        ellipsis: {
            showTitle: false,
        },
        render: (status) => (
            <Tag
                color={status === 0 ? 'volcano' : 'geekblue'}
            >
                {statusText[status]}
            </Tag>
        ),
    }

]
const dataSource = [
    {
        key: '1',
        date: '12-03-2023',
        type_bill: 'Chi phí nội bộ',
        staff_create: 'Kế toán viên',
        stk: '12930847832902',
        bank: 'MB bank',
        ctk: 'Nguyễn Linh Trâm KH',
        money: '2,000,000 đ',
        status: 0
    },
];
const url = ['', 'admin', 'ke-toan']

function FeeList() {

    const { token } = useToken();
    let navigate = useNavigate()
    return (
        <>
            <Table columns={columns} dataSource={dataSource}
                onRow={(record, rowIndex) => {
                    return {
                        onClick: (event) => {
                            navigate(`/${url[token.account.quyen]}/bill/${record.key}`)
                        }, // click row
                    }
                }} />
        </>
    );
}

export default FeeList;