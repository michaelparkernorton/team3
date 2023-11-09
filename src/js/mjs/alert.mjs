export function Func() {
  let urlOfJsonFile = "../json/alerts.json";
  fetch(urlOfJsonFile)
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      const alertsContainer = document.querySelector("main");

      data.forEach((item) => {
        const alertDiv = document.createElement("div");
        alertDiv.classList.add("alert");
        alertDiv.textContent = item.message;
        alertDiv.style.backgroundColor = item.color;

        alertsContainer.prepend(alertDiv);
      });
    });
}
