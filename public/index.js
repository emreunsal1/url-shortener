const apiURL = window.location.origin;
const urlInput = document.querySelector("#urlText");
const button = document.querySelector("#button");
const urlsWrapper = document.querySelector("#urls-wrapper");
const urlNameInput = document.querySelector("#urlName");

const createSlugUrl = (slug) => `${apiURL}/${slug.slug}`;

const validateUrl = (url) => {
  const exp =
    /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi;
  const regex = new RegExp(exp);
  return regex.test(url);
};

const getLocalStrogeInfo = async () => {
  console.log("çalıştı");
  const localItems = JSON.parse(localStorage.getItem("shortsLink")).join(",");
  let url = apiURL + "/api/url";
  url += "?slugs=" + localItems;
  const response = await fetch(url);
  const slugData = await response.json();
  return slugData;
};

const showList = async () => {
  const localData = await getLocalStrogeInfo();

  urlsWrapper.innerHTML = "";
  localData.forEach((slug) => {
    const container = document.createElement("div");
    const urlElement = document.createElement("a");
    const slugUrlElement = document.createElement("a");
    const deleteButtonElement = document.createElement("div");
    const copiedButtonElement = document.createElement("div");
    const slugContainer = document.createElement("div");

    container.className = "list-item";

    urlElement.innerHTML = slug.url;
    urlElement.className = "old-url";
    urlElement.href = slug.url;

    slugUrlElement.innerHTML = createSlugUrl(slug);
    slugUrlElement.href = createSlugUrl(slug);
    slugUrlElement.className = "slug-link";

    copiedButtonElement.className = "copied-button";
    copiedButtonElement.innerHTML = `<div class="image-container"> <img src="https://img.icons8.com/fluency/48/000000/copy.png"/> </div>`;
    copiedButtonElement.onclick = () => {
      navigator.clipboard.writeText(slugUrlElement.href);
      copiedButtonElement.innerHTML = `<div class="image-container"><img src="https://img.icons8.com/office/30/4a90e2/checked-checkbox--v1.png"/></div>`;
      setTimeout(() => {
        copiedButtonElement.innerHTML = `<div class="image-container"> <img src="https://img.icons8.com/fluency/48/000000/copy.png"/> </div>`;
      }, 3000);
    };

    slugContainer.className = "slug-url-container";

    deleteButtonElement.innerHTML = `<div class="image-container"> <img src="https://img.icons8.com/fluency/48/000000/filled-trash.png"/></div>`;
    deleteButtonElement.className = "delete-button";
    deleteButtonElement.id = slug.slug;
    deleteButtonElement.onclick = () => {
      const localStrogeArray = JSON.parse(localStorage.getItem("shortsLink"));
      const newList = localStrogeArray.filter(
        (_slug) => _slug !== deleteButtonElement.id
      );
      localStorage.setItem("shortsLink", JSON.stringify(newList));
      getLocalStrogeInfo();
      showList();
    };
    slugContainer.appendChild(slugUrlElement);
    slugContainer.appendChild(copiedButtonElement);
    container.appendChild(urlElement);
    container.appendChild(slugContainer);
    container.appendChild(deleteButtonElement);
    urlsWrapper.appendChild(container);
  });
};
const addSlugToLocalStroge = (slug) => {
  const slugArray = JSON.parse(localStorage.getItem("shortsLink"));
  const exists = slugArray.find((item) => item === slug);
  if (!exists) {
    slugArray.push(slug);
  }
  localStorage.setItem("shortsLink", JSON.stringify(slugArray));
};

const main = () => {
  if (!localStorage.getItem("shortsLink")) {
    localStorage.setItem("shortsLink", JSON.stringify([]));
  }

  showList();

  button.addEventListener("click", async () => {
    const url = urlInput.value;
    const isUrlValid = validateUrl(url);
    if (!isUrlValid) {
      urlInput.classList.add("error");
      return;
    }
    if (urlInput.classList.contains("error")) {
      urlInput.classList.remove("error");
    }

    const body = { url };
    const response = await fetch(`${apiURL}/api/url`, {
      body: JSON.stringify(body),
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
    });
    const data = await response.json();
    const qr = document.querySelector("#qr-img");
    const dowlandElement = document.querySelector("#dowlandQrCode");
    dowlandElement.href = data.qr;
    dowlandElement.innerHTML = `<img src="https://img.icons8.com/fluency/48/000000/download.png"/>`;
    qr.src = data.qr;
    addSlugToLocalStroge(data._doc.slug);

    showList();
  });
};
window.addEventListener("load", main);
