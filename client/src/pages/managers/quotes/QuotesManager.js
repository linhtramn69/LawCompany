import { Divider, Tag } from "antd";
import { useEffect } from "react";
import { Filter, TableComponent } from "~/components";
import { quoteService } from "~/services";
import { actions, useStore } from "~/store";

const statusText = ['Yêu cầu báo giá', 'Đã gửi báo giá', 'Đã xác nhận']
const columns = [
    {
        title: 'STT',
        dataIndex: 'stt',
        key: 'stt',
    },
    {
        title: 'Khách hàng',
        dataIndex: 'customer',
        key: 'customer',
    },
    {
        title: 'Số điện thoại',
        dataIndex: 'sdt',
        key: 'sdt',
    },
    {
        title: 'Email',
        dataIndex: 'email',
        key: 'email',
    },
    {
        title: 'Thời gian lập phiếu',
        dataIndex: 'date',
        key: 'date',
    },
    {
        title: 'Trạng thái',
        dataIndex: 'status',
        key: 'status',
        render: (status) => (
            <Tag
                color={status === 0 ? 'volcano' : status === 1 ? 'geekblue' : 'success'}
            >
                {statusText[status].toUpperCase()}
            </Tag>
        ),
    },
];

function QuotesManager() {

    const [state, dispatch] = useStore();
    const arrQuotes = [];
    useEffect(() => {
        const getQuotes = async () => {
            dispatch(actions.setQuotes((await quoteService.get()).data))
        };
        getQuotes()
    }, [dispatch]);
    state.quotes.map((value, index) => {
        return (
            arrQuotes.push({
                stt: index + 1,
                _id: value._id,
                customer: value.khach_hang.ho_ten,
                sdt: value.khach_hang.sdt,
                email: value.khach_hang.email,
                date: value.ngay_gui_phieu ? value.ngay_gui_phieu : value.ngay_lap_phieu,
                status: value.status
            })
        )
    })
    return (
        <>
            <Filter />
            <Divider />
            <TableComponent data={arrQuotes} columns={columns} />
        </>
    );
}

export default QuotesManager;