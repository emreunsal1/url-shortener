const apiURL = window.location.origin;
const urlInput = document.querySelector("#urlText");
const button = document.querySelector("#button");
const urlsWrapper = document.querySelector("#urls-wrapper");
const urlNameInput = document.querySelector("#urlName");

const createSlugUrl = (slug) => `${apiURL}/${slug}`;

const showList = () => {
  const localStrogeArray = JSON.parse(localStorage.getItem("shortsLink"));

  urlsWrapper.innerHTML = "";
  localStrogeArray.forEach((slug) => {
    const container = document.createElement("div");
    const slugUrlElement = document.createElement("a");
    const button = document.createElement("div");

    container.className = "list-item";
    slugUrlElement.innerHTML = createSlugUrl(slug);
    slugUrlElement.href = createSlugUrl(slug);

    button.innerHTML = "Delete";
    button.className = "delete-button";
    button.id = slug;
    button.onclick = () => {
      const localStrogeArray = JSON.parse(localStorage.getItem("shortsLink"));
      const newList = localStrogeArray.filter((slug) => slug !== button.id);
      localStorage.setItem("shortsLink", JSON.stringify(newList));
      showList();
    };
    container.appendChild();
    container.appendChild(slugUrlElement);
    container.appendChild(button);

    urlsWrapper.appendChild(container);
  });
};
const localAddNewItem = (slug) => {
  const slugArray = JSON.parse(localStorage.getItem("shortsLink"));
  const ifexist = slugArray.find((item) => item === slug);
  !ifexist && slugArray.push(slug);
  localStorage.setItem("shortsLink", JSON.stringify(slugArray));
};

const main = () => {
  if (!localStorage.getItem("shortsLink")) {
    localStorage.setItem("shortsLink", JSON.stringify([]));
  }

  showList();

  button.addEventListener("click", async () => {
    const url = urlInput.value;
    const urlName = urlNameInput.value;
    const body = { url, urlName };
    const response = await fetch(`${apiURL}/api/url`, {
      body: JSON.stringify(body),
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
    });
    const data = await response.json();
    localAddNewItem(data.slug);
    showList();
  });
};
window.addEventListener("load", main);
