import React from "react";
// type
import type { FriendList } from "./State";

type Props = {
  person: FriendList;
  isSelected: boolean;
};

export function DetailContact(props: Props) {
  let { person, isSelected } = props;
  let { nama, telp, linkedin } = person;

  if (isSelected) {
    return (
      <div>
        <p>Nama : {nama}</p>
        <p>Nomor Telepon : {telp}</p>
        <p>Linkedin: {linkedin}</p>
      </div>
    );
  } else {
    return <div></div>;
  }
}
