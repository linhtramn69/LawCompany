import BreadcrumpAdmin from "~/components/AdminComponents/Breadcump";
import Customer from "./Customer";

const columnsStaff = [
    {
        title: 'Họ tên',
        dataIndex: 'name',
    },
    {
        title: 'Ngày sinh',
        dataIndex: 'dateOfBirth',
    },
    {
        title: 'Số điện thoại',
        dataIndex: 'phone',
    },
    {
        title: 'Email',
        dataIndex: 'email',
    },
    {
        title: 'Địa chỉ',
        dataIndex: 'address',
    },
    {
        title: 'Bộ phận',
        dataIndex: 'boPhan',
    },
    {
        title: 'Chức vụ',
        dataIndex: 'chucVu',
    },
];

function StaffManager() {
    return ( 
        <>
            <BreadcrumpAdmin />
            <Customer props={2} columns={columnsStaff}/>
        </>
     );
}

export default StaffManager;