import React from "react";
import { TextField, Button } from "@material-ui/core";

const styles = {
  flexDiv: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    flexWrap: "wrap"
  },
  div: {
    flex: 0.5
  },
  field: {
    padding: 8,
    width: 200
  },
  btn: {
    margin: 5
  }
};

const AddStore = ({ handleChange, handleSubmit, submitEnabled, data }) => (
  <div>
    <div style={styles.flexDiv}>
      <div style={styles.div}>
        <TextField style={styles.field} label="Name" variant="outlined" name="name" type="text" onChange={handleChange} value={data.name} />
      </div>
    </div>
    <Button style={styles.btn} variant="contained" disabled={!submitEnabled} color="primary" onClick={handleSubmit}>
      Add
    </Button>
  </div>
);

export default AddStore;
