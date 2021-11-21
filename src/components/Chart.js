import React, {useState, useEffect} from 'react';
import {BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Bar} from 'recharts';
import _ from 'lodash';

export default function Chart({link}) {

    const [trainings, setTrainings] = useState([]);

    useEffect(()=> fetchData(), []);

    const fetchData =() => {
      fetch(link)
      .then(response=>response.json())
      .then(data=>setTrainings(data.content))
      .catch(err=>console.log(err))
    }
  

    const rawData = trainings.map((training) => {
        return {
            name: training.activity,
            mins: parseInt(training.duration)
        }
    })

    const data = _(rawData)
    .groupBy('name')
    .map((activity, id)=> ({
        name: id,
        mins: _.sumBy(activity, 'mins')

    }))
    .value()

return (
    <BarChart width={1000} height={700} data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis label={{ value: 'Duration, mins', angle: -90, position: 'insideLeft' }}/>
        <Tooltip />
        <Bar dataKey="mins" fill="#8884d8" />
    </BarChart>
  );
}
