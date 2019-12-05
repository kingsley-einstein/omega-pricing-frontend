import React from 'react';
import { TextField, InputAdornment } from '@material-ui/core';
import { Search } from '@material-ui/icons';

const styles = {
  flexDiv: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 50
  },
  field: {
    padding: 8,
    width: 400
  }
};

export default ({ handler }) => (
  <div style={styles.flexDiv}>
    <div>
      <TextField
        variant="outlined"
        style={styles.field} 
        onChange={handler} 
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Search />
            </InputAdornment>
          ),
          fullWidth: true
        }}
      />
    </div>
  </div>
);
