require("dotenv").config();
const Airtable = require("airtable");

const base = new Airtable({ apiKey: process.env.AIRTABLE_ACCESS_TOKEN }).base(
  process.env.AIRTABLE_BASE_ID
);

export async function handler(event) {
  const { id } = event.queryStringParameters;

  if (!id) {
    return {
      statusCode: 400,
      body: "Please provide product id",
    };
  }

  try {
    let product = await base(process.env.AIRTABLE_TABLE_NAME).find(id);

    if (!product || product.error) {
      return {
        statusCode: 404,
        body: `No product with id: ${id}`,
      };
    }

    const formattedProduct = { id: product.id, ...product.fields };

    return {
      statusCode: 200,
      body: JSON.stringify(formattedProduct),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: "Server Error",
    };
  }
}
