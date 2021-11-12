import React from 'react';
import Button from '@mui/material/Button';
import Traininglist from './Traininglist';
import Dialog from '@mui/material/Dialog';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import DialogContent from '@mui/material/DialogContent';
import Slide from '@mui/material/Slide';

// eslint-disable-next-line import/no-anonymous-default-export
export default (props) => {

  const [open, setOpen] = React.useState(false);


  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

  return (
    <div>
      <Button  size="small" onClick={handleClickOpen}>
        See trainings
      </Button>
      <Dialog 
        fullScreen 
        open={open} 
        onClose={handleClose} 
        fullWidth={true}
        TransitionComponent={Transition}
      >
      <AppBar sx={{ position: 'relative' }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography  variant="h6">
              Trainings for a selected customer
            </Typography>
          </Toolbar>
        </AppBar>
        <DialogContent>
          <Traininglist link={props.link}/>
        </DialogContent>
      </Dialog>
    </div>
  );
};