'use strict';

const N = {
  critico: { nivel: 'Crítico', grupo: 'Crítico · corre en el primer turno' },
  atencion: { nivel: 'Atención', grupo: 'Atención · programar esta semana' },
  holgado: { nivel: 'Holgado', grupo: 'Holgado · puede esperar' }
};

const DATOS = [
  { ref: 'C-013', talla: 'L', linea: 'LINEA B', rotacion: 'A', existencias: 0, minimo: 80, maximo: 200, corte: 'OR-2-C-013L', fechaCorte: '09/09/2026', planeada: 120, plan: 'TikTok USA', etapa: 'Confección', etapaIdx: 3, canal: 'TikTok USA', restante: '4 h 10 m', limite: 'hoy 10:00', puntaje: 196, nivel: 'critico',
    motivo: 'Sin existencia y con pedido TikTok USA activo', motivoLargo: 'Existencia en cero con un pedido de TikTok USA que vence en 4 horas.' },
  { ref: 'C-018', talla: 'M', linea: 'LINEA B', rotacion: 'A', existencias: 0, minimo: 140, maximo: 380, corte: 'OR-1-C-018M', fechaCorte: '08/09/2026', planeada: 240, plan: 'TikTok USA', etapa: 'Alfilerado', etapaIdx: 2, canal: 'TikTok USA', restante: '6 h 40 m', limite: 'hoy 12:30', puntaje: 181, nivel: 'critico',
    motivo: 'En alfilerado, a una operación de cubrir el pedido', motivoLargo: 'Está en alfilerado: una operación la separa de cubrir el live de hoy.' },
  { ref: 'C-054', talla: 'S', linea: 'SATELITE', rotacion: 'A', existencias: 0, minimo: 500, maximo: 1200, corte: 'OR-2-C-054S', fechaCorte: '07/09/2026', planeada: 700, plan: 'Amazon USA', etapa: 'Corte', etapaIdx: 1, canal: 'Amazon USA', restante: '1 d 3 h', limite: 'jue 08:00', puntaje: 164, nivel: 'critico',
    motivo: 'Cero contra un mínimo de 500 unidades', motivoLargo: 'Cero unidades contra un mínimo de 500, con guía a Amazon USA el jueves.' },
  { ref: 'C-033', talla: '34', linea: 'BRA POS', rotacion: 'A', existencias: 0, minimo: 100, maximo: 260, corte: 'OR-1-C-03334', fechaCorte: '08/09/2026', planeada: 160, plan: 'Shopify USA', etapa: 'Insumos', etapaIdx: 0, canal: 'Shopify USA', restante: '1 d 9 h', limite: 'jue 14:00', puntaje: 152, nivel: 'critico',
    motivo: 'Ni siquiera cortada: pendiente de insumos', motivoLargo: 'Todavía en insumos: hay que confirmar la tela antes de cortar, es la ruta completa.' },
  { ref: 'C-034', talla: 'S', linea: 'CARIBE', rotacion: 'A', existencias: 4, minimo: 80, maximo: 200, corte: '-C-034S', fechaCorte: '10/09/2026', planeada: 120, plan: 'Tienda nacional', etapa: 'Confección', etapaIdx: 3, canal: 'Tienda nacional', restante: '2 d 5 h', limite: 'vie 09:00', puntaje: 118, nivel: 'atencion',
    motivo: '4 unidades en piso, 5% del mínimo', motivoLargo: 'Quedan 4 unidades contra un mínimo de 80: cubre menos de un día de venta.' },
  { ref: 'C-039', talla: '34', linea: 'BRA POS', rotacion: 'A', existencias: 10, minimo: 80, maximo: 200, corte: 'OR-2-C-03934', fechaCorte: '10/09/2026', planeada: 120, plan: 'Shopify USA', etapa: 'Corte', etapaIdx: 1, canal: 'Shopify USA', restante: '3 d 2 h', limite: 'sáb 09:00', puntaje: 97, nivel: 'atencion',
    motivo: 'Corte abierto pero inventario bajo mínimo', motivoLargo: 'El corte OR-2 está abierto y el inventario sigue por debajo del mínimo.' },
  { ref: 'C-002', talla: 'M', linea: 'LINEA B', rotacion: 'A', existencias: 55, minimo: 140, maximo: 380, corte: '-C-002M', fechaCorte: '05/09/2026', planeada: 240, plan: 'Tienda nacional', etapa: 'Alfilerado', etapaIdx: 2, canal: 'Tienda nacional', restante: '4 d 6 h', limite: 'dom 09:00', puntaje: 74, nivel: 'holgado',
    motivo: 'Bajo mínimo, con reposición ya en alfilerado', motivoLargo: 'Está bajo mínimo, pero la reposición ya viene en alfilerado.' },
  { ref: 'C-055', talla: 'M', linea: 'SATELITE', rotacion: 'A', existencias: 50, minimo: 200, maximo: 500, corte: '-C-055M', fechaCorte: '06/09/2026', planeada: 300, plan: 'Tienda nacional', etapa: 'Confección', etapaIdx: 3, canal: 'Tienda nacional', restante: '5 d 3 h', limite: 'lun 09:00', puntaje: 68, nivel: 'holgado',
    motivo: 'Reposición de tienda con ventana amplia', motivoLargo: 'Reposición de tienda con una semana de ventana y corte en confección.' }
];

const RUTA = ['Insumos', 'Corte', 'Alfilerado', 'Confección', 'Bodega'];
const ORDEN = ['critico', 'atencion', 'holgado'];

const TIENDAS = [
  { tienda: 'Tienda Poblado', nota: 'Misma REF y talla en piso · traslado 2 h', factor: 1 },
  { tienda: 'Tienda Laureles', nota: 'Stock parcial · traslado 3 h', factor: 0.4 },
  { tienda: 'Bodega Itagüí', nota: 'Saldo de corte anterior · traslado 1 h', factor: 0.15 }
];
const TIEMPOS = [
  { etiqueta: 'Primer turno · 4 h', hora: '10:00' },
  { etiqueta: 'Hoy · 8 h', hora: '14:00' },
  { etiqueta: 'Mañana · 24 h', hora: 'mié 06:00' }
];
const RAZONES = ['Falta tela o insumo', 'Máquina en mantenimiento', 'Personal incompleto', 'Cambió la prioridad'];

let state = {
  pantalla: 'lista', idx: 0, fase: 'asignar', modo: 'prestamo',
  asign: [0, 0, 0], cantidadPlanta: 0, tiempoIdx: 0, razon: '', nota: '', notaGuardada: ''
};

function setState(patch) {
  Object.assign(state, patch);
  render();
}

function ir(pantalla, idx) {
  setState({ pantalla, idx: idx != null ? idx : state.idx });
  window.scrollTo(0, 0);
}

function setAsign(i, v) {
  const a = state.asign.slice();
  a[i] = v;
  setState({ asign: a });
}

function esc(v) {
  return String(v).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
}

function computeSel() {
  const base = DATOS[state.idx];
  const faltan = Math.max(0, base.minimo - base.existencias);
  return Object.assign({}, base, {
    faltan,
    etiquetaCorta: base.ref + ' · Talla ' + base.talla,
    puestoTexto: 'puesto ' + (state.idx + 1) + ' de ' + DATOS.length,
    levelKey: base.nivel,
    nivelLabel: N[base.nivel].nivel
  });
}

function computeCuenta() {
  const cuenta = {};
  ORDEN.forEach((k) => { cuenta[k] = DATOS.filter((d) => d.nivel === k).length; });
  return cuenta;
}

function renderLista() {
  const cuenta = computeCuenta();
  const unidades = DATOS.reduce((a, d) => a + Math.max(0, d.minimo - d.existencias), 0);

  let visto = null;
  const rowsHtml = DATOS.map((d, i) => {
    const nuevo = d.nivel !== visto;
    visto = d.nivel;
    const crit = d.nivel === 'critico';
    const faltan = Math.max(0, d.minimo - d.existencias);
    let html = '';
    if (nuevo) {
      html += `
        <div class="group-header">
          <span class="group-label level-${d.nivel}">${esc(N[d.nivel].grupo)}</span>
          <span class="group-line"></span>
          <span class="group-count">${cuenta[d.nivel]} referencias</span>
        </div>`;
    }
    html += `
      <button class="row level-${d.nivel}${crit ? ' is-critico' : ''}" onclick="ir('detalle', ${i})">
        <div class="row-bar"></div>
        <div class="row-main">
          <div class="row-ref">${esc(d.ref)}</div>
          <div class="row-sub">Talla ${esc(d.talla)} · ${esc(d.linea)}</div>
        </div>
        <div class="row-motivo-wrap">
          <div class="row-motivo">${esc(d.motivo)}</div>
          <div class="row-meta">EXISTENCIAS_APP ${d.existencias} · MÍNIMO ${d.minimo}</div>
        </div>
        <div class="row-restante-wrap">
          <div class="row-restante">${esc(d.restante)}</div>
          <div class="row-plan">${esc(d.plan)}</div>
        </div>
        <div class="row-score-wrap">
          <span class="row-score">${d.puntaje}</span>
          <span class="row-arrow">→</span>
        </div>
      </button>`;
    return html;
  }).join('');

  return `
    <div class="page-lista">
      <div class="hero">
        <div class="hero-bg"></div>
        <div class="hero-scrim"></div>
        <div class="hero-content">
          <div class="hero-date">Martes 11 de septiembre</div>
          <h1 class="hero-title">Esto corre hoy, en orden.</h1>
          <div class="hero-sub">insumos → corte → alfilerado → confección → bodega</div>
          <div class="hero-stats">
            <div>
              <div class="hero-stat-num">${cuenta.critico}</div>
              <div class="hero-stat-label">críticas</div>
            </div>
            <div>
              <div class="hero-stat-num">${cuenta.atencion}</div>
              <div class="hero-stat-label">en atención</div>
            </div>
            <div>
              <div class="hero-stat-num">${unidades}</div>
              <div class="hero-stat-label">unidades faltantes</div>
            </div>
          </div>
        </div>
      </div>

      <div class="rows">${rowsHtml}</div>

      <div class="lista-footnote">Puntaje 0–200+: combina etapa de producción, urgencia del pedido y brecha contra NIVEL MINIMO.</div>
    </div>`;
}

function renderDetalle() {
  const sel = computeSel();
  const pEtapa = { 0: 60, 1: 48, 2: 40, 3: 30, 4: 12 };
  const rEtapa = {
    0: 'En insumos: falta confirmar la tela antes de cortar, ruta completa por delante.',
    1: 'Cortada: faltan alfilerado y confección.',
    2: 'Alfilerada: lista para subir a confección.',
    3: 'En confección: sale hoy si entra al primer turno.',
    4: 'En bodega como producto terminado.'
  };
  const pUrg = sel.canal === 'TikTok USA' ? 80 : sel.canal === 'Tienda nacional' ? 30 : 55;
  const rUrg = sel.canal === 'TikTok USA' ? 'TikTok exige respuesta en 12 horas desde la venta.'
    : sel.canal === 'Tienda nacional' ? 'Reposición de tienda con ventana de una semana.'
    : sel.canal + ': despacho a Estados Unidos con cierre de guía programado.';
  const pGap = sel.puntaje - pEtapa[sel.etapaIdx] - pUrg;

  const rutaHtml = RUTA.map((nombre, i) => {
    const cls = i < sel.etapaIdx ? 'is-done' : i === sel.etapaIdx ? 'is-current' : '';
    const detalle = i < sel.etapaIdx ? 'completado' : i === sel.etapaIdx ? 'etapa actual' : 'pendiente';
    return `
      <div class="route-step ${cls}">
        <div class="route-bar"></div>
        <div class="route-name">${esc(nombre)}</div>
        <div class="route-detail">${detalle}</div>
      </div>`;
  }).join('');

  const campos = [
    { k: 'LINEA PROD', v: sel.linea }, { k: 'ROTACION', v: sel.rotacion },
    { k: 'EXISTENCIAS_APP', v: sel.existencias }, { k: 'NIVEL MINIMO', v: sel.minimo },
    { k: 'NIVEL MAXIMO', v: sel.maximo }, { k: 'N° CORTE', v: sel.corte },
    { k: 'FECHA DE CORTE', v: sel.fechaCorte }, { k: 'CANTIDAD PLANEADA', v: sel.planeada },
    { k: 'PLAN', v: sel.plan }
  ];
  const camposHtml = campos.map((c) => `
    <div>
      <div class="field-key">${esc(c.k)}</div>
      <div class="field-val">${esc(c.v)}</div>
    </div>`).join('');

  const desglose = [
    { factor: 'Etapa de producción', puntos: pEtapa[sel.etapaIdx], razon: rEtapa[sel.etapaIdx] },
    { factor: 'Urgencia del pedido', puntos: pUrg, razon: rUrg },
    { factor: 'Brecha de inventario', puntos: pGap, razon: 'EXISTENCIAS_APP ' + sel.existencias + ' contra NIVEL MINIMO ' + sel.minimo + '.' }
  ];
  const desgloseHtml = desglose.map((d) => `
    <div class="breakdown-item">
      <div class="breakdown-row">
        <span class="breakdown-factor">${esc(d.factor)}</span>
        <span class="breakdown-points">+${d.puntos}</span>
      </div>
      <div class="breakdown-razon">${esc(d.razon)}</div>
    </div>`).join('');

  return `
    <div class="page-detalle level-${sel.levelKey}">
      <button class="back-link" onclick="ir('lista')">← Prioridad del día</button>

      <div class="detail-grid">
        <div>
          <div class="detail-header">
            <h1 class="detail-title">${esc(sel.ref)}</h1>
            <span class="detail-talla">Talla ${esc(sel.talla)}</span>
            <span class="badge">${esc(sel.nivelLabel)}</span>
          </div>

          <div class="why-box">
            <div class="why-label">Por qué es urgente</div>
            <div class="why-text">${esc(sel.motivoLargo)}</div>
            <div class="why-stats">
              <div>
                <div class="why-stat-num">${esc(sel.restante)}</div>
                <div class="why-stat-label">para despacho · ${esc(sel.limite)}</div>
              </div>
              <div>
                <div class="why-stat-num neutral">${sel.faltan}</div>
                <div class="why-stat-label">unidades bajo NIVEL MINIMO</div>
              </div>
            </div>
          </div>

          <div class="panel">
            <div class="panel-label">Ruta de producción · insumos → bodega</div>
            <div class="route">${rutaHtml}</div>
          </div>

          <div class="panel">
            <div class="panel-label">Datos de Odoo</div>
            <div class="fields">${camposHtml}</div>
          </div>
        </div>

        <div class="side-card">
          <div class="side-header">
            <div class="side-header-label">Puntaje de prioridad</div>
            <div class="side-score-row">
              <span class="side-score">${sel.puntaje}</span>
              <span class="side-puesto">${esc(sel.puestoTexto)}</span>
            </div>
          </div>
          <div class="side-body">
            ${desgloseHtml}
            <button class="btn-accion" onclick="irAccion()">Ver opciones de acción</button>
          </div>
        </div>
      </div>
    </div>`;
}

function irAccion() {
  const sel = computeSel();
  setState({ pantalla: 'accion', fase: 'asignar', asign: [0, 0, 0], cantidadPlanta: sel.faltan, tiempoIdx: 0, razon: '', nota: '', notaGuardada: '' });
}

function renderAccionAsignar() {
  const sel = computeSel();
  const faltan = sel.faltan;
  const asignado = state.asign.reduce((a, b) => a + (b || 0), 0);
  const pendiente = Math.max(0, faltan - asignado);
  const cantidadPlanta = state.cantidadPlanta || faltan;
  const pasoPlanta = Math.max(10, Math.round(faltan / 10 / 10) * 10);

  const tiendasHtml = TIENDAS.map((t, i) => {
    const disp = Math.max(4, Math.round(faltan * t.factor));
    const cant = state.asign[i] || 0;
    const paso = Math.max(5, Math.round(faltan / 10 / 5) * 5);
    const tope = Math.min(disp, cant + pendiente);
    const etiquetaTodo = cant >= tope ? 'Quitar' : 'Todo';
    return `
      <div class="store-row">
        <div>
          <div class="store-name">${esc(t.tienda)}</div>
          <div class="store-note">${esc(t.nota)}</div>
        </div>
        <div class="store-disp">${disp} disp.</div>
        <div class="qty-control">
          <button class="qty-btn" onclick="setAsign(${i}, Math.max(0, ${cant} - ${paso}))">−</button>
          <div class="qty-value">${cant}</div>
          <button class="qty-btn" onclick="setAsign(${i}, Math.min(${tope}, ${cant} + ${paso}))">+</button>
        </div>
        <button class="store-action" onclick="setAsign(${i}, ${cant >= tope ? 0 : tope})">${etiquetaTodo}</button>
      </div>`;
  }).join('');

  const anchoBarra = Math.min(100, Math.round((asignado / Math.max(1, faltan)) * 100));
  const puedeEnviar = asignado > 0;
  const tiemposHtml = TIEMPOS.map((op, i) => `
    <button class="time-option${i === state.tiempoIdx ? ' is-active' : ''}" onclick="setState({ tiempoIdx: ${i} })">${esc(op.etiqueta)}</button>`).join('');

  return `
    <div>
      <div class="accion-eyebrow">${esc(sel.linea)} · REF ${esc(sel.ref)} · TALLA ${esc(sel.talla)}</div>
      <h1 class="accion-title">Faltan ${sel.faltan} unidades. Decide de dónde salen.</h1>

      <div class="card">
        <div class="card-label">Préstamo entre tiendas</div>
        ${tiendasHtml}
        <div class="assign-footer">
          <div class="assign-progress">
            <div class="assign-progress-row">
              <span class="label">Asignadas ${asignado} de ${faltan} unidades</span>
              <span class="pending">${pendiente > 0 ? 'faltan ' + pendiente : 'faltante cubierto'}</span>
            </div>
            <div class="progress-track">
              <div class="progress-fill" style="width:${anchoBarra}%"></div>
            </div>
          </div>
          <button class="btn-send ${puedeEnviar ? 'is-active' : 'is-disabled'}" ${puedeEnviar ? '' : 'disabled'} onclick="enviarSolicitud()">${puedeEnviar ? 'Enviar solicitud · ' + asignado + ' und' : 'Enviar solicitud'}</button>
        </div>
      </div>

      <div class="divider-row">
        <span class="divider-line"></span>
        <span class="divider-text">o prodúcela en planta</span>
        <span class="divider-line"></span>
      </div>

      <div class="planta-card">
        <div>
          <div class="planta-label">Cantidad a producir</div>
          <div class="planta-qty">
            <button class="qty-btn" onclick="setState({ cantidadPlanta: Math.max(10, ${cantidadPlanta} - ${pasoPlanta}) })">−</button>
            <input class="planta-input" value="${cantidadPlanta}" onchange="setState({ cantidadPlanta: Math.max(0, parseInt(this.value || '0', 10)) })" />
            <button class="qty-btn" onclick="setState({ cantidadPlanta: ${cantidadPlanta} + ${pasoPlanta} })">+</button>
          </div>
        </div>
        <div class="tiempo-flex">
          <div class="planta-label">Tiempo estimado</div>
          <div class="time-options">${tiemposHtml}</div>
        </div>
        <button class="btn-outline" onclick="marcarCurso()">Marcar en curso</button>
      </div>
    </div>`;
}

function enviarSolicitud() {
  const sel = computeSel();
  const asignado = state.asign.reduce((a, b) => a + (b || 0), 0);
  if (asignado <= 0) return;
  setState({ fase: 'seguimiento', modo: 'prestamo' });
}

function marcarCurso() {
  setState({ fase: 'seguimiento', modo: 'planta' });
}

function renderAccionSeguimiento() {
  const sel = computeSel();
  const faltan = sel.faltan;
  const esPrestamo = state.modo === 'prestamo';
  const asignado = state.asign.reduce((a, b) => a + (b || 0), 0);
  const cantidadPlanta = state.cantidadPlanta || faltan;

  const resumen = esPrestamo
    ? TIENDAS.map((t, i) => ({ k: t.tienda, v: (state.asign[i] || 0) + ' und' }))
        .filter((r) => parseInt(r.v) > 0)
        .concat([{ k: 'Total solicitado', v: asignado + ' de ' + faltan + ' und' }])
    : [
        { k: 'Cantidad a producir', v: cantidadPlanta + ' und' },
        { k: 'Etapa actual', v: sel.etapa },
        { k: 'Turno', v: TIEMPOS[state.tiempoIdx].etiqueta }
      ];

  const resumenHtml = resumen.map((r) => `
    <div class="summary-row">
      <span class="summary-key">${esc(r.k)}</span>
      <span class="summary-val">${esc(r.v)}</span>
    </div>`).join('');

  const notaHtml = state.notaGuardada ? `
    <div class="notice-box">
      <div class="notice-label">Novedad registrada</div>
      <div class="notice-text">${esc(state.notaGuardada)}</div>
    </div>` : '';

  return `
    <div>
      <div class="accion-eyebrow">${esc(sel.ref)} · TALLA ${esc(sel.talla)}</div>
      <h1 class="accion-title sm">${esPrestamo ? 'Solicitud de préstamo enviada.' : 'En curso en planta.'}</h1>

      <div class="card">
        <div class="follow-header">
          <div>
            <div class="follow-label">Listo estimado</div>
            <div class="follow-value">${esPrestamo ? '09:30' : esc(TIEMPOS[state.tiempoIdx].hora)}</div>
          </div>
          <div class="follow-note">Te notificamos a esa hora. Si nadie la marca como lista, queda pendiente de novedad.</div>
        </div>
        ${resumenHtml}
        ${notaHtml}
        <div class="follow-footer">
          <button class="link-underline" onclick="setState({ fase: 'novedad' })">Registrar novedad o retraso</button>
          <button class="btn-listo" onclick="setState({ fase: 'solucionado' })">Marcar como listo</button>
        </div>
      </div>
    </div>`;
}

function renderAccionNovedad() {
  const razonesHtml = RAZONES.map((r) => `
    <button class="reason-chip${state.razon === r ? ' is-active' : ''}" onclick="setState({ razon: ${JSON.stringify(r)} })">${esc(r)}</button>`).join('');

  return `
    <div>
      <h1 class="accion-title xs">¿Por qué no quedó lista a tiempo?</h1>
      <div class="panel">
        <div class="reason-chips">${razonesHtml}</div>
        <textarea class="nota-textarea" placeholder="Detalle para el equipo de planta (opcional)" onchange="setState({ nota: this.value })">${esc(state.nota)}</textarea>
        <div class="novedad-footer">
          <button class="btn-cancel" onclick="setState({ fase: 'seguimiento' })">Cancelar</button>
          <button class="btn-guardar" onclick="guardarNovedad()">Guardar novedad</button>
        </div>
      </div>
    </div>`;
}

function guardarNovedad() {
  setState({
    fase: 'seguimiento',
    notaGuardada: (state.razon || 'Sin categoría') + (state.nota ? ' · ' + state.nota : '')
  });
}

function renderAccionSolucionado() {
  const sel = computeSel();
  const esPrestamo = state.modo === 'prestamo';
  const asignado = state.asign.reduce((a, b) => a + (b || 0), 0);
  const cantidadPlanta = state.cantidadPlanta || sel.faltan;
  const titulo = esPrestamo
    ? asignado + ' unidades trasladadas y recibidas.'
    : cantidadPlanta + ' unidades terminadas en planta.';
  const detalle = sel.ref + ' talla ' + sel.talla + ' · marcada lista por Julián C. a las ' +
    (esPrestamo ? '09:24' : TIEMPOS[state.tiempoIdx].hora) + '. Sale de la lista de hoy.';

  return `
    <div>
      <div class="success-box">
        <div class="success-eyebrow">Solucionado</div>
        <h1 class="success-title">${esc(titulo)}</h1>
        <div class="success-detail">${esc(detalle)}</div>
      </div>
      <button class="btn-volver" onclick="ir('lista')">Volver a la prioridad del día</button>
    </div>`;
}

function renderAccion() {
  let inner;
  if (state.fase === 'seguimiento') inner = renderAccionSeguimiento();
  else if (state.fase === 'novedad') inner = renderAccionNovedad();
  else if (state.fase === 'solucionado') inner = renderAccionSolucionado();
  else inner = renderAccionAsignar();

  const sel = computeSel();

  return `
    <div class="page-accion">
      <button class="back-link" onclick="ir('detalle')">← <span>${esc(sel.etiquetaCorta)}</span></button>
      ${inner}
    </div>`;
}

function render() {
  const app = document.getElementById('app');
  if (state.pantalla === 'detalle') {
    app.innerHTML = renderDetalle();
  } else if (state.pantalla === 'accion') {
    app.innerHTML = renderAccion();
  } else {
    app.innerHTML = renderLista();
  }
}

render();
