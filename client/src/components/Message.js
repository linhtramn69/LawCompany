import { message } from 'antd';
import { useState } from 'react';
import { useEffect } from 'react';

const Message = ({ props, mess }) => {

    const [messageApi, contextHolder] = message.useMessage();

    const success = () => {
        messageApi.open({
            type: 'success',
            content: mess,
        });
    };
    const error = () => {
        messageApi.open({
            type: 'error',
            content: mess,
        });
    };
    const warning = () => {
        messageApi.open({
            type: 'warning',
            content: mess,
        });
    };
    
    useEffect(() => {
        if (props === 1) {
            success();
        }
        else if (props === 2) {
            error();
        }
        else if (props === 3) {
            warning();
        }
    }, [props])

    return (
        <>
            {contextHolder}
        </>
    );
};
export default Message;