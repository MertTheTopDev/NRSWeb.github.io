function includeHTML() {
  const elements = document.querySelectorAll('[include-html]');
  elements.forEach(el => {
    const file = el.getAttribute('include-html');
    if (file) {
      fetch(file)
        .then(response => {
          if (!response.ok) throw new Error('Network response was not ok');
          return response.text();
        })
        .then(data => {
          el.innerHTML = data;
          el.removeAttribute('include-html');
          includeHTML(); // recursive in case of nested includes
        })
        .catch(err => {
          el.innerHTML = "Error loading file: " + file;
          console.error(err);
        });
    }
  });
}

document.addEventListener("DOMContentLoaded", includeHTML);
