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


let i = 0;
$("#signInForm").hide(0);
$("#swichForm").click(() => {
    i++;
    if (i % 2 == 0) {
        $("#swichForm").text("Sign up");
        $("#registerForm").show(0);
        $("#signInForm").hide(0);
    } else {
        $("#swichForm").text("Sign in");
        $("#registerForm").hide(0);
        $("#signInForm").show(0);
    }
});

function generatePassword() {
    let password = "";

    const upperCase = "ABCDEFGHIGKLMNOPQRSTUVWXYZ";
    const lowerCase = "absdefghigklmnopqrstuvwxyz";
    const numbers = "0123456789";
    const symbols = "@#%^&()_+~|[]></-=";
    const passwordLength = 12;

    while (password.length < passwordLength) {
        password += upperCase[Math.floor(Math.random() * upperCase.length)];
        password += lowerCase[Math.floor(Math.random() * lowerCase.length)];
        password += numbers[Math.floor(Math.random() * numbers.length)];
        password += symbols[Math.floor(Math.random() * symbols.length)];
    }

    return password;
}

function hidePassword(password) {
    let hidenPassword = "";
    for (let i = 0; i < password.length; i++) {
        hidenPassword += "*";
    }
    return hidenPassword;
}

$("#generatePassword").click(() => {
    $("#userPassword").val(generatePassword());
});

$("#generateServicePassword").click(() => {
    $("#servicePassword").val(generatePassword());
});

$(".edit").click(() => {
    $(".editCardPopUpBg").show(0);
});

$("#closeEditPage").click(() => {
    $(".editCardPopUpBg").hide(0);
});

let servicesData = [{
    serviceName: "YouTube",
    servicePassword: "Tf0[Ah0%Ne2=",
}, ];

$(".visible").hide(0);

$(".setVisibility").click((e) => {
    let closestCard = e.target.closest(".serviceCard");
    let closestCardId = (closestCard.id).slice(1);
    $(`#c${closestCardId} .servicePassword`).toggleClass("servicePasswordVisible");
    if ($(`#c${closestCardId} .servicePassword`).hasClass("servicePasswordVisible")) {
        $(`#c${closestCardId} .hiden`).hide(0);
        $(`#c${closestCardId} .visible`).show(0);
        $(`#c${closestCardId} .servicePassword`).text(servicesData[closestCardId].servicePassword);
    } else {
        $(`#c${closestCardId} .hiden`).show(0);
        $(`#c${closestCardId} .visible`).hide(0);
        $(`#c${closestCardId} .servicePassword`).text(hidePassword(servicesData[closestCardId].servicePassword));
    }
});

new ClipboardJS('.copy');
$(".copyAlert").hide(0);
$(".copy").click(() => {
    $(".copyAlert").slideDown(200);
    setTimeout(() => {
        $(".copyAlert").slideUp(200);
    }, 2000)
});

let randomColor = Math.floor(Math.random() * 16777215).toString(16);
$(".avatar").css("background-color", "#" + randomColor);

$("#logOutBtn").click(() => {
    window.location.href = "/";
});


$("#registerForm").submit((event) => {
    event.preventDefault();

    const formData = new FormData(registerForm);
    const userLogin = formData.get("userLogin");
    const userPassword = formData.get("userPassword");
    let userServices = [];
    const data = {
        userLogin,
        userPassword,
        userServices,
    }
    console.log(data)
    axios.post("/addUser", data)
        .then((response) => {
            console.log(response.data);
            alert("saved")
            window.location.href = "/home";
        })
        .catch((err) => {
            console.log("Error" + err);
            alert("Error" + err);
        })
});

$("#signInForm").submit((event) => {
    event.preventDefault();
});