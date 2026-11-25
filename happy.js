
const PASSCODE = "1983";

let entered = "";

const slots = [...document.querySelectorAll(".slot")];
const error = document.getElementById("error");

function updateSlots() {
  slots.forEach((slot, index) => {
    slot.textContent = entered[index] ? "●" : "";
  });
}

function show(id) {
  document.querySelectorAll(".screen").forEach(screen => {
    screen.classList.remove("active");
  });

  const nextScreen = document.getElementById(id);
  if (nextScreen) nextScreen.classList.add("active");
}

document.getElementById("keypad").addEventListener("click", event => {
  const button = event.target.closest("button");
  if (!button) return;

  if (button.dataset.action === "clear") {
    entered = "";
  } else if (button.dataset.action === "back") {
    entered = entered.slice(0, -1);
  } else if (entered.length < 4) {
    entered += button.textContent.trim();
  }

  updateSlots();
  error.textContent = "";

  if (entered.length === 4) {
    if (entered === PASSCODE) {
      setTimeout(() => show("intro"), 300);
    } else {
      error.textContent = "الرقم غلط، حاول تاني 🖤";
      setTimeout(() => {
        entered = "";
        updateSlots();
        error.textContent = "";
      }, 900);
    }
  }
});

document.querySelectorAll("[data-next]").forEach(button => {
  button.addEventListener("click", () => {
    show(button.dataset.next);
  });
});

function restart() {
  entered = "";
  updateSlots();
  error.textContent = "";
  show("lock");
}



