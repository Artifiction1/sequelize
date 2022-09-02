import sequelize from "../../db/index.js";
import { DataTypes } from "sequelize";

const cartCategory = sequelize.define("cartCategory", {
  id: {
    primaryKey: true,
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
  },
});

export default cartCategory;
