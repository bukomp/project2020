import { Comment } from './../../models/general.interfaces';
import { db } from '../../utils/db';

export async function create(comment: Comment): Promise<Comment> {
  try {
    const query = await db.query(`
      INSERT INTO comment (post_id,user_id,likes,text) 
      VALUES ('${comment.post_id}','${comment.user_id}',0,'${comment.text}');
    `);
    return await getById((query[0] as any) as string);
  } catch (error) {
    console.error('Error happened in userCreate function');
    throw error;
  }
}

export async function getById(id: string): Promise<Comment | undefined> {
  try {
    const query = await db.query(`
    SELECT *
    FROM comment
    WHERE id = '${id}';
  `);

    return query[0][0] as Comment;
  } catch (error) {
    console.error('Error happened in getById function');
    throw error;
  }
}

export async function updateLikes(id: string, likes: number): Promise<Comment | undefined> {
  try {
    await db.query(`
      UPDATE comment
      SET likes = '${likes}'
      WHERE id = '${id}';
    `);

    return await getById(id);
  } catch (error) {
    console.error('Error happened in updateLikes function');
    throw error;
  }
}
