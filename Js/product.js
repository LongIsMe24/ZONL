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
