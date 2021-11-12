import React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import AddIcon from '@mui/icons-material/Add';
import DateFnsUtils from '@date-io/date-fns';
import {DateTimePicker, MuiPickersUtilsProvider} from '@material-ui/pickers';

export default function Addtraining(props) {
  const [open, setOpen] = React.useState(false);
	const [training, setTraining] = React.useState({
    activity: '', date: '', duration: '', customer: props.link
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

  const dateChanged = (date)=> {
    setTraining({...training, date: date.toISOString().slice(0,16)})
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
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <DateTimePicker 
            selected={training.date} 
            onChange={dateChanged}
            // ampm={true}
            format='dd/MM/yyyy hh/mm'/>
          </MuiPickersUtilsProvider>

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