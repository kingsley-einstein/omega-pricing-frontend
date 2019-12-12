import React from "react";
import { TableRow, TableCell, IconButton, withStyles } from "@material-ui/core";
import { Delete, Forward } from "@material-ui/icons";

const StyledTableRow = withStyles(theme => {
  return {
    root: {
      '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.background.default
      }
    }
  }
})(TableRow);

const StyledTableCell = withStyles(theme => {
  return {
    body: {
      fontSize: 14,
      textAlign: "center",
      color: "blue"
    }
  }
})(TableCell);

const StoresListItem = ({ item, handleDelete, handleNavigate }) => (
  <StyledTableRow>
    <StyledTableCell component="th" scope="row">
      {item.id}
    </StyledTableCell>
    <StyledTableCell>
      {item.name}
    </StyledTableCell>
    <StyledTableCell>
      <IconButton onClick={() => handleDelete(item)}>
        <Delete />
      </IconButton>
      <IconButton onClick={() => handleNavigate(item)}>
        <Forward />
      </IconButton>
    </StyledTableCell>
  </StyledTableRow>
);

export default StoresListItem;
