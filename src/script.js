import "./style.css";
import Desktop from "./desktop";

const desktop = new Desktop();
desktop.activateEvents();
/* import DragSelect from "dragselect";
import Resume from "../static/resume/Joan_CV.pdf";
import Experience from "./experience";
import AboutMe from "./about-me";
import Credits from "./credits";
import Contact from "./contact";

const experience = new Experience();
const aboutMe = new AboutMe();
const credits = new Credits();
const contact = new Contact();

experience.activateEvents();
aboutMe.activateEvents();
credits.activateEvents();
contact.activateEvents();

const ds = new DragSelect({
  selectables: document.querySelectorAll(".apps"),
  callback: (e) => console.log(e),
});
const footer = document.getElementById("footer");
footer.addEventListener("mousedown", () => {
  if (!ds.stopped) {
    ds.stop();
  }
});
const windowsIcon = document.getElementById("windows-icon-section");
windowsIcon.addEventListener("click", () => {
  openMenu();
});
const windowsMenu = document.querySelector(".open-windows-menu");
const openMenu = () => {
  if (windowsMenu.getAttribute("style") == null) {
    windowsMenu.setAttribute(
      "style",
      "display: flex; transition: all 0.2s ease-in"
    );
  } else {
    windowsMenu.removeAttribute("style");
  }
};
document.addEventListener("mousedown", function (event) {
  if (!event.target.closest(".open-windows-menu")) {
    windowsMenu.removeAttribute("style");
  }
});
const titleBar = document.querySelectorAll(".title-bar");
// Variables para almacenar las coordenadas iniciales del mouse y la ventana
let initialMouseX, initialMouseY, initialWindowX, initialWindowY;
let element;
let maxZIndex = 10;
// Función para comenzar el arrastre
function startDrag(event) {
  if (!ds?.stopped) {
    ds.stop();
  }
  element = event.srcElement.parentElement;
  incrementMaxZIndex(element);
  initialMouseX = event.clientX;
  initialMouseY = event.clientY;
  initialWindowX = parseFloat(window.getComputedStyle(element).left);
  initialWindowY = parseFloat(window.getComputedStyle(element).top);

  document.addEventListener("mousemove", drag);
  document.addEventListener("mouseup", stopDrag);
}
function incrementMaxZIndex(element) {
  if (!element.id) {
    return;
  }
  const bottomApps = document.querySelectorAll(".taskbar-app");
  bottomApps.forEach((bottomApp) => {
    if (bottomApp.classList.contains("taskbar-selected")) {
      bottomApp.classList.remove("taskbar-selected");
    }
  });
  const currentBottomApp = document.getElementById(element.id + "_bottom");
  currentBottomApp.classList.add("taskbar-selected");
  element.style.zIndex = maxZIndex + 1;
  ++maxZIndex;
}
const windowWidth = window.innerWidth;
const windowHeight = window.innerHeight;

console.log("Width of the window:", windowWidth);
console.log("Height of the window:", windowHeight);
// Función para arrastrar la ventana
function drag(event) {
  if (element.style.width == "100vw") {
    return;
  }
  let mouseY = event.clientY;
  if (event.clientY < 0) {
    mouseY = 0;
  } else if (event.clientY > window.innerHeight - 50) {
    mouseY = window.innerHeight - 50;
  }
  let mouseX = event.clientX;
  if (event.clientX < 0) {
    mouseX = 0;
  } else if (event.clientX > window.innerWidth) {
    mouseX = window.innerWidth;
  }
  const deltaX = mouseX - initialMouseX;
  const deltaY = mouseY - initialMouseY;
  console.log(event.clientX, event.clientY);
  element.style.left = initialWindowX + deltaX + "px";
  element.style.top = initialWindowY + deltaY + "px";
}

// Función para detener el arrastre
function stopDrag() {
  if (ds.stopped) {
    ds.start();
  }
  document.removeEventListener("mousemove", drag);
  document.removeEventListener("mouseup", stopDrag);
}

// Agregar el evento de arrastre a la barra de título
titleBar.forEach((title_bar) => {
  title_bar.addEventListener("mousedown", startDrag);
  title_bar.addEventListener("dblclick", () => {
    const minimizeButton = title_bar.querySelector(".minimize");
    resizeWindow(title_bar.parentElement, minimizeButton);
  });
});
function getCurrentDateTime() {
  const now = new Date();
  const options = {
    year: "numeric",
    month: "numeric",
    day: "numeric",
  };
  const formattedDate = now.toLocaleDateString(undefined, options);
  const hours = now.getHours().toString().padStart(2, "0");
  const minutes = now.getMinutes().toString().padStart(2, "0");
  return { formattedDate, hours, minutes };
}

// Función para actualizar la fecha y hora en el HTML
function updateDateTime() {
  const { formattedDate, hours, minutes } = getCurrentDateTime();
  document.getElementById("current-date").textContent = formattedDate;
  document.getElementById("hours-minutes").textContent = `${hours}:${minutes}`;
}

// Actualiza la fecha y hora cada segundo
setInterval(updateDateTime, 1000);

// Llama a la función para establecer la fecha y hora inicial
updateDateTime();
document.addEventListener("mouseup", (event) => {
  if (ds.stopped) {
    ds.start();
  }
});
const apps = document.querySelectorAll(".apps");
apps.forEach((app) => {
  app.addEventListener("dblclick", () => {
    const appName = app.id.replace("_app", "");
    if (appName == "resume") {
      window.open(Resume);
    } else if (appName == "project") {
      window.parent.postMessage("Mensaje desde el iframe", "*");
    } else {
      openWindow(appName);
    }
  });
});
const bottomApps = document.querySelectorAll(".taskbar-app");
bottomApps.forEach((bottomApp) => {
  bottomApp.addEventListener("click", () => {
    const appName = bottomApp.id.replace("_bottom", "");
    openWindow(appName);
  });
});
function openWindow(appName) {
  const window = document.getElementById(appName);
  window.style.display = "block";
  const bottomApp = document.getElementById(appName + "_bottom");
  bottomApp.classList.add("taskbar-opened");
  incrementMaxZIndex(window);
  window.addEventListener("mousedown", (event) => {
    if (!ds.stopped) {
      ds.stop();
    }
    if (
      !event.srcElement.classList.contains("close") &&
      !event.srcElement.classList.contains("restore")
    ) {
      incrementMaxZIndex(window);
    }
  });
}
const minimizeButtons = document.querySelectorAll(".minimize");
minimizeButtons.forEach((minimizeButton) => {
  minimizeButton.addEventListener("click", () => {
    const currentWindow =
      minimizeButton.parentElement.parentElement.parentElement;
    resizeWindow(currentWindow, minimizeButton);
  });
});

const closeButtons = document.querySelectorAll(".close");
closeButtons.forEach((closeButton) => {
  closeButton.addEventListener("click", () => {
    const currentWindow = closeButton.parentElement.parentElement.parentElement;
    currentWindow.removeAttribute("style");
    let content;
    if (currentWindow.id == "contact") {
      content = currentWindow.querySelector(".content-light");
    } else {
      content = currentWindow.querySelector(".content");
    }
    if (currentWindow.id == "experience") {
      const timelines = currentWindow.querySelectorAll(".timeline");
      timelines.forEach((timeline) => {
        timeline.style.display = "none";
      });

      const companyLogos = currentWindow.querySelectorAll(".company-logo");
      companyLogos.forEach((companyLogo) => {
        if (companyLogo.classList.contains("company-logo-selected")) {
          companyLogo.classList.remove("company-logo-selected");
        }
      });
    }
    content.scrollTo(0, 0);
    currentWindow.style.display = "none";
    const bottomApp = document.getElementById(currentWindow.id + "_bottom");
    if (bottomApp.classList.contains("taskbar-opened")) {
      bottomApp.classList.remove("taskbar-opened");
    }
    if (bottomApp.classList.contains("taskbar-selected")) {
      bottomApp.classList.remove("taskbar-selected");
    }
  });
});

const restoreButtons = document.querySelectorAll(".restore");
restoreButtons.forEach((restore) => {
  restore.addEventListener("click", () => {
    const currentWindow = restore.parentElement.parentElement.parentElement;
    currentWindow.style.display = "none";
    const bottomApp = document.getElementById(currentWindow.id + "_bottom");
    if (bottomApp.classList.contains("taskbar-selected")) {
      bottomApp.classList.remove("taskbar-selected");
    }
  });
});

function resizeWindow(window, minimizeButton) {
  incrementMaxZIndex(window);
  if (window.style.width !== "100vw") {
    minimizeButton.classList.add("minimize-full");
    maximizeWindow(window);
  } else {
    if (minimizeButton.classList.contains("minimize-full")) {
      minimizeButton.classList.remove("minimize-full");
    }
    minimizeWindow(window);
  }
}

function maximizeWindow(currentWindow) {
  const currentWindowID = currentWindow.id;
  let offset = 105;
  if (currentWindowID == "experience") {
    offset = 95;
  } else if (currentWindowID == "about-me") {
    offset = 175;
  }
  currentWindow.style.width = "100vw";
  currentWindow.style.height = "calc(100vh - " + offset + "px)";
  currentWindow.style.top = "calc(calc(100vh - " + offset + "px)/2)";
  currentWindow.style.left = "calc(100vw /2)";
}

function minimizeWindow(currentWindow) {
  const currentWindowID = currentWindow.id;
  let offset = 80;
  if (currentWindowID == "credits" || currentWindowID == "about-me") {
    offset = 60;
  }
  currentWindow.style.width = offset + "vw";
  currentWindow.style.height = offset + "vh";
}
 */
