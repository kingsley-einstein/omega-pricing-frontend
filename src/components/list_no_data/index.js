import React from 'react';
import { TableCell, TableRow, withStyles } from '@material-ui/core';

const StyledTableRow = withStyles(theme => {
  return {
    root: {
      backgroundColor: theme.palette.background.default
    }
  }
})(TableRow);

const StyledTableCell = withStyles(theme => {
  return {
    body: {
      textAlign: "center",
      width: "100%",
      fontSize: 19
    }
  }
})(TableCell);

export default () => (
  <StyledTableRow>
    <StyledTableCell>No Data</StyledTableCell>
  </StyledTableRow>
);
