export const CreateCommentValidationMessage = {
  offerId: {
    invalidId: 'offerId field must be a valid id',
  },

  text: {
    minLength: 'Minimum comment length must be 5',
    maxLength: 'Maximum comment length must be 1024',
    invalidFormat: 'text must be a string',
  },

  postDate: {
    invalidFormat: 'postDate must be a valid ISO date',
  },

  rating: {
    invalidFormat: 'Rating must be an number',
    minValue: 'Minimum rating is 1',
    maxValue: 'Maximum rating is 5',
  },

  userId: {
    invalidId: 'userId field must be a valid id',
  },
};
