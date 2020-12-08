import { User } from '../../models/general.interfaces';
import { db } from '../../utils/db';

export async function create(user: User): Promise<User> {
  try {
    await db.query(
      `INSERT INTO user (username, email, password) VALUES ('${user.username}', '${user.email}', '${user.password}');`
    );
    return await findUserByUsernameOrEmail(user.username);
  } catch (error) {
    console.error('Error happened in userCreate function');
    throw error;
  }
}

export async function getById(id: string): Promise<User | undefined> {
  try {
    const query = await db.query(`
      SELECT *
      FROM user
      WHERE id = '${id}';
    `);
    return query[0][0] as User;
  } catch (error) {
    console.error('Error happened in getById function');
    throw error;
  }
}

export async function findUserByUsernameOrEmail(username?: string, email?: string): Promise<User | undefined> {
  try {
    if (username) {
      return (
        await db.query(`
      SELECT *
      FROM user
      WHERE username = '${username}';
      `)
      )[0][0] as User;
    } else if (email) {
      return (
        await db.query(`
      SELECT *
      FROM user
      WHERE email = '${email}';
      `)
      )[0][0] as User;
    } else {
      return undefined;
    }
  } catch (error) {
    console.error('Error happened in findUserByUsernameOrEmail function');
    throw error;
  }
}
