import React, { Component } from 'react';
import { CircularProgress, Snackbar, Button } from '@material-ui/core';
import { VerifiedUser } from '@material-ui/icons';
import AddOrEdit from '../add_or_edit';
import Search from '../search';
import List from '../list';

const styles = {
  flexDiv: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center"
  },
  flexDiv2: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 8
  }
};

// Customer component

export default class Customer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      forFilter: [], // For filtering
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
      editMode: false,
      verifiedUser: {
        email: "emailGoesHere",
        id: 0
      }
    };
  }

  async componentDidMount() {
    await this.getLoggedUser();
    await this.fetchData();
  }

  // Show toast with customised message
  showSnackbar = (message) => {
    this.setState({
      showSnackbar: true,
      snackbarMessage: message
    });
  }

  // Hide toast
  hideSnackbar = () => {
    this.setState({
      showSnackbar: false,
      snackbarMessage: ""
    });
  }

  // Get authenticated user from the server
  getLoggedUser = async () => {
    const responseFromServer = await fetch("https://omega-pricing.herokuapp.com/api/v1/admin", {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem("token")}`
      }
    });
    const { body } = await responseFromServer.json();
    console.log(body);
    this.setState({ verifiedUser: body });
  }

  // Fetch models from the server and update state
  fetchData = async () => {
    const responseFromServer = await fetch("https://omega-pricing.herokuapp.com/api/v1/phone/getAll");
    const  { body } = await responseFromServer.json();
    this.setState({ data: body, forFilter: body });
  }

  // Reset form
  resetSubmittable = () => {
    const newSubmittable = this.state.submittable;
    Object.keys(newSubmittable).forEach((key) => {
      newSubmittable[key] = "";
    });
    this.setState({ submittable: newSubmittable });
  }

  // Switch mode from edit to create
  switchModes = () => {
    this.setState({
      editMode: false
    });
  }
  
  // Pre-fill form for update
  preFillForEdit = (obj) => {
    const item = this.state.data.find((v) => {
      return obj.id === v.id
    });
    // Pre-fill form and change mode o update
    this.setState({
      submittable: item,
      editMode: true
    });
  }

  // Delete a model and refresh list
  handleDelete = async (obj) => {
    const responseFromServer = await fetch(`https://omega-pricing.herokuapp.com/api/v1/phone/delete/${obj.id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      }
    });
    const { body } = await responseFromServer.json();
    this.showSnackbar(JSON.stringify(body));
    await this.fetchData();
  }

  // Handle input change
  handleChange = (event) => {
    const newSubmittable = this.state.submittable;
    newSubmittable[event.target.name] = event.target.value;
    this.setState({ submittable: newSubmittable });
  }

  // Edit a model
  handleEdit = async () => {
    this.setState({ showProgress: true })
    // Destructure id of item to update
    const { id } = this.state.submittable;
    // Create new model from form. Do not send ids as they have to be unique
    const editBody = {
      model: this.state.submittable.model,
      afficheur: this.state.submittable.afficheur,
      batterie: this.state.submittable.batterie,
      connecteur: this.state.submittable.connecteur,
      micro: this.state.submittable.micro,
      hautParleur: this.state.submittable.hautParleur,
      bouttonOnOff: this.state.submittable.bouttonOnOff,
      desoxydation: this.state.submittable.desoxydation,
      restoration: this.state.submittable.restoration
    };
    const responseFromServer = await fetch(`https://omega-pricing.herokuapp.com/api/v1/phone/edit/${id}`, {
      method: "PATCH",
      body: JSON.stringify(editBody),
      headers: {
        "Content-Type": "application/json"
      }
    });
    const { statusCode, body } = await responseFromServer.json();
    if (statusCode >= 400) {
      this.showSnackbar(JSON.stringify(body));
      this.setState({ showProgress: false });
      return;
    }
    this.showSnackbar("Updated model");
    this.setState({ showProgress: false });
    await this.fetchData();
  }

  // Create new model
  handleSubmit = async () => {
    this.setState({ showProgress: true });
    // New model
    let requestBody;
    // Create model from new object. This only runs if the id key is present in object from an edit mode 
    if (this.state.submittable.id) {
      requestBody = {
        model: this.state.submittable.model,
        afficheur: this.state.submittable.afficheur,
        batterie: this.state.submittable.batterie,
        connecteur: this.state.submittable.connecteur,
        micro: this.state.submittable.micro,
        hautParleur: this.state.submittable.hautParleur,
        bouttonOnOff: this.state.submittable.bouttonOnOff,
        desoxydation: this.state.submittable.desoxydation,
        restoration: this.state.submittable.restoration
      };
    } else {
      // Use form object if no id key is present
      requestBody = this.state.submittable
    }
    const responseFromServer = await fetch("https://omega-pricing.herokuapp.com/api/v1/phone/add", {
      body: JSON.stringify(requestBody),
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      }
    });
    const { body, statusCode } = await responseFromServer.json();
    if (statusCode >= 400) {
      if (typeof body === "string") {
        this.showSnackbar(body);
      } else if (typeof body === "object") {
        this.showSnackbar(body.errors[0].message);
      }
    }
    if (statusCode >= 200 && statusCode <=300) {
      this.resetSubmittable();
      this.showSnackbar("Successfully added model");
    }
    this.setState({ showProgress: false });
    await this.fetchData();
  }

  // Handle search and filter list
  searchHandler = (event) => {
    const filtered = event.target.value.trim().length > 0 ? 
      this.state.forFilter.filter((value) => {
        return value.model.toLowerCase().includes(event.target.value.toLowerCase());
      })
      :
      this.state.forFilter;
    
      this.setState({
        data: filtered
      });
  }

  render() {
    return (
      <div>
        <div style={styles.flexDiv}>
          <div style={styles.flexDiv2}>
            <VerifiedUser />
            <h6>
              {this.state.verifiedUser.email}
            </h6>
          </div>
          <AddOrEdit editEnabled={this.state.editMode} handleChange={this.handleChange} preEdit={this.state.submittable} handleSubmit={this.handleSubmit} handleEdit={this.handleEdit} />
          <div>
            <Button color="secondary" onClick={this.switchModes} variant="contained" disabled={!this.state.editMode}>
              Switch Mode
            </Button>
          </div>
          {
            this.state.showProgress &&
            <CircularProgress size={32} />
          }
        </div>
        <Search handler={this.searchHandler} />
        <List data={this.state.data} editable={true} handleEdit={this.preFillForEdit} handleDelete={this.handleDelete} />
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
