document.addEventListener("DOMContentLoaded", function() {
  const carousel = document.querySelector(".carousel");
  const arrowBtns = document.querySelectorAll(".wrapper i");
  const wrapper = document.querySelector(".wrapper");

  const firstCard = carousel.querySelector(".card");
  const firstCardWidth = firstCard.offsetWidth;

  let isDragging = false,
      startX,
      startScrollLeft,
      timeoutId;

  const dragStart = (e) => { 
      isDragging = true;
      carousel.classList.add("dragging");
      startX = e.pageX;
      startScrollLeft = carousel.scrollLeft;
  };

  const dragging = (e) => {
      if (!isDragging) return;
  
      // Calculate the new scroll position
      const newScrollLeft = startScrollLeft - (e.pageX - startX);
  
      // Check if the new scroll position exceeds 
      // the carousel boundaries
      if (newScrollLeft <= 0 || newScrollLeft >= 
          carousel.scrollWidth - carousel.offsetWidth) {
          
          // If so, prevent further dragging
          isDragging = false;
          return;
      }
  
      // Otherwise, update the scroll position of the carousel
      carousel.scrollLeft = newScrollLeft;
  };

  const dragStop = () => {
      isDragging = false; 
      carousel.classList.remove("dragging");
  };

  const autoPlay = () => {
  
      // Return if window is smaller than 800
      if (window.innerWidth < 800) return; 
      
      // Calculate the total width of all cards
      const totalCardWidth = carousel.scrollWidth;
      
      // Calculate the maximum scroll position
      const maxScrollLeft = totalCardWidth - carousel.offsetWidth;
      
      // If the carousel is at the end, stop autoplay
      if (carousel.scrollLeft >= maxScrollLeft) return;
      
      // Autoplay the carousel after every 2500ms
      timeoutId = setTimeout(() => 
          carousel.scrollLeft += firstCardWidth, 2500);
  };

  carousel.addEventListener("mousedown", dragStart);
  carousel.addEventListener("mousemove", dragging);
  document.addEventListener("mouseup", dragStop);
  wrapper.addEventListener("mouseenter", () => 
      clearTimeout(timeoutId));
  wrapper.addEventListener("mouseleave", autoPlay);

  // Add event listeners for the arrow buttons to 
  // scroll the carousel left and right
  arrowBtns.forEach(btn => {
      btn.addEventListener("click", () => {
          carousel.scrollLeft += btn.id === "left" ? 
              -firstCardWidth : firstCardWidth;
      });
  });
});


$(window).on('scroll', function () {
    if ($(window).scrollTop()) {
        $('nav').addClass('white');
    } else {
        $('nav').removeClass('white');
    }
});




document.addEventListener('DOMContentLoaded', function () {
    const playButton = document.getElementById('playButton');
    const videoPopup = document.getElementById('videoPopup');
    const videoFrame = document.getElementById('videoFrame');
    const closeBtn = document.getElementById('closeBtn');

    playButton.addEventListener('click', function (e) {
        e.preventDefault();
        videoFrame.src = 'https://www.youtube.com/embed/Z4HGQL_McDQ?autoplay=1&mute=1&rel=0';
        videoPopup.classList.add('show');
        document.body.style.overflow = 'hidden';
    });

    closeBtn.addEventListener('click', function () {
        videoPopup.classList.remove('show');
        videoFrame.src = '';
        document.body.style.overflow = 'auto';
    });

    window.addEventListener('click', function (e) {
        if (e.target === videoPopup) {
            videoPopup.classList.remove('show');
            videoFrame.src = '';
            document.body.style.overflow = 'auto';
        }
    });
});