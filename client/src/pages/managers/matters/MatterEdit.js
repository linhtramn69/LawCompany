import { Card } from "antd";
import { BreadcrumpAdmin, TitleCardModal } from "~/components";
import FormMatter from "~/components/AdminComponents/Form/Matter";
import { useStore } from "~/store";

function MatterEdit() {
    
    const [state, dispatch] = useStore();

    return (
        <>
            <BreadcrumpAdmin/>
            <Card
                title={
                   <TitleCardModal title="Chỉnh sửa vụ việc" current={1}/>
                }>
                <FormMatter props={state.matter}/>
            </Card>
        </>
    );
}

export default MatterEdit;