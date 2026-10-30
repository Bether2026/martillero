/* ═══════════════════════════════════════════════════════════
   IGNACIO FERRÁN · DATOS (demo)
   Remates y propiedades del sitio. Para cargar uno nuevo,
   sumá un objeto al arreglo que corresponda.
   Las fotos son IDs de Unsplash (la parte después de "photo-").
═══════════════════════════════════════════════════════════ */
window.DATOS = {

  /* WhatsApp de destino (el de Bether Studio, porque es una demo) */
  whatsapp: '5491145309135',

  /* days: cuántos días faltan desde hoy, así la demo siempre muestra fechas futuras */
  lotes: [
    { titulo:'Casa 4 ambientes con parque', lugar:'Banfield Oeste', tipo:'Judicial', days:9, hora:'11:00',
      base:'USD 98.000', m2:'240 m²', amb:'4 amb.', foto:'1721815693498-cc28507c0ba2',
      exhibicion:'Sábado de 10 a 12 h', saldo:'Al aprobarse la subasta', expte:'Expte. N.º 00000/2025 (ficticio)',
      desc:'Casa en dos plantas sobre lote de 10 × 30 m, con parque, galería y cochera para dos autos. Se vende en el estado en que se encuentra.' },
    { titulo:'Departamento 3 ambientes con balcón', lugar:'Lomas de Zamora centro', tipo:'Particular', days:16, hora:'17:30',
      base:'USD 72.000', m2:'74 m²', amb:'3 amb.', foto:'1665249934445-1de680641f50',
      exhibicion:'Jueves y viernes de 15 a 17 h', saldo:'A los 30 días, contra escritura', expte:'',
      desc:'Piso alto, luminoso, con balcón corrido al frente y amenities. A tres cuadras de la estación.' },
    { titulo:'Local comercial en esquina', lugar:'Temperley', tipo:'Judicial', days:23, hora:'10:30',
      base:'USD 145.000', m2:'120 m²', amb:'Planta libre', foto:'1560922604-d08a31f8f7d1',
      exhibicion:'Martes de 9 a 11 h', saldo:'Al aprobarse la subasta', expte:'Expte. N.º 00000/2024 (ficticio)',
      desc:'Local en esquina de alto tránsito, con vidriera sobre dos frentes, depósito y baño.' }
  ],

  /* valor: número para ordenar (USD en venta, pesos por mes en alquiler) */
  propiedades: [
    { cod:'P-101', op:'venta', tipo:'Casa', titulo:'Casa 5 ambientes con pileta', lugar:'Adrogué', precio:'USD 285.000', valor:285000,
      m2:320, amb:5, banos:3, cochera:'2 autos', antig:'8 años',
      gal:['1613977257363-707ba9348227','1628592102751-ba83b0314276','1772797583328-f83bc3f94f80','1706808849780-7a04fbac83ef'],
      desc:'Casa moderna en el corazón de Adrogué, con jardín, pileta climatizada y quincho. Living de doble altura, cocina integrada y suite principal con vestidor.' },
    { cod:'P-102', op:'venta', tipo:'Casa', titulo:'Casa moderna de 4 ambientes', lugar:'Banfield', precio:'USD 198.000', valor:198000,
      m2:210, amb:4, banos:2, cochera:'1 auto', antig:'5 años',
      gal:['1600596542815-ffad4c1539a9','1738168246881-40f35f8aba0a','1665249934445-1de680641f50','1613575831056-0acd5da8f085'],
      desc:'Construcción reciente con grandes ventanales, losa radiante y terraza accesible. Ideal familia.' },
    { cod:'P-103', op:'venta', tipo:'Departamento', titulo:'Departamento 2 ambientes a estrenar', lugar:'Lomas de Zamora', precio:'USD 89.000', valor:89000,
      m2:52, amb:2, banos:1, cochera:'Opcional', antig:'A estrenar',
      gal:['1628592102751-ba83b0314276','1630699294897-723e02620662','1738168279272-c08d6dd22002','1621831337128-35676ca30868'],
      desc:'Edificio con amenities a metros del centro comercial. Balcón al frente y excelentes terminaciones.' },
    { cod:'P-104', op:'alquiler', tipo:'Departamento', titulo:'Departamento 3 ambientes luminoso', lugar:'Temperley', precio:'$ 650.000', mes:true, valor:650000,
      m2:78, amb:3, banos:2, cochera:'No', antig:'15 años',
      gal:['1772797583328-f83bc3f94f80','1737233459465-8eaf6c7d8856','1738168246881-40f35f8aba0a','1665249934445-1de680641f50'],
      desc:'Piso alto con vista abierta, dos baños completos y lavadero independiente. Expensas moderadas.' },
    { cod:'P-105', op:'alquiler', tipo:'Local / Oficina', titulo:'Oficina en torre corporativa', lugar:'Lomas de Zamora', precio:'$ 480.000', mes:true, valor:480000,
      m2:64, amb:2, banos:1, cochera:'1 auto', antig:'10 años',
      gal:['1621831337128-35676ca30868','1602150137620-510810591dff','1613575831056-0acd5da8f085','1707823942892-3316eeb091a0'],
      desc:'Oficina en piso alto con recepción, seguridad las 24 h y sala de reuniones compartida.' },
    { cod:'P-106', op:'venta', tipo:'Casa', titulo:'Casa con parque y quincho', lugar:'Burzaco', precio:'USD 156.000', valor:156000,
      m2:260, amb:4, banos:2, cochera:'2 autos', antig:'20 años',
      gal:['1580587771525-78b9dba3b914','1738168279272-c08d6dd22002','1737233459465-8eaf6c7d8856','1757524492552-d47a66a2b63e'],
      desc:'Amplia casa sobre lote de 600 m² con parque, quincho con parrilla y pileta. Barrio residencial tranquilo.' },
    { cod:'P-107', op:'alquiler', tipo:'Departamento', titulo:'Monoambiente amueblado', lugar:'Banfield', precio:'$ 420.000', mes:true, valor:420000,
      m2:38, amb:1, banos:1, cochera:'No', antig:'3 años',
      gal:['1630699294897-723e02620662','1628592102751-ba83b0314276','1772797583328-f83bc3f94f80','1613575831056-0acd5da8f085'],
      desc:'Monoambiente equipado y amueblado, listo para entrar. Ideal estudiantes o profesionales.' }
  ]
};
