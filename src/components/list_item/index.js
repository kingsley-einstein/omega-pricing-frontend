import React from 'react';
import { TableRow, TableCell, withStyles, IconButton } from '@material-ui/core';
import { Edit, Delete, Euro } from '@material-ui/icons';

// Material table row
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

// Single model component in list
const ListItem = ({ item, editable, handleEdit, handleDelete }) => (
  <StyledTableRow>
    <StyledTableCell component="th" scope="row">
      {item.id}
    </StyledTableCell>
    <StyledTableCell>
      {item.model}
    </StyledTableCell>
    <StyledTableCell>
      {item.afficheur} <Euro />
    </StyledTableCell>
    <StyledTableCell>
      {item.batterie} <Euro />
    </StyledTableCell>
    <StyledTableCell>
      {item.connecteur} <Euro />
    </StyledTableCell>
    <StyledTableCell>
      {item.micro} <Euro />
    </StyledTableCell>
    <StyledTableCell>
      {item.hautParleur} <Euro />
    </StyledTableCell>
    <StyledTableCell>
      {item.bouttonOnOff} <Euro />
    </StyledTableCell>
    <StyledTableCell>
      {item.desoxydation} <Euro />
    </StyledTableCell>
    <StyledTableCell>
      {item.restoration} <Euro />
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
