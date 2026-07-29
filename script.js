/* ======================================================
   CONFIGURACIÓN RÁPIDA DE LA INVITACIÓN
   Cambiá estos datos y listo.
====================================================== */
const CONFIG = {
  nombre: 'Cielo',
  frasePrincipal: 'A compartir una noche muy especial',
  fechaEvento: '2026-11-28T20:30:00-03:00',
  fechaTexto: '28 de noviembre de 2026',
  horaTexto: '20:30 / 21:00 hs',
  salon: 'Salón a confirmar',
  direccion: 'Dirección a confirmar',
  linkUbicacion: '#',
  whatsapp: '549XXXXXXXXXX',
  mensajeWhatsApp: 'Hola, confirmo mi asistencia al evento de Cielo.',
  alias: 'A CONFIRMAR',
  textoRegalo: 'Mi mejor regalo es que puedas compartir conmigo este día, pero si deseás hacerme un obsequio, te dejo esta opción.',
  vestimenta: 'Hombres: de traje<br>Mujeres: de largo<br><br>Colores sugeridos: gama de grises, plateados y negros.',
  marcaFooter: 'Tu Marca'
};

const $ = (selector) => document.querySelector(selector);

function cargarDatos() {
  $('#nombrePrincipal').textContent = CONFIG.nombre;
  $('#nombreFirma').textContent = CONFIG.nombre;
  $('#firmaFinal').textContent = CONFIG.nombre;
  $('#frasePrincipal').textContent = CONFIG.frasePrincipal;
  $('#fechaTexto').textContent = CONFIG.fechaTexto;
  $('#horaEvento').textContent = CONFIG.horaTexto;
  $('#salonEvento').textContent = CONFIG.salon;
  $('#direccionEvento').textContent = CONFIG.direccion;
  $('#textoRegalo').textContent = CONFIG.textoRegalo;
  $('#aliasEvento').textContent = CONFIG.alias;
  $('#vestimentaEvento').innerHTML = CONFIG.vestimenta;

  const linkMaps = CONFIG.linkUbicacion && CONFIG.linkUbicacion !== '#' ? CONFIG.linkUbicacion : '#';
  $('#btnUbicacion').href = linkMaps;

  const mensaje = encodeURIComponent(CONFIG.mensajeWhatsApp);
  $('#btnWhatsApp').href = `https://wa.me/${CONFIG.whatsapp}?text=${mensaje}`;

  const footerStrong = document.querySelector('.footer strong');
  if (footerStrong) footerStrong.textContent = CONFIG.marcaFooter;

  cargarCalendario();
}

function cargarCalendario() {
  const fecha = new Date(CONFIG.fechaEvento);
  const meses = [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
  ];
  const dias = ['D', 'L', 'M', 'M', 'J', 'V', 'S'];

  const mes = fecha.getMonth();
  const anio = fecha.getFullYear();
  const diaSeleccionado = fecha.getDate();

  $('#mesEvento').textContent = meses[mes];
  $('#anioEvento').textContent = anio;

  const contenedor = $('#calendarioEvento');
  contenedor.innerHTML = '';

  dias.forEach((dia) => {
    const span = document.createElement('span');
    span.textContent = dia;
    span.className = 'day-name';
    contenedor.appendChild(span);
  });

  const primerDia = new Date(anio, mes, 1).getDay();
  const totalDias = new Date(anio, mes + 1, 0).getDate();

  for (let i = 0; i < primerDia; i++) {
    contenedor.appendChild(document.createElement('span'));
  }

  for (let dia = 1; dia <= totalDias; dia++) {
    const span = document.createElement('span');
    span.textContent = dia;
    if (dia === diaSeleccionado) span.className = 'selected';
    contenedor.appendChild(span);
  }
}

function iniciarCuentaRegresiva() {
  const fechaObjetivo = new Date(CONFIG.fechaEvento).getTime();

  function actualizar() {
    const ahora = new Date().getTime();
    const diferencia = fechaObjetivo - ahora;

    if (diferencia <= 0) {
      $('#dias').textContent = '00';
      $('#horas').textContent = '00';
      $('#minutos').textContent = '00';
      $('#segundos').textContent = '00';
      return;
    }

    const dias = Math.floor(diferencia / (1000 * 60 * 60 * 24));
    const horas = Math.floor((diferencia / (1000 * 60 * 60)) % 24);
    const minutos = Math.floor((diferencia / (1000 * 60)) % 60);
    const segundos = Math.floor((diferencia / 1000) % 60);

    $('#dias').textContent = String(dias).padStart(2, '0');
    $('#horas').textContent = String(horas).padStart(2, '0');
    $('#minutos').textContent = String(minutos).padStart(2, '0');
    $('#segundos').textContent = String(segundos).padStart(2, '0');
  }

  actualizar();
  setInterval(actualizar, 1000);
}

function iniciarAnimaciones() {
  const elementos = document.querySelectorAll('.reveal');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('show');
      }
    });
  }, { threshold: 0.15 });

  elementos.forEach((elemento) => observer.observe(elemento));
}

function iniciarBotones() {
  $('#btnAbrir').addEventListener('click', () => {
    $('#invitacion').scrollIntoView({ behavior: 'smooth' });
  });

  $('#btnCopiarAlias').addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(CONFIG.alias);
      $('#mensajeCopiado').classList.add('show');
      setTimeout(() => $('#mensajeCopiado').classList.remove('show'), 1800);
    } catch (error) {
      alert('No se pudo copiar el alias. Copialo manualmente: ' + CONFIG.alias);
    }
  });

  $('#btnUbicacion').addEventListener('click', (event) => {
    if (CONFIG.linkUbicacion === '#') {
      event.preventDefault();
      alert('Ubicación a confirmar.');
    }
  });
}

cargarDatos();
iniciarCuentaRegresiva();
iniciarAnimaciones();
iniciarBotones();
