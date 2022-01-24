const main = () => {
  const apiURL = "http://" + window.location.host;
  const urlInput = document.querySelector("#urlText");
  const button = document.querySelector("#button");
  const tr = document.querySelector("#tr");
  const table = document.querySelector("#table");

  deleteButton.onclick = async () => {
    await fetch(apiURL + "/delete", {
      body: JSON.stringify(deleteButton.id),
      headers: {
        "content-type": "application/json",
      },
      method: "POST",
    });
  };

  button.addEventListener("click", async () => {
    const url = urlInput.value;
    const body = { url };
    const response = await fetch(`${apiURL}/api/url`, {
      body: JSON.stringify(body),
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
    });

    const data = await response.json();
  });
};
window.addEventListener("load", main);
