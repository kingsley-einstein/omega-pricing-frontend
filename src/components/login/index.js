import React, { Component } from 'react';
import { Card, CardContent, TextField, InputAdornment, Button, CircularProgress, Snackbar } from '@material-ui/core';
import { Email, Lock } from '@material-ui/icons';
import emailRegex from 'email-regex';

const styles = {
  flexDiv: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 50
  },
  card: {
    minWidth: 400
  },
  field: {
    width: "100%",
    marginBottom: 30
  }
};

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {
        email: "",
        password: ""
      },
      showProgress: false,
      showSnackbar: false,
      snackbarMessage: ""
    };
  }

  change = (event) => {
    const newData = this.state.data;
    newData[event.target.name] = event.target.value;
    this.setState({ data: newData });
  }

  hideSnackbar = () => {
    this.setState({ showSnackbar: false });
  }

  submit = async (event) => {
    this.setState({ showProgress: true });
    const responseFromServer = await fetch("https://omega-pricing.herokuapp.com/api/v1/admin/login", {
      body: JSON.stringify(this.state.data),
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      }
    });
    const { body, statusCode } = await responseFromServer.json();
    if (!responseFromServer.ok || statusCode >= 400) {
      this.setState({
        showProgress: false,
        showSnackbar: true,
        snackbarMessage: JSON.stringify(body)
      });
      return;
    }
    if (statusCode === 200) {
      this.setState({
        showProgress: false,
        showSnackbar: true,
        snackbarMessage: "Successfully logged user in",
        data: {
          email: "",
          password: ""
        }
      });
      this.props.history.push("/customer");
    }
  }

  isValid = () => {
    return emailRegex().test(this.state.data.email) && this.state.data.email.trim().length > 0 && this.state.data.password.trim().length > 0
  }

  render() {
    return (
      <div style={styles.flexDiv}>
        <Card style={styles.card}>
          <CardContent>
            <TextField
              style={styles.field}
              onChange={this.change}
              name="email"
              type="email"
              label="Email"
              required
              value={this.state.data.email}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Email />
                  </InputAdornment>
                )
              }}
            />
            <TextField
              style={styles.field}
              onChange={this.change}
              name="password"
              label="Password"
              type="password"
              required
              value={this.state.data.password}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Lock />
                  </InputAdornment>
                )
              }}
            />
            <Button variant="contained" color="primary" disabled={!this.isValid()} onClick={this.submit}>
              Submit
            </Button>
            {this.state.showProgress && <CircularProgress />}
          </CardContent>
        </Card>
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
