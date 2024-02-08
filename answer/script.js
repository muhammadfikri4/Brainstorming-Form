const uri =
  "https://form-clone-30b5d-default-rtdb.firebaseio.com/formsharing.json";
const tableBody = document.querySelector("tbody");

const renderData = (item, index) => {
  return `
      <tr>
            
            <td>${item.email}</td>
            <td>${item.nama}</td>
            <td>${item.nim}</td>
            <td>${item.angkatan}</td>
            <td>${item.ide}</td>
          </tr>
      `;
};

const getData = () => {
  let index = 0;
  let items = "";
  fetch(uri)
    .then((res) => res.json())
    .then((res) => {
      for (const key in res) {
        items += renderData(res[key], index);
        tableBody.innerHTML = items;
        index++;
      }
    });
};

getData();
