-- Crear tabla dispositivos para equipos móviles (diferente de equipos de trabajo)
CREATE TABLE IF NOT EXISTS dispositivos (
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
CREATE INDEX IF NOT EXISTS idx_dispositivos_imei ON dispositivos(imei);
CREATE INDEX IF NOT EXISTS idx_dispositivos_vendedor ON dispositivos(vendedor_id);
CREATE INDEX IF NOT EXISTS idx_dispositivos_estado ON dispositivos(estado);
CREATE INDEX IF NOT EXISTS idx_dispositivos_marca ON dispositivos(marca);

-- Crear trigger para updated_at
DROP TRIGGER IF EXISTS update_dispositivos_updated_at ON dispositivos;
CREATE TRIGGER update_dispositivos_updated_at
    BEFORE UPDATE ON dispositivos
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Comentarios en las columnas
COMMENT ON TABLE dispositivos IS 'Tabla de dispositivos móviles (smartphones, tablets, etc.)';
COMMENT ON COLUMN dispositivos.marca IS 'Marca del dispositivo (Apple, Samsung, etc.)';
COMMENT ON COLUMN dispositivos.modelo IS 'Modelo específico del dispositivo';
COMMENT ON COLUMN dispositivos.tipo IS 'Tipo de dispositivo (Smartphone, Tablet, Laptop, etc.)';
COMMENT ON COLUMN dispositivos.imei IS 'IMEI único del dispositivo (15 dígitos)';
COMMENT ON COLUMN dispositivos.costo IS 'Costo de adquisición en USD';
COMMENT ON COLUMN dispositivos.externo IS 'TRUE si es equipo externo, FALSE si es de la empresa';
COMMENT ON COLUMN dispositivos.vendedor_id IS 'ID del vendedor asignado al equipo';
COMMENT ON COLUMN dispositivos.estado IS 'Estado del equipo (activo, inactivo, mantenimiento, perdido, dañado, retirado)';