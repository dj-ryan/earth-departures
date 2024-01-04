
// Function to fetch and parse JSON data
async function fetchLaunchData(apiUrl) {
    try {
      const response = await fetch(apiUrl);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }
  
  // URL of the API
  const apiUrl = 'https://fdo.rocketlaunch.live/json/launches/next/5';
  
  // Fetch and parse JSON data
  fetchLaunchData(apiUrl)
    .then((launchData) => {
        if (launchData.result && launchData.result.length > 0) {
            const t0Value = launchData.result[0].t0;
      
            // Now you can use the variable t0Value as needed
            console.log('Value of "t0":', t0Value);
          } else {
            console.log('No launch data available.');
          }
    });


function handleTickInit(tick) {
	// Get the current date
	var currentDate = new Date();
	// Set the countdown to 3 days from the current date
	var threeDaysLater = new Date(
		currentDate.getFullYear(),
		currentDate.getMonth(),
		currentDate.getDate() + 4
	);
	// Initialize the countdown with the new date and time
	Tick.count.down(threeDaysLater).onupdate = function (value) {
		tick.value = value;
	};
}