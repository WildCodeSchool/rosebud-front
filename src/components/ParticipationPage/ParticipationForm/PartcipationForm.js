import React from 'react';
import Uploader from './Uploader/Uploader';
import FormSteps from './FormSteps/FormSteps';
import FormPagination from './FormPagination/FormPagination';

function ParticipationForm() {
  return (
    <div className="ParticipationForm">
      <form>
        <Uploader />
        <textarea />
        <FormSteps />
        <FormPagination />
      </form>
    </div>
  );
}

export default ParticipationForm;
