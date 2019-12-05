import React from 'react';
import { TableRow, TableCell, withStyles, IconButton } from '@material-ui/core';
import { Edit, Delete } from '@material-ui/icons';

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
      textAlign: "center"
    }
  }
})(TableCell);

const ListItem = ({ item, editable, handleEdit, handleDelete }) => (
  <StyledTableRow>
    <StyledTableCell component="th" scope="row">
      {item.id}
    </StyledTableCell>
    <StyledTableCell>
      {item.model}
    </StyledTableCell>
    <StyledTableCell>
      {item.afficheur}
    </StyledTableCell>
    <StyledTableCell>
      {item.batterie}
    </StyledTableCell>
    <StyledTableCell>
      {item.connecteur}
    </StyledTableCell>
    <StyledTableCell>
      {item.micro}
    </StyledTableCell>
    <StyledTableCell>
      {item.hautParleur}
    </StyledTableCell>
    <StyledTableCell>
      {item.bouttonOnOff}
    </StyledTableCell>
    <StyledTableCell>
      {item.desoxydation}
    </StyledTableCell>
    <StyledTableCell>
      {item.restoration}
    </StyledTableCell>
    {
      editable &&
      <StyledTableCell>
        <IconButton onClick={() => handleEdit(item)}>
          <Edit />
        </IconButton>
        <IconButton onClick={() => handleDelete(item)}>
          <Delete />
        </IconButton>
      </StyledTableCell>
    }
  </StyledTableRow>
);

export default ListItem;
