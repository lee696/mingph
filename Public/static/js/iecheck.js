//判断浏览器是否为ie10以下
if (navigator.appName == "Microsoft Internet Explorer" && parseInt(navigator.appVersion.split(";")[1].replace(/[ ]/g, "").replace("MSIE", "")) < 10) {
    window.onmousewheel = document.onmousewheel = function () {
        return false;
    }
    document.body.style.overflow = 'hidden';
    var warning = document.getElementById("iewarningBox");
    var warning_cont = document.getElementById("iewarningCont");
    warning.style.display = "block";
    warning_cont.style.display = "block";
}