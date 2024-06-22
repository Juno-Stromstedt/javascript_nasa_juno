// välkommen till min js -- 

// för att hela html - documentet ska hinna ladda innan js-körigång! - lyssnar efter att sidan har laddats in
document.addEventListener('DOMContentLoaded', function() {
    // Här ligger mina const - funkar som variabler
    const bodyRef = document.querySelector('body');
    const spnameInput = document.getElementById('spname');
    const submitBtn = document.getElementById('submit-btn');
    const spacenameDisplay = document.querySelector('#spacename-display');
    const switchBtn = document.querySelector('#switch-btn');
    // och här ligger min api
    const apiSpace = 'https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=1000&api_key=fAfMcWFJtxowR8ItPE4B3f9PYDP3oTVhUiFAr1Gz';
    // const med en arrey om random fakta om mars
    const marsFacts = [
        "Mars is the fourth planet from the Sun.",
        "Mars is known as the Red Planet.",
        "Mars has the largest volcano in the solar system, Olympus Mons.",
        "A year on Mars is 687 Earth days.",
        "Mars has two moons, Phobos and Deimos."
    ];

    // Ladda in och gör om datan från api till json så att js kan läsa datan
    fetch(apiSpace)
        .then(response => response.json())
        .then(data => {
            // console log så man kan se att datan finns
            console.log(data.photos);
            // mer const som sätter variebler på datan
            const rovers = data.photos;
            const spaceCardContainer = document.getElementById('article-containerID');

            // Här är min loop -- arrey
            // fört vad som händer om det finns data i arreyen
            if (rovers.length !== 0) {
                // console.log för att kunna se i inspectorn om det funkat
                console.log('Det finns data :)');
                // const som säger blanda i arreyen
                const shuffledRovers = shuffleArray(rovers);
                // väljer första sakerna i den blandade arreyen
                const selectedRovers = shuffledRovers.slice(0, 4);
                // skapar upp nya cards för vare sak i arreyen
                selectedRovers.forEach(roverData => {
                    // för varje data (sak) ska den skapa upp ett kort
                    console.log(roverData);
                    const newSpCard = createCard(roverData);
                    spaceCardContainer.append(newSpCard);
                });
            } else {
                console.log('Tadaa...Det finns ingen data :(');
                // Medelande som kommer in om det inte finns någon bild -- (vet inte om det vart rätt här)
                spaceCardContainer.textContent = 'No images available from Mars.';
            }
        })
        // log för att kunna hitta felet i console
        .catch(error => console.log(`An error occurred: ${error}`));
        

    // Lägger till lyssnare för toggle-knappen
    switchBtn.addEventListener('click', () => {
        // Byter mellan light och darkmode
        if (bodyRef.classList.contains('dark-mode')) {
            bodyRef.classList.remove('dark-mode');
            bodyRef.classList.add('light-mode');
            console.log('Du har bytt till lightmode :)');
        } else {
            bodyRef.classList.remove('light-mode');
            bodyRef.classList.add('dark-mode');
            console.log('Tillbaka till mörkret :)');
        }
    });

    // lägger till lyssnare för submit-btn-knappen
    submitBtn.addEventListener('click', (event) => {
        // funktionerna som gör att värdet från spnameInput kommer ut som spacenameDispley -- la till random fakta om mars
        event.preventDefault();
        console.log('Submit button clicked');
        console.log(spnameInput.value);
        spacenameDisplay.textContent = `Welcome ${spnameInput.value}. Did you know? ${getRandomFact()}`;
        spnameInput.value = '';
        submitBtn.disabled = true;

        // Här ligger funktionen som gör att man scrollas ned till displey-texten när man klickar på submit
        spacenameDisplay.scrollIntoView({ behavior: 'smooth' });
    });

    // Lägger till lyssnare på spnameImput - där man skriver in sitt namn
    spnameInput.addEventListener('input', function() {
        // här är funtionen som säger att det måste vara mer än 3 tecken
        if (spnameInput.value.length >= 3) {
            submitBtn.disabled = false;
        } else {
            submitBtn.disabled = true;
        }
    });

    // Här ligger fokus -- la inte till för alla knappar/fält i js nu
    spnameInput.addEventListener('focus', function() {
        spnameInput.style.outline = '2px solid #eb8110'; 
    });

    // och här ligger blur
    spnameInput.addEventListener('blur', function() {
        spnameInput.style.outline = 'none'; 
    });

    // Functionen som gör det möjligt att skapa upp ett nytt card
    function createCard(roverData) {
        // console log som visar cardet & berättar om createNew card är aktivt
        console.log(roverData);
        console.log('Det finns nya kort!');
        

        // Här finns mina const som skapar upp html-element till det nya kortet
        const article = document.createElement('article');
        const overlay = document.createElement('div');
        const roverNameDisplay = document.createElement('h3'); 
        const spaceImgDisplay = document.createElement('div');
        const imgTag = document.createElement('img');
        const journeyDates = document.createElement('div');
        const launchDateDisplay = document.createElement('p');
        const landingDateDisplay = document.createElement('p');
        const imgDateBox = document.createElement('div');
        const imageDateDisplay = document.createElement('p');
        const dateContainer = document.createElement('div');

        // Här får jag in bilderna så att de fungrerar
        imgTag.src = roverData.img_src;

        // Lägger till klasser på mina nya element så jag kan styla på den i scss sen
        article.classList.add('space-Card');
        overlay.classList.add('overlay');
        spaceImgDisplay.classList.add('space-img');
        journeyDates.classList.add('journeyDates');
        // bestämmer const för min id
        imgDateBox.id = 'imgDate';
        dateContainer.id = 'date-container';

        // Betsämmer att innehållet (textContent) innehåller data från apin
        roverNameDisplay.textContent = ` ${roverData.rover.name}`;
        launchDateDisplay.textContent = `Lau: ${roverData.rover.launch_date}`;
        landingDateDisplay.textContent = `Lan: ${roverData.rover.landing_date}`;
        imageDateDisplay.textContent = `Img: ${roverData.earth_date}`;

        // kontroll i consoll
        console.log(article);

        // Sorterar in innehållet i låda i låda
        spaceImgDisplay.appendChild(imgTag);
        journeyDates.appendChild(launchDateDisplay);
        journeyDates.appendChild(landingDateDisplay);
        imgDateBox.appendChild(imageDateDisplay);
        dateContainer.appendChild(journeyDates);
        dateContainer.appendChild(imgDateBox);
        overlay.appendChild(roverNameDisplay);
        overlay.appendChild(dateContainer);
        article.appendChild(spaceImgDisplay);
        article.appendChild(overlay);

        // och här skickar det tillbaka kortet 
        return article;
    }

    // Function för att få random fakta om mars
    function getRandomFact() {
        const randomIndex = Math.floor(Math.random() * marsFacts.length);
        return marsFacts[randomIndex];
    }

    // Function som blandar min arrey så den inte får in samma bilder varje gång. -- här fick jag hjälp av chat gtp att lösa det
    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }
});
