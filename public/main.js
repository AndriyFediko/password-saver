$(".editCardPopUpBg").hide(0);

const ctx = document.getElementById('myChart');

const data = {
    labels: [
        'Red',
        'Blue',
        'Yellow',
        'Green',
    ],
    datasets: [{
        data: [150, 150, 150, 150],
        backgroundColor: [
            'rgb(255, 99, 132)',
            'rgb(54, 162, 235)',
            'rgb(255, 205, 86)',
            'rgb(2, 205, 66)',
        ],
        hoverOffset: 4,
    }],
};
let myChart = new Chart(ctx, {
    type: 'pie',
    data: data
});
