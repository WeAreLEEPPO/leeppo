// JS Goes here - ES6 supported

import "./css/main.scss";


// --------------- MOBILE MENU
/*const mobileMenu = document.querySelector("[data-mobile-menu]");
const nav = document.querySelector("[data-nav]");

function toggleMobileMenu() {
  nav.classList.toggle("menu-open");
}

mobileMenu.addEventListener("click", toggleMobileMenu);

*/




// --------------- SINGLE PAGE APPLICATION
function loadPage(nextPageUrl, doesScroll){
  $.ajax({
    url: nextPageUrl,
    dataType: 'html', //this is to avoid jQuery running any <script> tags
    success: function(html) {
      var currentContainer = $('#posts');
      //create a temporary hidden element to attach the created document
      //this is the simplest jQuery way to do this safely.
      var tempDiv = $('<div>').appendTo(document.body).css('display', 'none');
      tempDiv[0].innerHTML = html;
      //find the container element in the new document
      var newContainer = tempDiv.find('#posts');
      //replace the container on the current page with the new one
      currentContainer.replaceWith(newContainer);
      //remove the temporary element
      tempDiv.remove();
      //update the URL bar
      /*if (window.history.pushState)
      {
        window.history.pushState(null, null, nextPageUrl);
      }*/

      // --------------- MASONRY GRID
      var grid = document.querySelector('.grid');
      var msnry;

      imagesLoaded( grid, function() {
        // init Isotope after all images have loaded
        msnry = new Masonry( grid, {
          itemSelector: '.grid-item',
          columnWidth: '.grid-sizer',
          percentPosition: true,
          gutter: 20
        });

        if (doesScroll) document.getElementById("latest").scrollIntoView();
      });


      console.log("Successfully changed page to " + nextPageUrl);
    },
    error: function(xhr, status, error) {
      console.error(xhr, status, error);
      //default to non-JS behaviour and click-through as normal
      //window.location.href = nextPageUrl;
    }
  })
}

// --------------- INFINITE SCROLL
//we will bind an on-click handler for the next page button, but
//handled by the body. This will allow us to replace the button
$('body').off('click').on('click', '.load-more', function(e) {
  e.preventDefault(); //block the link click from changing the page
  //fire off an AJAX request to load the next page
  var nextPageUrl = $(this).prop('href');
  loadPage(nextPageUrl, true);
});


// --- INIT HOME PAGE
if (window.location.pathname == "/future/") loadPage("/posts", false);


// --- LOGO DISAPPEAR ON SCROLL
document.querySelector("main").addEventListener("scroll", (event) => {
  try {
    if (document.querySelector(".grid").getBoundingClientRect().y < 0) document.querySelector("#logo").classList.add("hidden");
    else document.querySelector("#logo").classList.remove("hidden");
  } catch (error) {
    // Nothing to do here
  }
});


// -- LISTEN ON DROPDOWN
document.querySelector("select").addEventListener("change", (event) => {
  loadPage(event.target.value, false);
});