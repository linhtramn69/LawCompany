import { Tag, Tooltip } from "antd";
import { useEffect } from "react";
import { useState } from "react";
import { TableComponent } from "~/components";
import { taskService } from "~/services";
import { useToken } from "~/store";
const statusText = ['Đã giao', 'Hoàn thành', 'Tạm ngưng']
const columns = [
    {
        title: 'STT',
        dataIndex: 'index',
        key: 'index',
        width: 60
    },
    {
        title: 'Tên công việc',
        dataIndex: 'nameTask',
        key: 'nameTask',
    },
    {
        title: 'Phụ trách',
        dataIndex: 'staff',
        key: 'staff',
    },
    {
        title: 'Ngày giao',
        dataIndex: 'dateStart',
        key: 'dateStart',
    },
    {
        title: 'Hạn chót',
        dataIndex: 'dateEnd',
        key: 'dateEnd',
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
                color={status === 0 ? 'volcano' : status === 1 ? 'geekblue' : 'success'}
            >
                {statusText[status]}
            </Tag>
        ),
    }

]
function TaskList() {
    const { token } = useToken();
    const [task, setTask] = useState([]);

    useEffect(() => {
        const getTask = async () => {
            setTask((await taskService.finByStaff({
                id: token._id
            })).data)
        }
        getTask()
    }, [])

    const data = task.length > 0 ? task.map((value, index) => {
        return {
            _id: value._id,
            index: index + 1,
            nameTask: value.ten_cong_viec,
            staff: value.nguoi_phu_trach.ho_ten,
            dateStart: value.ngay_giao,
            dateEnd: value.han_chot_cong_viec,
            status: value.status
        }
    }) : null

    return (
        <>
            <TableComponent columns={columns} data={data} />
        </>
    );
}

export default TaskList;