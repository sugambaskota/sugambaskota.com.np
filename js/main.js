document.addEventListener('DOMContentLoaded', () => {
  const switchElement = document.querySelector('.switch');
  const containerElement = document.querySelector('.container');

  switchElement.addEventListener('click', () => {
    if (switchElement.classList.contains('on')) {
      switchElement.classList.remove('on');
      containerElement.classList.remove('night');
    } else {
      switchElement.classList.add('on');
      containerElement.classList.add('night');
    }
  });
});
