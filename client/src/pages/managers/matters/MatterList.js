import { Tooltip } from "antd";
import { useEffect } from "react";
import { useState } from "react";
import { TableComponent } from "~/components";
import { matterService, typeServiceService } from "~/services";
import { useToken } from "~/store";
const columns = [
    {
        title: 'STT',
        dataIndex: 'index',
        key: 'index',
        width: 60
    },
    {
        title: 'Tên vụ việc',
        dataIndex: 'nameMatter',
        key: 'nameMatter',
    },
    {
        title: 'Lĩnh vực',
        dataIndex: 'typeService',
        key: 'typeService',
    },
    {
        title: 'Dịch vụ',
        dataIndex: 'service',
        key: 'service',
        ellipsis: {
            showTitle: false,
        },
        render: (service) => (
            <Tooltip placement="topLeft" title={service}>
                {service}
            </Tooltip>
        ),
    },
    {
        title: 'Khách hàng',
        dataIndex: 'customer',
        key: 'customer',
    },
    {
        title: 'Luật sư phụ trách',
        dataIndex: 'law',
        key: 'law',
    },
]
function MatterList() {
    const { token } = useToken()
    const [matters, setMatters] = useState([]);
    useEffect(() => {
        const getMatters = async () => {
            token.account.quyen === 1 ?
                setMatters((await matterService.get()).data)
                : setMatters((await matterService.findByIdAccess({
                    id: token._id
                })).data)
        }
        getMatters()
    }, [])
    const data = matters.map((value, index) => {
        return {
            _id: value._id,
            index: index + 1,
            nameMatter: value.ten_vu_viec,
            typeService: value.linh_vuc.ten_linh_vuc,
            service: value.dich_vu.ten_dv,
            customer: value.khach_hang.ho_ten,
            law: value.luat_su.ho_ten
        }
    })
    return (
        <>
            <TableComponent columns={columns} data={data} />
        </>
    );
}

export default MatterList;