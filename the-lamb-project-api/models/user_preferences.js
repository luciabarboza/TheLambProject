const xlsx = require("xlsx");
const db = require("../db");
const User = require("./user");
const { BadRequestError } = require("../utils/errors");
// const { json } = require("express");

class User_Preference {
  static async insertData() {
    const file = xlsx.readFile("./user_preferences_table.xlsx");
    const data = [];
  
    const sheetName = file.SheetNames[0];
    const sheet = file.Sheets[sheetName];
    const datalistJsonData = xlsx.utils.sheet_to_json(sheet);
  
    for (let i = 0; i < datalistJsonData.length; i++) {
      const jsonData = datalistJsonData[i];
  
      try {
        const result = await db.query(`
          INSERT INTO users_preference (
            City,
            State,
            Physician,
            Software,
            Teachers,
            Fashion,
            Culinary,
            Social_Work,
            Hobby,
            Hottest_Summer,
            Coldest_Winter,
            Images
          )
          VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
          RETURNING *;
        `, [
          jsonData.City,
          jsonData.State,
          jsonData.Physician,
          jsonData.Software,
          jsonData.Teachers,
          jsonData.Fashion,
          jsonData.Culinary,
          jsonData.Social_Work,
          jsonData.Hobby,
          jsonData.Hottest_Summer,
          jsonData.Coldest_Winter,
          jsonData.Images
        ]);
  
        const row = result.rows[0];
        console.log("row", result.rows[0]);
        data.push(row);
      } catch (err) {
        // Check if the error is due to a duplicate key violation (city already exists)
        if (err.code === '23505') {
          console.error(`Duplicate data for city: ${jsonData.City}. Skipping insertion.`);
        } else {
          // Handle other errors
          console.error('Error while inserting data:', err.message);
        }
      }
    }
  
    return data;
  }
  


  static async gettingData(preferences) {
    const requiredField = ["State", "Hobby", "Industry"];

    requiredField.forEach((field) => {
      if (!preferences.hasOwnProperty(field)) {
        throw new BadRequestError(`Missing ${field} in request body.`);
      }
    });
    const columnName = preferences.Industry;
    const query = `
    SELECT * FROM users_preference 
      WHERE state = $1 OR Hobby = $2 OR ${columnName} = true
      ORDER BY 
        CASE WHEN state = $1 THEN 0 ELSE 1 END, 
          CASE WHEN Hobby = $2 THEN 0 ELSE 1 END;
  
      `;
    const result = await db.query(query, [
      preferences.State,
      preferences.Hobby,
    ]);
    const user = result.rows;
    return user;
  }
}
module.exports = User_Preference;
