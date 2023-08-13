import query from "./query";
import urlParams from "./urlParams";

export async function getFiles({imagesToggle, includesObjToggle, otherFilesToggle, time}){
  // axios.get('https://app.salesap.ru/api/v1/documents', {})
  const url = urlParams();
  const res = await query({...url})
  return res;
  // return {}
}

export default getFiles;