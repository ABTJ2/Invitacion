const INVITACION = {
  nombre: 'Pía',
  subtitulo: 'Mis 15 años',
  frase: 'Te invito a compartir una noche inolvidable',
  fechaEvento: '2026-10-14T20:30:00-03:00',
  fechaTexto: '14 de octubre de 2026 · 20:30 hs',
  horaTexto: '20:30 hs',
  lugar: 'Salón a confirmar',
  direccion: 'Ubicación a confirmar',
  mapsUrl: '#',
  whatsappNumero: '5492644101980',
  whatsappMensaje: 'Hola, Pía, te confirmo mi asistencia.',
  alias: 'PIA.15.EJEMPLO',
  textoRegalo: 'Tu presencia es el mejor regalo, pero si querés hacerme un obsequio, podés usar este alias.',
  vestimenta: 'Elegante · Colores a elección',
  footer: 'Jesús Funes'
};

const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => document.querySelectorAll(selector);

function cargarDatos() {
  $('#heroEyebrow').textContent = INVITACION.subtitulo;
  $('#nombrePrincipal').textContent = INVITACION.nombre;
  $('#nombreFirma').textContent = INVITACION.nombre;
  $('#firmaFinal').textContent = INVITACION.nombre;
  $('#frasePrincipal').textContent = INVITACION.frase;
  $('#fechaTexto').textContent = INVITACION.fechaTexto;
  $('#horaEvento').textContent = INVITACION.horaTexto;
  $('#salonEvento').textContent = INVITACION.lugar;
  $('#direccionEvento').textContent = INVITACION.direccion;
  $('#textoRegalo').textContent = INVITACION.textoRegalo;
  $('#aliasEvento').textContent = INVITACION.alias;
  $('#vestimentaEvento').textContent = INVITACION.vestimenta;
  document.querySelector('.footer strong').textContent = INVITACION.footer;

  const fecha = new Date(INVITACION.fechaEvento);
  const meses = ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'];
  const dias = ['Domingo','Lunes','Martes','Miércoles','Jueves','Viernes','Sábado'];
  $('#mesEventoTexto').textContent = meses[fecha.getMonth()];
  $('#diaEvento').textContent = fecha.getDate();
  $('#anioEvento').textContent = fecha.getFullYear();
  $('#diaSemanaEvento').textContent = dias[fecha.getDay()];

  const mensaje = encodeURIComponent(INVITACION.whatsappMensaje);
  $('#btnWhatsApp').href = `https://wa.me/${INVITACION.whatsappNumero}?text=${mensaje}`;
  $('#btnUbicacion').href = INVITACION.mapsUrl || '#';
}

function iniciarCuentaRegresiva() {
  const objetivo = new Date(INVITACION.fechaEvento).getTime();
  const mensaje = $('#mensajeCuenta');

  function actualizar() {
    const ahora = Date.now();
    const diferencia = objetivo - ahora;

    if (diferencia <= 0) {
      $('#dias').textContent = '00';
      $('#horas').textContent = '00';
      $('#minutos').textContent = '00';
      $('#segundos').textContent = '00';
      mensaje.textContent = 'El gran día llegó.';
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
    mensaje.textContent = 'Cada vez falta menos.';
  }

  actualizar();
  setInterval(actualizar, 1000);
}

function iniciarBotones() {
  $('#btnAbrir').addEventListener('click', () => {
    $('#invitacion').scrollIntoView({ behavior: 'smooth' });
  });

  $('#btnCopiarAlias').addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(INVITACION.alias);
      $('#mensajeCopiado').classList.add('show');
      setTimeout(() => $('#mensajeCopiado').classList.remove('show'), 1800);
    } catch {
      alert(`No se pudo copiar el alias. Copialo manualmente: ${INVITACION.alias}`);
    }
  });

  $('#btnUbicacion').addEventListener('click', (event) => {
    if (!INVITACION.mapsUrl || INVITACION.mapsUrl === '#') {
      event.preventDefault();
      alert('La ubicación todavía no fue cargada. Después la cambiamos por Google Maps.');
    }
  });
}

function iniciarAnimaciones() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) entry.target.classList.add('show');
    });
  }, { threshold: 0.15 });

  $$('.reveal').forEach((elemento) => observer.observe(elemento));
}

function iniciarLightbox() {
  const lightbox = $('#lightbox');
  const lightboxImg = $('#lightboxImg');

  $$('.zoomable').forEach((img) => {
    img.addEventListener('click', () => {
      lightboxImg.src = img.src;
      lightboxImg.alt = img.alt;
      lightbox.classList.add('open');
      lightbox.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
    });
  });

  function cerrar() {
    lightbox.classList.remove('open');
    lightbox.setAttribute('aria-hidden', 'true');
    lightboxImg.src = '';
    document.body.style.overflow = '';
  }

  $('#cerrarLightbox').addEventListener('click', cerrar);
  lightbox.addEventListener('click', (event) => {
    if (event.target === lightbox) cerrar();
  });
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && lightbox.classList.contains('open')) cerrar();
  });
}

cargarDatos();
iniciarCuentaRegresiva();
iniciarBotones();
iniciarAnimaciones();
iniciarLightbox();
