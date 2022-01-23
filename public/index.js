const main = () => {
  const apiURL = window.location.host;
  const urlInput = document.querySelector("#urlText");
  const button = document.querySelector("#button");
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
    console.log(data);
  });
};
window.addEventListener("load", main);
