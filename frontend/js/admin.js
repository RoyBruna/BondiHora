const API = API_BASE_URL;
let token = '';
let allRoutes = [];
let allCities = [];
let allCompanies = [];
let currentScheduleRouteId = null;
let currentDay = 'WEEKDAYS';
let drawerMode = null;
let editTarget = null;

document.addEventListener('DOMContentLoaded', function() {
  document.getElementById('loginBtn').addEventListener('click', login);
  document.getElementById('adminPassword').addEventListener('keydown', function(e) {
    if (e.key === 'Enter') login();
  });

  document.getElementById('nav-routes').addEventListener('click', function() { navigate('routes', this); });
  document.getElementById('nav-schedules').addEventListener('click', function() { navigate('schedules', this); });
  document.getElementById('nav-alerts').addEventListener('click', function() { navigate('alerts', this); });
  document.getElementById('nav-system').addEventListener('click', function() { navigate('system', this); });

  document.getElementById('tab-WEEKDAYS').addEventListener('click', function() { switchDay('WEEKDAYS', this); });
  document.getElementById('tab-SATURDAYS').addEventListener('click', function() { switchDay('SATURDAYS', this); });
  document.getElementById('tab-SUNDAYS').addEventListener('click', function() { switchDay('SUNDAYS', this); });

  document.getElementById('schedule-route-select').addEventListener('change', function() { loadSchedules(this.value); });
  document.getElementById('btn-new-route').addEventListener('click', function() { openDrawer('new-route'); });
  document.getElementById('btn-new-schedule').addEventListener('click', function() { openDrawer('new-schedule'); });
  document.getElementById('btn-create-alert').addEventListener('click', createAlert);

  document.getElementById('btnCloseDrawer').addEventListener('click', closeDrawer);
  document.getElementById('drawerOverlay').addEventListener('click', closeDrawerIfOutside);
});


function login() {
  const pwd = document.getElementById('adminPassword').value;
  token = 'Bearer ' + pwd;
  fetch(API + '/status').then(async function() {

    const valid = await validateToken();
    if (valid) {
      document.getElementById('authOverlay').style.display = 'none';
      init();
    } else {
      document.getElementById('authError').textContent = 'Credenciales incorrectas.';
      token = '';
    }
  }).catch(function() {
    document.getElementById('authError').textContent = 'No se pudo conectar con el servidor.';
    token = '';
  });
}

async function validateToken() {
  const res = await fetch(API + '/admin/routes', { headers: { Authorization: token } });
  return res.ok;
}

async function init() {
  await checkStatus();
  await loadReferenceData();
  loadRoutes();
  loadAlerts();
}

async function checkStatus() {
  try {
    const res = await fetch(API + '/status');
    const data = await res.json();
    document.getElementById('statusDot').className = 'status-dot online';
    document.getElementById('statusLabel').textContent = 'Conectado';
    const sysApi = document.getElementById('sys-api');
    if (sysApi) {
      const badge = document.createElement('span');
      badge.className = 'badge badge-green';
      badge.textContent = 'OK';
      sysApi.innerHTML = '';
      sysApi.appendChild(badge);
    }
    const sysTs = document.getElementById('sys-ts');
    if (sysTs) sysTs.textContent = new Date(data.timestamp).toLocaleString();
  } catch(e) {
    document.getElementById('statusLabel').textContent = 'Sin conexion';
  }
}

async function loadReferenceData() {
  const [citiesRes, companiesRes] = await Promise.all([
    fetch(API + '/admin/cities', { headers: { Authorization: token } }),
    fetch(API + '/admin/companies', { headers: { Authorization: token } })
  ]);
  allCities = await citiesRes.json();
  allCompanies = await companiesRes.json();
}

async function loadRoutes() {
  const res = await fetch(API + '/admin/routes', { headers: { Authorization: token } });
  allRoutes = await res.json();
  document.getElementById('routes-count').textContent = allRoutes.length + ' recorridos';
  const sel = document.getElementById('schedule-route-select');
  const defaultOpt = document.createElement('option');
  defaultOpt.value = '';
  defaultOpt.textContent = '-- Seleccione una linea --';
  sel.innerHTML = '';
  sel.appendChild(defaultOpt);
  allRoutes.forEach(function(r) {
    const opt = document.createElement('option');
    opt.value = r.id;
    opt.textContent = r.line + ' - ' + r.origin.name + ' > ' + r.destination.name;
    sel.appendChild(opt);
  });
  renderRoutesTable();
}

function renderRoutesTable() {
  const tbody = document.getElementById('routes-tbody');
  tbody.innerHTML = '';
  if (!allRoutes.length) {
    const tr = document.createElement('tr');
    const td = document.createElement('td');
    td.colSpan = 7;
    td.className = 'empty-state';
    td.textContent = 'Sin recorridos registrados.';
    tr.appendChild(td);
    tbody.appendChild(tr);
    return;
  }
  allRoutes.forEach(function(r) {
    const tr = document.createElement('tr');
    const count = r.schedules ? r.schedules.length : 0;

    const td1 = document.createElement('td');
    const badge = document.createElement('span');
    badge.className = 'badge badge-blue';
    badge.textContent = r.line;
    const idSpan = document.createElement('span');
    idSpan.style.cssText = 'display:block;color:var(--text-muted);font-size:11px;margin-top:2px';
    idSpan.textContent = r.id;
    td1.appendChild(badge);
    td1.appendChild(idSpan);

    const td2 = document.createElement('td');
    td2.textContent = r.origin.name + ' > ' + r.destination.name;

    const td3 = document.createElement('td');
    td3.textContent = r.company.name;

    const td4 = document.createElement('td');
    td4.textContent = r.platform || '-';

    const td5 = document.createElement('td');
    td5.style.cssText = 'display:flex;align-items:center;gap:4px;padding-top:10px';
    const inp = document.createElement('input');
    inp.className = 'inline-edit-input';
    inp.id = 'price_' + r.id;
    inp.value = r.estimatedPrice || '';
    inp.placeholder = '0.00';
    const saveBtn = document.createElement('button');
    saveBtn.className = 'btn btn-ghost btn-sm';
    saveBtn.textContent = 'OK';
    (function(routeId) { saveBtn.onclick = function() { updatePrice(routeId); }; })(r.id);
    td5.appendChild(inp);
    td5.appendChild(saveBtn);

    const td6 = document.createElement('td');
    const countBadge = document.createElement('span');
    countBadge.className = 'badge badge-gray';
    countBadge.textContent = count + ' horarios';
    td6.appendChild(countBadge);

    const td7 = document.createElement('td');
    td7.style.cssText = 'display:flex;gap:6px;padding-top:8px';
    const editBtn = document.createElement('button');
    editBtn.className = 'btn btn-ghost btn-sm';
    editBtn.textContent = 'Editar';
    (function(routeId) { editBtn.onclick = function() { openDrawer('edit-route', routeId); }; })(r.id);
    const delBtn = document.createElement('button');
    delBtn.className = 'btn btn-danger';
    delBtn.textContent = 'Eliminar';
    (function(routeId) { delBtn.onclick = function() { deleteRoute(routeId); }; })(r.id);
    td7.appendChild(editBtn);
    td7.appendChild(delBtn);

    tr.appendChild(td1); tr.appendChild(td2); tr.appendChild(td3);
    tr.appendChild(td4); tr.appendChild(td5); tr.appendChild(td6); tr.appendChild(td7);
    tbody.appendChild(tr);
  });
}

async function updatePrice(routeId) {
  const price = document.getElementById('price_' + routeId).value;
  const r = allRoutes.find(function(x) { return x.id === routeId; });
  const res = await fetch(API + '/admin/routes/' + routeId, {
    method: 'PUT',
    headers: { Authorization: token, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      estimatedPrice: price, line: r.line, platform: r.platform,
      originId: r.originId, destinationId: r.destinationId, companyId: r.companyId
    })
  });
  if (res.ok) { toast('Tarifa actualizada.', 'success'); }
  else { toast('Error al guardar.', 'error'); }
}

async function deleteRoute(id) {
  if (!confirm('Se eliminaran TODOS los horarios de esta linea. Confirmar?')) return;
  const res = await fetch(API + '/admin/routes/' + id, { method: 'DELETE', headers: { Authorization: token } });
  if (res.ok) { toast('Linea eliminada.', 'success'); loadRoutes(); }
  else { toast('Error al eliminar.', 'error'); }
}

async function loadSchedules(routeId) {
  if (!routeId) { document.getElementById('schedules-panel').style.display = 'none'; return; }
  currentScheduleRouteId = routeId;
  document.getElementById('schedules-panel').style.display = 'block';
  renderSchedulesForDay(currentDay);
}

async function renderSchedulesForDay(day) {
  if (!currentScheduleRouteId) return;
  const res = await fetch(API + '/admin/routes/' + currentScheduleRouteId + '/schedules', { headers: { Authorization: token } });
  const all = await res.json();
  const filtered = all.filter(function(s) { return s.dayType === day; });
  const tbody = document.getElementById('schedules-tbody');
  tbody.innerHTML = '';
  if (!filtered.length) {
    const tr = document.createElement('tr');
    const td = document.createElement('td');
    td.colSpan = 4;
    td.className = 'empty-state';
    td.textContent = 'Sin horarios para este dia.';
    tr.appendChild(td);
    tbody.appendChild(tr);
    return;
  }
  filtered.forEach(function(s) {
    const tr = document.createElement('tr');
    const td1 = document.createElement('td');
    const strong = document.createElement('strong');
    strong.textContent = s.time;
    td1.appendChild(strong);
    const td2 = document.createElement('td');
    td2.textContent = s.service || '-';
    const td3 = document.createElement('td');
    td3.textContent = s.via || '-';
    const td4 = document.createElement('td');
    td4.style.cssText = 'display:flex;gap:6px';
    const editBtn = document.createElement('button');
    editBtn.className = 'btn btn-ghost btn-sm';
    editBtn.textContent = 'Editar';
    (function(sc) { editBtn.onclick = function() { openDrawer('edit-schedule', sc.id, sc.time, sc.dayType, sc.service || '', sc.via || ''); }; })(s);
    const delBtn = document.createElement('button');
    delBtn.className = 'btn btn-danger';
    delBtn.textContent = 'x';
    (function(sid) { delBtn.onclick = function() { deleteSchedule(sid); }; })(s.id);
    td4.appendChild(editBtn);
    td4.appendChild(delBtn);
    tr.appendChild(td1); tr.appendChild(td2); tr.appendChild(td3); tr.appendChild(td4);
    tbody.appendChild(tr);
  });
}

function switchDay(day, el) {
  currentDay = day;
  document.querySelectorAll('.day-tab').forEach(function(t) { t.classList.remove('active'); });
  el.classList.add('active');
  const labels = { WEEKDAYS: 'Horarios Lun-Vie', SATURDAYS: 'Horarios Sabados', SUNDAYS: 'Horarios Domingos' };
  document.getElementById('schedule-day-label').textContent = labels[day];
  renderSchedulesForDay(day);
}

async function deleteSchedule(id) {
  if (!confirm('Eliminar este horario?')) return;
  const res = await fetch(API + '/admin/schedules/' + id, { method: 'DELETE', headers: { Authorization: token } });
  if (res.ok) { toast('Horario eliminado.', 'success'); renderSchedulesForDay(currentDay); }
  else { toast('Error.', 'error'); }
}

async function loadAlerts() {
  const res = await fetch(API + '/alerts');
  const alerts = await res.json();
  const container = document.getElementById('activeAlertsContainer');
  container.innerHTML = '';
  if (!alerts.length) {
    const empty = document.createElement('div');
    empty.className = 'empty-state';
    empty.textContent = 'No hay alertas activas.';
    container.appendChild(empty);
    return;
  }
  const sevColors = { gray: 'var(--gray)', green: 'var(--success)', yellow: 'var(--warn)', red: 'var(--danger)' };
  alerts.forEach(function(a) {
    const div = document.createElement('div');
    const color = sevColors[a.severity] || 'var(--gray)';
    div.style.cssText = 'border-left:3px solid ' + color + ';padding:10px 14px;margin-bottom:8px;background:var(--bg-surface)';

    const row = document.createElement('div');
    row.style.cssText = 'display:flex;justify-content:space-between;align-items:center';
    const tag = document.createElement('span');
    tag.style.cssText = 'font-size:10px;font-weight:600;letter-spacing:1px;text-transform:uppercase;color:' + color;
    tag.textContent = a.tag;
    const btn = document.createElement('button');
    btn.className = 'btn btn-danger btn-sm';
    btn.textContent = 'Retirar';
    (function(aid) { btn.onclick = function() { deleteAlert(aid); }; })(a.id);
    row.appendChild(tag);
    row.appendChild(btn);

    const titleEl = document.createElement('div');
    titleEl.style.cssText = 'font-weight:600;font-size:13px;margin:4px 0';
    titleEl.textContent = a.title;
    const detailEl = document.createElement('div');
    detailEl.style.cssText = 'font-size:12px;color:var(--text-sec)';
    detailEl.textContent = a.detail;
    const dateEl = document.createElement('div');
    dateEl.style.cssText = 'font-size:10px;color:var(--text-muted);margin-top:4px';
    dateEl.textContent = new Date(a.createdAt).toLocaleString();

    div.appendChild(row); div.appendChild(titleEl); div.appendChild(detailEl); div.appendChild(dateEl);
    container.appendChild(div);
  });
}

async function createAlert() {
  const tag = document.getElementById('alertTag').value.trim();
  const title = document.getElementById('alertTitle').value.trim();
  const detail = document.getElementById('alertDetail').value.trim();
  const severity = document.getElementById('alertSeverity').value;
  if (!tag || !title || !detail) { toast('Complete todos los campos.', 'error'); return; }
  const res = await fetch(API + '/alerts', {
    method: 'POST',
    headers: { Authorization: token, 'Content-Type': 'application/json' },
    body: JSON.stringify({ tag, title, detail, severity })
  });
  if (res.ok) {
    document.getElementById('alertTag').value = '';
    document.getElementById('alertTitle').value = '';
    document.getElementById('alertDetail').value = '';
    toast('Alerta emitida al sistema.', 'success');
    loadAlerts();
  } else { toast('Error al crear alerta.', 'error'); }
}

async function deleteAlert(id) {
  if (!confirm('Retirar esta alerta del sistema?')) return;
  const res = await fetch(API + '/alerts/' + id, { method: 'DELETE', headers: { Authorization: token } });
  if (res.ok) { toast('Alerta retirada.', 'success'); loadAlerts(); }
  else { toast('Error.', 'error'); }
}

function navigate(section, el) {
  document.querySelectorAll('.nav-item').forEach(function(n) { n.classList.remove('active'); });
  document.querySelectorAll('.section-view').forEach(function(s) { s.classList.remove('active'); });
  el.classList.add('active');
  document.getElementById('section-' + section).classList.add('active');
  const titles = {
    routes:    ['Recorridos',          'Gestion de lineas y tarifas'],
    schedules: ['Horarios',            'Gestion de horarios por recorrido'],
    alerts:    ['Alertas',             'Broadcast en tiempo real a usuarios'],
    system:    ['Estado del Sistema',  'Salud de conexiones y API']
  };
  document.getElementById('pageTitle').textContent = titles[section][0];
  document.getElementById('pageSub').textContent = titles[section][1];
  if (section === 'system') checkStatus();
}

function openDrawer(mode, id, time, dayType, service, via) {
  drawerMode = mode;
  editTarget = id;
  document.getElementById('drawerOverlay').classList.add('open');
  const body = document.getElementById('drawerBody');
  const footer = document.getElementById('drawerFooter');

  function makeFooter(cancelLabel, saveLabel, saveFn, saveClass) {
    footer.innerHTML = '';
    const cancelBtn = document.createElement('button');
    cancelBtn.className = 'btn btn-ghost';
    cancelBtn.textContent = cancelLabel;
    cancelBtn.onclick = closeDrawer;
    const saveBtn = document.createElement('button');
    saveBtn.className = 'btn ' + (saveClass || 'btn-primary');
    saveBtn.textContent = saveLabel;
    saveBtn.onclick = saveFn;
    footer.appendChild(cancelBtn);
    footer.appendChild(saveBtn);
  }

  if (mode === 'new-route') {
    document.getElementById('drawerTitle').textContent = 'Nueva Linea';
    body.innerHTML = '';
    body.appendChild(buildRouteForm(null));
    makeFooter('Cancelar', 'Guardar Linea', function() { saveRoute(false); }, 'btn-primary');
  } else if (mode === 'edit-route') {
    const r = allRoutes.find(function(x) { return x.id === id; });
    document.getElementById('drawerTitle').textContent = 'Editar Linea';
    body.innerHTML = '';
    body.appendChild(buildRouteForm(r));
    makeFooter('Cancelar', 'Actualizar', function() { saveRoute(true); }, 'btn-primary');
  } else if (mode === 'new-schedule') {
    document.getElementById('drawerTitle').textContent = 'Agregar Horario';
    body.innerHTML = '';
    body.appendChild(buildScheduleForm(null, currentDay));
    makeFooter('Cancelar', 'Agregar', function() { saveSchedule(false); }, 'btn-success');
  } else if (mode === 'edit-schedule') {
    document.getElementById('drawerTitle').textContent = 'Editar Horario';
    body.innerHTML = '';
    body.appendChild(buildScheduleForm({ id: id, time: time, dayType: dayType, service: service, via: via }, null));
    makeFooter('Cancelar', 'Guardar Cambios', function() { saveSchedule(true); }, 'btn-primary');
  }
}

function makeSelect(id, options, selectedValue) {
  const sel = document.createElement('select');
  sel.className = 'form-select';
  sel.id = id;
  options.forEach(function(o) {
    const opt = document.createElement('option');
    opt.value = o.value;
    opt.textContent = o.label;
    if (o.value === selectedValue) opt.selected = true;
    sel.appendChild(opt);
  });
  return sel;
}

function makeInput(id, value, placeholder, readonly) {
  const inp = document.createElement('input');
  inp.className = 'form-input';
  inp.id = id;
  inp.value = value || '';
  inp.placeholder = placeholder || '';
  if (readonly) inp.readOnly = true;
  return inp;
}

function makeFormGroup(labelText, el) {
  const div = document.createElement('div');
  div.className = 'form-group';
  const lbl = document.createElement('label');
  lbl.className = 'form-label';
  lbl.textContent = labelText;
  div.appendChild(lbl);
  div.appendChild(el);
  return div;
}

function buildRouteForm(r) {
  const wrap = document.createElement('div');

  const idGroup = makeFormGroup('ID de Ruta (unico, sin espacios)',
    makeInput('f-id', r ? r.id : '', 'ej: cata-tup-men-01', r ? true : false));
  idGroup.style.marginBottom = '14px';
  wrap.appendChild(idGroup);

  const row1 = document.createElement('div');
  row1.className = 'form-row cols-2';
  const cityOpts = allCities.map(function(c) { return { value: c.id, label: c.name }; });
  row1.appendChild(makeFormGroup('Origen', makeSelect('f-origin', cityOpts, r ? r.originId : '')));
  row1.appendChild(makeFormGroup('Destino', makeSelect('f-dest', cityOpts, r ? r.destinationId : '')));
  wrap.appendChild(row1);

  const row2 = document.createElement('div');
  row2.className = 'form-row cols-2';
  const compOpts = allCompanies.map(function(c) { return { value: c.id, label: c.name }; });
  row2.appendChild(makeFormGroup('Empresa', makeSelect('f-company', compOpts, r ? r.companyId : '')));
  row2.appendChild(makeFormGroup('Nombre de Linea', makeInput('f-line', r ? r.line : '', 'Ej: CATA Mendoza', false)));
  wrap.appendChild(row2);

  const row3 = document.createElement('div');
  row3.className = 'form-row cols-2';
  row3.appendChild(makeFormGroup('Plataforma', makeInput('f-platform', r ? r.platform : '', 'Ej: 3', false)));
  row3.appendChild(makeFormGroup('Tarifa', makeInput('f-price', r ? r.estimatedPrice : '', '0.00', false)));
  wrap.appendChild(row3);

  return wrap;
}

function buildScheduleForm(s, defaultDay) {
  const day = s ? s.dayType : (defaultDay || 'WEEKDAYS');
  const wrap = document.createElement('div');

  const row1 = document.createElement('div');
  row1.className = 'form-row cols-2';
  row1.appendChild(makeFormGroup('Hora (HH:MM)', makeInput('f-time', s ? s.time : '', '08:30', false)));
  const dayOpts = [
    { value: 'WEEKDAYS', label: 'Lunes a Viernes' },
    { value: 'SATURDAYS', label: 'Sabados' },
    { value: 'SUNDAYS', label: 'Domingos' }
  ];
  row1.appendChild(makeFormGroup('Dia', makeSelect('f-daytype', dayOpts, day)));
  wrap.appendChild(row1);

  const row2 = document.createElement('div');
  row2.className = 'form-row cols-2';
  row2.appendChild(makeFormGroup('Tipo de Servicio', makeInput('f-service', s ? s.service : '', 'Directo, Semi-directo', false)));
  row2.appendChild(makeFormGroup('Via (opcional)', makeInput('f-via', s ? s.via : '', 'Ej: Cordon', false)));
  wrap.appendChild(row2);

  return wrap;
}

async function saveRoute(isEdit) {
  const payload = {
    id:             document.getElementById('f-id').value.trim(),
    originId:       document.getElementById('f-origin').value,
    destinationId:  document.getElementById('f-dest').value,
    companyId:      document.getElementById('f-company').value,
    line:           document.getElementById('f-line').value.trim(),
    platform:       document.getElementById('f-platform').value.trim() || null,
    estimatedPrice: document.getElementById('f-price').value.trim() || null
  };
  if (!payload.id || !payload.line) { toast('ID y Nombre de linea son requeridos.', 'error'); return; }
  const url = isEdit ? API + '/admin/routes/' + editTarget : API + '/admin/routes';
  const res = await fetch(url, {
    method: isEdit ? 'PUT' : 'POST',
    headers: { Authorization: token, 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });
  if (res.ok) {
    toast(isEdit ? 'Linea actualizada.' : 'Linea creada exitosamente.', 'success');
    closeDrawer();
    loadRoutes();
  } else {
    const e = await res.json();
    toast('Error: ' + e.error, 'error');
  }
}

async function saveSchedule(isEdit) {
  const payload = {
    routeId: currentScheduleRouteId,
    time:    document.getElementById('f-time').value.trim(),
    dayType: document.getElementById('f-daytype').value,
    service: document.getElementById('f-service').value.trim() || null,
    via:     document.getElementById('f-via').value.trim() || null
  };
  if (!payload.time) { toast('La hora es requerida.', 'error'); return; }
  const url = isEdit ? API + '/admin/schedules/' + editTarget : API + '/admin/schedules';
  const res = await fetch(url, {
    method: isEdit ? 'PUT' : 'POST',
    headers: { Authorization: token, 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });
  if (res.ok) {
    toast(isEdit ? 'Horario actualizado.' : 'Horario agregado.', 'success');
    closeDrawer();
    renderSchedulesForDay(currentDay);
  } else { toast('Error guardando el horario.', 'error'); }
}

function closeDrawer() {
  document.getElementById('drawerOverlay').classList.remove('open');
  drawerMode = null;
  editTarget = null;
}

function closeDrawerIfOutside(e) {
  if (e.target === document.getElementById('drawerOverlay')) closeDrawer();
}

function toast(msg, type) {
  const c = document.getElementById('toast-container');
  const t = document.createElement('div');
  t.className = 'toast toast-' + (type || 'info');
  t.textContent = msg;
  c.appendChild(t);
  setTimeout(function() { if (t.parentNode) t.remove(); }, 3500);
}
