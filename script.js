const Pexels = "https://api.pexels.com/v1/search?query=";
const myKey = "ydKpYAyA8Ok50ZcIC1efJFvVC6xh7AVtzpJ2Tb3I02tHzW9aFB2tOqSh";

const visualizzaCards = function (photos) {
  let row = document.querySelector(".album .container .row");
  row.innerHTML = "";
  photos.forEach((photo) => {
    let colTemplate = `
    <div class="col-md-4">
        <div class="card mb-4 shadow-sm">
        <a href="./pexels-details.html?photoId=${photo.id}">
            <img src=${photo.src.small}} style="width: 100%" />
        </a>
            <div class="card-body">
            <a href="./pexels-details.html?photoId=${photo.id}">
                <h5 class="card-title">Lorem Ipsum</h5>
            </a>
                <p class="card-text">
                This is a wider card with supporting text below as a natural
                lead-in to additional content. This content is a little bit
                longer.
                </p>
                <div
                class="d-flex justify-content-between align-items-center"
                >
                <div class="btn-group">
                    <button
                        type="button"
                        class="btn btn-sm btn-outline-secondary"
                        data-bs-toggle="modal"
                        data-bs-target="#exampleModal"
                        onclick="fillImageInModal(this)"
                    >
                        View
                    </button>
                    <button
                    type="button"
                    class="btn btn-sm btn-outline-secondary"
                    onclick="hideColumn(this)"
                    >
                    Hide
                    </button>
                </div>
                <small class="text-muted">${photo.id}</small>
                </div>
            </div>
        </div>
    </div>
    `;
    row.innerHTML += colTemplate;
  });
};

const getImages = function (query) {
  fetch(Pexels + query, {
    headers: {
      authorization: myKey,
    },
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        throw new Error("Error getting the images");
      }
    })
    .then((data) => {
      console.log(data);
      visualizzaCards(data.photos);
    })
    .catch((err) => {
      console.log(err);
    });
};

window.onload = function () {
  let primaryButton = document.querySelector(".btn-primary");
  primaryButton.addEventListener("click", () => {
    getImages("sea");
  });

  let secondaryButton = document.querySelector(".btn-secondary");
  secondaryButton.addEventListener("click", () => {
    getImages("city");
  });

  let customInputField = document.querySelector(".input-group .form-control");
  let customSearchButton = document.querySelector(
    ".input-group .btn-outline-secondary"
  );
  customSearchButton.addEventListener("click", () => {
    getImages(customInputField.value);
  });
};
