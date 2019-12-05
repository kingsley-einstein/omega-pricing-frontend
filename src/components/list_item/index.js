import React from 'react';
import { TableRow, TableCell, withStyles, IconButton } from '@material-ui/core';
import { Edit, Delete, Euro } from '@material-ui/icons';

// Custom styles
const styles = {
  icon: {
    fontSize: 14
  }
};

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
      textAlign: "center",
      color: "blue"
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
      {item.afficheur} <Euro style={styles.icon} />
    </StyledTableCell>
    <StyledTableCell>
      {item.batterie} <Euro style={styles.icon} />
    </StyledTableCell>
    <StyledTableCell>
      {item.connecteur} <Euro style={styles.icon} />
    </StyledTableCell>
    <StyledTableCell>
      {item.micro} <Euro style={styles.icon} />
    </StyledTableCell>
    <StyledTableCell>
      {item.hautParleur} <Euro style={styles.icon} />
    </StyledTableCell>
    <StyledTableCell>
      {item.bouttonOnOff} <Euro style={styles.icon} />
    </StyledTableCell>
    <StyledTableCell>
      {item.desoxydation} <Euro style={styles.icon} />
    </StyledTableCell>
    <StyledTableCell>
      {item.restoration} <Euro style={styles.icon} />
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
