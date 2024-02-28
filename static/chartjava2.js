//setup all charts assigned to unique constants

//bar chart
const config1 = {
  type: 'bar',
  data: {
    labels: ['EF3', 'EF4', 'EF5'],
    datasets: [{
      label: 'Direct Injuries',
      data: [7600, 6226, 1725],
      backgroundColor: "#32CD32",
      borderWidth: 1,
      borderColor: "#32CD32",
      hoverBorderWidth: 4,
      hoverBorderColor: "dark blue",
    },
    {
        label: 'Direct Deaths',
        data: [603, 495, 312],
        backgroundColor: "blue",
        borderWidth: 1,
        borderColor: "blue",
        hoverBorderWidth: 4,
        hoverBorderColor: "#dark blue",
      }
]
  },
  options: {
    plugins: {
        title: {
            display: true,
            text: "Direct Deaths & Injuries 2000-2023",
            font: {size: 20}
        },
    },
  }
};

//doughnut chart
const config2 = {
  type: 'doughnut',
  data: {
    labels: ['CST-3', 'EST-3', 'MST-3', 'CST-4', 'EST-4', 'CST-5'],
    datasets: [{
      label: 'Count of Tornadoes',
      data: [635, 185, 18, 152, 21, 14],
      backgroundColor: ['#0000FF', '#0000A5', '#191970', '#32CD32', '#41A317', 'red'],
      borderWidth: 4,
      borderColor: 'white',
      hoverBorderWidth: 3,
      hoverBorderColor: "#000"
    }
]
  },
  options: {
    responsive: true,
    plugins: {
        legend: {
            position: 'right',
        },
        title: {
            display: true,
            text: "Count of Tornados by Time Zone and EF Scale",
            font: {size: 20}
        },
    },
  }
};

//line chart
const config3 = {
  type: 'line',
  data: {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [{
      label: 'CST',
      data: [29, 50, 73, 205, 200, 68, 15, 21, 6, 16, 62, 56],
      borderColor: 'red'
    },
    {
    label: 'EST',
    data: [12, 16, 48, 55, 23, 6, 8, 5, 11, 4, 14, 4],
    borderColor: 'lime'     
    },
    {
    label: 'MST',
    data: [0, 0, 1, 0, 2, 8, 4, 1, 0, 2, 0, 0],
    borderColor: 'blue'   
    }
]
  },
  options: {
    responsive: true,
    plugins: {
        legend: {
            position: 'top',
        },
        title: {
            display: true,
            text: "Count of Tornados by Month",
            font: {size: 20}
        },
    },
  }
};

//render initial chart
let myChart = new Chart(document.getElementById('myChart'), config1);

//create function to change chart
function changeChart(chartType) {
  myChart.destroy();

  //create if-then statements to make appropriate charts
  if (chartType.value === 'line')
    myChart = new Chart(document.getElementById('myChart'), config3);
  
  if (chartType.value === 'doughnut')
    myChart = new Chart(document.getElementById('myChart'), config2);

  if (chartType.value === 'bar')
    myChart = new Chart(document.getElementById('myChart'), config1);
}
