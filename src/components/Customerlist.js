import React, {useState, useEffect, useRef} from 'react';
import {AgGridReact} from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';
// import DeleteButtonRenderer from './DeleteButtonRenderer';
// import EditButtonRenderer from './EditButtonRenderer';

export default function Customerlist() {
  const [customers, setCustomers] = useState([]);
  const [gridApi, setGridApi] = useState(null);
  const gridRef = useRef();

  useEffect(()=> fetchData(), []);

  const fetchData =() => {
    fetch('https://customerrest.herokuapp.com/api/customers')
    .then(response=>response.json())
    .then(data=>setCustomers(data.content))
    .catch(err=>console.log(err))
  }

  const columns = [
    {field: 'firstname', sortable: true, filter: true},
    {field: 'lastname', sortable: true, filter: true},
    {field: 'email', sortable: true, filter: true},
    {field: 'phone', sortable: true, filter: true},
    {field: 'streetaddress', sortable: true, filter: true},
    {field: 'postcode', sortable: true, filter: true},
    {field: 'city', sortable: true, filter: true}
  ]
  const searchDivStyle={
    backgroundColor:"#e8e8f2",
    padding:10
  }
  const searchStyle = {width:"30%", padding:"10px 20px"}

  function onGridReady(params) {
    setGridApi(params.api);
  }
  const handleQuickFilter = event => {
    gridApi.setQuickFilter(event.target.value);
  };

  return (
    <div>
      <div className="ag-theme-material" style={{margitTop: 20, height: 800,  margin: 'auto'}}>
        <div style={searchDivStyle}>
          <input
            style={searchStyle}
            type="search"
            placeholder="Search"
            onChange={handleQuickFilter}
          />
        </div>
        <AgGridReact
          // frameworkComponents={{
          // deleteButtonRenderer: DeleteButtonRenderer,
          // editButtonRenderer: EditButtonRenderer,
          // }}
          ref={gridRef}
          onGridReady={onGridReady}
          rowSelection="single"
          rowData={customers}
          columnDefs={columns}
          pagination={true}
          paginationPageSize={10}
        />
      </div>
    </div>
  )
}
