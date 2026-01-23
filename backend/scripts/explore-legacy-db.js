import pkg from 'pg';
const { Pool } = pkg;
import fs from 'fs';

// Conexión a BD Legacy de Claro PR
const legacyPool = new Pool({
    host: '167.99.12.125',
    port: 5432,
    database: 'claropr',
    user: 'postgres',
    password: 'fF00JIRFXc',
    ssl: false
});

async function exploreLegacyDB() {
    console.log('🔍 Conectando a BD Legacy CLAROPR en 167.99.12.125...\n');

    try {
        // Test conexión
        await legacyPool.query('SELECT NOW()');
        console.log('✅ Conexión exitosa a claropr!\n');

        // Listar todas las tablas del schema public
        console.log('📋 Analizando tablas en schema public...');
        const tables = await legacyPool.query(`
      SELECT 
        schemaname,
        tablename,
        pg_size_pretty(pg_total_relation_size(schemaname||'.'||tablename)) AS size
      FROM pg_tables
      WHERE schemaname = 'public'
      ORDER BY tablename;
    `);

        console.log(`\n✅ Encontradas ${tables.rows.length} tablas\n`);

        const tableDetails = [];

        for (const table of tables.rows) {
            console.log(`⏳ Analizando: ${table.tablename}...`);

            const columns = await legacyPool.query(`
        SELECT 
          column_name,
          data_type,
          character_maximum_length,
          is_nullable,
          column_default
        FROM information_schema.columns
        WHERE table_schema = 'public' AND table_name = $1
        ORDER BY ordinal_position;
      `, [table.tablename]);

            // Obtener foreign keys
            const fkeys = await legacyPool.query(`
        SELECT
          kcu.column_name,
          ccu.table_name AS foreign_table_name,
          ccu.column_name AS foreign_column_name
        FROM information_schema.table_constraints AS tc
        JOIN information_schema.key_column_usage AS kcu
          ON tc.constraint_name = kcu.constraint_name
          AND tc.table_schema = kcu.table_schema
        JOIN information_schema.constraint_column_usage AS ccu
          ON ccu.constraint_name = tc.constraint_name
          AND ccu.table_schema = tc.table_schema
        WHERE tc.constraint_type = 'FOREIGN KEY'
          AND tc.table_name = $1;
      `, [table.tablename]);

            // Contar registros
            const count = await legacyPool.query(`SELECT COUNT(*) FROM "${table.tablename}"`);

            tableDetails.push({
                name: table.tablename,
                size: table.size,
                rowCount: parseInt(count.rows[0].count),
                columns: columns.rows,
                foreignKeys: fkeys.rows
            });

            console.log(`   ✅ ${table.tablename}: ${count.rows[0].count} registros, ${columns.rows.length} columnas, ${fkeys.rows.length} FKs`);
        }

        // Generar JSON
        const output = {
            timestamp: new Date().toISOString(),
            server: '167.99.12.125',
            database: 'claropr',
            totalTables: tables.rows.length,
            tables: tableDetails
        };

        fs.writeFileSync(
            'BD/legacy-schema-claropr.json',
            JSON.stringify(output, null, 2),
            'utf8'
        );

        console.log('\n✅ JSON guardado: BD/legacy-schema-claropr.json');

        // Generar Markdown
        let md = `# 📊 BD LEGACY - CLARO PR (SSGroup)\n\n`;
        md += `**Servidor:** 167.99.12.125\n`;
        md += `**Base de Datos:** claropr\n`;
        md += `**Fecha Análisis:** ${new Date().toLocaleString('es-PR')}\n`;
        md += `**Total Tablas:** ${tables.rows.length}\n\n`;
        md += `---\n\n`;

        md += `## 📋 RESUMEN DE TABLAS\n\n`;
        md += `| # | Tabla | Registros | Tamaño | Columnas | FKs |\n`;
        md += `|---|-------|-----------|--------|----------|-----|\n`;

        tableDetails.forEach((t, i) => {
            md += `| ${i + 1} | **${t.name}** | ${t.rowCount.toLocaleString()} | ${t.size} | ${t.columns.length} | ${t.foreignKeys.length} |\n`;
        });

        md += `\n---\n\n## 🔗 DIAGRAMA DE RELACIONES\n\n`;
        md += `### Tablas con Foreign Keys:\n\n`;

        tableDetails.forEach(t => {
            if (t.foreignKeys.length > 0) {
                md += `#### ${t.name}\n\n`;
                t.foreignKeys.forEach(fk => {
                    md += `- \`${fk.column_name}\` → \`${fk.foreign_table_name}.${fk.foreign_column_name}\`\n`;
                });
                md += `\n`;
            }
        });

        md += `\n---\n\n## 📝 ESTRUCTURA DETALLADA\n\n`;

        tableDetails.forEach(t => {
            md += `### 📁 ${t.name}\n\n`;
            md += `**📊 Registros:** ${t.rowCount.toLocaleString()} | **💾 Tamaño:** ${t.size}\n\n`;

            if (t.foreignKeys.length > 0) {
                md += `**🔗 Foreign Keys:**\n`;
                t.foreignKeys.forEach(fk => {
                    md += `- \`${fk.column_name}\` → \`${fk.foreign_table_name}.${fk.foreign_column_name}\`\n`;
                });
                md += `\n`;
            }

            md += `**Columnas:**\n\n`;
            md += `| Columna | Tipo | Nullable | Default |\n`;
            md += `|---------|------|----------|----------|\n`;
            t.columns.forEach(col => {
                const type = col.character_maximum_length
                    ? `${col.data_type}(${col.character_maximum_length})`
                    : col.data_type;
                md += `| ${col.column_name} | ${type} | ${col.is_nullable} | ${col.column_default || '-'} |\n`;
            });
            md += `\n---\n\n`;
        });

        fs.writeFileSync(
            'docs/BD-LEGACY-CLAROPR.md',
            md,
            'utf8'
        );

        console.log('✅ Markdown generado: docs/BD-LEGACY-CLAROPR.md\n');
        console.log('🎉 ¡Análisis completo!\n');

    } catch (error) {
        console.error('❌ Error:', error.message);
        console.error(error);
    } finally {
        await legacyPool.end();
    }
}

exploreLegacyDB();
