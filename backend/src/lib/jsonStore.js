const fs = require('fs/promises');
const path = require('path');

/**
 * A tiny JSON file store that serializes all access per file path and writes
 * atomically. This prevents two concurrent requests from interleaving their
 * read-modify-write cycles and corrupting the JSON file.
 *
 * It is in-process only (no cross-process locking), which is enough for this
 * single-process academic API.
 */

// One promise chain ("lock") per absolute file path.
const locks = new Map();

function runExclusive(filePath, task) {
  const previous = locks.get(filePath) || Promise.resolve();

  // Chain the new task after the previous one, swallowing the previous error
  // so one failed operation does not poison the queue.
  const next = previous.then(task, task);

  // Keep the chain alive but make sure rejections don't crash the process.
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

/**
 * Read the JSON file. Returns `fallback` (default `[]`) if it does not exist
 * or is empty.
 */
function read(filePath, fallback = []) {
  return runExclusive(filePath, () => readRaw(filePath, fallback));
}

/**
 * Atomically apply `updater(currentValue)` and persist the result.
 * The read-modify-write runs inside the per-file lock, so concurrent callers
 * are serialized. Returns whatever `updater` returns.
 */
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
