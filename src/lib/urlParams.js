
//https://nako220.ru/testFrame.html?ids%5B%5D=7317230&token=O0ApruzXzguScRieilPQnUOPgGnK0BHHvmNgZzit3_g&type=deals&user_id=76790#
export default function urlParams() {
  const url = new URL(window.location.href);
  let obj = {}
  url.searchParams.forEach((value, name) => {
    obj[name] = value
  })
  obj.origin = window.location.origin
  console.log(obj);
  if (!obj.token) {
    obj.token = 'O0ApruzXzguScRieilPQnUOPgGnK0BHHvmNgZzit3_g';
  }
  //toFile
  obj.id = obj["ids[]"]
  const types = {
    "deals": "Deal",
    "companies": "Company",
    "orders": "Order",
    "contacts": "Contact"
  }
  obj.type = types[obj.type];
  console.log(obj)
  return obj;
}