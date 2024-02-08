const uri =
  "https://form-clone-30b5d-default-rtdb.firebaseio.com/formsharing.json";
const button = document.querySelector("#button");

// Swal.fire({
//   title: "SELAMAT!",
//   text: "Anda berhasil mendapatkan hadiah!",
//   imageUrl: "assets/1.webp",
//   imageWidth: 250,
//   imageAlt: "Hadiah",
// });

const tambahData = ({ nama, email, nim, ide, angkatan }) => {
  fetch(uri, {
    method: "post",
    body: JSON.stringify({
      email,
      nim,
      nama,
      angkatan,
      ide,
    }),
  })
    .then((res) => {
      document.querySelector("#email").value = "";
      document.querySelector("#nim").value = "";
      document.querySelector("#nama").value = "";
      document.querySelector("#ide").value = "";
      document.querySelector("#angkatan").value = "23";

      fetch(uri)
        .then((res) => res.json())
        .then((res) => {
          let collection = [];
          for (const key in res) {
            collection.push(res[key]);
          }
          if (collection.length === 1) {
            Swal.fire({
              title: "SELAMAT!",
              text: "Anda berhasil mendapatkan hadiah!",
              imageUrl: "assets/1.webp",
              imageWidth: 250,
              imageAlt: "Hadiah",
            });
          } else {
            Swal.fire({
              icon: "success",
              title: "BERHASIL!",
              text: "Berhasil Menginput Form!",
            });
          }
        });
    })
    .catch((err) => alert("Gagal Menginput Data!"));
};

if (button) {
  button.addEventListener("click", function () {
    const email = document.querySelector("#email").value;
    const nim = document.querySelector("#nim").value;
    const nama = document.querySelector("#nama").value;
    const ide = document.querySelector("#ide").value;
    const angkatan = document.querySelector("#angkatan").value;
    if (!email || !nim || !nama || !angkatan || !ide) {
      Swal.fire({
        icon: "error",
        title: "ERROR!",
        text: "Pastikan semua terisi dengan benar!",
      });
      return 0;
    }
    tambahData({ nama, email, nim, angkatan, ide });
  });
}

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
