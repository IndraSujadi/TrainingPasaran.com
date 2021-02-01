import React, { Component } from "react";
import { isPropertySignature } from "typescript";
import { NewContactData } from "./State";
import { ulStyle } from "./style/styles";

type Props = {
  // onInputNewContactData: (nama: string, telp: string, linkedin: string) => void;
  saveNewContact: (newContactData: NewContactData) => void;
};

type State = {
  newNama: string;
  newTelp: string;
  newLinkedin: string;
};

let formItemStyle = {
  margin: 5,
};

let formUlStyle = {
  ...ulStyle,
  margin: 0,
};
export default class FormAddNewContact extends Component<Props, State> {
  state = {
    newNama: "",
    newTelp: "",
    newLinkedin: "",
  };

  onChangeNama = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      newNama: event.target.value,
    });
  };
  onChangeTelp = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      newTelp: event.target.value,
    });
  };
  onChangeLinkedin = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      newLinkedin: event.target.value,
    });
  };

  addContact = () => {
    let { saveNewContact } = this.props;
    let { newNama, newTelp, newLinkedin } = this.state;
    if (newNama !== "" && newTelp !== "" && newLinkedin !== "") {
      saveNewContact(this.state);
    }
    this.setState({
      newNama: "",
      newTelp: "",
      newLinkedin: "",
    });
  };
  render() {
    return (
      <div>
        Add New Contact
        <ul style={formUlStyle}>
          <li style={formItemStyle}>
            <input
              id="nama"
              type="text"
              placeholder="Person Name"
              value={this.state.newNama}
              onChange={this.onChangeNama}
            />
          </li>
          <li style={formItemStyle}>
            <input
              id="telp"
              type="text"
              placeholder="Phone Number"
              value={this.state.newTelp}
              onChange={this.onChangeTelp}
            />
          </li>
          <li style={formItemStyle}>
            <input
              id="linkedin"
              type="text"
              placeholder="Linkedin Username"
              value={this.state.newLinkedin}
              onChange={this.onChangeLinkedin}
            />
          </li>
          <li style={formItemStyle}>
            <button onClick={this.addContact}>Save Contact</button>
          </li>
        </ul>
      </div>
    );
  }
}

/* <form>
<h1>Hello</h1>
<p>Enter your name:</p>
<input type="text" />
<br />
<input type="text" />
</form> */
