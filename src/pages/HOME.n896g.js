$w.onReady(function () {
    automaticTime();
});

function automaticTime() {
    const today = new Date();

    const day = today.getDate();
    const monthNames = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
    const month = monthNames[today.getMonth()];
    const year = today.getFullYear();

    const suffix =
        day % 10 === 1 && day !== 11 ? "st" :
        day % 10 === 2 && day !== 12 ? "nd" :
        day % 10 === 3 && day !== 13 ? "rd" : "th";

    const finalDate = `${day}${suffix} ${month} ${year}`;
    $w("#currentDate").text = finalDate;

    // 24-hour time
    const h = today.getHours().toString().padStart(2, "0");
    const m = today.getMinutes().toString().padStart(2, "0");
    const s = today.getSeconds().toString().padStart(2, "0");

    const period = today.getHours() >= 12 ? "PM" : "AM";

    const time = `${h}:${m}:${s} ${period}`;
    $w("#currentTime").text = time;

    setTimeout(automaticTime, 1000);
}





