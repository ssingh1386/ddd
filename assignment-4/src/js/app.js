/**
 * WEB222 – Assignment 04
 *
 * I declare that this assignment is my own work in accordance with
 * Seneca Academic Policy. No part of this assignment has been
 * copied manually or electronically from any other source
 * (including web sites) or distributed to other students.
 *
 * Please update the following with your information:
 *
 *      Name:       <Simarpreet Singh>
 *      Student ID: <100469238>
 *      Date:       <3/8/2024>
 */

// All of our data is available on the global `window` object.
// Create local variables to work with it in this file.
const { artists, songs } = window;

document.addEventListener("DOMContentLoaded", () => {
    
    let currentArtistIdx = null;

    function displayArtists(menu, btnContainer) {
      artists.forEach((artist, index) => {
        const button = document.createElement("button");
        button.textContent = artist.Name;
        button.addEventListener("click", () => toggleArtistDetails(index, selectedArtistInfo, tbody));
        button.classList.add("artist-button");
        btnContainer.appendChild(button);
      });
      menu.appendChild(btnContainer);
    }
  
    function toggleArtistDetails(artistIndex, selectedArtistInfo, tbody) {
      if (currentArtistIdx === artistIndex) {
        selectedArtistInfo.innerHTML = "";
        tbody.innerHTML = "";
        currentArtistIdx = null;
      } else {
        displayArtistDetails(artistIndex, selectedArtistInfo, tbody);
        currentArtistIdx = artistIndex;
      }
    }
  
    
    function displayArtistDetails(artistIndex, selectedArtistInfo, tbody) {
        tbody.innerHTML = "";
      
        const artist = artists[artistIndex];
        selectedArtistInfo.innerHTML = artist.Name + ' (<a href="' + artist.url[0].url + '" target="_blank">' + artist.url[0].Name + '</a>, <a href="' + artist.url[1].url + '" target="_blank">' + artist.url[1].Name + '</a>)';
      
        songs
          .filter((song) => song.artistID === artist.artistID) 
          .forEach((song) => {
            const tr = document.createElement("tr");
      
            const tdName = document.createElement("td");
            const songLink = document.createElement("a");
            songLink.href = song.url;
            songLink.textContent = song.songName; 
            songLink.target = "_blank";
            tdName.appendChild(songLink);
      
            const tdYear = document.createElement("td");
            tdYear.textContent = song.yearReleased;
      
            const tdDuration = document.createElement("td");
            tdDuration.textContent = Math.floor(song.duration / 60) + ':' + (song.duration % 60).toString().padStart(2, '0');
            
            tr.appendChild(tdName);
            tr.appendChild(tdYear);
            tr.appendChild(tdDuration);
            tbody.appendChild(tr);
          });
      }
      
    
    const menu = document.querySelector("#menu");
    const btnContainer = document.createElement("div");
    const selectedArtistInfo = document.querySelector("#selected-artist");
    const tbody = document.querySelector("#songs");

    displayArtists(menu, btnContainer);
  
    const styles = document.createElement("style");
    styles.textContent = `
      .artist-button {
        background-color: #00008B; 
        color: #ffffff; 
        border-radius: 20px; 
        margin: 6px; 
      }
    
      .artist-button:hover {
        background-color: #000000; 
      }
    `;
    
    document.head.appendChild(styles);
});