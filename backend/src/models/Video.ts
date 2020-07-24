import { DataTypes, Model, ModelDefined, Optional } from 'sequelize';
import Database from '../providers/Database';

const sequelize = Database.sequelize;

// Video Interface
export interface VideoInterface {
  id: number;
  title: string;
  path240: string;
  path480: string;
  path720: string;
  path4k: string;
  thumbnail: string;
}

interface VideoCreationAttributes extends Optional<VideoInterface, "id"> { }
interface VideoModelInstance
  extends Model<VideoInterface, VideoCreationAttributes>,
  VideoCreationAttributes { }

// Sequelize Model
const VideoModel: ModelDefined<VideoInterface, VideoCreationAttributes> = sequelize.define<VideoModelInstance>("Video", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  path240: {
    type: DataTypes.STRING,
    allowNull: false
  },
  path480: {
    type: DataTypes.STRING,
    allowNull: false
  },
  path720: {
    type: DataTypes.STRING,
    allowNull: false
  },
  path4k: {
    type: DataTypes.STRING,
    allowNull: false
  },
  thumbnail: {
    type: DataTypes.STRING,
    allowNull: true
  }
});

export default VideoModel;