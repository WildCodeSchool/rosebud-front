export const initialState = {
  answers: [],
};

export const reducer = (state, action) => {
  switch (action.type) {
    case 'ADD_ANSWER': {
      const newAnswer = {
        id: action.id,
        comment: action.comment,
        question_id: action.question_id,
      };
      return {
        answers: [...state.answers, newAnswer],
      };
    }
    case 'UPDATE_ANSWER': {
      const { answers } = state;
      answers[action.id - 1].comment = action.comment;
      return state;
    }
    default: return state;
  }
};
