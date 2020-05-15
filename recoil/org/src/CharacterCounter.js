import React from "react";
import { atom, useRecoilState } from "recoil";
import CharacterCount from "./CharacterCount";

export const textState = atom({
  key: "textState",
  default: ""
});

const TextInput = () => {
  const [text, setText] = useRecoilState(textState);
  const onChange = e => {
    setText(e.target.value);
  };
  return (
    <div>
      <input type="text" value={text} onChange={onChange} />
      <br />
      Echo: {text}
    </div>
  );
};

const CharacterCounter = () => {
  return (
    <div>
      <TextInput />
      <CharacterCount />
    </div>
  );
};

export default CharacterCounter;
