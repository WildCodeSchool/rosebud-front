import React, { useEffect } from 'react';
import useLocalStorage from 'react-use-localstorage';

function Question({ question, currentAnswer, currentImage }) {
  const { id, title } = question;
  const [localAnswer, setLocalAnswer] = useLocalStorage(`answer ${id}`, '');
  const [localImage, setLocalImage] = useLocalStorage(`image object ${id}`, '');

  const handleChangeImage = (e) => {
    e.preventDefault();
    const reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onloadend = () => {
      const base64data = reader.result;
      currentImage(base64data);
      setLocalImage(base64data);
    };
  };

  const handleChangeComment = (e) => {
    setLocalAnswer(e.target.value);
    currentAnswer(e.target.value);
  };

  useEffect(() => {
    currentAnswer(localStorage.getItem(`answer ${id}`));
    currentImage(localStorage.getItem(`image object ${id}`));
  });
  return (
    <div>
      <h2>{title}</h2>
      <input type="file" onChange={handleChangeImage} value="" />
      {localImage
        && <img src={localImage} alt="pre" />}
      <textarea onChange={handleChangeComment} value={localAnswer} />
    </div>
  );
}
export default Question;
