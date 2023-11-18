var welcomeBanner = document.getElementById("welcomeBanner");

document.addEventListener("DOMContentLoaded", function() {
  if (!localStorage.getItem("visitedBanner")) {
    // Show the banner
    welcomeBanner.style.display = "block";

    // This is so local storage can track when a user has been to the site or not.
    localStorage.setItem("visitedBanner", "true");
  }
});

export function closeBanner() {
  document.getElementById("welcomeBanner").style.display = "none";
}