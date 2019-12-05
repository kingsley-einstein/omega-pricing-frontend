import React, { Component } from 'react';
import { Paper } from '@material-ui/core';
import List from '../list';
import Search from '../search';

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: []
    };
  }

  fetchData = async () => {
    const responseFromServer = await fetch("https://omega-pricing.herokuapp.com/api/v1/phone/getAll");
    const  { body } = await responseFromServer.json();
    const data = body;
    this.setState({ data });
  }

  async componentDidMount() {
    await this.fetchData();
  }

  render() {
    return (
      <div>
        <Search />
        <Paper style={{ width: '100%', overflowX: 'auto', marginTop: 30 }}>
          <List data={this.state.data} editable={false} />
        </Paper>
      </div>
    );
  }
}
