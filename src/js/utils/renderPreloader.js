const preloader = document.querySelector('.preloader');

export default function renderPreloader(isLoading) {
  if (isLoading) {
    preloader.classList.remove('hide');
  }
  else if (!isLoading) {
    preloader.classList.add('hide');
  }
};