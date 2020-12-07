import * as userService from '../services/db/user.service';
import * as postService from '../services/db/post.service';
import * as tokenService from '../services/token.service';

import { checkToken } from '../middlewares/token.middleware';
import { checkUser } from '../middlewares/user.middleware';

import { CONFIG } from '../utils/config';

import { Router } from 'express';
import multer from 'multer';

import { UserToken } from '../models/token.interfaces';

const postRouter = Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, CONFIG.PATH_TO_STORE_IMAGES);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-image.' + file.mimetype.split('/')[1]);
  },
});

const upload = multer({ storage: storage });

postRouter.post('/', checkToken, checkUser, upload.single('image'), async (req, res) => {
  const headers = req.headers;
  const query = req.query;
  const body = req.body;

  try {
    const token = headers.authorization;

    const decodedToken: UserToken = tokenService.decodeToken(token);

    const post = await postService.create({
      file_link: req.file.path,
      filters: body.filters,
      likes: 0,
      user_id: decodedToken.userId,
    });

    return res.status(200).json({
      token: tokenService.updateToken(token),
    });
  } catch (error) {
    console.error('Error happened in /post/(post)');
    res.status(500).send(error);
  }
});

postRouter.get('/', async (req, res) => {
  const headers = req.headers;
  const query = req.query;
  const body = req.body;

  try {
    const list = (await postService.get(20, +query.skip || 0)).map((post) => {
      delete post.file_link;
      delete post.user_id;
      return post;
    });
    return res.status(200).json({
      list,
    });
  } catch (error) {
    console.error('Error happened in /post/(get)');
    res.status(500).send(error);
  }
});

postRouter.get('/:id', async (req, res) => {
  const headers = req.headers;
  const query = req.query;
  const body = req.body;

  const imageId = req.params.id;

  try {
    const imageFilePath: string | undefined = (await postService.getById(imageId))?.file_link;

    if (imageFilePath) {
      return res.sendStatus(404);
    }

    return res.status(200).sendFile(imageFilePath);
  } catch (error) {
    console.error('Error happened in /post/:id(get)');
    res.status(500).send(error);
  }
});

export { postRouter };
