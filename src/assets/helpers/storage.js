const KEY = 'movimientos';

export function getMovimientos() {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function saveMovimientos(arr) {
  localStorage.setItem(KEY, JSON.stringify(arr));
}

export function addMovimiento(data) {
  const all = getMovimientos();
  const withId = { ...data, id: crypto.randomUUID() };
  all.push(withId);
  saveMovimientos(all);
  return withId;
}

export function updateMovimiento(id, data) {
  const all = getMovimientos();
  const idx = all.findIndex(m => m.id === id);
  if (idx !== -1) {
    all[idx] = { ...all[idx], ...data, id };
    saveMovimientos(all);
    return all[idx];
  }
  return null;
}

export function deleteMovimiento(id) {
  const all = getMovimientos().filter(m => m.id !== id);
  saveMovimientos(all);
}

export function getMovimientoById(id) {
  return getMovimientos().find(m => m.id === id) || null;
}

export function seedIfEmpty() {
  const current = getMovimientos();
  if (current.length === 0) {
    const seed = [
      { id: crypto.randomUUID(), descripcion: 'Sueldo', categoria: 'Ingreso', tipo: 'ingreso', monto: 500000, fecha: '2025-10-01' },
      { id: crypto.randomUUID(), descripcion: 'Supermercado', categoria: 'Alimentación', tipo: 'gasto', monto: 68000, fecha: '2025-10-05' },
      { id: crypto.randomUUID(), descripcion: 'SUBE', categoria: 'Transporte', tipo: 'gasto', monto: 2500, fecha: '2025-10-06' },
    ];
    saveMovimientos(seed);
  }
}
