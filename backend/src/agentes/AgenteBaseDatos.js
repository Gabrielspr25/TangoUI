import { query } from '../config/database.js';
import { DB_SCHEMA } from '../config/schema.js';

class AgenteBaseDatos {
    constructor() {
        this.name = 'Agente Base de Datos';
    }

    async inicializar() {
        console.log(`🔧 [${this.name}] Verificando estructura de la base de datos...`);
        try {
            await this.sincronizarEsquema();
            console.log(`✅ [${this.name}] Base de datos sincronizada y lista.`);
        } catch (error) {
            console.error(`❌ [${this.name}] Error crítico inicializando BD:`, error);
            throw error;
        }
    }

    async sincronizarEsquema() {
        const tablas = Object.keys(DB_SCHEMA);

        for (const tabla of tablas) {
            await this.verificarYCrearTabla(tabla, DB_SCHEMA[tabla]);
        }
    }

    async verificarYCrearTabla(nombreTabla, columnas) {
        // 1. Verificar si la tabla existe
        const resTabla = await query(
            "SELECT EXISTS (SELECT FROM information_schema.tables WHERE table_name = $1)",
            [nombreTabla]
        );

        const existeTabla = resTabla.rows[0].exists;

        if (!existeTabla) {
            console.log(`✨ [${this.name}] Creando tabla '${nombreTabla}'...`);
            const definiciones = Object.entries(columnas)
                .map(([col, def]) => `${col} ${def}`)
                .join(', ');

            await query(`CREATE TABLE ${nombreTabla} (${definiciones})`);
        } else {
            // 2. Si existe, verificar columnas faltantes
            await this.verificarColumnas(nombreTabla, columnas);
        }
    }

    async verificarColumnas(nombreTabla, columnasDefinidas) {
        const resColumnas = await query(
            "SELECT column_name FROM information_schema.columns WHERE table_name = $1",
            [nombreTabla]
        );

        const columnasExistentes = resColumnas.rows.map(row => row.column_name);
        const columnasNecesarias = Object.keys(columnasDefinidas);

        for (const columna of columnasNecesarias) {
            if (!columnasExistentes.includes(columna)) {
                console.log(`➕ [${this.name}] Agregando columna faltante '${columna}' a '${nombreTabla}'...`);
                const definicion = columnasDefinidas[columna];
                // Evitar referencias circulares o problemas en ALTER ADD COLUMN complejos
                // Simplificación: Agregar columna con su definición completa
                try {
                    await query(`ALTER TABLE ${nombreTabla} ADD COLUMN ${columna} ${definicion}`);
                } catch (e) {
                    console.warn(`⚠️ [${this.name}] No se pudo agregar columna '${columna}' automáticamente. Error: ${e.message}`);
                }
            }
        }
    }
}

export const agenteBaseDatos = new AgenteBaseDatos();
