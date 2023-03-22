import { Button, Col, Form, Input, Radio, Row, Space, Tabs } from "antd";
import { useState } from "react";
import { Select } from "~/components";
import { Editor } from 'react-draft-wysiwyg';
import SelectMltiple from "../SelectMultiple";
import TableAddRow from "~/components/AdminComponents/Table/TableAddRow";
const formItemLayout = {
    labelCol: {
        xs: {
            span: 24,
        },
        md: {
            span: 10,
        },
    },
    wrapperCol: {
        xs: {
            span: 24
        },
        md: {
            span: 14
        }
    }
};
const wrapperStyle={
    border: '1px solid #F1F1F1',
    padding: '10px',
    minHeight: '40vh'
}
const label = [
    'Nội bộ được phép truy cập',
    'Khách hàng được phép truy cập'
]

const items = [
    {
        key: '1',
        label: `Mô tả`,
        children: <Editor
            wrapperClassName="wrapper-class"
            editorClassName="editor-class"
            toolbarClassName="toolbar-class"
            wrapperStyle={wrapperStyle}
        />,
    },
    {
        key: '2',
        label: `Giấy tờ`,
        children: <TableAddRow/>,
    },
    {
        key: '3',
        label: `Liên hệ`,
        children: `Content of Tab Pane 3`,
    },
    {
        key: '4',
        label: `Công việc`,
        children: `Content of Tab Pane 3`,
    },
    {
        key: '5',
        label: `Chi phí`,
        children: `Content of Tab Pane 3`,
    },
    {
        key: '6',
        label: `Lịch`,
        children: `Content of Tab Pane 3`,
    },
];
function FormMatter() {
    const [value, setValue] = useState(2);

    const onChange = (e) => {
        console.log('radio checked', e.target.value);
        setValue(e.target.value);
    };
    const onChangeTab = (key) => {
        console.log(key);
    };
    return (
        <>
            <Form {...formItemLayout}
            >
                <Row>
                    <Col span={12} pull={2}>
                        <Form.Item
                            label="Tên vụ việc"
                            name="name"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input name matter!',
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col span={12} pull={2}>
                        <Form.Item
                            label="Luật sư phụ trách"
                            name="name"
                        >
                            <Select />
                        </Form.Item>
                    </Col>

                </Row>

                <Row>
                    <Col span={12} pull={2}>
                        <Form.Item
                            label="Khách hàng"
                            name="name"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input name matter!',
                                },
                            ]}
                        >
                            <Select />
                        </Form.Item>
                    </Col>
                    <Col span={12} pull={2}>
                        <Form.Item
                            label="Luật sư ban đầu"
                            name="name"
                        >
                            <Select />
                        </Form.Item>
                    </Col>

                </Row>
                <Row>
                    <Col span={12} pull={2}>
                        <Form.Item
                            label="Hiển thị"
                            name="show"
                        >
                            <Radio.Group onChange={onChange} value={value}>
                                <Space direction="vertical">
                                    <Radio value={0}>Tài khoản nội bộ đã mời</Radio>
                                    <Radio value={1}>Tài khoản khách hàng đã mời</Radio>
                                    <Radio value={2}>Tất cả người dùng nội bộ</Radio>
                                </Space>
                            </Radio.Group>
                        </Form.Item>
                    </Col>
                    {value < 2 ?
                        <Col span={12} pull={2}>
                            <Form.Item
                                label={label[value]}
                                name="name"
                            >
                                <SelectMltiple />
                            </Form.Item>
                        </Col> : <></>
                    }
                </Row>
                <Form.Item
                    wrapperCol={{
                        md: 24
                    }}>
                    <Tabs style={{ width: '100%' }} type="card" defaultActiveKey="1" items={items} onChange={onChangeTab} />
                </Form.Item>
                <Form.Item
                    wrapperCol={{
                        offset: 20,
                    }}
                >
                    <Button type="primary" htmlType="submit" className="btn-primary">SAVE</Button>
                </Form.Item>

            </Form>
        </>
    );
}

export default FormMatter;