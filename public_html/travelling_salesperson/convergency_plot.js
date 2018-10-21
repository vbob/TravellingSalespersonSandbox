// This file handles the convergency charts

// Main Stats Reference (to be the same height)
var chartDiv = document.getElementById("main_stats");

// Defines size the same as Main Stats Jumbotron
var width_c3 = chartDiv.clientWidth - 60,
  height_c3 = chartDiv.clientHeight - 70 - 60;

// Array for each chart 
var states = {
  'convergency': ['convergency'],
  'distance': ['distance'],
  'processor': ['processor'],
  'memory': ['memory']
}

// Steps array
var steps = ['steps']

// Convergency Plot
var covergency_plot = c3.generate({
  // Container
  bindto: '#covergency_plot',

  // Size
  size: {
    height: height_c3,
    width: width_c3
  },

  // Initial Data
  data: {
    x: 'steps',
    columns: [
      steps,
      states['convergency']
    ]
  },

  // Animation Time
  transition: {
    duration: 0
  },

  // Tooltips
  tooltip: {
    show: false
  },

  // Indicator of Datapoint
  point: {
    show: false
  },

  // User Interaction
  interaction: {
    enabled: false
  }
});

// Distance Plot
var distance_plot = c3.generate({
  bindto: '#distance_plot',
  size: {
    height: height_c3,
    width: width_c3
  },
  data: {
    x: 'steps',
    columns: [
      steps,
      states['distance']
    ]
  },
  transition: {
    duration: 0
  },
  tooltip: {
    show: false
  },
  point: {
    show: false
  },
  interaction: {
    enabled: false
  }
});

// Resources Plot
var resources_plot = c3.generate({
  bindto: '#resources_plot',

  size: {
    height: height_c3,
    width: width_c3
  },
  data: {
    x: 'steps',
    columns: [
      steps,
      states['processor'],
      states['memory']
    ],
    type: 'spline'
  },
  transition: {
    duration: 0
  },
  tooltip: {
    show: false
  },
  point: {
    show: false
  },
  interaction: {
    enabled: false
  },
  axis: {
    y: {
      min: 0,
      // Range includes padding, set 0 if no padding needed
      padding: { top: 15, bottom: 0 }
    }
  }
});

// Plots References
var plots = {
  'convergency': covergency_plot,
  'distance': distance_plot,
  'processor': resources_plot,
  'memory': resources_plot
}

// Plots Array
let plots_array = [covergency_plot, distance_plot, resources_plot]

// Resize plot when window resizes
window.addEventListener('resize', () => {
  width_c3 = chartDiv.clientWidth - 60;
  height_c3 = chartDiv.clientHeight - 70 - 60;

  for (var key in plots) {
    plots[key].resize({ height: height_c3, width: width_c3 })
  }
})

/**
 * Updates all charts according to data array 
 *
 */
function update_charts() {
  console.log(states['processor'])

  for (var key in plots) {
    plots[key].load({
      columns: [

        // Subsample each array
        sample_array(steps, 25),
        sample_average_array(states[key], 25)]
    });
  }
}


/**
 * Subsample array for not plotting all points
 *
 * @param {*} array
 * @param {*} num_of_points
 * @returns
 */
function sample_array(array, num_of_points) {
  let id = array[0]
  let subarray = array.slice(1, array.length)

  interval = Math.ceil(array.length / num_of_points)

  let sample;

  sample = subarray.filter((element, i) => {
    return i % interval == 0
  })


  sample.unshift(id)

  return sample
}

/**
 * Subsample-average array for not plotting all points
 *
 * @param {*} array
 * @param {*} num_of_points
 * @returns
 */
function sample_average_array(array, num_of_points) {
  let id = array[0]
  let subarray = array.slice(1, array.length)

  interval = Math.ceil(array.length / num_of_points)

  let sample = [];

  let temp = 0;

  array.forEach((element, i) => {
    temp += element

    if (i % interval == 0) {
      if (Number((temp / interval).toFixed(0)))
        sample.push(Number((temp / interval).toFixed(0)))
      temp = 0
    }
  });


  sample.unshift(id)

  return sample
}