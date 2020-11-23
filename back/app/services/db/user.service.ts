import { User } from '../../models/general.interfaces';

export async function create(user: User): Promise<User> {
  try {
    return;
  } catch (error) {
    console.error('Error happened in userCreate function');
    throw error;
  }
}

export async function getById(id: string): Promise<User | undefined> {
  try {
    return;
  } catch (error) {
    console.error('Error happened in getById function');
    throw error;
  }
}

export async function findUserByUsernameOrEmail(username?: string, email?: string): Promise<User | undefined> {
  try {
    if (username) {
      return;
    } else if (email) {
      return;
    } else {
      return undefined;
    }
  } catch (error) {
    console.error('Error happened in findUserByUsernameOrEmail function');
    throw error;
  }
}

export async function updateUserPoints(userId: string): Promise<void> {
  try {
    return;
  } catch (error) {
    console.error('Error happened in findUserByUsernameOrEmail function');
    throw error;
  }
}

export async function updateUser(userId: string, fieldsToUpdate: any): Promise<User | undefined> {
  try {
    return;
  } catch (error) {
    console.error('Error happened in findUserByUsernameOrEmail function');
    throw error;
  }
}
