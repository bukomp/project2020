import { Post } from './../../models/general.interfaces';
import { db } from '../../utils/db';

export async function create(post: Post): Promise<Post> {
  try {
    const query = await db.query(
      `INSERT INTO post (user_id,file_link,filters,likes) VALUES (${post.user_id},${post.file_link},${post.filters},0);`
    );
    console.log(query);
    return; //await getById(user.username);
  } catch (error) {
    console.error('Error happened in userCreate function');
    throw error;
  }
}

export async function getById(id: string): Promise<Post | undefined> {
  try {
    return await db.query(`
      SELECT *
      FROM user
      WHERE id = ${id};
      `)[0];
  } catch (error) {
    console.error('Error happened in getById function');
    throw error;
  }
}
