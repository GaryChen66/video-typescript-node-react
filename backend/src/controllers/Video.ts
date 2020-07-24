import { Request, Response, NextFunction } from 'express';
import APIError from '../utils/APIError';
import httpStatus from 'http-status';
import Video from '../models/Video';

class VideoController {

	public static async list (req: Request, res: Response, next: NextFunction) {
    try {
      const data = await Video.findAll();
      res.json({
        success: true,
        data
      });
    } catch (e) {
      next(new APIError(e.message, httpStatus.INTERNAL_SERVER_ERROR));
    }
  }
  
  public static async get (req: Request, res: Response, next: NextFunction) {
    try {
      const data = await Video.findByPk(req.params.videoId);
      if (!data) {
        return next(
          new APIError('Not Found Video', httpStatus.NOT_FOUND)
        );
      }
      res.json({
        success: true,
        data
      });
    } catch (e) {
      next(new APIError(e.message, httpStatus.INTERNAL_SERVER_ERROR));
    }
	}
}

export default VideoController;
