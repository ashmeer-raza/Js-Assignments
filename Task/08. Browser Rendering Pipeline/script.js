const playBtn = document.getElementById("playBtn");

const steps = [
  document.getElementById("step1"),
  document.getElementById("step2"),
  document.getElementById("step3"),
  document.getElementById("step4"),
  document.getElementById("step5"),
  document.getElementById("step6"),
  document.getElementById("step7"),
];

let currentStep = 0;

function showNextStep() {
  if (currentStep > 0) {
    steps[currentStep - 1].classList.remove("active");
    steps[currentStep - 1].classList.add("done");
  }

  if (currentStep < steps.length) {
    steps[currentStep].classList.add("active");
    currentStep++;
    setTimeout(showNextStep, 800);
  } else {
    playBtn.disabled = false;
    playBtn.textContent = "▶ Watch it again";
  }
}

playBtn.addEventListener("click", function () {
  playBtn.disabled = true;
  currentStep = 0;

  steps.forEach(function (box) {
    box.classList.remove("active", "done");
  });

  showNextStep();
});
