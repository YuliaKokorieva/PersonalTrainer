import React from 'react';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';

// eslint-disable-next-line import/no-anonymous-default-export
export default (props) => {
  const cellValue = props.valueFormatted ? props.valueFormatted : props.value;

  return (
    <div>
      <Button startIcon = {<DeleteIcon />} size="small" onClick={() => props.delete(cellValue)}>
        Delete
      </Button>
    </div>
  );
};