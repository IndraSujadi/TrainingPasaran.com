import React from "react";
import { shallow } from "enzyme";

import { NewItemForm } from "../NewItemForm";

it("should render a form", () => {
  let onInput = () => {};
  let addNewItem = () => {};
  let wrapper = shallow(
    <NewItemForm inputValue="" onInput={onInput} addNewItem={addNewItem} />
  );
  expect(
    wrapper.matchesElement(
      <div>
        <button onClick={addNewItem}>Save</button>
        <input type="text" value="" />
      </div>
    )
  ).toEqual(true);
});
