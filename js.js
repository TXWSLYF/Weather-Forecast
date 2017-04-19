/**
 * Created by Alex on 2017/4/19.
 */
$(function () {
    function getIp() {
        $.ajax({
            url: '//geoip.nekudo.com/api/<ip address>',
            success: function (data) {
                getWeather(data);
            }
        })
    }

    function getWeather(data) {
        $.ajax({
            url: 'http://v.juhe.cn/weather/ip',
            data: {
                ip: data.ip,
                dtype: 'jsonp',
                key: '56601752273dadc3dfc7413000f5f3e5',
            },
            dataType: 'jsonp',
            success: function (json) {
                var weatherOfNow = $('#weatherOfNow');
                var weatherOfToday = $('#weatherOfToday');
                $.each(json.result.sk, function (key, value) {
                    $('<div>' + '<span>' + key + '：' + '</span>' + '  ' + value + '</div> ').appendTo(weatherOfNow);
                });
                $.each(json.result.today, function (key, value) {
                    if ((key !== 'weather_id') && (key !== 'comfort_index') && (key !== 'drying_index'))
                        $('<div>' + '<span>' + key.replace(/_.+/, '') + '：' + '</span>' + '  ' + value + '</div> ').appendTo(weatherOfToday);
                });
            }
        })
    }

    getIp();
});

// code below can store the ip address to local variable 'localIp'

// window.onload = function () {
//     var localIp;
//     var xhr = new XMLHttpRequest();
//     xhr.onreadystatechange = function () {
//         if (xhr.readyState == 4) {
//             if ((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304) {
//                 localIp = JSON.parse(xhr.response).ip;
//             }
//             else {
//                 alert('失败');
//             }
//         }
//     };
//     xhr.open('get', '//geoip.nekudo.com/api/<ip address>', false);
//     xhr.send(null);
//     console.log(localIp);
// };