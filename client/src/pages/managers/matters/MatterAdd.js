import { Card, Steps } from "antd";
import { useState } from "react";
import BreadcrumpAdmin from "~/components/AdminComponents/Breadcump";
import FormMatter from "~/components/AdminComponents/Form/Matter";

function MatterAdd() {
    const [current, setCurrent] = useState(0);
    return (
        <>
        <BreadcrumpAdmin/>
            <Card
                title={
                    <Steps
                        type="navigation"
                        className="site-navigation-steps"
                        current={current}
                        items={[
                            {
                                title: 'Tạo mới'
                            },
                            {
                                title: 'Đang thực hiện'
                            },
                            {
                                title: 'Đã đóng'
                            },
                        ]}
                    />
                }>
                <FormMatter />
            </Card>
        </>
    );
}

export default MatterAdd;