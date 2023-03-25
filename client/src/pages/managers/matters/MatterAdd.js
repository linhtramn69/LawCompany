import {  Card } from "antd";
import BreadcrumpAdmin from "~/components/AdminComponents/Breadcump";
import FormMatter from "~/components/AdminComponents/Form/Matter";
import TitleCardModal from "~/components/AdminComponents/TitleCardModal";

function MatterAdd() {
    return (
        <>
        <BreadcrumpAdmin/>
            <Card
                title={
                   <TitleCardModal title="Thêm vụ việc" current={1}/>
                }>
                <FormMatter />
            </Card>
        </>
    );
}

export default MatterAdd;