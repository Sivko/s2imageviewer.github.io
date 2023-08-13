import axios from 'axios';

export async function query({token, type, id}) {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/vnd.api+json'
    }
  };
  console.log(`https://app.salesap.ru/api/v1/documents?filter[entity_type]=${type}&filter[entity_id]=${id}`)
  const files = await axios.get(`https://app.salesap.ru/api/v1/documents?filter[entity_type]=${type}&filter[entity_id]=${id}`, config).catch((e) => console.log(e));

  return files?.data.data;
}

export default query;