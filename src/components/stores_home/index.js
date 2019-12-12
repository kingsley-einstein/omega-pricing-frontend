import React, { Component } from "react";
import { CircularProgress, Snackbar, Button } from "@material-ui/core";
import Search from "../search";
import StoresList from "../stores";
import AddStore from "../add_store";

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

// Stores main component

export default class StoresHome extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      forFilter: [],
      submittable: {
        name: ""
      },
      showProgress: false,
      showSnackbar: false,
      snackbarMessage: ""
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

  // Fetch stores from server and update state
  fetchData = async () => {
    const responseFromServer = await fetch("https://omega-pricing.herokuapp.com/api/v1/stores", {
      headers: {
        "Content-Type": "application/json"
      }
    });
    const { body } = await responseFromServer.json();
    this.setState({ data: body, forFilter: body });
  }

  //Reset form
  resetSubmittable = () => {
    const newSubmittable = this.state.submittable;
    Object.keys(newSubmittable).forEach((key) => {
      newSubmittable[key] = "";
    });
    this.setState({ submittable: newSubmittable });
  }

  handleChange = (event) => {
    const newSubmittable = this.state.submittable;
    newSubmittable[event.target.name] = event.target.value;
    this.setState({ submittable: newSubmittable });
  }

  handleSubmit = async () => {
    this.setState({ showProgress: true });
    const responseFromServer = await fetch("https://omega-pricing.herokuapp.com/api/v1/store", {
      body: JSON.stringify(this.state.submittable),
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
      this.showSnackbar("Successfully added store");
    }
    this.setState({ showProgress: false });
    await this.fetchData();
  }

  handleDelete = async (obj) => {
    const responseFromServer = await fetch(`https://omega-pricing.herokuapp.com/api/v1/store/${obj.id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      }
    });
    const { body } = await responseFromServer.json();
    this.showSnackbar(JSON.stringify(body));
    await this.fetchData();
  }

  searchHandler = (event) => {
    const filtered = event.target.value.trim().length > 0 ? 
      this.state.forFilter.filter((value) => {
        return value.name.toLowerCase().includes(event.target.value.toLowerCase());
      })
      :
      this.state.forFilter;
    
      this.setState({
        data: filtered
      });
  }

  submitEnabled = () => {
    return this.state.submittable.name.trim().length > 0;
  }

  handleNavigate = (obj) => {
    this.props.history.push(`/store/${obj.id}`);
  }

  render() {
    return (
      <div>
        <div style={styles.flexDiv}>
          <div style={styles.flexDiv2}>
            <AddStore handleChange={this.handleChange} handleSubmit={this.handleSubmit} submitEnabled={this.submitEnabled()} data={this.state.submittable} />
          </div>
          {
            this.state.showProgress &&
            <CircularProgress size={32} />
          }
        </div>
        <Search handler={this.searchHandler} />
        <StoresList data={this.state.data} handleDelete={this.handleDelete} handleNavigate={this.handleNavigate} />
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
