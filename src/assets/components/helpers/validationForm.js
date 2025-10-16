export const validacionTexto = (txt) => txt.length >= 3;

export const validacionMonto = (num) => !isNaN(num) && num > 0;

const todayDate = new Date();

export const validacionFecha = (date) => {
  const inputDate = new Date(date);
  return !isNaN(inputDate.getTime()) && inputDate <= todayDate;
};
