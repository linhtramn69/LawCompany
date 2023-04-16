import { Tag } from "antd";
import moment from "moment";
import { useEffect } from "react";
import { useState } from "react";
import { TableComponent } from "~/components";
import { feeService } from "~/services";
import { useToken } from "~/store";
const statusText = ['Đang chờ xử lý', 'Đã duyệt', 'Đã kết toán', 'Đã từ chối']
const columns = [
    {
        title: 'STT',
        dataIndex: 'index',
        key: 'index',
        width: 60
    },
    {
        title: 'Mô tả',
        dataIndex: 'mo_ta',
        key: 'mo_ta',
    },
    {
        title: 'Đơn giá',
        dataIndex: 'don_gia',
        key: 'don_gia',
    },
    {
        title: 'Ngày lập',
        dataIndex: 'ngay_lap',
        key: 'ngay_lap',
    },
    {
        title: 'Nhân viên',
        dataIndex: 'staff',
        key: 'staff',
    },
    {
        title: 'Tiến độ công việc',
        dataIndex: 'status',
        key: 'status',
        ellipsis: {
            showTitle: false,
        },
        render: (status) => (
            <Tag
                color={status === 0 ? 'volcano' : status === 1 ? 'geekblue' : status === 2 ? 'success' : 'error'}
            >
                {statusText[status]}
            </Tag>
        ),
    }

]
function FeeList() {

    const { token } = useToken();
    const [fee, setFees] = useState([]);

    useEffect(() => {
        const getFees = async () => {
            token.account.quyen === 1 || token.bo_phan.id === 'KT'
                ? setFees((await feeService.get()).data)
                : setFees((await feeService.findByIdAccess({ id: token._id })).data)
        }
        getFees()
    }, [])

    const data = fee.length > 0 ? fee.map((value, index) => {
        return {
            _id: value._id,
            index: index + 1,
            mo_ta: value.mo_ta,
            don_gia: value.don_gia,
            ngay_lap: moment(value.ngay_lap).format('DD-MM-YYYY LT'),
            staff: value.nhan_vien.ho_ten,
            status: value.status
        }
    }) : null

    return (
        <>
            <TableComponent columns={columns} data={data} />
        </>
    );
}

export default FeeList;