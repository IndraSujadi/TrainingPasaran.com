import React from "react";
import { contactListStyle } from "./style/styles";

type Props = {
  contactId: string;
  personName: string;
  isSelected: boolean;
  onClick: (id: string) => void;
};

let styleSelectedItem = {
  background: "salmon",
  color: "white",
};

let styleUnselectedItem = {
  background: "transparent",
  color: "black",
};
export function ContactList(props: Props) {
  let { personName, isSelected, onClick, contactId } = props;
  let contactItemStyle = isSelected ? styleSelectedItem : styleUnselectedItem;
  return (
    <li style={contactItemStyle} onClick={() => onClick(contactId)}>
      {personName}
    </li>
  );
}
