import fs from 'fs/promises';
import path from 'path';

const SRC_DIR = path.resolve(process.cwd(), 'src');
const IMPORT_REGEX = /(from\s+['"])(src\/)([^'"]+)(['"])/g;

async function processFile(filePath) {
  try {
    let content = await fs.readFile(filePath, 'utf-8');
    let hasChanges = false;

    const updatedContent = content.replace(IMPORT_REGEX, (match, prefix, srcPrefix, modulePath, suffix) => {
      hasChanges = true;
      const fileDir = path.dirname(filePath);
      const targetPath = path.resolve(SRC_DIR, modulePath);
      let relativePath = path.relative(fileDir, targetPath);

      // Garante que o caminho relativo comece com './' ou '../'
      if (!relativePath.startsWith('.')) {
        relativePath = './' + relativePath;
      }

      // Corrige barras invertidas no Windows
      relativePath = relativePath.replace(/\\/g, '/');

      console.log(`- Em ${path.basename(filePath)}:`);
      console.log(`  - Trocando: '${srcPrefix}${modulePath}'`);
      console.log(`  - Por:      '${relativePath}'\n`);

      return `${prefix}${relativePath}${suffix}`;
    });

    if (hasChanges) {
      await fs.writeFile(filePath, updatedContent, 'utf-8');
    }
  } catch (error) {
    console.error(`Erro ao processar o arquivo ${filePath}:`, error);
  }
}

async function traverseDir(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.resolve(dir, entry.name);
    if (entry.isDirectory()) {
      // Ignora node_modules ou outras pastas que não queira processar
      if (entry.name !== 'node_modules') {
        await traverseDir(fullPath);
      }
    } else if (/\.(ts|tsx)$/.test(fullPath)) {
      // Ignora arquivos de teste se desejar
      if (!fullPath.endsWith('.spec.ts') && !fullPath.endsWith('.e2e-spec.ts')) {
         await processFile(fullPath);
      }
    }
  }
}

async function run() {
  console.log('Iniciando conversão de caminhos de importação...');
  await traverseDir(SRC_DIR);
  console.log('Conversão concluída!');
}

run();