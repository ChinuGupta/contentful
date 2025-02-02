import { createClient } from "contentful";


const client = createClient({
  space: process.env.REACT_APP_CONTENTFUL_SPACE_ID,
  accessToken: process.env.REACT_APP_CONTENTFUL_ACCESS_TOKEN
});

export const fetchContent = async (contentType) => {
  try {
    const response = await client.getEntries({ content_type: contentType });
    return response.items;
  } catch (error) {
    console.error("Error fetching content: ", error);
    return [];
  }
};
