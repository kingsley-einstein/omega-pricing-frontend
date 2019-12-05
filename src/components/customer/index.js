import React, { Component } from 'react';
import { CircularProgress, Snackbar, Button } from '@material-ui/core';
import AddOrEdit from '../add_or_edit';
import Search from '../search';
import List from '../list';

const styles = {
  flexDiv: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center"
  }
};

export default class Customer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      submittable: {
        model: "",
        afficheur: null,
        batterie: null,
        connecteur: null,
        micro: null,
        hautParleur: null,
        bouttonOnOff: null,
        desoxydation: null,
        restoration: null
      },
      showProgress: false,
      showSnackbar: false,
      snackbarMessage: "",
      editMode: false
    };
  }

  async componentDidMount() {
    await this.fetchData();
  }

  showSnackbar = (message) => {
    this.setState({
      showSnackbar: true,
      snackbarMessage: message
    });
  }

  hideSnackbar = () => {
    this.setState({
      showSnackbar: false,
      snackbarMessage: ""
    });
  }

  fetchData = async () => {
    const responseFromServer = await fetch("https://omega-pricing.herokuapp.com/api/v1/phone/getAll");
    const  { body } = await responseFromServer.json();
    this.setState({ data: body });
  }

  resetSubmittable = () => {
    const newSubmittable = this.state.submittable;
    Object.keys(newSubmittable).forEach((key) => {
      newSubmittable[key] = "";
    });
    this.setState({ submittable: newSubmittable });
  }
  
  preFillForEdit = (obj) => {
    const item = this.state.data.find((v) => {
      return obj.id === v.id
    });
    this.setState({
      submittable: item,
      editMode: true
    });
  }

  handleChange = (event) => {
    const newSubmittable = this.state.submittable;
    newSubmittable[event.target.name] = event.target.value;
    this.setState({ submittable: newSubmittable });
  }

  handleSubmit = async () => {
    this.setState({ showProgress: true });
    const responseFromServer = await fetch("https://omega-pricing.herokuapp.com/api/v1/phone/add", {
      body: JSON.stringify(this.state.submittable),
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      }
    });
    const { body, statusCode } = await responseFromServer.json();
    if (statusCode >= 400) {
      this.showSnackbar(JSON.stringify(body));
    }
    if (statusCode >= 200 && statusCode <=300) {
      this.resetSubmittable();
      this.showSnackbar("Successfully added model");
    }
    this.setState({ showProgress: false });
  }

  render() {
    return (
      <div>
        <div style={styles.flexDiv}>
          <AddOrEdit editEnabled={this.state.editMode} handleChange={this.handleChange} preEdit={this.state.submittable} handleSubmit={this.handleSubmit} />
          {
            this.state.showProgress &&
            <CircularProgress size={32} />
          }
        </div>
        <Search />
        <List data={this.state.data} editable={true} handleEdit={this.preFillForEdit} />
        <Snackbar 
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
          open={this.state.showSnackbar}
          autoHideDuration={4000}
          onClose={this.hideSnackbar}
          message={<span>{this.state.snackbarMessage}</span>}
          action={
            <Button key="undo" color="secondary" size="small" onClick={this.hideSnackbar}>
              CLOSE
            </Button>
          }
        />
      </div>
    );
  }
}
