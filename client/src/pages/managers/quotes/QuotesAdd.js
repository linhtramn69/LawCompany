import { Card } from "antd";
import { FormQuotes } from "~/components";
import BreadcrumpAdmin from "~/components/AdminComponents/Breadcump";
import TitleCardModal from "~/components/AdminComponents/TitleCardModal";

function QuotesAdd() {
    return ( 
        <>
        {/* <BreadcrumpAdmin/> */}
        <Card
        title={
            <TitleCardModal title="BÁO GIÁ MỚI" />
        }>
            <FormQuotes/>
        </Card>
        </>
     );
}

export default QuotesAdd;