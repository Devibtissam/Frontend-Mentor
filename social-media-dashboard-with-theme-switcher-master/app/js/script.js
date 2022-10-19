// By default the color set on prefers-color-scheme, but when the page is reloaded the localStorage has precedence

const toggleBtn = document.querySelector('button[type="button"]');

// set dark mode and store the mode in our localstorage
const setDarkMode = (element) => {
  document.querySelector('body').classList = 'dark';
  element.classList.add('switch-mode');
  localStorage.setItem('colorMode', 'dark');

};
// set light mode and store the mode in our localstorage
const setLightMode = (element) => {
  document.querySelector('body').classList = 'light';
  element.classList.remove('switch-mode');
  localStorage.setItem('colorMode', 'light');
};

// to detect which mode do we have on our device to change the mode when the user click the toggle
const colorModeFromPreferences = () => {
  return window.matchMedia('(prefers-color-scheme: dark)').matches
    ? 'dark'
    : 'light';
};

// get our mode color from localstorage
const colorModeFromLocalStorage = () => {
  return localStorage.getItem('colorMode');
};

// get our checked value of our toggle
const getToggleState = (element) => {
  return element.getAttribute('aria-checked');
};

// adjust our aria-checked depends on our mode
const changeStateTogglePreferences = (element, mode) => {
  if (mode === 'dark') {
    element.setAttribute('aria-checked', false);
  } else {
    element.setAttribute('aria-checked', true);
  }
};

// change our aria-checked when user hit the toggle to change the color mode
const changeStateToggleUser = (element) => {
  const state = element.getAttribute('aria-checked');
  const isState = state === 'true';
  element.setAttribute('aria-checked', isState ? false : true);
};

// the localStorage over the prefers-color-scheme
const refreshAndUpload = (element) => {
  const mode = colorModeFromLocalStorage() || colorModeFromPreferences();
  mode === 'dark' ? setDarkMode(element) : setLightMode(element);
  changeStateTogglePreferences(element, mode);
};

toggleBtn.addEventListener('click', (e) => {
  const element = e.currentTarget;
  const checked = getToggleState(element);
  checked === 'false' ? setLightMode(element) : setDarkMode(element);
  changeStateToggleUser(element);
});

// load the right color Mode
refreshAndUpload(toggleBtn);
