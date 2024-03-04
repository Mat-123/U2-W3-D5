fetch("https://striveschool-api.herokuapp.com/api/product/", {
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
  .then((produclist) => {
    const productContainer = document.getElementById("productCard");

    produclist.forEach((nft) => {
      const productCard = document.createElement("div");
      productCard.className = "card col-5 col-md-4 col-lg-3";

      const img = document.createElement("img");
      img.style = "max-height: 150px; object-fit: cover";
      img.className = "my-2";

      const imgUrl = nft.imageUrl;

      img.src = imgUrl;
      img.alt = img.name;

      const cardBody = document.createElement("div");
      cardBody.className = "card-title";

      const nftBodyTitle = document.createElement("h5");
      nftBodyTitle.className = "card-title";

      const nftName = nft.name;

      nftBodyTitle.innerText = nftName;

      const p = document.createElement("p");
      p.className = "card-text";

      const nftPrice = nft.price;

      p.innerText = nftPrice + " ETH";

      const buttonContainer = document.createElement("div");
      buttonContainer.className = "card-body d-flex justify-content-between";

      const moreInfoButton = document.createElement("a");
      moreInfoButton.href = `./product.html?id=${nft._id}`;
      moreInfoButton.className = "btn btn-primary me-auto";
      moreInfoButton.innerText = "Scopri piu info";

      const modifyButton = document.createElement("a");
      modifyButton.href = `./backoffice.html?id=${nft._id}`;
      modifyButton.className = "btn btn-warning";
      modifyButton.innerText = "Modifica";

      cardBody.appendChild(nftBodyTitle);
      cardBody.appendChild(p);
      buttonContainer.appendChild(moreInfoButton);
      buttonContainer.appendChild(modifyButton);
      productCard.appendChild(img);
      productCard.appendChild(cardBody);
      productCard.appendChild(buttonContainer);
      productContainer.appendChild(productCard);
    });
  })
  .catch((error) => console.log(error));
