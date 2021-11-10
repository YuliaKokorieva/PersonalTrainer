import React, {useState} from 'react';
import AppBar from '@mui/material/AppBar';
import Tabs from'@mui/material/Tabs';
import Tab from'@mui/material/Tab';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Traininglist from './Traininglist';
import Customerlist from './Customerlist';


function TabApp() {
  const [value, setValue] = useState('home');
  const handleChange=(event, value) => {
      setValue(value);
  }
  
  return (
    <div className="App">
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">
            PersonalTrainer
          </Typography>
        </Toolbar>
      </AppBar>

        <AppBar position="static">
          <Tabs value={value} onChange={handleChange}>
            <Tab value="trainings" label="Trainings"/>
            <Tab value="customers" label="Customers"/>
          </Tabs>
        </AppBar>

      {value === 'trainings' && <Traininglist/>}
      {value === 'customers' && <Customerlist/>}
    </div>
  );
}

export default TabApp;