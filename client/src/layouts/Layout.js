import HeaderAdmin from "~/components/AdminComponents/Header";

function Layout({children}) {
    return ( 
        <>
        <HeaderAdmin/>
        {children}
        </>
     );
}

export default Layout;