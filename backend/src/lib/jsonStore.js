const fs = require('fs/promises');
const path = require('path');

const locks = new Map();

function runExclusive(filePath, task) {
  const previous = locks.get(filePath) || Promise.resolve();

  const next = previous.then(task, task);

  locks.set(
    filePath,
    next.then(
      () => undefined,
      () => undefined
    )
  );

  return next;
}

async function readRaw(filePath, fallback) {
  try {
    const data = await fs.readFile(filePath, 'utf-8');
    const trimmed = data.trim();
    return trimmed ? JSON.parse(trimmed) : fallback;
  } catch (error) {
    if (error.code === 'ENOENT') {
      return fallback;
    }
    throw error;
  }
}

async function writeAtomic(filePath, value) {
  const tmpPath = `${filePath}.${process.pid}.${Date.now()}.tmp`;
  const payload = `${JSON.stringify(value, null, 2)}\n`;

  await fs.writeFile(tmpPath, payload, 'utf-8');
  await fs.rename(tmpPath, filePath);
}

function read(filePath, fallback = []) {
  return runExclusive(filePath, () => readRaw(filePath, fallback));
}

function update(filePath, updater, fallback = []) {
  return runExclusive(filePath, async () => {
    const current = await readRaw(filePath, fallback);
    const { value, result } = await updater(current);
    await writeAtomic(filePath, value);
    return result;
  });
}

module.exports = {
  read,
  update,
  resolveDataPath: (...segments) =>
    path.resolve(__dirname, '..', 'data', ...segments),
};
