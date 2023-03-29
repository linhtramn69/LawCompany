import { faLaptopFile, faUser, faUsers } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Avatar, List} from "antd";
import { Link } from "react-router-dom";
import "~/assets/style/Admin/Dashboard.scss"
const data = [
    {
        icon: faUsers,
        title: "Khách hàng",
        color: `var(--cyan)`,
        link: "customer"
    },
    {
        icon: faLaptopFile,
        title: "Vụ việc",
        color: `var(--volcano)`,
        link: "matter"
    },
    {
        icon: faUser,
        title: "Kế toán",
        color: `var(--green)`
    },
    {
        icon: faUser,
        title: "Lịch làm việc",
        color: `var(--gold)`
    },
    {
        icon: faUser,
        title: "Báo giá",
        color: `var(--magenta)`,
        link: 'quotes'
    },
    {
        icon: faUser,
        title: "Nhân viên",
        color: `var(--oranger)`,
        link: "staff"
    },
    {
        icon: faUser,
        title: "Lịch làm việc",
        color: `var(--oranger)`,
        link: "calendar"
    }
    
];
function Dashboard() {
    return (
        <>
        <div className="dashboard">
            <List
                
                style={{ width: '70%' }}
                grid={{
                    xs: 2,
                    sm: 3,
                    md: 4,
                    lg: 5,
                    xl: 5
                }}
                dataSource={data}
                renderItem={(item) => (
                    <List.Item
                        style={{textAlign:'center'}}>
                            <Link to={`${item.link}`}>
                            <Avatar
                            className="item-dashboard"
                            shape="square"
                            style={{
                                backgroundColor: item.color,
                                verticalAlign: 'middle',
                            }}
                            icon={<FontAwesomeIcon icon={item.icon}/>}
                            size={100}
                        />
                        <h4>{item.title}</h4>
                            </Link>
                    </List.Item>
                )}
            /> 
        </div>
           
        </>
    );
}

export default Dashboard;