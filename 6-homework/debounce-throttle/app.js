const debounceElement = document.getElementById('debounce');
const throttleElement = document.getElementById('throttle');
const normalElement = document.getElementById('normal');

function increaseText(element) {
  switch (element) {
    case 'debounce':
      debounceElement.innerText = parseInt(debounceElement.innerText || 0) + 1;
      break;
    case 'throttle':
      throttleElement.innerText = parseInt(throttleElement.innerText || 0) + 1;
      break;
    default:
      normalElement.innerText = parseInt(normalElement.innerText || 0) + 1;
      break;
  }
}

const updateDebounceText = debounce(increaseText);

function debounce(cb, delay = 1000) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      cb(...args);
    }, delay);
  };
}

function throttle(cb, delay = 1000) {
  let wait = false;
  return (...args) => {
    if (wait) return;
    cb(...args);
    wait = true;

    setTimeout(() => {
      wait = false;
    }, delay);
  };
}

const updateThrottleText = throttle(increaseText);

document.addEventListener('mousemove', () => {
  updateThrottleText('throttle');
  updateDebounceText('debounce');
  increaseText();
});
