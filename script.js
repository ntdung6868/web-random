const numberElements = [...document.querySelectorAll("[data-number]")];
const generateButton = document.querySelector("#generate-button");
const numberList = document.querySelector("#number-list");

function secureRandomInt(maxExclusive) {
  const maxUint32 = 0x100000000;
  const limit = maxUint32 - (maxUint32 % maxExclusive);
  const values = new Uint32Array(1);

  do {
    crypto.getRandomValues(values);
  } while (values[0] >= limit);

  return values[0] % maxExclusive;
}

function createNumberSet() {
  const availableNumbers = Array.from({ length: 55 }, (_, index) => index + 1);

  for (let index = availableNumbers.length - 1; index > 0; index -= 1) {
    const randomIndex = secureRandomInt(index + 1);
    [availableNumbers[index], availableNumbers[randomIndex]] = [
      availableNumbers[randomIndex],
      availableNumbers[index],
    ];
  }

  return availableNumbers.slice(0, 5).sort((a, b) => a - b);
}

function renderNumbers(numbers) {
  numberElements.forEach((element) => element.classList.remove("is-new"));

  requestAnimationFrame(() => {
    numberElements.forEach((element, index) => {
      element.textContent = String(numbers[index]).padStart(2, "0");
      window.setTimeout(() => element.classList.add("is-new"), index * 65);
    });
  });

  numberList.setAttribute(
    "aria-label",
    `Kết quả: ${numbers.map((number) => String(number).padStart(2, "0")).join(", ")}`,
  );

  window.setTimeout(() => {
    numberElements.forEach((element) => element.classList.remove("is-new"));
  }, 1100);
}

generateButton.addEventListener("click", () => {
  renderNumbers(createNumberSet());
});
