import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import AddUser from '../addUser';
import EmployeeList from '../employeeList';
interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-tabpanel-${index}`}
      aria-labelledby={`scrollable-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `scrollable-tab-${index}`,
    'aria-controls': `scrollable-tabpanel-${index}`,
  };
}

export default function ScrollableTabsWithContent() {
  const [value, setValue] = React.useState(0);

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <div className='w-screen'>
    <Box sx={{ width: '100%' , marginTop:'20px'}}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs
          value={value}
          onChange={handleChange}
          variant="scrollable" // Kaydırılabilir hale getirildi
          scrollButtons="auto" // Otomatik kaydırma butonları
          aria-label="scrollable tabs with content"
        >
          <Tab label="User List" {...a11yProps(0)} />
          <Tab label="Add User" {...a11yProps(1)} />
          <Tab label="Item Three" {...a11yProps(2)} />
          <Tab label="Item Four" {...a11yProps(3)} />
          <Tab label="Item Five" {...a11yProps(4)} />
          <Tab label="Item Six" {...a11yProps(5)} />
          <Tab label="Item Seven" {...a11yProps(6)} />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
       <EmployeeList/>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <AddUser/>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        Content for Item Three
      </CustomTabPanel>
      <CustomTabPanel value={value} index={3}>
        Content for Item Four
      </CustomTabPanel>
      <CustomTabPanel value={value} index={4}>
        Content for Item Five
      </CustomTabPanel>
      <CustomTabPanel value={value} index={5}>
        Content for Item Six
      </CustomTabPanel>
      <CustomTabPanel value={value} index={6}>
        Content for Item Seven
      </CustomTabPanel>
    </Box>
    </div>
  );
}
