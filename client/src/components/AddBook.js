import React, { Component } from "react";
import { graphql, compose } from "react-apollo";
import {
  getBooksQuery,
  getAuthorsQuery,
  addBookMutation
} from "./queries/queries";

class AddBook extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      genre: "",
      authorID: ""
    };
  }
  displayAuthors() {
    console.log(this.props);
    var data = this.props.getAuthorsQuery;
    if (data.loading) {
      return <option disabled>Loading authors</option>;
    } else {
      return data.authors.map((author, i) => {
        return (
          <option key={i} value={author.id}>
            {author.name}
          </option>
        );
      });
    }
  }
  submitForm(e) {
    e.preventDefault();
    this.props.addBookMutation({
      variables: {
        name: this.state.name,
        genre: this.state.genre,
        authorID: this.state.authorID
      },
      refetchQueries: [{ query: getBooksQuery }]
    });
  }
  render() {
    return (
      <form id="add-book" onSubmit={this.submitForm.bind(this)}>
        <div className="field">
          <label>Book name:</label>
          <input
            type="text"
            onChange={e => this.setState({ name: e.target.value })}
          />
        </div>
        <div className="field">
          <label>Genre:</label>
          <input
            type="text"
            onChange={e => this.setState({ genre: e.target.value })}
          />
        </div>
        <div className="field">
          <label>Author:</label>
          <select onChange={e => this.setState({ authorID: e.target.value })}>
            <option>Select author</option>
            {this.displayAuthors()}
          </select>
        </div>
        <button>+</button>
      </form>
    );
  }
}

export default compose(
  graphql(getAuthorsQuery, { name: "getAuthorsQuery" }),
  graphql(addBookMutation, { name: "addBookMutation" })
)(AddBook);
