import { IUser } from './interfaces';

export const addUser = async (user: IUser) => {
  try {
    const response = await fetch('api/users', {
      method: 'POST',
      body: JSON.stringify(user),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return await response.json();
  } catch (e) {
    console.log(e);
  }
};
