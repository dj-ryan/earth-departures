
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


}

// Fetch and parse JSON data
fetchLaunchData(apiUrl)
    .then((launchData) => {
        if (launchData.result && launchData.result.length > 0) {
            const t0Value = launchData.result[0].t0;

            nextLaunch = new Date(t0Value);

            // Now you can use the variable t0Value as needed
            console.log('Value of "t0":', nextLaunch);


            var element = document.querySelector('#myCounter');
            Tick.DOM.create(element, {
                //value: 1000,

                view:
                // definition for top level tick element
                {
                    children: [
                        // presenter object
                        {
                            root: 'div',
                            repeater: true,
                            layout: 'horizontal center fit',
                            'data-transform': 'preset(d, h, m, s) -> delay',
                            
                            //transform: 'preset(d, h, m, s)',
                            children: [
                                // presenter object
                                {
                                    root: 'div',
                                    class: 'tick-group',
                                    children: [
                                        // presenter object
                                        {
                                            root: 'div',
                                            key: 'value',
                                            repeater: true,
                                            transform: 'pad(00) -> split -> delay',
                                            children: [
                                                // presenter object
                                                {
                                                    root: 'span',
                                                    view: 'flip'
                                                }
                                            ]
                                        },
                                        // presenter object
                                        {
                                            root: 'span',
                                            key: 'label',
                                            view: 'text',
                                            class: 'tick-label'
                                        }
                                    ]
                                },
                            ]
                        }
                    ]
                },

                didInit: function (tick) {
                    // create the countdown counter
                    var counter = Tick.count.down(nextLaunch);

                    counter.onupdate = function (value) {
                        tick.value = value;
                    };

                }
            });

        } else {
            console.log('No launch data available.');
        }
    });



