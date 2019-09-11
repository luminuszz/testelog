$("#charge2").css("display", "block");
setInterval(function() {
    $(document).ready(function() {
        $.ajax({
            url: "http://192.168.8.2/login.fcgi",
            type: "POST",
            contentType: "application/json",
            data: JSON.stringify({
                login: "admin",
                password: "admin"
            }),
            success: function(data) {
                session = data.session;
                console.log(session);
                var token = session;

                $(this).attr("class", "nav-link disabled");
                $.ajax({
                    url:
                        "http://192.168.8.2/load_objects.fcgi?session=" + token,
                    type: "POST",
                    contentType: "application/json",
                    data: JSON.stringify({
                        object: "access_logs",

                        fields: [
                            "user_id",
                            "time",
                            {
                                object: "users",
                                field: "name"
                            },
                            {
                                object: "users",
                                field: "id"
                            }
                        ],

                        order: ["time", "descending"],
                        join: "INNER",

                        limit: 10,
                        order: ["time", "descending"]
                    }),

                    beforeSend: function() {
                        console.log("Carregando....");
                        $("#charge").css("display", "block");
                        $("#info").html("Tempo");
                    },

                    success: function(data) {
                        console.log(data);
                        $("#setUsuario").empty();
                        $("#charge").css("display", "none");
                        arrayLog = data;
                        for (let i = 0; i < arrayLog.access_logs.length; i++) {
                            let userId = arrayLog.access_logs[i].user_id;
                            let timeView = arrayLog.access_logs[i].time;
                            let testeNome =
                                data["access_logs"][i]["users.name"];

                            let date = new Date(timeView * 1000);
                            var hours = date.toJSON("pt-BR");
                            // Minutes part from the timestamp

                            $("#setUsuario")
                                .append(
                                    "<tr>\
                    <td>" +
                                        "</td>\
                    <td>" +
                                        userId +
                                        "</td>\
                    <td>" +
                                        testeNome +
                                        "</td>\
                    <td>" +
                                        hours +
                                        "<br>" +
                                        "</td>\
                      </tr>"
                                )
                                .hide()
                                .fadeIn(400);
                        }
                    }
                });
            }
        });
    });

    $("#pesquisa").on("keyup", function() {
        var value = $(this)
            .val()
            .toLowerCase();
        $("#tabelaPesquisa tr").filter(function() {
            $(this).toggle(
                $(this)
                    .text()
                    .toLowerCase()
                    .indexOf(value) > -1
            );
        });
    });
}, 5000);
$("#charge2").fadeOut(5000);
