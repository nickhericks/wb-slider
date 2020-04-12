function Slider(slider) {
  if (!(slider instanceof Element)) {
    throw new Error("No slider passed in");
  }

  // create some variables for working with slider
  let prev;
  let current;
  let next;

  // select the elements needed for the slider
  const slides = slider.querySelector(".slides");
  const prevButton = slider.querySelector(".goToPrev");
  const nextButton = slider.querySelector(".goToNext");

  
  function startSlider() {
    current = slider.querySelector('.current') || slides.firstElementChild;
    prev = current.previousElementSibling || slides.lastElementChild;
    next = current.nextElementSibling || slides.firstElementChild;
    console.log(current);
    console.log(prev);
    console.log(next);
  }


  function applyClasses() {
    current.classList.add('current');
    prev.classList.add('prev');
    next.classList.add('next');
  }


  function move(direction) {
    // first strip all classes from the current slides
    const classesToRemove = ['prev', 'current', 'next'];
    // [prev, current, next].forEach(el => el.classList.remove(...classesToRemove));
    prev.classList.remove(...classesToRemove);
    current.classList.remove(...classesToRemove);
    next.classList.remove(...classesToRemove);

    if(direction === 'back') {
      // make a new array of the new values, and destructure them over and into the prev, current and next variables
      [prev, current, next] = [
        // get the prev slide, if there is none, get the last slide from the entire slider for wrapping
        prev.previousElementSibling || slides.lastElementChild,
        prev,
        current,
      ];
    } else {
      [prev, current, next] = [
        current,
        next,
        next.nextElementSibling || slides.firstElementChild,
      ];
    }
    applyClasses();
  }


  // When this slider is created, run the startSlider function
  startSlider();
  applyClasses();


  // event listeners
  // If you need to pass an argument to a function, then you need to run an arrow function, if you don't need to pass an argument then you can just pass a reference to the function
  prevButton.addEventListener('click', () => move('back'));
  nextButton.addEventListener('click', move);
}


const mySlider = Slider(document.querySelector(".slider"));
const dogSlider = Slider(document.querySelector(".dog-slider"));