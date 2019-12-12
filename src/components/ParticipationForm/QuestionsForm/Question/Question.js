import React, { useEffect } from "react";
import useLocalStorage from "react-use-localstorage";
import UploadImage from "./UploadImage/UploadImage";
function Question({ question, currentAnswer}) {
  const { id, title } = question;
  const [localAnswer, setLocalAnswer] = useLocalStorage(`answer ${id}`, "");
  


  const handleChangeComment = e => {
    setLocalAnswer(e.target.value);
    currentAnswer(e.target.value);
  };
  
  useEffect(() => {
    currentAnswer(localStorage.getItem(`answer ${id}`));
  });
  return (
    <div>
      <h2>{title}</h2>
      <UploadImage id={id}  />
      <textarea onChange={handleChangeComment} value={localAnswer} />
    </div>
  );
}
export default Question;
