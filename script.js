document.addEventListener("DOMContentLoaded", function() {
    getProfiles();
    
    document.getElementById("search-input").addEventListener("input", function() {
      filterByName();
    });
    
    document.getElementById("load-more").addEventListener("click", function() {
      loadMoreProfiles();
    });
  });
  
  var profiles = [];
  var displayCount = 12;
  
  function getProfiles() {
    fetch("https://randomuser.me/api/?results=80")
      .then(function(response) {
        return response.json();
      })
      .then(function(data) {
        profiles = data.results;
        displayProfiles();
      })
      .catch(function(error) {
        console.error("Error when loading profiles:", error);
      });
  }
  
  function displayProfiles() {
    var gallery = document.getElementById("gallery");
    gallery.innerHTML = "";
    
    var template = document.getElementById("card-template").getElementsByClassName("profile-card")[0];
    
    for (var i = 0; i < displayCount && i < profiles.length; i++) {
      var profile = profiles[i];
      
      var profileCard = template.cloneNode(true);
      
      profileCard.dataset.name = profile.name.first.toLowerCase() + " " + profile.name.last.toLowerCase();
      
      profileCard.querySelector(".profile-img").src = profile.picture.large;
      profileCard.querySelector(".profile-name").textContent = profile.name.first + " " + profile.name.last;
      profileCard.querySelector(".profile-country").textContent = profile.location.country;
      profileCard.querySelector(".profile-city").textContent = profile.location.city;
      profileCard.querySelector(".profile-email").textContent = "Email: " + profile.email;
      profileCard.querySelector(".profile-phone").textContent = "Phone: " + profile.phone;
      
      var contactButton = profileCard.querySelector(".contact-button");
      contactButton.onclick = function() {
        var info = this.nextElementSibling;
        if (info.style.display === "none") {
          info.style.display = "block";
        } else {
          info.style.display = "none";
        }
      };
      
      gallery.appendChild(profileCard);
    }
    
    var loadMoreButton = document.getElementById("load-more");
    if (displayCount >= profiles.length) {
      loadMoreButton.style.display = "none";
    } else {
      loadMoreButton.style.display = "block";
    }
  }
  
  function loadMoreProfiles() {
    displayCount = displayCount + 12;
    displayProfiles();
  }
  
  function filterByName() {
    var searchInput = document.getElementById("search-input").value.toLowerCase();
    var cards = document.querySelectorAll(".profile-card");
    
    for (var i = 0; i < cards.length; i++) {
      var profileCard = cards[i];
      var name = profileCard.dataset.name;
      
      if (name.includes(searchInput)) {
        profileCard.style.display = "block";
      } else {
        profileCard.style.display = "none";
      }
    }
  }