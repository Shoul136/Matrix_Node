export enum RequisicionEstatus{
    Pendiente = "Pendiente",
    Aprobada = "Aprobada",
    Rechazada = "Rechazada"
}

export enum ProyectoEstatus{
    Curso = "Curso",
    Finalizado = "Finalizado",
    Cancelado = "Cancelado"
}

export enum OrdenCompraEstatus{
    PendienteDeCotizaciones = 1,
    EnCotizacion = 2,
    PendienteSeleccionIngeniero = 3,
    PendienteAprobacionGerente = 4,
    Aprobada = 5,
    Rechazada = 6,
    Cancelada = 7,
    EmitidaPO = 8,
    RecibidaParcial = 9,
    RecibidaCompleta = 10,
    Cerrada = 11
}

export enum MaterialEstatus{
    Activo = "Activo",
    Inactivo = "Inactivo"
}