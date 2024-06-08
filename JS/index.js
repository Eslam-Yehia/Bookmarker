var siteName = document.getElementById("siteName");
var siteUrl = document.getElementById("siteUrl");
var submitBtn = document.getElementById("submitBtn");
var deleteBtn;
var closeAlertBtn = document.getElementById("closeAlertBtn");
var alertBox = document.querySelector(".alert-box");
var htmlTable = document.getElementById("tableBody");
var sitesData = JSON.parse(localStorage.getItem("sitesData")) || [];
var validateSiteUrl =
  /^(https?:\/\/)?(www\.)\w{3,20}\.com((\/)?\w{0,8}(\/)?)?$/gim;
var validateSiteName = /\w{3,20}$/gim;

alertBox.addEventListener("click", removeAlert);
document
  .querySelector(".alert-box-content")
  .addEventListener("click", function clickOutSide(event) {
    event.stopPropagation();
  });

submitBtn.addEventListener("click", addSite);
closeAlertBtn.addEventListener("click", removeAlert);
siteName.addEventListener("input", function () {
  validate(validateSiteName, siteName);
});
siteUrl.addEventListener("input", function () {
  validate(validateSiteUrl, siteUrl);
});

displaySites();

function showAlert() {
  alertBox.classList.add("d-flex");
  alertBox.classList.remove("d-none");
}
function removeAlert() {
  alertBox.classList.remove("d-flex");
  alertBox.classList.add("d-none");
}

function validate(regex, element) {
  if (element.value.match(regex)) {
    element.classList.add("is-valid");
    element.classList.remove("is-invalid");
    element.nextElementSibling.classList.add("d-none");
    return true;
  } else {
    element.classList.remove("is-valid");
    element.classList.add("is-invalid");
    element.nextElementSibling.classList.remove("d-none");
  }
  if (element.value == "") {
    element.classList.remove("is-valid");
    element.classList.remove("is-invalid");
    element.nextElementSibling.classList.add("d-none");
    return false;
  }
}

function invalid(regex, element) {
  if (element.value.match(regex)) {
    element.classList.add("is-valid");
    element.classList.remove("is-invalid");
    element.nextElementSibling.classList.add("d-none");
    return true;
  }
  {
    element.classList.remove("is-valid");
    element.classList.add("is-invalid");
    element.nextElementSibling.classList.remove("d-none");
    return false;
  }
}

if (sitesData.length > 0) {
  deleteEvent();
}

function deleteEvent() {
  deleteBtn = document.querySelectorAll(".delete");
  for (var i = 0; i < deleteBtn.length; i++) {
    deleteBtn[i].addEventListener("click", deleteSite);
  }
}

function addSite() {
  if (
    validate(validateSiteName, siteName) &&
    validate(validateSiteUrl, siteUrl)
  ) {
    if (
      siteUrl.value.includes("https://") ||
      siteUrl.value.includes("http://")
    ) {
    } else {
      siteUrl.value = "https://" + siteUrl.value;
    }
    var siteData = {
      name: siteName.value,
      url: siteUrl.value,
    };
    sitesData.push(siteData);
    localStorage.setItem("sitesData", JSON.stringify(sitesData));
    displaySite(sitesData.length - 1);
    clearInput();
    deleteEvent();
  } else {
    invalid(validateSiteName, siteName);
    invalid(validateSiteUrl, siteUrl);
    showAlert();
  }
}

function deleteSite(e) {
  sitesData.splice(e.target.id.replaceAll("deleteBtn", ""), 1);
  htmlTable.innerHTML = "";
  localStorage.setItem("sitesData", JSON.stringify(sitesData));
  displaySites();
  deleteEvent();
}

function clearInput() {
  siteName.value = "";
  siteUrl.value = "";
}

function displaySite(i) {
  var htmlContent = `
              <tr>
                <th scope="row" class="align-middle">${i + 1}</th>
                <td class="align-middle">${sitesData[i].name}</td>
                <td>
                  <a href="${
                    sitesData[i].url
                  }" target="_blank" class="btn visit-btn"
                    ><i class="fa-solid fa-eye pe-2"></i> Visit</a
                  >
                </td>
                <td>
                  <button id="deleteBtn${i}" type="button" class="delete btn btn-submit"
                    ><i class="fa-solid fa-trash-can"></i> Delete</button
                  >
                </td>
              </tr>
`;
  htmlTable.innerHTML += htmlContent;
}
function displaySites() {
  for (i = 0; i < sitesData.length; i++) {
    displaySite(i);
  }
}
console.log("hi");
