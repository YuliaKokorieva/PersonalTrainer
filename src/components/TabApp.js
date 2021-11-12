import React, {useState} from 'react';
import AppBar from '@mui/material/AppBar';
import Tabs from'@mui/material/Tabs';
import Tab from'@mui/material/Tab';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Traininglist from './Traininglist';
import Customerlist from './Customerlist';


function TabApp() {
  const [value, setValue] = useState('customers');

  const trainingsURL = 'https://customerrest.herokuapp.com/api/trainings/'

  const handleChange=(event, value) => {
      setValue(value);
  }
  const styles = {
    tab: {
        padding: '2px 34px',
        color: 'white',
        fontWeight: 'bold',
    }
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
        <Tabs value={value} onChange={handleChange} TabIndicatorProps={{style: {background:'white'}}}>
          <Tab value="customers" label="Customers" style={styles.tab}/>
          <Tab value="trainings" label="Trainings" style={styles.tab}/>          
        </Tabs>
      </AppBar>

      {value === 'trainings' && <Traininglist link={trainingsURL}/>}
      {value === 'customers' && <Customerlist/>}
    </div>
  );
}

export default TabApp;