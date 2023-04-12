import {  Card } from "antd";
import FormMatter from "~/components/AdminComponents/Form/Matter";
import TitleCardModal from "~/components/AdminComponents/TitleCardModal";

function MatterAdd() {
    return (
        <>
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