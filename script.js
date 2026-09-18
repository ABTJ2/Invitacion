const INVITACION = {
  nombre: 'Pía y Alejo',
  subtitulo: 'Te invitamos',
  frase: 'A compartir una noche especial',
  fechaEvento: '2026-10-10T21:00:00-03:00',
  fechaTexto: '10 de octubre de 2026 · 21:00 hs',
  horaTexto: '21:00 hs',
  lugar: 'El Rancho',
  direccion: 'Caucete, San Juan',
  mapsUrl: 'https://maps.app.goo.gl/zwSQP48DQSfJqVin9',
  whatsappNumero: '5492644548296',
  whatsappMensaje: 'Hola Pía y Alejo, confirmo mi asistencia.',
  alias: 'aranela.09',
  textoRegalo: 'Tu presencia es el mejor regalo, pero si querés hacerme un obsequio, podés usar este alias.',
  vestimenta: 'Formal sport',
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
  $('#footerAutor').textContent = INVITACION.footer;

  const [anio, mes, dia] = INVITACION.fechaEvento.slice(0, 10).split('-').map(Number);
  const fecha = new Date(Date.UTC(anio, mes - 1, dia));
  const meses = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
  const dias = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];

  $('#mesEventoTexto').textContent = meses[mes - 1];
  $('#diaEvento').textContent = dia;
  $('#anioEvento').textContent = anio;
  $('#diaSemanaEvento').textContent = dias[fecha.getUTCDay()];
  $('#btnWhatsApp').href = `https://wa.me/${INVITACION.whatsappNumero}?text=${encodeURIComponent(INVITACION.whatsappMensaje)}`;
  $('#btnUbicacion').href = INVITACION.mapsUrl;
}

function iniciarCuentaRegresiva() {
  const objetivo = new Date(INVITACION.fechaEvento).getTime();
  const mensaje = $('#mensajeCuenta');
  let intervalo;

  function actualizar() {
    const diferencia = objetivo - Date.now();

    if (diferencia <= 0) {
      $('#dias').textContent = '00';
      $('#horas').textContent = '00';
      $('#minutos').textContent = '00';
      $('#segundos').textContent = '00';
      mensaje.textContent = 'El gran día llegó.';
      if (intervalo) clearInterval(intervalo);
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
  intervalo = setInterval(actualizar, 1000);
}

function copiarConFallback(texto) {
  const campo = document.createElement('textarea');
  campo.value = texto;
  campo.setAttribute('readonly', '');
  campo.style.position = 'fixed';
  campo.style.opacity = '0';
  campo.style.pointerEvents = 'none';
  document.body.appendChild(campo);
  campo.focus();
  campo.select();
  campo.setSelectionRange(0, campo.value.length);

  let copiado = false;
  try {
    copiado = document.execCommand('copy');
  } catch {
    copiado = false;
  } finally {
    campo.remove();
  }
  return copiado;
}

let temporizadorFeedback;

async function copiarAlias() {
  let copiado = false;

  if (navigator.clipboard && window.isSecureContext) {
    try {
      await navigator.clipboard.writeText(INVITACION.alias);
      copiado = true;
    } catch {
      copiado = copiarConFallback(INVITACION.alias);
    }
  } else {
    copiado = copiarConFallback(INVITACION.alias);
  }

  if (!copiado) {
    window.prompt('Copiá el alias:', INVITACION.alias);
    return;
  }

  const feedback = $('#mensajeCopiado');
  window.clearTimeout(temporizadorFeedback);
  feedback.classList.add('show');
  temporizadorFeedback = window.setTimeout(() => feedback.classList.remove('show'), 1800);
}

function iniciarBotones() {
  $('#btnAbrir').addEventListener('click', () => {
    $('#invitacion').scrollIntoView({ behavior: 'smooth' });
  });
  $('#btnCopiarAlias').addEventListener('click', copiarAlias);
  $('#btnCopiarAliasLateral').addEventListener('click', copiarAlias);
}

function iniciarAnimaciones() {
  if (!('IntersectionObserver' in window) || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    $$('.reveal').forEach((elemento) => elemento.classList.add('show'));
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('show');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  $$('.reveal').forEach((elemento) => observer.observe(elemento));
}

function iniciarLightbox() {
  const lightbox = $('#lightbox');
  const lightboxImg = $('#lightboxImg');
  const botonCerrar = $('#cerrarLightbox');
  let elementoAnterior = null;

  function abrir(img) {
    elementoAnterior = document.activeElement;
    lightboxImg.src = img.currentSrc || img.src;
    lightboxImg.alt = img.alt;
    lightbox.classList.add('open');
    lightbox.setAttribute('aria-hidden', 'false');
    document.body.classList.add('lightbox-open');
    botonCerrar.focus();
  }

  function cerrar() {
    lightbox.classList.remove('open');
    lightbox.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('lightbox-open');
    lightboxImg.src = '';
    lightboxImg.alt = '';
    if (elementoAnterior instanceof HTMLElement) elementoAnterior.focus();
  }

  $$('.zoomable').forEach((img) => {
    img.setAttribute('tabindex', '0');
    img.setAttribute('role', 'button');
    img.setAttribute('aria-label', `Ampliar: ${img.alt}`);
    img.addEventListener('click', () => abrir(img));
    img.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        abrir(img);
      }
    });
  });

  botonCerrar.addEventListener('click', cerrar);
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
