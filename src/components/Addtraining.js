import React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import AddIcon from '@mui/icons-material/Add';

export default function Addtraining(props) {
  const [open, setOpen] = React.useState(false);
	const [training, setTraining] = React.useState({
    activity: '', date: '', duration: '', customer: props.customerLink
	})

  const handleClickOpen = () => {
    setOpen(true);
  };
    
	const handleClose = () => {
    console.log(training)
    setOpen(false);
  };

	const handleInputChange=(event)=> {
		setTraining({...training, [event.target.name]: event.target.value})
	}

	const addTraining = () => {
		props.saveTraining(training);
		handleClose();
	}

	return(
    <div>
			<Button startIcon = {<AddIcon />}  style={{margin:10}} onClick={handleClickOpen}>
        Add training
      </Button>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialig-title">
        <DialogTitle id="form-dialog-title">New training</DialogTitle>
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
          <Button onClick={addTraining}>Save</Button>
        </DialogActions>
      </Dialog>
    </div>
    )
}