import dotenv from "dotenv";
import Airtable from "airtable";

dotenv.config();

const { AIRTABLE_ACCESS_TOKEN, AIRTABLE_BASE_ID, AIRTABLE_TABLE_NAME } =
  process.env;

if (!AIRTABLE_ACCESS_TOKEN || !AIRTABLE_BASE_ID || !AIRTABLE_TABLE_NAME) {
  throw new Error("Missing required environment variables for Airtable.");
}

const base = new Airtable({ apiKey: AIRTABLE_ACCESS_TOKEN }).base(
  AIRTABLE_BASE_ID
);

export async function handler(event, context) {
  try {
    const response = await base(AIRTABLE_TABLE_NAME)
      .select({ maxRecords: 200 })
      .firstPage();

    const products = response.map((product) => {
      const { id, fields } = product;
      const {
        name,
        featured,
        price,
        colors,
        company,
        description,
        category,
        shipping,
        image = [],
      } = fields;

      return {
        id,
        name,
        featured,
        price,
        colors,
        company,
        description,
        category,
        shipping,
        image: image.length > 0 ? image[0].url : null,
      };
    });

    return {
      statusCode: 200,
      body: JSON.stringify(products),
      headers: {
        "Content-Type": "application/json",
      },
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
}
