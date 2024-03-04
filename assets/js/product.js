const params = new URLSearchParams(window.location.search);

const nftId = params.get("id");

const URL = "https://striveschool-api.herokuapp.com/api/product/" + nftId;

window.onload = () => {
  fetch(URL, {
    headers: {
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWUxYTlhOTRjNTllYzAwMTk5MGQ3NDYiLCJpYXQiOjE3MDkyODc4NTAsImV4cCI6MTcxMDQ5NzQ1MH0.2dEs1ZUQujaVeRo7OKgwkYZXMWxOusac5xHNW-CQTpo",
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
    .then((nft) => {
      const container = document.getElementById("nft-details");
      const containerImg = document.getElementById("nft-image");

      const titleNft = document.createElement("h1");
      titleNft.className = "display-5 mt-2";
      titleNft.innerText = nft.name;

      const nftDescription = document.createElement("p");
      nftDescription.className = "fs-5";
      nftDescription.innerText = nft.description;

      const nftBrandTag = document.createElement("span");
      nftBrandTag.className = "mb-4 d-inline";
      nftBrandTag.innerText = "Brand: ";

      const nftBrand = document.createElement("div");
      nftBrand.className = "mb-4 d-inline";
      nftBrand.innerText = nft.brand;

      const br = document.createElement("br");

      const nftPriceTag = document.createElement("span");
      nftPriceTag.className = "mb-4 d-inline";
      nftPriceTag.innerText = "Price: ";

      const nftPrice = document.createElement("div");
      nftPrice.className = "badge text-bg-success d-inline-block mb-4";
      nftPrice.innerText = nft.price ? nft.price + "€" : "Free";

      const nftImg = document.createElement("img");
      nftImg.style.maxWidth = "300px";
      nftImg.className = "d-block img-fluid";
      nftImg.src = nft.imageUrl;

      const dateNft = document.createElement("p");
      dateNft.className = "fs-6 mt-2";
      dateNft.innerText = "Created: " + nft.createdAt;

      const btnModify = document.createElement("button");
      btnModify.className = "btn btn-warning mt-3";
      btnModify.onclick = "handleBtnClick()";
      btnModify.innerText = "Modifica NFT";

      container.appendChild(titleNft);
      container.appendChild(nftDescription);
      container.appendChild(nftBrandTag);
      container.appendChild(nftBrand);
      container.appendChild(br);
      container.appendChild(nftPriceTag);
      container.appendChild(nftPrice);
      containerImg.appendChild(nftImg);
      container.appendChild(dateNft);
      container.appendChild(btnModify);
    })
    .catch((err) => console.log(err));
};

const handleBtnClick = () => {
  window.location.assign("./backoffice.html?id=" + id);
};
