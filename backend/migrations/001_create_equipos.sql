-- Crear tabla equipos si no existe
CREATE TABLE IF NOT EXISTS equipos (
    id SERIAL PRIMARY KEY,
    marca VARCHAR(100) NOT NULL,
    modelo VARCHAR(200) NOT NULL,
    tipo VARCHAR(100) NOT NULL DEFAULT 'Smartphone',
    imei VARCHAR(15) UNIQUE NOT NULL,
    costo DECIMAL(10,2),
    externo BOOLEAN DEFAULT FALSE,
    vendedor_id INTEGER,
    estado VARCHAR(50) DEFAULT 'activo',
    numero_serie VARCHAR(100),
    fecha_adquisicion DATE,
    fecha_asignacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    observaciones TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Crear índices para mejorar el rendimiento
CREATE INDEX IF NOT EXISTS idx_equipos_imei ON equipos(imei);
CREATE INDEX IF NOT EXISTS idx_equipos_vendedor ON equipos(vendedor_id);
CREATE INDEX IF NOT EXISTS idx_equipos_estado ON equipos(estado);
CREATE INDEX IF NOT EXISTS idx_equipos_marca ON equipos(marca);

-- Crear función para actualizar updated_at automáticamente
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Crear trigger para updated_at
DROP TRIGGER IF EXISTS update_equipos_updated_at ON equipos;
CREATE TRIGGER update_equipos_updated_at
    BEFORE UPDATE ON equipos
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Comentarios en las columnas
COMMENT ON TABLE equipos IS 'Tabla de equipos/dispositivos móviles';
COMMENT ON COLUMN equipos.marca IS 'Marca del dispositivo (Apple, Samsung, etc.)';
COMMENT ON COLUMN equipos.modelo IS 'Modelo específico del dispositivo';
COMMENT ON COLUMN equipos.tipo IS 'Tipo de dispositivo (Smartphone, Tablet, Laptop, etc.)';
COMMENT ON COLUMN equipos.imei IS 'IMEI único del dispositivo (15 dígitos)';
COMMENT ON COLUMN equipos.costo IS 'Costo de adquisición en USD';
COMMENT ON COLUMN equipos.externo IS 'TRUE si es equipo externo, FALSE si es de la empresa';
COMMENT ON COLUMN equipos.vendedor_id IS 'ID del vendedor asignado al equipo';
COMMENT ON COLUMN equipos.estado IS 'Estado del equipo (activo, inactivo, mantenimiento, perdido, dañado, retirado)';