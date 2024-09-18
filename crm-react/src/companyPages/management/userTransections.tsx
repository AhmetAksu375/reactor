import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import AddUser from '../addUser';
import EmployoesList from '@/compenents/emplooyesList';
import { getDepartmant } from '@/api/Common/commonServices';
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
    <Box sx={{ width: '100%'}}>
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
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
      <EmployoesList/>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <AddUser/>
      </CustomTabPanel>
    </Box>
    </div>
  );
}
