import React, { Component } from 'react';
import { Paper } from '@material-ui/core';
import List from '../list';
import Search from '../search';

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      forFilter: []
    };
  }

  // If session is valid, navigate to main page
  navigateToMain = () => {
    if (localStorage.getItem("token")) {
      this.props.history.push("/customer");
    }
  }

  // Fetch model list
  fetchData = async () => {
    const responseFromServer = await fetch("https://omega-pricing.herokuapp.com/api/v1/phone/getAll");
    const  { body } = await responseFromServer.json();
    const data = body;
    this.setState({ data, forFilter: data });
  }

  // Search filter
  searchHandler = (event) => {
    const filtered = event.target.value.trim().length > 0 ?
    this.state.forFilter.filter((value) => {
      return value.model.toLowerCase().startsWith(event.target.value.toLowerCase());
    })
    :
    this.state.forFilter;

    this.setState({
      data: filtered
    });
  }

  async componentDidMount() {
    this.navigateToMain();
    await this.fetchData();
  }

  render() {
    return (
      <div>
        <Search handler={this.searchHandler} />
        <Paper style={{ width: '100%', overflowX: 'auto', marginTop: 30 }}>
          <List data={this.state.data} editable={false} />
        </Paper>
      </div>
    );
  }
}
