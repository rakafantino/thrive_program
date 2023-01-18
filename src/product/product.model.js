import { DataTypes } from "sequelize";
import { newSeq } from "../configs/database.js";

const Product = newSeq.define("product", {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    }, 
    weight: {
        type: DataTypes.FLOAT,
    },
    userID:{
        type: DataTypes.INTEGER,
        references: {
            model: 'users', // 'users' refers to table name
            key: 'id', // 'id' refers to column name in users table
        }
    }
});

newSeq.sync().then(() => {
    console.log('Product table created successfully!');
}).catch((error) => {
    console.error('Unable to create table : ', error);
});
 
export default Product