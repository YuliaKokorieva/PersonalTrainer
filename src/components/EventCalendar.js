
import React, {useEffect, useState} from "react";
import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
import "react-big-calendar/lib/css/react-big-calendar.css";

const localizer = momentLocalizer(moment)

export default function EventCalendar({link}) {
    const [trainings, setTrainings] = useState([]);

    
    useEffect(()=> {
        const fetchData =() => {
            fetch(link)
            .then(response=>response.json())
            .then(data=>setTrainings(data.content))
            .catch(err=>console.log(err));
        };
        fetchData();
     }, []);
    
        

    const allEvents = trainings.map((training) => {
        return {
            title: training.activity,
            start: new Date(training.date),
            end: moment(training.date).add(parseInt(training.duration), 'm').toDate()
        }
    })

    return (
        <div>
        <Calendar
            localizer={localizer}
            events={allEvents}
            startAccessor="start"
            endAccessor="end"
            style={{ height: 700 }}
        />
        </div>
    )


}

