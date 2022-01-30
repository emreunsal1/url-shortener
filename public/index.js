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
    const button = document.createElement("div");

    container.className = "list-item";
    urlElement.innerHTML = slug.url;
    urlElement.className = "old-url";
    urlElement.href = slug.url;
    slugUrlElement.innerHTML = createSlugUrl(slug);
    slugUrlElement.href = createSlugUrl(slug);

    button.innerHTML = "Delete";
    button.className = "delete-button";
    button.id = slug;
    button.onclick = () => {
      const localStrogeArray = JSON.parse(localStorage.getItem("shortsLink"));
      const newList = localStrogeArray.filter((_slug) => _slug !== button.id);
      localStorage.setItem("shortsLink", JSON.stringify(newList));
      showList();
    };
    container.appendChild(urlElement);

    container.appendChild(slugUrlElement);
    container.appendChild(button);

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
    addSlugToLocalStroge(data.slug);
    showList();
  });
};
window.addEventListener("load", main);
