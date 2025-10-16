import React, { useState } from 'react'

function FormPedido() {
  const [descripción, setDescripción] = useState("");
  const [categoría, setCategoría] = useState("");
  const [tipo, setTipo] = useState("");
  const [monto, setMonto] = useState(0);
  const [fecha, setFecha] = useState();

  const categorías = ["alimentación", "transporte", "ocio", "expensas", "farmacia"];
  const tipos = ["Ingreso", "Gasto"];

  const handleSubmit = (event) => {
    event.preventDefault();
    const valido = validarForm();
    setEsValido(valido);

    if (valido) {
      const nuevoMovimiento = {
        Descripción: descripción,
        Categoría: categoría,
        Fecha: fecha,
        Monto: fecha,
        Tipo: tipo
      };

      console.log("✅ Movimiento creado:", nuevoMovimiento);
      alert("✅ Movimiento creado!");

        //Agregar a LocalStorage 
        //Setear campos a null

    } else {
      console.log("❌ Form inválido.");
    }
  };

  return (
    <div className="form">
      <h2>Registrar movimiento</h2>
      <form onSubmit={handleSubmit}>
        
        <label>Descripción</label>
        <input type="text" name="descripcion" value={descripción} onChange={(e) => setDescripción(e.target.value)} />
        
        <label>Categoría</label>
        <select onChange={(e) => setCategoría(e.target.value)} defaultValue="">
          <option value="" disabled>Seleccione una categoría </option>
          {categorías.map((category) => (
            <option value={category}>{category} </option>
          ))}
        </select>
        
        
        <label>Tipo</label>
        <select onChange={(e) => setTipo(e.target.value)} defaultValue="">
          <option value="" disabled>Seleccione un tipo</option>
          {tipos.map((type) => (
            <option value={type}>{type} </option>
          ))}
        </select>


        <label>Monto</label>
        <input type="number" name="monto" value={monto} onChange={(e) => setMonto(e.target.value)} />

        <label>Fecha</label>
        <input type="date" name="fecha" value={fecha} onChange={(e) => setFecha(e.target.value)} />


        
        {!esValido && <p id="msjError">El formulario NO es válido.</p>}

        <button type="submit" className="button-primary">Enviar Pedido</button>
      </form>
    </div>
  )
}

export default FormPedido