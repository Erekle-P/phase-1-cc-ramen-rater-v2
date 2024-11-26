const menu = document.querySelector('#ramen-menu');
const detailImg = document.querySelector('.detail-image');
const detailName = document.querySelector('.name');
const detailRestaurant = document.querySelector('.restaurant');
const detailRating = document.querySelector('#rating-display');
const detailComment = document.querySelector('#comment-display');
const ramenForm = document.querySelector('#new-ramen');

// Callback to handle ramen details display
const handleClick = (ramen) => {
  detailImg.src = ramen.image;
  detailName.textContent = ramen.name;
  detailRestaurant.textContent = ramen.restaurant;
  detailRating.textContent = `Rating: ${ramen.rating}`;
  detailComment.textContent = `Comment: ${ramen.comment}`;
};

// Function to display all ramen images
const displayRamens = (ramen) => {
  const img = document.createElement('img');
  img.src = ramen.image;
  img.alt = ramen.name;
  img.addEventListener('click', () => handleClick(ramen));
  menu.appendChild(img);
};

// Attach form submit listener
const addSubmitListener = () => {
  ramenForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const newRamen = {
      name: ramenForm['new-name'].value,
      restaurant: ramenForm['new-restaurant'].value,
      image: ramenForm['new-image'].value,
      rating: ramenForm['new-rating'].value,
      comment: ramenForm['new-comment'].value,
    };

    const img = document.createElement('img');
    img.src = newRamen.image;
    img.alt = newRamen.name;

    img.addEventListener('click', () => handleClick(newRamen));

    menu.appendChild(img);

    ramenForm.reset();
  });
};

// Main function to initialize the program
const main = () => {
  fetch('http://localhost:3000/ramens')
    .then((resp) => resp.json())
    .then((ramenData) => {
      ramenData.forEach((ramen) => displayRamens(ramen));
      handleClick(ramenData[0]);
    });

  addSubmitListener();
};

// Start the program
main();

export { displayRamens, addSubmitListener, handleClick, main };
