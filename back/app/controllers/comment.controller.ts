import * as userService from '../services/db/user.service';
import * as postService from '../services/db/post.service';
import * as commentService from '../services/db/comment.service';
import * as tokenService from '../services/token.service';

import { checkToken } from '../middlewares/token.middleware';
import { checkUser } from '../middlewares/user.middleware';

import { Router } from 'express';

import { UserToken } from '../models/token.interfaces';
import { Comment } from '../models/general.interfaces';

const commentRouter = Router();

commentRouter.post('/', checkToken, checkUser, async (req, res) => {
  const headers = req.headers;
  const query = req.query;
  const body = req.body;

  try {
    const token = headers.authorization;

    const decodedToken: UserToken = tokenService.decodeToken(token);

    const comment = await commentService.create({
      post_id: body.postId,
      likes: 0,
      text: body.text,
      user_id: decodedToken.userId,
    });

    return res.status(200).json({
      token: tokenService.updateToken(token),
      comment,
    });
  } catch (error) {
    console.error('Error happened in /comment/(post)');
    res.status(500).send(error);
  }
});

commentRouter.get('/post/:id', async (req, res) => {
  const headers = req.headers;
  const query = req.query;
  const body = req.body;

  const postId = req.params.id;

  try {
    const comments: Comment[] = await commentService.getByPostId(postId);

    return res.status(200).json({
      comments,
    });
  } catch (error) {
    console.error('Error happened in /comment/:id(get)');
    res.status(500).send(error);
  }
});

export { commentRouter };
