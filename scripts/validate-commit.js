const fs = require('fs');
const { execSync } = require('child_process');

// Git передает путь к файлу с сообщением коммита как первый аргумент
const commitMsgFile = process.argv[2];
if (!commitMsgFile) {
  console.error('❌ Ошибка: Не передан файл с сообщением коммита.');
  process.exit(1);
}

const commitMsg = fs.readFileSync(commitMsgFile, 'utf8').trim();

// Пропускаем merge-коммиты
if (commitMsg.startsWith('Merge ')) {
  process.exit(0);
}

// Получаем имя текущей ветки
let branchName = '';
try {
  branchName = execSync('git rev-parse --abbrev-ref HEAD').toString().trim();
} catch (e) {
  console.error('❌ Не удалось получить имя текущей ветки.');
  process.exit(1);
}

// Если в detached HEAD (rebase, cherry-pick), пропускаем
if (branchName === 'HEAD') {
  process.exit(0);
}

// Ищем ID задачи вида БУКВЫ-ЦИФРЫ (MEMORA-123, PROJ-42)
const match = branchName.match(/([A-Za-z]+-\d+)/);

if (!match) {
  console.error(`❌ Ошибка: Имя ветки "${branchName}" не содержит ID задачи.`);
  console.error('Ветка должна называться по шаблону: type/PROJECT-123-description');
  process.exit(1);
}

const taskId = match[1].toUpperCase();

// Проверяем, что сообщение начинается с ID задачи
const regex = new RegExp(`^\\[?${taskId}\\]?:?\\s`, 'i');

if (!regex.test(commitMsg)) {
  console.error(`\n❌ Ошибка: Сообщение коммита должно начинаться с "${taskId}".`);
  console.error(`Текущее сообщение: "${commitMsg}"`);
  console.error(`Пример: "${taskId}: add login form"\n`);
  process.exit(1);
}

console.log(`✅ Коммит одобрен: ${taskId}`);
process.exit(0);