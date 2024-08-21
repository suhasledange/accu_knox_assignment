import React from 'react';
import { TextField, MenuItem, InputAdornment } from '@mui/material';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

const options = [
  { value: 'last-2-days', label: 'Last 2 days' },
  { value: 'last-week', label: 'Last week' },
  { value: 'last-month', label: 'Last month' },
];

const TimeSelect = () => {
  const [selectedOption, setSelectedOption] = React.useState('last-2-days');

  const handleChange = (event) => {
    setSelectedOption(event.target.value);
  };

  return (
    <TextField
      select
      value={selectedOption}
      onChange={handleChange}
      variant="outlined"
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <AccessTimeIcon style={{ color: '#1A237E' }} />
          </InputAdornment>
        ),
        style: {
          padding: "5px",
          margin: 0,
        },
      }}
      SelectProps={{
        MenuProps: {
          PaperProps: {
            style: {
              padding: 0,
              margin: 0,
            },
          },
        },
      }}
      style={{ width: '170px', padding: 0, margin: 0 }}
      sx={{
        '& .MuiSelect-select': {
          padding: 0,
          margin: 0,
        },
      }}
    >
      {options.map((option) => (
        <MenuItem
          key={option.value}
          value={option.value}
          style={{
            padding: '4px 8px',
            margin: 0,
          }}
        >
          {option.label}
        </MenuItem>
      ))}
    </TextField>
  );
};

export default TimeSelect;
