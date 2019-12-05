import React from 'react';
import { TextField, Button } from '@material-ui/core';

// Styling
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

// Form to add or edit a model
export default ({ handleChange, editEnabled, handleSubmit, handleEdit, preEdit }) => (
  <div>
    <div style={styles.flexDiv}>
      <div style={styles.div}>
        <TextField style={styles.field} label="Model" variant="outlined" name="model" type="text" onChange={handleChange} value={preEdit.model} />
      </div>
      <div style={styles.div}>
        <TextField style={styles.field} label="Module Afficheur" variant="outlined" name="afficheur" type="number" onChange={handleChange} value={preEdit.afficheur} />
      </div>
      <div style={styles.div}>
        <TextField style={styles.field} label="Batterie" variant="outlined" name="batterie" type="number" onChange={handleChange} value={preEdit.batterie} />
      </div>
      <div style={styles.div}>
        <TextField style={styles.field} label="Connecteur" variant="outlined" name="connecteur" type="number" onChange={handleChange} value={preEdit.connecteur} />
      </div>
      <div style={styles.div}>
        <TextField style={styles.field} label="Micro" variant="outlined" name="micro" type="number" onChange={handleChange} value={preEdit.micro} />
      </div>
      <div style={styles.div}>
        <TextField style={styles.field} label="Haut Parleur" variant="outlined" name="hautParleur" type="number" onChange={handleChange} value={preEdit.hautParleur} />
      </div>
      <div style={styles.div}>
        <TextField style={styles.field} label="Boutton On Off" variant="outlined" name="bouttonOnOff" type="number" onChange={handleChange} value={preEdit.bouttonOnOff} />
      </div>
      <div style={styles.div}>
        <TextField style={styles.field} label="Desoxydation" variant="outlined" name="desoxydation" type="number" onChange={handleChange} value={preEdit.desoxydation} />
      </div>
      <div style={styles.div}>
        <TextField style={styles.field} label="Restoration" variant="outlined" name="restoration" type="number" onChange={handleChange} value={preEdit.restoration} />
      </div>
    </div>
    <Button style={styles.btn} variant="contained" disabled={editEnabled} color="primary" onClick={handleSubmit}>
      Add
    </Button>
    <Button style={styles.btn} variant="contained" disabled={!editEnabled} color="secondary" onClick={handleEdit}>
      Edit
    </Button>
  </div>
);
