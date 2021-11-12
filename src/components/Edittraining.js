import React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import EditIcon from '@mui/icons-material/Edit';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

export default function Edittraining(props) {
  const [open, setOpen] = React.useState(false);
	const [training, setTraining] = React.useState({
		activity: '', date: '', duration: ''
	})

  const handleClickOpen = () => {
    fetch(props.link)
    .then(response => response.json())
    .then(data => setTraining(data))
    .catch(err=> console.log(err))
    setOpen(true);
  };
    
	const handleClose = () => {
    setOpen(false);
  };

	const handleInputChange=(event)=> {
		setTraining({...training, [event.target.name]: event.target.value})
	}

const updateTraining = () => {
  props.updateTraining(training, props.link);
  handleClose();
}  

	return(
    <div>
			<Button startIcon = {<EditIcon />} size="small" onClick={handleClickOpen}>
        Edit
      </Button>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialig-title">
        <DialogTitle id="form-dialog-title">Edit</DialogTitle>
        <DialogContent>

          <TextField
            autoFocus
            margin="dense"
            name="activity"
						value={training.activity}
            label="activity"
            fullWidth
            variant="standard"
						onChange={e => handleInputChange(e)}
          />

					<TextField
            margin="dense"
            name="date"
						value={training.date}
            label="date"
            fullWidth
            variant="standard"
						onChange={e => handleInputChange(e)}
          />

					<TextField
            margin="dense"
            name="duration"
						value={training.duration}
            label="duration"
            fullWidth
            variant="standard"
						onChange={e => handleInputChange(e)}
          />
	
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={updateTraining}>Save</Button>
        </DialogActions>
      </Dialog>
    </div>
    )
}