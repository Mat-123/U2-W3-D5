const nftId = new URLSearchParams(window.location.search).get("productId");

const URL = nftId
  ? "https://striveschool-api.herokuapp.com/api/product/" + nftId
  : "https://striveschool-api.herokuapp.com/api/product/";
const method = nftId ? "PUT" : "POST";

window.onload = () => {
  const titleAlt = document.getElementById("title-alt");
  const submitBtn = document.querySelector("button[type='submit']");
  const deleteBtn = document.getElementById("deleteBtn");

  if (nftId) {
    titleAlt.innerText = "— Modifica il tuo NFT";
    submitBtn.innerText = "Modifica NFT";
    submitBtn.classList.add("btn-success");
    deleteBtn.classList.remove("d-none");

    fetch(URL)
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          if (response.status === 400) {
            throw new Error("400 - Errore lato client, controlla sintassi e APY authorization");
          }

          if (response.status === 404) {
            throw new Error("404 - Dato non trovato, verifica che il dato richiesto esista.");
          }

          if (response.status === 500) {
            throw new Error("500 - Errore lato server, vai a leggere nelle FAQ della consegna.");
          }

          throw new Error("Errore generico nel reperimento dati");
        }
      })
      .then((nft) => {
        document.getElementById("name").value = nft.name;
        document.getElementById("description").value = nft.description;
        document.getElementById("brand").value = nft.brand;
        document.getElementById("price").value = nft.price;
        document.getElementById("imageUrl").value = nft.imageUrl;
      });
  } else {
    titleAlt.innerText = "— Crea NFT";
    submitBtn.innerText = "Crea NFT";
    submitBtn.classList.add("btn-primary");
  }
};

const handleSubmit = (e) => {
  e.preventDefault();

  const newNft = {
    name: document.getElementById("name").value,
    description: document.getElementById("description").value,
    brand: document.getElementById("brand").value,
    price: document.getElementById("price").value,
    imageUrl: document.getElementById("imageUrl").value,
  };

  fetch(URL, {
    method,
    body: JSON.stringify(newNft),
    headers: {
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWUxYTlhOTRjNTllYzAwMTk5MGQ3NDYiLCJpYXQiOjE3MDkyODc4NTAsImV4cCI6MTcxMDQ5NzQ1MH0.2dEs1ZUQujaVeRo7OKgwkYZXMWxOusac5xHNW-CQTpo",
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        if (response.status === 400) {
          throw new Error("400 - Errore lato client, controlla sintassi e APY authorization");
        }

        if (response.status === 404) {
          throw new Error("404 - Dato non trovato, verifica che il dato richiesto esista.");
        }

        if (response.status === 500) {
          throw new Error("500 - Errore lato server, vai a leggere nelle FAQ della consegna.");
        }

        throw new Error("Errore generico nel reperimento dati");
      }
    })
    .then((newNft) => {
      if (nftId) {
        alert("NFT con id: " + newNft._id + " e' stato modificato con successo.");
      } else {
        alert("NFT con id: " + newNft._id + " e' stato creato con successo.");
        e.target.reset();
      }
    })
    .catch((err) => console.log(err));
};

const handleDelete = () => {
  const confirmed = confirm(
    "Stai per cancellare definitamente l'NFT, questa operazione e' irreversibile, vuoi procedere?"
  );

  if (confirmed) {
    fetch(URL, { method: "DELETE" })
      .then(resp.json())
      .then((deletedNft) => {
        alert("NFT " + deletedNft.name + " e' stato eliminato correttamente");

        window.location.assign("../index.html");
      });
  }
};
