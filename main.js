let secuenciaBot = [];
let secuenciaHumano = [];
let ronda = 0;
let turnoMaquina = true;
bloquearUsuario()
$botonStart = document.querySelector('button[type=button]')
document.querySelector('button[type=button]').onclick = function(){
    resetear()
    ronda++
    actualizarRonda(ronda)
    $botonStart.disabled = true;
    manejarRonda()
} 

function resaltarBoton(movimientoBot){
    movimientoBot.style.filter = 'brightness(1)';
    setTimeout(function() {
        movimientoBot.style.filter = 'brightness(0.4)';
        }, 500);
    }  

function manejarInputUsuario(e){
    const $boton = e.target;
    resaltarBoton($boton);
    secuenciaHumano.push($boton);
    const botonMaquina = secuenciaBot[secuenciaHumano.length - 1];
    if($boton.id !== botonMaquina.id){
        perder();
        let $estado = document.querySelector('#informacion-estado');
        $estado.textContent = 'Click en start para jugar';
        $botonStart.disabled = false;
        return;
    }
    if(secuenciaBot.length == secuenciaHumano.length){
        bloquearUsuario();
        secuenciaHumano = [];
        setTimeout(function(){
            ronda++;
            actualizarRonda(ronda);
            manejarRonda();
        }, 1000)
    }
    }
 
function perder(){
    alert('Perdiste.')
    bloquearUsuario()
}

function resetear(){
    secuenciaBot = [];
    secuenciaHumano = [];
    ronda = 0;
}

function manejarEstado(turnoMaquina){
    if (turnoMaquina){
        document.querySelector('#informacion-estado').textContent = 'Es el turno de la maquina';
    }
    if (turnoMaquina === false){
        document.querySelector('#informacion-estado').textContent = 'Es tu turno';
    }
}

function bloquearUsuario(){
    document.querySelectorAll('.botones').forEach(function($boton){
        $boton.onclick = function(){
        };
    });

    }

function manejarRonda(){
    turnoMaquina = true;
    manejarEstado(turnoMaquina);
    const $listaBotones = document.querySelectorAll('.botones');
    const $jugadaBot = $listaBotones[Math.floor(Math.random() * $listaBotones.length)];
    secuenciaBot.push($jugadaBot);

    secuenciaBot.forEach(function(movimientoBot, index){
        const RETRASO_MS = (index + 1) * 1000
        setTimeout(function(){
            resaltarBoton(movimientoBot);
        }, RETRASO_MS)
})
    const RETRASO_TURNO_JUGADOR = (secuenciaBot.length + 1) * 1000
    setTimeout(function(){
        turnoMaquina = false;
        manejarEstado(turnoMaquina);
        document.querySelectorAll('.botones').forEach(function($boton){
            $boton.onclick = manejarInputUsuario

    })
    
}, RETRASO_TURNO_JUGADOR)
}

function actualizarRonda(ronda){
    document.querySelector('strong').textContent = ronda;

}
