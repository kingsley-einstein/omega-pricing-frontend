import React from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import { Table, TableRow, TableCell, TableHead, TableBody } from "@material-ui/core";
import ListNoData from "../list_no_data";
import StoresListItem from "../stores_list_item";

const styles = makeStyles({
  table: {
    minWidth: 500
  }
});

const StyledTableCell = withStyles(theme => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white
  }
}))(TableCell);

// List of stores
const StoresList = ({ data, handleDelete, handleNavigate }) => {
  const style = styles();
  return (
    <Table className={style.table}>
      <TableHead>
        <TableRow>
          <StyledTableCell>ID</StyledTableCell>
          <StyledTableCell align="right">Name</StyledTableCell>
          <StyledTableCell align="right">Action</StyledTableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {data.length === 0 && <ListNoData />}
        {data.length > 0 && data.map((value) => (
          <StoresListItem key={value.id.toString()} item={value} handleDelete={handleDelete ? handleDelete : null} handleNavigate={handleNavigate ? handleNavigate : null} />
        ))}
      </TableBody>
    </Table>
  );
};

export default StoresList;
