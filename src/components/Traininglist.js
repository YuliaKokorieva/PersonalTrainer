import React, {useState, useEffect, useRef} from 'react';
import {AgGridReact} from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';
import DeleteButtonRenderer from './DeleteButtonRenderer';
import EditButtonRenderer from './EditButtonRenderer';
import Stack from '@mui/material/Stack';

export default function Traininglist(props) {
  const [trainings, setTrainings] = useState([]);
  const [gridApi, setGridApi] = useState(null);
  const gridRef = useRef();

  useEffect(()=> fetchData(), []);

  const fetchData =() => {
    fetch(props.link)
    .then(response=>response.json())
    .then(data=>setTrainings(data.content))
    .catch(err=>console.log(err))
  }

  const deleteTraining = (link) => {
    if (window.confirm('Are you sure?')) {
      fetch(link, {method: 'DELETE'})
      .then(_ => fetchData())
      .catch(err => console.error(err))
    }
  }
  const updateTraining = (training, link) => {
    fetch(link, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(training)
    })
    .then(res=> fetchData())
    .catch(err=>console.error(err))
  }

  const columns = [
    {field: 'activity', sortable: true, filter: true},
    {field: 'date', sortable: true, filter: true},
    {field: 'duration', sortable: true, filter: true},
    {field: 'links.0.href', sortable: false, filter: false, 
      cellRenderer: "editButtonRenderer",
      cellRendererParams: {
        update: updateTraining,
        text: "traininglist"
    },
    headerName: "",
  },
    {field: 'links.0.href', sortable: false, filter: false, 
      cellRenderer: "deleteButtonRenderer",
      cellRendererParams: {
        delete: deleteTraining
      },
      headerName: "",
    }
  ]

  function onGridReady(params) {
    setGridApi(params.api);
  }
  const handleQuickFilter = event => {
    gridApi.setQuickFilter(event.target.value);
  };

  const stackStyle={
    backgroundColor:"#e8e8f2",
    padding: "15px"
  }
  const searchStyle = {width:"500px", padding: "20px"}

  return (
    <div className="ag-theme-material" style={{marginTop: 20, height: 650,  margin: 'auto'}}>
      <Stack 
        direction="row" 
        spacing={3} 
        justifyContent="left" 
        style={stackStyle}
        >
        <div >
          <input
            style={searchStyle}
            type="search"
            placeholder="Search"
                        onChange={handleQuickFilter}
          />
        </div>
        
        </Stack>
      <AgGridReact
        frameworkComponents={{
          deleteButtonRenderer: DeleteButtonRenderer,
          editButtonRenderer: EditButtonRenderer
        }}
        ref={gridRef}
        onGridReady={onGridReady}
        rowSelection="single"
        rowData={trainings}
        columnDefs={columns}
        pagination={true}
        paginationPageSize={10}
      />
    </div>
  )
}
