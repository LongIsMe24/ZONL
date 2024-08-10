let list = document.querySelector(".slider .list");
let items = document.querySelectorAll(".slider .list .item");
let next = document.getElementById("next");
let prev = document.getElementById("prev");
let dots = document.querySelectorAll(".slider .dots li");

let lengthItems = items.length - 1;
let width;
console.log(width);
let active = 0;
next.addEventListener("click", () => {
    width = items[0].childNodes[1].clientWidth;
    active = active + 1 <= lengthItems ? active + 1 : 0;
    reloadSlider();
});
prev.addEventListener("click", () => {
    width = items[0].childNodes[1].clientWidth;
    active = active - 1 >= 0 ? active - 1 : lengthItems;
    reloadSlider();
});

let refreshInterval = setInterval(() => {
    active = active + 1 <= lengthItems ? active + 1 : 0;
    reloadSlider();
}, 3000);
function reloadSlider() {
    list.style.transform = `translateX(-${width * active}px)`;
    console.log(width * active);
    let last_active_dot = document.querySelector(".slider .dots li.active");
    last_active_dot.classList.remove("active");
    dots[active].classList.add("active");

    clearInterval(refreshInterval);
    refreshInterval = setInterval(() => {
        next.click();
    }, 3000);
}

dots.forEach((li, key) => {
    li.addEventListener("click", () => {
        active = key;
        reloadSlider();
    });
});
window.onresize = function (event) {
    reloadSlider();
};

//login
function validateForm() {
    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;

    // Kiểm tra xem tên tài khoản và mật khẩu có hợp lệ hay không
    if (username == "" || password == "") {
        alert("Vui lòng nhập tên tài khoản và mật khẩu");
        return false;
    } else {
        localStorage.setItem("username", username);
        localStorage.setItem("password", password);
        window.location.href = "index.html";
        succesfuly();
        return true;
    }
}

function succesfuly() {
    alert("Đăng nhập thành công");
    location.href = "index.html";
}
//register
function validateForm() {
    let ho = document.forms["register-form"]["ho"].value;
    let ten = document.forms["register-form"]["ten"].value;
    let email = document.forms["register-form"]["email"].value;
    let username = document.forms["register-form"]["username"].value;
    let password = document.forms["register-form"]["password"].value;
    let confirmPassword =
        document.forms["register-form"]["confirm-password"].value;

    if (ho == "") {
        alert("Vui lòng nhập họ của bạn!");
        return false;
    }
    if (ten == "") {
        alert("Vui lòng nhập tên của bạn!");
        return false;
    }
    if (email == "") {
        alert("Vui lòng nhập địa chỉ email của bạn!");
        return false;
    }
    if (username == "") {
        alert("Vui lòng nhập tên đăng nhập của bạn!");
        return false;
    }
    if (password == "") {
        alert("Vui lòng nhập mật khẩu của bạn!");
        return false;
    }
    if (confirmPassword == "") {
        alert("Vui lòng xác nhận mật khẩu của bạn!");
        return false;
    }
    if (password != confirmPassword) {
        alert("Mật khẩu xác nhận không trùng khớp!");
        return false;
    } else {
        window.location.href = "login.html";
        login_move();
        return true;
    }
}

function login_move() {
    const result = confirm(
        "Đăng kí thành công, bạn có muốn chuyển đến trang đăng nhập ?"
    );
    if (result) {
        location.href = "D:StudyClollegeWEB1043ParaStorelogin.html";
    } else {
        return;
    }
}
//product
document.getElementById("showcart").style.display = "block";
var giohang = new Array();
function themvaogiohang(x) {
    var boxsp = x.parentElement.children;
    var hinh = boxsp[0].src;
    var tensp = boxsp[1].children[0].innerText;
    var giasp = boxsp[2].innerText;
    var soluong = parseInt(boxsp[3].value);
    var sp = new Array(hinh, tensp, giasp, soluong);

    var kt = 0;
    for (let i = 0; i < giohang.length; i++) {
        if (giohang[i][1] === tensp) {
            kt = 1;
            soluong += parseInt(giohang[i][3]);
            giohang[i][3] = soluong;
            break;
        }
    }
    if (kt == 0) {
        giohang.push(sp);
    }

    sessionStorage.setItem("giohang", JSON.stringify(giohang));
}

function showmycart() {
    var ttgh = "";
    var tong = 0;
    for (var i = 0; i < giohang.length; i++) {
        var tt = parseFloat(giohang[i][2]) * parseFloat(giohang[i][3]);
        var tong = tong + tt;
        ttgh +=
            "<tr>" +
            "<td>" +
            (i + 1) +
            "</td>" +
            "<td>" +
            '<img src="' +
            giohang[i][0] +
            '" alt="" />' +
            "</td>" +
            "<td>" +
            giohang[i][1] +
            "</td>" +
            "<td>" +
            giohang[i][2] +
            "</td>" +
            "<td>" +
            giohang[i][3] +
            "</td>" +
            "<td>" +
            tt +
            ".000đ" +
            "</td>" +
            "<td>" +
            '<button onclick="xoasp(this)">Xoa</button>' +
            "</td>" +
            "</tr>";
    }
    ttgh +=
        "<tr>" +
        '<th colspan="6">Tổng đơn hàng</th>' +
        "<th><div>" +
        tong +
        ".000đ" +
        "</div></th>" +
        "</tr>";
    document.getElementById("mycart").innerHTML = ttgh;
}

function xoasp(x) {
    var tr = x.parentElement.parentElement;
    var tensp = tr.children[2].innerText;
    tr.remove();
    for (var i = 0; i < giohang.length; i++) {
        if (giohang[i][1] === tensp) {
            giohang.splice(i, 1);
        }
    }
    showmycart();
}

function xoatatca() {
    giohang = [];
    showmycart();
}
function showcart(event) {
    event.preventDefault();
    var x = document.getElementById("showcart");
    if (x.style.display === "block") {
        x.style.display = "none";
    } else {
        x.style.display = "block";
    }
    showmycart();
}

function showgiohang_trangthanhtoan() {
    var gh = sessionStorage.getItem("giohang");
    if (gh) {
        giohang = JSON.parse(gh);
    }
    showmycart();
}
document.addEventListener("DOMContentLoaded", function (event) {
    showcart(event); // Gọi hàm showcart() ngay sau khi DOM được tải
});

function dongydathang() {
    var ttnh = document.getElementById("thongtinnhanhang").children;
    var hoten = ttnh[0].children[1].children[0].value;
    var diachi = ttnh[1].children[1].children[0].value;
    var dienthoai = ttnh[2].children[1].children[0].value;
    var email = ttnh[3].children[1].children[0].value;

    var nguoinhan = new Array(hoten, diachi, dienthoai, email);

    console.log(nguoinhan);
    sessionStorage.setItem("nguoinhan", JSON.stringify(nguoinhan));
    window.location.assign("donhang.html");
    if (hoten === "" || diachi === "" || dienthoai === "" || email === "") {
        alert("Vui lòng nhập đầy đủ thông tin.");
        return false; // Ngăn không cho thực hiện đặt hàng nếu thiếu thông tin
    }
}
function showthongtinnguoinhan() {
    var nguoinhan = sessionStorage.getItem("nguoinhan");
    var thongtin = JSON.parse(nguoinhan);
    var tt =
        "<tr>" +
        '<td><label for="hoTen">Họ tên: </label></td>' +
        "<td>" +
        thongtin[0] +
        "</td>" +
        "</tr>" +
        "<tr>" +
        '<td><label for="diaChi">Địa chỉ: </label></td>' +
        "<td>" +
        thongtin[1] +
        "</td>" +
        "</tr> " +
        "<tr> " +
        '<td><label for="dienThoai">Điện thoại: </label></td> ' +
        "<td>" +
        "" +
        thongtin[2] +
        "" +
        "</td>" +
        "</tr> " +
        "<tr> " +
        '<td><label for="email">Email: </label></td>' +
        "<td>" +
        thongtin[3] +
        "</td>" +
        "</tr> ";
    document.getElementById("thongtinnhanhang").innerHTML = tt;
}
