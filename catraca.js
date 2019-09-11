// Variaveis globais

$(function () {

    var arrayUsers;
    var arrayLog;

    $.ajax({
        url: "http://192.168.8.2/login.fcgi",
        type: "POST",
        contentType: "application/json",
        data: JSON.stringify({
            login: "admin",
            password: "admin"
        }),
        success: function (data) {
            session = data.session;
            console.log(session);
            var token = session;

            $.ajax({
                url: "http://192.168.8.2/load_objects.fcgi?session=" + token,
                type: "POST",
                contentType: "application/json",
                data: JSON.stringify({
                    object: "users",
                    join: "INNER",
                    fields: ["name", "id", "begin_time", "end_time",

                        {
                            object: 'groups',
                            field: 'name'


                        }
                    ],
                    
                }),
                beforeSend: function() {
                    console.log("Carregando....");
                    $("#charge").css("display", "block");
                    $("#info").html("Tempo");
                },

                success: function (data) {
                    $("#charge").css("display", "none");
                    arrayUsers = data;
                    console.log(arrayUsers.users);
                    $(document).ready(function () {
                        $(this).attr("class", "nav-link  disabled");
                        for (let i = 0; i < arrayUsers.users.length; i++) {
                            const setId = arrayUsers.users[i].id;
                            let setName = arrayUsers.users[i].name;
                            let setRegistro = arrayUsers.users[i].registration;
                            let empresa = data["users"][i]["groups.name"];

                            $("#setUsuario")
                                .append(
                                    "<tr ><td>" + i + "</td><td class='teste'>" + setId + "</td><td>" + setName + "</td><td>" + empresa + "</td><td><button class=' idRef"+ setId+" btn-sm btn-primary'>Ação</button></td> </tr>"
                                )

                                .hide()
                                .fadeIn(400);
                               
                                
                               
                               
                    $(".idRef" + setId ).on('click', function () {
                        
                        $.ajax({
                            url: "http://192.168.8.2/load_objects.fcgi?session=" + token,
                            type: "POST",
                            contentType: "application/json",
                            data: JSON.stringify({
                                object: "access_logs",
                                join: "INNER",
                        
                                fields: [
                                    "user_id",
                                    "time",
                                    {
                                        object: "users",
                                        field: "name"
                                    },
                                  
                                ],
                                where: {
                                    users: {
                                        id: setId
                                    }
                                },

                                order:['time']
                              
                            }),
                            beforeSend: function() {
                                console.log("Carregando....");
                                $("#charge").css("display", "block");
                                $("#info").html("Tempo");
                            },

                            success: function (data) {
                                $("#charge").css("display", "none");
                                $('.desc').html('Tempo')
                                $('.action').remove()
                                console.log("sucesso");
                                console.log(data);
                                let logsUser = data
                                console.log(logsUser.access_logs.length)
                                $('#setUsuario').empty();
                                for (let z = 0; z <logsUser.access_logs.length ; z++) { 
                                   let logUnico = logsUser.access_logs[z].time;
                                   let nameLog = logsUser["access_logs"][z]["users.name"];
                                   let userLog = logsUser.access_logs[z].user_id;
                                   let date = new Date(logUnico * 1000);
                                   var hoursLog = date.toJSON("pt-BR");

                                   $('#setUsuario').append("<tr><td>" + z  +"</td><td>"+logUnico + "</td><td>" +nameLog  +  "</td><td>" + hoursLog+"</td></tr>")
                                   
                                }
                               


                            }


                        })



                    });
                                


                        
                    }
                       
                    });
                
                    //const push = data

                    

                }
            });
        }
    });

    $("#pesquisa").on("keyup", function () {
        var value = $(this)
            .val()
            .toLowerCase();
        $("#tabelaPesquisa tr").filter(function () {
            $(this).toggle(
                $(this)
                    .text()
                    .toLowerCase()
                    .indexOf(value) > -1
            );
        });
    });

});


