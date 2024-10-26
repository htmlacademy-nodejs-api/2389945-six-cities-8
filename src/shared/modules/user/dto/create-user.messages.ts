export const CreateUserMessages = {
  email: {
    invalidFormat: 'email must be a valid address',
  },
  avatarUrl: {
    invalidFormat: 'avatarUrl is required',
  },
  name: {
    invalidFormat: 'name is required',
    lengthField: 'min length must be 1, max must be 15',
  },
  password: {
    invalidFormat: 'password is required',
    lengthField: 'min length for password must be 6, max must be 12',
  },
  isPro: { invalidFormat: 'Field isPro must be boolean' },
} as const;
