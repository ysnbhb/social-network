export default function displayPopup(imageUrl)   {
 
  
  document.body.innerHTML += `
      <div id="popup" class="popup">
          <button id="close-btn" class="close-btn">&times;</button>
          <img src="${imageUrl}" alt="Full Size Image" class="popup-image" />
      </div>
  `;

  const closeButton = document.getElementById("close-btn");
  if (closeButton) {
    closeButton.addEventListener("click", () => {
      const popup = document.getElementById("popup");
      if (popup) {
        popup.remove();
      }
    });
  }
  const popupContainer = document.getElementById("popup");
  if (popupContainer) {
    popupContainer.addEventListener("click", (event) => {
      if (event.target === popupContainer) {
        popupContainer.remove();
      }
    });
  }
};