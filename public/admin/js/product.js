// Change status
const buttonsChangeStatus = document.querySelectorAll("[button-change-status]");
if (buttonsChangeStatus.length > 0) {
  const formChangeStatus = document.querySelector("#form-change-status");
  buttonsChangeStatus.forEach((button) => {
    button.addEventListener("click", () => {
      const statusCurrent = button.getAttribute("data-status");
      const id = button.getAttribute("data-id");
      const path = formChangeStatus.getAttribute("data-path");

      let statusChange = statusCurrent == "active" ? "inactive" : "active";
      const action = path + `/${statusChange}/${id}?_method=PATCH`;
      formChangeStatus.action = action;
      formChangeStatus.submit(); //to submit the form
    });
  });
}
// Alert update messages
const alertCell = document.querySelector("[show-alert]");
const closeButton = document.querySelector("[close-alert]");
if (alertCell) {
  const time = parseInt(alertCell.getAttribute("data-time"));
  setTimeout(() => {
    alertCell.classList.add("alert-hidden");
  }, time);

  closeButton.addEventListener("click", () => {
    alertCell.classList.add("alert-hidden");
  });
}

// End change status

// Delete button
const buttonDelete = document.querySelectorAll("[button-delete]");
if (buttonDelete.length > 0) {
  const formDeleteItem = document.querySelector("#form-delete-item");
  buttonDelete.forEach((button) => {
    button.addEventListener("click", () => {
      const isConfirm = confirm(`Are you sure you want to delete`);
      if (isConfirm) {
        const id = button.getAttribute("data-id");
        path = formDeleteItem.getAttribute("data-path");
        const action = path + `/${id}?_method=DELETE`;
        formDeleteItem.action = action;
        formDeleteItem.submit();
      }
    });
  });
}

// Delete permanently button

const buttonPermanentlyDelete = document.querySelectorAll(
  "[button-delete-permanent-item]"
);
if (buttonPermanentlyDelete.length > 0) {
  const formDeletePermanentItem = document.querySelector(
    "#form-button-permanently-delete"
  );
  buttonPermanentlyDelete.forEach((button) => {
    button.addEventListener("click", () => {
      const confirmRestore = confirm(
        `Are you sure you want to delete permanently`
      );

      if (confirmRestore) {
        const id = button.getAttribute("data-id");
        path = formDeletePermanentItem.getAttribute("data-path");
        const action = path + `/${id}?_method=DELETE`;
        formDeletePermanentItem.action = action;
        console.log(action);
        formDeletePermanentItem.submit();
      }
      // No action needed if not confirmed
    });
  });
}

// Restore button
const buttonRestore = document.querySelectorAll("[button-restore-item]");
if (buttonRestore.length > 0) {
  const formRestoreItem = document.querySelector("#form-button-restore");
  buttonRestore.forEach((button) => {
    button.addEventListener("click", () => {
      const isConfirm = confirm(`Are you sure you want to restore`);

      if (isConfirm) {
        const id = button.getAttribute("data-id");
        path = formRestoreItem.getAttribute("data-path");
        const action = path + `/${id}?_method=PATCH`;
        formRestoreItem.action = action;
        console.log(action);
        formRestoreItem.submit();
      }
    });
  });
}

// Preview img
const imgPreview = document.querySelector("[upload-image-preview]");
const deleteImagePreview = document.querySelector("[deleteImgButton]");
if (deleteImagePreview)
  deleteImagePreview.addEventListener("click", () => {
    imgPreview.src = "";
  });

const uploadImage = document.querySelector("[upload-image]");
if(uploadImage) {
    const uploadImageInput = document.querySelector("[upload-image-input]");
    const uploadImagePreview = document.querySelector("[upload-image-preview]");

    uploadImageInput.addEventListener("change", (e) => {
        const file = e.target.files[0];
        if(file) {
            uploadImagePreview.src = URL.createObjectURL(file)
        }
    })
}