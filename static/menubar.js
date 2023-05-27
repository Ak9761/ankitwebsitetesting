var checkbox = document.getElementById('click');
var element = document.getElementById('element');
var navbar = document.querySelector('nav');

checkbox.addEventListener('change', function() {
  if (this.checked) {
    // Add fixed position class to navbar
    navbar.classList.add('fixed-navbar');
    document.body.style.overflow = 'hidden'; // Disable scrolling
  } else {
    // Remove fixed position class from navbar
    navbar.classList.remove('fixed-navbar');
    document.body.style.overflow = ''; // Enable scrolling
  }
});


document.addEventListener('DOMContentLoaded', () => {
  var typed = new Typed('#element', {
    strings: ['WEB DEVELOPER', 'WEB DESIGNER'], // Add your desired text strings here
    typeSpeed: 100, // Speed of typing in milliseconds
    backSpeed: 50, // Speed of backspacing in milliseconds
    loop: true // Set to true if you want the typing effect to loop
  });
});
