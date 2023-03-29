import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
import { useState } from 'react';
import { Col, Row } from 'antd';
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";
import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
const DnDCalendar = withDragAndDrop(Calendar);
const localizer = momentLocalizer(moment)

function CalendarManager() {
    const [events, setEvents] = useState(
        [
            {
                start: moment('2023 03 25, 8:00:00').toDate(),
                end: moment('2023 03 25, 8:00:00').toDate(),
                title: "Gặp khách hàng",
            },
            {
                start: moment('2023 03 27').toDate(),
                end: moment('2023 03 28').toDate(),
                title: "Họp tại văn phòng",
            },
            {
                start: moment().toDate(),
                end: moment().toDate(),
                title: "Ăn trưa với cty A",
            },
        ]
    )
    const onEventResize = (data) => {
        const { start, end } = data;

        setEvents((events) => {
            events[0].start = start;
            events[0].end = end;
            return { events: [...events] };
        });
    };

    const onEventDrop = (data) => {
        console.log(data);
    };

    return (
        <Row>
            <Col md={{ span: 6 }}>
            </Col>
            <Col md={{ span: 18 }}>
                <DnDCalendar
                    defaultDate={new Date()}
                    localizer={localizer}
                    defaultView="month"
                    events={events}
                    startAccessor="start"
                    endAccessor="end"
                    onEventDrop={onEventDrop}
                    onEventResize={onEventResize}
                    resizable
                    style={{ height: "100vh" }}
                />
            </Col>

        </Row>);
}

export default CalendarManager;