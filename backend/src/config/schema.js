export const DB_SCHEMA = {
    vendedores: {
        id: 'SERIAL PRIMARY KEY',
        nombre: 'VARCHAR(100) NOT NULL',
        apellido: 'VARCHAR(100) NOT NULL',
        email: 'VARCHAR(150) UNIQUE NOT NULL',
        telefono: 'VARCHAR(20)',
        equipo_id: 'INTEGER REFERENCES equipos(id)',
        fecha_ingreso: 'DATE DEFAULT CURRENT_DATE',
        activo: 'BOOLEAN DEFAULT true',
        created_at: 'TIMESTAMP DEFAULT CURRENT_TIMESTAMP',
        updated_at: 'TIMESTAMP DEFAULT CURRENT_TIMESTAMP'
    },
    equipos: {
        id: 'SERIAL PRIMARY KEY',
        nombre: 'VARCHAR(100) NOT NULL',
        descripcion: 'TEXT',
        lider_id: 'INTEGER REFERENCES vendedores(id)',
        meta_mensual: 'DECIMAL(12,2) DEFAULT 0',
        activo: 'BOOLEAN DEFAULT true',
        created_at: 'TIMESTAMP DEFAULT CURRENT_TIMESTAMP',
        updated_at: 'TIMESTAMP DEFAULT CURRENT_TIMESTAMP'
    },
    ventas: {
        id: 'SERIAL PRIMARY KEY',
        vendedor_id: 'INTEGER NOT NULL REFERENCES vendedores(id)',
        cliente_nombre: 'VARCHAR(150) NOT NULL',
        producto_servicio: 'VARCHAR(200) NOT NULL',
        monto: 'DECIMAL(12,2) NOT NULL',
        fecha_venta: 'DATE DEFAULT CURRENT_DATE',
        estado: "VARCHAR(50) DEFAULT 'completada'",
        observaciones: 'TEXT',
        created_at: 'TIMESTAMP DEFAULT CURRENT_TIMESTAMP',
        updated_at: 'TIMESTAMP DEFAULT CURRENT_TIMESTAMP'
    },
    metas: {
        id: 'SERIAL PRIMARY KEY',
        vendedor_id: 'INTEGER REFERENCES vendedores(id)',
        equipo_id: 'INTEGER REFERENCES equipos(id)',
        tipo: "VARCHAR(50) NOT NULL",
        meta_monto: 'DECIMAL(12,2) NOT NULL',
        periodo: "VARCHAR(20) NOT NULL",
        año: 'INTEGER NOT NULL',
        mes: 'INTEGER',
        activa: 'BOOLEAN DEFAULT true',
        created_at: 'TIMESTAMP DEFAULT CURRENT_TIMESTAMP',
        updated_at: 'TIMESTAMP DEFAULT CURRENT_TIMESTAMP'
    },
    contratos: {
        id: 'SERIAL PRIMARY KEY',
        vendedor_id: 'INTEGER NOT NULL REFERENCES vendedores(id)',
        cliente_nombre: 'VARCHAR(150) NOT NULL',
        tipo_contrato: 'VARCHAR(100) NOT NULL',
        valor_total: 'DECIMAL(12,2) NOT NULL',
        fecha_inicio: 'DATE NOT NULL',
        fecha_fin: 'DATE',
        estado: "VARCHAR(50) DEFAULT 'activo'",
        documento_url: 'VARCHAR(500)',
        observaciones: 'TEXT',
        created_at: 'TIMESTAMP DEFAULT CURRENT_TIMESTAMP',
        updated_at: 'TIMESTAMP DEFAULT CURRENT_TIMESTAMP'
    },
    actividad_agentes: {
        id: 'SERIAL PRIMARY KEY',
        agente_nombre: 'VARCHAR(100) NOT NULL',
        accion: 'VARCHAR(200) NOT NULL',
        detalles: 'JSONB',
        resultado: 'VARCHAR(50)',
        timestamp: 'TIMESTAMP DEFAULT CURRENT_TIMESTAMP'
    }
};
