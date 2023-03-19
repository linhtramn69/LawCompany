import HeaderAdmin from "~/components/AdminComponents/Header";
import "~/assets/style/Admin/LayoutAdmin.scss"
function LayoutAdmin({ children }) {
    return (
        <>
            <HeaderAdmin />
            <div className="content">
                {children}
            </div>
        </>
    );
}

export default LayoutAdmin;