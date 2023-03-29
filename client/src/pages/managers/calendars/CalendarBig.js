import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
import { useState } from 'react';
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";
import { useEffect } from 'react';
const DnDCalendar = withDragAndDrop(Calendar);
const localizer = momentLocalizer(moment)

function CalendarBig({dateSelect}) {
    const [events, setEvents] = useState(
        [
            
            {
                id: 'kIH1',
                start: moment('2023-03-29T05:20:05.986Z').toDate(),
                end: moment('2023-03-30T05:20:05.986Z').toDate(),
                title: "Gặp khách hàng",
            },
            {
                id: 'kIH2',
                start: moment('2023 03 27').toDate(),
                end: moment('2023 03 28').toDate(),
                title: "Họp tại văn phòng",
            },
            {
                id: 'kIH3',
                start: moment().toDate(),
                end: moment().toDate(),
                title: "Ăn trưa với cty A",
            },
            {
                id: 'kIH1',
                start: moment('2023-03-29T05:20:05.986Z').toDate(),
                end: moment('2023-03-29T05:20:05.986Z').toDate(),
                title: "Gặp khách hàng",
            },
        ]
    )
    const onEventResize = (data) => {
        console.log(data);
        const { start, end } = data;

    };

    const onEventDrop = (data) => {
        console.log(data);
    };

    return (
        <DnDCalendar
            // defaultDate={dateSelect}
            date={dateSelect}
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
    );

}

export default CalendarBig;