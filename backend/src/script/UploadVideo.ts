const ffmpegPath = require('@ffmpeg-installer/ffmpeg').path;
const ffprobePath = require('@ffprobe-installer/ffprobe').path;
import process from 'process';
import path from 'path';
import fs from 'fs';
import ffmpeg from 'fluent-ffmpeg';
import { v4 as uuid } from 'uuid';
import cliProgress from 'cli-progress';
import Database from '../providers/Database';
import Video from '../models/Video';



class UploadVideo {
  baseName(path: string): string {
    var base = new String(path).substring(path.lastIndexOf('/') + 1);
    return base;
  }

  createThumbnail(sourceFile: string, targetFileName: string): Promise<void> {
    return new Promise((resolve, reject) => {
      ffmpeg(sourceFile)
        .on('end', function() {
          console.log('Completed making thumbnail');
          resolve();
        })
        .screenshots({
          timestamps: ['20%'],
          filename: `${targetFileName}.png`,
          folder: path.join(__dirname, '../../public/thumbnails'),
          size: '320x240'
        });
    });
    
  }

  convertVideo(sourceFile: string, targetFileName: string, size: string): Promise<void> {

    return new Promise((resolve, reject) => {
      const bar = new cliProgress.SingleBar({
        format: `Converting to ${size} file || Speed: {speed} Kbps || Processed Time: {time}`,
        barCompleteChar: '\u2588',
        barIncompleteChar: '\u2591',
        clearOnComplete: true,
        hideCursor: true
      });
  
      bar.start(100, 0);

      ffmpeg(sourceFile)
        .output(path.join(__dirname, '../../public/videos', targetFileName + `-${size}.mp4`))
        .videoCodec('libx264')
        .size(size)
        
        .on('error', function (err) {
          bar.stop();
          console.log('An error occurred: ' + err.message);
          reject();
  
        })
        .on('progress', function (progress) {
          bar.update(progress.percent, {percentage: progress.percent, speed: progress.currentKbps, time: progress.timemark});
        })
        .on('end', function () {
          bar.stop();
          console.log(`Finished converting to ${size} file`);
          resolve();
        })
        .run();
    });
    
  }

  async run(): Promise<void> {
    if (process.argv.length < 3) {
      console.log('Missing upload file');
      return;
    }
    ffmpeg.setFfmpegPath(ffmpegPath);
    ffmpeg.setFfprobePath(ffprobePath);
    const filename = process.argv[2];
    const title = process.argv[3] || this.baseName(filename);
    const newFilename = uuid();
    const resolutions = [
      '320x240',
      '858x480',
      '1280x720',
      '3860x2160'
    ];

    try {
      await Database.sync();
      
      if (!fs.existsSync(filename)) {
        console.log('File does not exist at: ', filename);
        return;
      }

      for (let i = 0; i < resolutions.length; i++) {
        await this.convertVideo(filename, newFilename, resolutions[i]);
      }
      await this.createThumbnail(filename, newFilename);
      await Video.create({
        title: title,
        path240: newFilename + `-320x240.mp4`,
        path480: newFilename + `-858x480.mp4`,
        path720: newFilename + `-1280x720.mp4`,
        path4k: newFilename + `-3860x2160.mp4`,
        thumbnail: newFilename + '.png'
      });

      console.log('Completed uploading file');
    } catch (e) {
      console.log(e);
    }
    
  }
}


const videoUploader = new UploadVideo();

videoUploader.run();
