const params = new URLSearchParams(window.location.search);

const nftId = params.get("productId");

const URL = "https://striveschool-api.herokuapp.com/api/product/" + nftId;

window.onload = () => {
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
      const container = document.getElementById("nft-details");

      container.innerHTML = `
        <h1 class="display-5">${nft.name}</h1>
        <p class="lead">${nft.description}</p>
        <span class="badge text-bg-primary d-inline-block mb-4">${nft.price ? nft.price + "ETH" : "gratis"}</span>
        <h6 class="bg-light ps-2 py-3">Server Details</h6>
        <ul class="list-group list-group-flush">
            <li class="list-group-item ps-2"><strong>id:</strong> ${nft._id}</li>
            <li class="list-group-item ps-2"><strong>createdBy:</strong> ${nft._id}</li>
            <li class="list-group-item ps-2"><strong>createdAt:</strong> ${nft.createdAt}</li>
            <li class="list-group-item ps-2"><strong>updatedAt:</strong> ${nft.updatedAt}</li>
        </ul>
        <button class="btn btn-success mt-3" onclick="handleBtnClick()">Modifica NFT</button>
        `;
    })
    .catch((err) => console.log(err));
};

const handleBtnClick = () => {
  window.location.assign("./backoffice.html?nftId=" + nftId);
};
