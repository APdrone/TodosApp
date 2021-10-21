import { Component } from "react";

class AddingList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      taskName: "",
      inputError: false,
      touched: false,
      list: [],
    };
  }

  regex = /^[A-Za-z0-9 ]+$/;

  inputChangehandler = (event) => {
    if (event.target.value.length < 1 || !this.regex.test(event.target.value)) {
      // console.log("if", event.target.value);
      this.setState({
        ...this.state,
        taskName: event.target.value,
        touched: true,
        inputError: true,
      });
    } else {
      // console.log("else", event.target.value);
      this.setState({
        ...this.state,
        taskName: event.target.value,
        touched: true,
        inputError: false,
      });
    }
  };

  formSubmissionHandler = (event) => {
    event.preventDefault();
    console.log("on submission");
    // console.log(this.state);
    if (
      this.state.taskName.length < 1 ||
      !this.regex.test(event.target.value)
    ) {
      this.setState({
        ...this.state,
        touched: true,
        inputError: true,
      });
      return;
    }

    if (!this.state.inputError && this.state.touched) {
      this.state.list.push(this.state.taskName);
      console.log(this.state.list);
    }

    this.setState({
      ...this.state,
      taskName: "",
      touched: false,
      inputError: false,
    });
  };

  onBlurHandler = () => {
    console.log("on blur");

    if (
      this.state.taskName.length < 1 ||
      !this.regex.test(this.state.taskName)
    ) {
      this.setState({
        ...this.state,
        touched: true,
        inputError: true,
      });
    }
  };

  render() {
    return (
      <>
        <h1>Add To Dos </h1>
        <form onSubmit={this.formSubmissionHandler}>
          <div>
            <label htmlFor="name">Add Tasks </label>

            <input
              type="text"
              id="name"
              value={this.state.taskName}
              onChange={this.inputChangehandler}
              onBlur={this.onBlurHandler}
            />
            <br />

            {this.state.touched && this.state.inputError && (
              <p className="error">
                Entered task should not be empty and not includes special
                characters
              </p>
            )}
            {!this.state.touched && this.state.inputError && (
              <p className="error">
                Entered task should not be empty and not includes special
                characters
              </p>
            )}
            <button type="submit">Submit</button>
          </div>
        </form>
        <ul>
          {this.state.list.length === 0 ? <p>No tasks...</p> : ""}
          {this.state.list.map((task) => {
            return <li key={task}>{task}</li>;
          })}
        </ul>
      </>
    );
  }
}

export default AddingList;
