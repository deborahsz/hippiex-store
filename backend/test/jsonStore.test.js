const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('fs/promises');
const os = require('os');
const path = require('path');

const store = require('../src/lib/jsonStore');

async function tmpFile() {
  const dir = await fs.mkdtemp(path.join(os.tmpdir(), 'hippiex-store-'));
  return path.join(dir, 'data.json');
}

test('read returns fallback when file is missing', async () => {
  const file = await tmpFile();
  assert.deepEqual(await store.read(file), []);
  assert.deepEqual(await store.read(file, { a: 1 }), { a: 1 });
});

test('concurrent updates do not corrupt data or duplicate ids', async () => {
  const file = await tmpFile();

  const additions = Array.from({ length: 50 }, (_, index) =>
    store.update(file, (items) => {
      const id = items.reduce((max, item) => Math.max(max, item.id), 0) + 1;
      const item = { id, value: index };
      return { value: [...items, item], result: item };
    })
  );

  await Promise.all(additions);

  const finalItems = await store.read(file);
  assert.equal(finalItems.length, 50);

  const ids = finalItems.map((item) => item.id);
  const uniqueIds = new Set(ids);
  assert.equal(uniqueIds.size, 50, 'all ids must be unique');

  const raw = await fs.readFile(file, 'utf-8');
  assert.doesNotThrow(() => JSON.parse(raw));
});
