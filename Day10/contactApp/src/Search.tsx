import React from "react";

type Props = {
  onSearchInput: (textInput: string) => void;
};

export default function Search(props: Props) {
  let { onSearchInput } = props;
  let onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onSearchInput(event.target.value);
  };
  return (
    <input type="text" placeholder="Search contact..." onChange={onChange} />
  );
}
