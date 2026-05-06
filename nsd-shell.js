(function () {
    function setCollapsedState(isCollapsed) {
        const railContainer = document.getElementById("rail-container");
        const railHeader = document.querySelector(".rail-header");
        const railHeaderLabel = document.querySelector(".rail-header-label");
        const collapseIcon = document.querySelector(".collapse-icon");
        const groupHeaders = document.querySelectorAll(".group-header");
        const groupHeaderLabels = document.querySelectorAll(".group-header-label");
        const groupChevrons = document.querySelectorAll(".group-chevron");
        const groupItems = document.querySelectorAll(".group-items");
        const navItems = document.querySelectorAll(".nav-item");
        const navItemLabels = document.querySelectorAll(".nav-item-label");

        railContainer.classList.toggle("collapsed", isCollapsed);
        if (railHeader) {
            railHeader.classList.toggle("collapsed", isCollapsed);
        }
        if (railHeaderLabel) {
            railHeaderLabel.classList.toggle("hidden", isCollapsed);
        }
        if (collapseIcon) {
            collapseIcon.classList.toggle("rotated", isCollapsed);
        }

        groupHeaders.forEach(function (header) {
            header.classList.toggle("collapsed", isCollapsed);
            header.dataset.tooltip = isCollapsed ? header.dataset.label : "";
        });

        groupHeaderLabels.forEach(function (label) {
            label.classList.toggle("hidden", isCollapsed);
        });

        groupChevrons.forEach(function (chevron) {
            chevron.classList.toggle("hidden", isCollapsed);
        });

        groupItems.forEach(function (items) {
            items.classList.toggle("collapsed", isCollapsed);
        });

        navItems.forEach(function (item) {
            item.classList.toggle("collapsed", isCollapsed);
            item.dataset.tooltip = isCollapsed ? item.dataset.label : "";
        });

        navItemLabels.forEach(function (label) {
            label.classList.toggle("hidden", isCollapsed);
        });
    }

    function toggleOverlay(targetName) {
        const overlays = {
            env: document.getElementById("env-panel"),
            notifications: document.getElementById("notification-panel"),
            user: document.getElementById("user-dropdown")
        };

        Object.keys(overlays).forEach(function (key) {
            const overlay = overlays[key];
            if (!overlay) {
                return;
            }
            const shouldOpen = key === targetName && overlay.classList.contains("d-none");
            overlay.classList.toggle("d-none", !shouldOpen);
        });
    }

    function closeAllOverlays() {
        ["env-panel", "notification-panel", "user-dropdown"].forEach(function (id) {
            const el = document.getElementById(id);
            if (el) {
                el.classList.add("d-none");
            }
        });
    }

    function applyEnvironment(selected) {
        const envName = document.getElementById("nav-env-name");
        const envItems = document.querySelectorAll(".env-item");
        if (envName) {
            envName.textContent = selected;
        }
        envItems.forEach(function (item) {
            item.classList.toggle("d-none", item.dataset.env === selected);
        });
    }

    function onReady() {
        const collapseButton = document.querySelector(".collapse-button");
        const groupHeaders = document.querySelectorAll(".group-header");
        const envTrigger = document.getElementById("env-trigger");
        const notificationTrigger = document.getElementById("notification-trigger");
        const userTrigger = document.getElementById("user-trigger");
        const envClose = document.getElementById("env-close");
        const resetData = document.getElementById("reset-data");
        const envItems = document.querySelectorAll(".env-item");
        const selectedEnvironment = localStorage.getItem("selectedEnvironment") || "CLaaS2SaaS default";
        const isCollapsed = localStorage.getItem("sidebarCollapsed") === "true";

        setCollapsedState(isCollapsed);
        applyEnvironment(selectedEnvironment);

        if (collapseButton) {
            collapseButton.addEventListener("click", function () {
                const nextState = !document.getElementById("rail-container").classList.contains("collapsed");
                setCollapsedState(nextState);
                localStorage.setItem("sidebarCollapsed", String(nextState));
            });
        }

        groupHeaders.forEach(function (header) {
            const wrapper = header.nextElementSibling;
            const chevron = header.querySelector(".group-chevron");
            const expanded = header.getAttribute("aria-expanded") !== "false";
            if (wrapper) {
                wrapper.style.maxHeight = expanded ? "500px" : "0px";
            }
            if (chevron) {
                chevron.classList.toggle("expanded", expanded);
                chevron.classList.toggle("group-collapsed", !expanded);
            }

            header.addEventListener("click", function () {
                const isOpen = header.getAttribute("aria-expanded") !== "false";
                header.setAttribute("aria-expanded", String(!isOpen));
                if (wrapper) {
                    wrapper.style.maxHeight = isOpen ? "0px" : "500px";
                }
                if (chevron) {
                    chevron.classList.toggle("expanded", !isOpen);
                    chevron.classList.toggle("group-collapsed", isOpen);
                }
            });
        });

        if (envTrigger) {
            envTrigger.addEventListener("click", function (event) {
                event.stopPropagation();
                toggleOverlay("env");
            });
        }

        if (notificationTrigger) {
            notificationTrigger.addEventListener("click", function (event) {
                event.stopPropagation();
                toggleOverlay("notifications");
            });
        }

        if (userTrigger) {
            userTrigger.addEventListener("click", function (event) {
                event.stopPropagation();
                toggleOverlay("user");
            });
        }

        if (envClose) {
            envClose.addEventListener("click", closeAllOverlays);
        }

        if (resetData) {
            resetData.addEventListener("click", function () {
                window.location.reload();
            });
        }

        envItems.forEach(function (item) {
            item.addEventListener("click", function () {
                const nextEnvironment = item.dataset.env;
                localStorage.setItem("selectedEnvironment", nextEnvironment);
                applyEnvironment(nextEnvironment);
                closeAllOverlays();
            });
        });

        setTimeout(function () {
            document.addEventListener("click", function (event) {
                const navRight = document.querySelector(".nav-right");
                const envPanel = document.getElementById("env-panel");
                if (navRight && navRight.contains(event.target)) {
                    return;
                }
                if (envPanel && envPanel.contains(event.target)) {
                    return;
                }
                closeAllOverlays();
            });
        }, 10);
    }

    document.addEventListener("DOMContentLoaded", onReady);
}());
