import React, { Component } from "react";
import { ContactList } from "./ContactList";
import { DetailContact } from "./DetailContact";
import FormAddNewContact from "./FormAddNewContact";
import Search from "./Search";
// type
import type { NewContactData, State } from "./State";
// style
import {
  gridContainer,
  contactListStyle,
  contactDetailStyle,
  ulStyle,
} from "./style/styles";

type Props = {};

// type untuk newContact

// contoh class untuk localstate
class App extends Component<Props, State> {
  state = {
    contacts: [
      {
        id: "1",
        nama: "Indra Sujadi",
        telp: "081297134697",
        linkedin: "IndraSujadi9",
      },
      {
        id: "2",
        nama: "Alvin Saputra",
        telp: "08181678945",
        linkedin: "SaputaAlvin",
      },
      { id: "3", nama: "Dandi", telp: "081356987456", linkedin: "DandiAsd" },
    ],
    searchKey: "",
    selectedIndex: 0,
    newContactData: {
      newNama: "",
      newTelp: "",
      newLinkedin: "",
    },
  };

  componentDidMount() {
    document.addEventListener("keyup", this._onKeyDown);
  }

  componentWillUnmount() {
    document.addEventListener("keyup", this._onKeyDown);
  }

  _onKeyDown = (event: KeyboardEvent) => {
    let { contacts, selectedIndex } = this.state;
    let index = selectedIndex;
    let maxIndex = contacts.length - 1;
    let newIndex = index;
    if (event.key === "ArrowUp") {
      newIndex = Math.max(0, index - 1);
    }
    if (event.key === "ArrowDown") {
      newIndex = Math.min(maxIndex, index + 1);
    }

    if (newIndex !== index) {
      this.setState({ selectedIndex: newIndex });
    }
  };

  onClick = (id: string) => {
    let { selectedIndex, contacts } = this.state;
    let newIndex = selectedIndex;
    contacts.map((item, index) => {
      if (item.id === id) {
        newIndex = index;
      }
    });
    if (selectedIndex !== newIndex) {
      this.setState({
        selectedIndex: newIndex,
      });
    }
  };

  onSearchInput = (searchInput: string) => {
    let { searchKey } = this.state;
    this.setState({
      searchKey: searchInput,
    });
  };

  saveNewContact = (newContactData: NewContactData) => {
    let { contacts } = this.state;
    let newId = contacts.length + 1;
    let { newNama, newTelp, newLinkedin } = newContactData;
    let newContact = {
      id: newId.toString(),
      nama: newNama,
      telp: newTelp,
      linkedin: newLinkedin,
    };
    this.setState({
      contacts: [...contacts, newContact],
    });
  };

  render() {
    let { contacts, selectedIndex, searchKey } = this.state;
    // let { newNama, newTelp, newLinkedin } = newContactData;
    // untuk filter contact berdasarkan input pada kolom earch
    let filteredContact;
    if (searchKey === "") {
      filteredContact = contacts;
    } else {
      filteredContact = contacts.filter((item) => {
        let lowerSearchKey = searchKey.toLowerCase();
        let lowerNama = item.nama.toLowerCase();
        let lowerLinkedin = item.linkedin.toLowerCase();
        if (
          lowerNama.includes(lowerSearchKey) ||
          lowerLinkedin.includes(lowerSearchKey) ||
          item.telp.includes(lowerSearchKey)
        ) {
          return item;
        }
      });
    }

    return (
      <div>
        <div style={gridContainer}>
          <div id="contactList" style={contactListStyle}>
            Contact
            <br />
            <Search onSearchInput={this.onSearchInput} />
            <ul style={ulStyle}>
              {filteredContact.map((item, index) => (
                <ContactList
                  contactId={item.id}
                  personName={item.nama}
                  isSelected={index === selectedIndex}
                  onClick={this.onClick}
                />
              ))}
            </ul>
          </div>

          <div id="detailContact" style={contactDetailStyle}>
            {filteredContact.map((item, index) => (
              <DetailContact
                person={item}
                isSelected={index === selectedIndex}
              />
            ))}
          </div>
        </div>
        <br />
        <FormAddNewContact saveNewContact={this.saveNewContact} />
      </div>
    );
  }
}

export default App;
