import React from 'react';
import { Table, TableHead, TableRow, TableCell, TableBody } from '@material-ui/core';
import { makeStyles, withStyles } from '@material-ui/core/styles';

import ListItem from '../list_item';
import ListNoData from '../list_no_data';

const styles = makeStyles({
  table: {
    minWidth: 700
  }
});

// Material table cell
const StyledTableCell = withStyles(theme => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white
  }
}))(TableCell);

// Model list component
const List = ({ data, editable, handleEdit, handleDelete }) => {
  // Set classes
  const style = styles();
  return (
    <Table className={style.table}>
      <TableHead>
        <TableRow>
          <StyledTableCell>ID</StyledTableCell>
          <StyledTableCell align="right">Model</StyledTableCell>
          <StyledTableCell align="right">Afficheur</StyledTableCell>
          <StyledTableCell align="right">Batterie</StyledTableCell>
          <StyledTableCell align="right">Connecteur</StyledTableCell>
          <StyledTableCell align="right">Micro</StyledTableCell>
          <StyledTableCell align="right">Haut Parleur</StyledTableCell>
          <StyledTableCell align="right">Boutton On Off</StyledTableCell>
          <StyledTableCell align="right">Desoxydation</StyledTableCell>
          <StyledTableCell align="right">Restoration</StyledTableCell>
          {editable && <StyledTableCell align="right">Edition</StyledTableCell>}
        </TableRow>
      </TableHead>
      <TableBody>
        {data.length === 0 && <ListNoData />}
        {data.length > 0 && data.map((value) => (
          <ListItem key={value.id.toString()} item={value} editable={editable} handleEdit={handleEdit ? handleEdit : null} handleDelete={handleDelete ? handleDelete : null} />
        ))}
      </TableBody>
    </Table>
  );
};

export default List;
