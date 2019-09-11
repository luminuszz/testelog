


$(function () {

    $.ajax({
        url: "http://192.168.8.2/login.fcgi",
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify({
            login: 'admin',
            password: 'admin'
        }),
        success: function (data) {
            session = data.session;
            console.log(session);
            var token = session;


            
        }
    })
})