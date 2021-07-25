const container = document.querySelector('.container');
const seats = document.querySelectorAll('.row .seat:not(.occupied)');
const count = document.getElementById('count');
const total = document.getElementById('total');
const movieSelect = document.getElementById('movie');

populateUI();

//  string type 앞에 + 붙이면 number
//  const는 재할당X let으로 써주기 
let ticketPrice = +movieSelect.value; 

//  Save selected movie index and price
function setMovieData(movieIndex, moviePrice) {
    localStorage.setItem('selectedMovieIndex', movieIndex);
    localStorage.setItem('selectedMoviePrice', moviePrice);
}

// update total and count
function updateSelectedCount() {
    const selectedSeats = document.querySelectorAll('.row .seat.selected');
    // console.log(selectedSeats);  // nodeList 확인

    // 1. Copy selected seats into arr
    // 2. Map through array
    // 3. return a new array indexes
    const seatsIndex = [...selectedSeats].map(seat => [...seats].indexOf(seat));
    // const seatsIndex = [...selectedSeats].map(function(seat) {
    //     return [...seats].indexOf(seat)
    // }) 와 같음.

    localStorage.setItem('selectedSeats', JSON.stringify(seatsIndex));

    const selectedSeatsCount = selectedSeats.length;
    // console.log(selectedSeatsCount); // nodeList.length 확인

    count.innerText = selectedSeatsCount;
    total.innerText = selectedSeatsCount * ticketPrice;
}

// Get data from localstorage and populate UI
// function populateUI() {
//     const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats')
//     );
//     console.log(selectedSeats)
//     if(selectedSeats !== null && selectedSeats.length > 0) {
//         seats.forEach((seat, index) => {
//             if(selectedSeats.indexOf(index) > -1) {

//             }
//         })
//     }
// } 

// Movie select event
movieSelect.addEventListener('change', e => {
    ticketPrice = +e.target.value;
    setMovieData(e.target.selectedIndex, e.target.value);
    updateSelectedCount();
})

// Seat click event
container.addEventListener('click', (e) => {
    if(e.target.classList.contains('seat') && !e.target.classList.contains('occupied')) {
        //console.log(e.target);
        e.target.classList.toggle('selected');

        updateSelectedCount();
    }
})


