
var nextLaunch = new Date();

async function fetchLaunchData(apiUrl) {
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}
//setTimeout(handleTickInit, 1000);

const apiUrl = 'https://fdo.rocketlaunch.live/json/launches/next/5';


//https://pqina.nl/flip/


function handleTickInit(tick) {



    // create the countdown counter
    var counter = Tick.count.down('2025-01-01T00:00:00+01:00');

    counter.onupdate = function (value) {
        tick.value = value;
    };

    counter.onended = function () {
        // redirect, uncomment the next line
        // window.location = 'my-location.html'

        // hide counter, uncomment the next line
        // tick.root.style.display = 'none';

        // show message, uncomment the next line
        // document.querySelector('.tick-onended-message').style.display = '';
    };
}

// Fetch and parse JSON data
fetchLaunchData(apiUrl)
    .then((launchData) => {
        if (launchData.result && launchData.result.length > 0) {
            const t0Value = launchData.result[0].t0;

            nextLaunch = new Date(t0Value);

            // Now you can use the variable t0Value as needed
            console.log('Value of "t0":', nextLaunch);
        } else {
            console.log('No launch data available.');
        }
    });
