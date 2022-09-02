import sequelize from "../../db/index.js";
import { DataTypes } from "sequelize";

const Review = sequelize.define("reviews", {
  id: {
    primaryKey: true,
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
  },
  content: {
    type: DataTypes.TEXT,
  },
 
});

export default Review;
