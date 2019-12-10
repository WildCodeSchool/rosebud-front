import React from 'react';

export default function Navigation({ allowClick, currentPagination, questionnaireSize }) {
  const questionNavigation = (type) => () => {
    allowClick(type);
  };
  return (
    <div>
      {currentPagination > 1
                && <button type="button" onClick={questionNavigation('prev')}>Previous</button>}
      {currentPagination !== questionnaireSize + 1
                && <button type="button" onClick={questionNavigation('next')}>Next</button>}
    </div>
  );
}
