import React, { Component } from 'react';
import AddOrEdit from '../add_or_edit';
import Search from '../search';
import List from '../list';

export default class Customer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: []
    };
  }

  render() {
    return (
      <div>
        <AddOrEdit editEnabled={false} />
        <Search />
        <List data={this.state.data} editable={true} />
      </div>
    );
  }
}
