
var t0Date = new Date();

// Function to fetch and parse JSON data
// async function fetchLaunchData(apiUrl) {
//     try {
//         const response = await fetch(apiUrl);
//         const data = await response.json();
//         return data;
//     } catch (error) {
//         console.error('Error fetching data:', error);
//     }
// }

async function fetchLaunchData(apiUrl) {
    return new Promise((resolve, reject) => {
        fetch(apiUrl)
            .then(response => response.json())
            .then(data => resolve(data))
            .catch(error => {
                console.error('Error fetching data:', error);
                reject(error);
            });
    });
}

function handleTickInit(tick) {
    console.log('Tick initialized:', tick);
    // Initialize the countdown with the new date and time
    Tick.count.down(t0Date).onupdate = function (value) {
        tick.value = value;
    };
}

// URL of the API
const apiUrl = 'https://fdo.rocketlaunch.live/json/launches/next/5';

// Fetch and parse JSON data
fetchLaunchData(apiUrl)
    .then((launchData) => {
        if (launchData.result && launchData.result.length > 0) {
            const t0Value = launchData.result[0].t0;
            t0Date = new Date(t0Value)
            // Now you can use the variable t0Value as needed
            console.log('Next launch at:', t0Date);
        } else {
            console.log('No launch data available.');
        }
        handleTickInit(tick)
    })
    .catch(error => {
        // Handle errors
        console.error('Error:', error);
    });


//fetchLaunchData(apiUrl).then(handleTickInit);




