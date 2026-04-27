const railContainer = document.getElementById("railContainer");
const railToggle = document.getElementById("railToggle");
const railToggleIcon = document.getElementById("railToggleIcon");
const railHeaderLabel = document.getElementById("railHeaderLabel");
const railGroupText = document.getElementById("railGroupText");
const railItemLabels = document.querySelectorAll(".rail-item-label");
const session = JSON.parse(localStorage.getItem("poComplianceSession") || "{}");
const navAvatar = document.querySelector(".nav-avatar");
const navUserName = document.querySelector(".nav-user-name");
const navUserRole = document.querySelector(".nav-user-role");

if (navAvatar && session.avatar) {
  navAvatar.textContent = session.avatar;
}

if (navUserName && session.userName) {
  navUserName.textContent = session.userName;
}

if (navUserRole && session.roleLabel) {
  navUserRole.textContent = session.roleLabel;
}

if (railToggle) {
  railToggle.addEventListener("click", () => {
    const collapsed = railContainer.classList.toggle("collapsed");
    railToggle.setAttribute("aria-expanded", String(!collapsed));
    railToggle.setAttribute("aria-label", collapsed ? "Expand navigation" : "Collapse navigation");
    railToggleIcon.innerHTML = collapsed ? "&#10095;" : "&#10094;";
    railHeaderLabel.classList.toggle("hidden", collapsed);
    railGroupText.classList.toggle("hidden", collapsed);
    railItemLabels.forEach((label) => label.classList.toggle("hidden", collapsed));
  });
}
