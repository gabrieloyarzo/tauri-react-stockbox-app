export const iProduct = {
	cod: ["Código", "string"],
	nombre: ["Nombre", "string"],
	cat: ["Categoría", "string"],
	cit: ["Cantidad", "number"],
	mCit: ["Cantidad mínima", "number"],
	precio: ["Precio", "number"],
};

export const iUser = {
	rutu: ["RUT", "string"],
	email: ["Correo", "string"],
	nombre: ["Nombre", "string"],
	apellido: ["Apellido", "string"],
	rol: ["Rol", "string"],
};

export const iPurchase = {	
	cod: ["Código", "string"],
	rutp: ["RUT del proveedor", "string"],
	rutu: ["RUT del usuario", "string"],
	fecha: ["Fecha", "date"],
	total: ["Total", "number"],
};

export const iProvider = {
	rutp: ["RUT", "string"],
	nombre: ["Nombre", "string"],
	lugar: ["Dirección", "string"],
	numero: ["Teléfono", "string"],
	tipo: ["Tipo", "string"],
};

export const iSales = {
	cod: ["Código", "string"],
	rutc: ["RUT del cliente", "string"],
	rutu: ["RUT del usuario", "string"],
	fecha: ["Fecha", "date"],
	total: ["Precio", "number"],
};

export const iRefund = {
	idr: ["refund_id", "string"],
	ids: ["sale_id", "string"],
	cod: ["code", "string"],
	fecha: ["date", "date"],
	desc: ["description", "string"],
	nota: ["note_refund", "string"],
};

