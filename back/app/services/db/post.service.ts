import { Post } from './../../models/general.interfaces';
import { db } from '../../utils/db';

export async function create(post: Post): Promise<Post> {
  try {
    const query = await db.query(`
      INSERT INTO post (user_id,file_link,filters,likes) 
      VALUES ('${post.user_id}','${post.file_link}','${post.filters}',0);
    `);
    return await getById((query[0] as any) as string);
  } catch (error) {
    console.error('Error happened in userCreate function');
    throw error;
  }
}

export async function getById(id: string): Promise<Post | undefined> {
  try {
    const query = await db.query(`
    SELECT *
    FROM post
    WHERE id = '${id}';
  `);

    return query[0][0] as Post;
  } catch (error) {
    console.error('Error happened in getById function');
    throw error;
  }
}

export async function get(select: number, skip: number): Promise<Post[] | undefined> {
  try {
    const query = await db.query(`
    SELECT *
    FROM post
    ORDER BY created_at DESC
    LIMIT ${skip}, ${select};
  `);

    return query[0] as Post[];
  } catch (error) {
    console.error('Error happened in getById function');
    throw error;
  }
}

export async function updateLikes(id: string, likes: number): Promise<Post | undefined> {
  try {
    await db.query(`
      UPDATE post
      SET likes = '${likes}'
      WHERE id = '${id}';
    `);

    return await getById(id);
  } catch (error) {
    console.error('Error happened in updateLikes function');
    throw error;
  }
}
