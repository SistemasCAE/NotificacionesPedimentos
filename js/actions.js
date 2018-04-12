var app = {

	deviceready: function(){
		document.addEventListener("deviceready", app.init/*this.init*/, false);
	},
    init: function() {
        alert('Received Device Ready Event');
        alert('calling setup push');
        plataforma=device.platform;
        var element = document.getElementById('deviceProperties');

        element.innerHTML = 'Device Platform: ' + plataforma + '<br />' + 
                        'Device UUID: '     + device.uuid     + '<br />' + 
                        'Device Version: '  + device.version  + '<br />';
        app.setupPush();

    },
    setupPush: function() {
        alert('calling push init');
        var push = PushNotification.init({
            "android": {
                "senderID": "prueba-notificaciones-200822"
            },
            "browser": {},
            "ios": {
                "sound": true,
                "vibration": true,
                "badge": true
            },
            "windows": {}
        });
        alert('after init');

        push.on('registration', function(data) {
            alert('registration event: ' + data.registrationId);

                 jQuery.ajax({
        url: 'http://enlinea.cae3076.com/Notificaciones/funciones.php',
        type:'POST',
        data:'datos='+data.registrationId+'||'+plataforma,
        dataType:'json',
        success:function(response){
          if (response.msg=='primera'){
            alert('Su teléfono ha quedado registrado');

          }


        },
        error:function(xhr, status){
          alert(status, 'ERROR');

        }
      });

            var parentElement = document.getElementById('registration');
            var listeningElement = parentElement.querySelector('.waiting');
            var receivedElement = parentElement.querySelector('.received');

            listeningElement.setAttribute('style', 'display:none;');
            receivedElement.setAttribute('style', 'display:block;');
        });

        push.on('error', function(e) {
            alert("push error = " + e.message);
            
      alert("push error = " + e.message);

        });

        push.on('notification', function(data) {
            alert('notification event');

    cordova.plugins.notification.badge.set(0);
            navigator.notification.alert(
                data.message,         // message
                null,                 // callback
                data.title,           // title
                'Ok'                  // buttonName
            );
       });
    }
};
app.deviceready();