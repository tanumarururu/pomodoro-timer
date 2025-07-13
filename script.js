let workTime = 1500; // 25分（1500秒）
let breakTime = 300; // 5分（300秒）
let time = workTime;
let isRunning = false;
let interval;
let session = 'work'; // 'work' or 'break'
let currentProgress = 100;

// DOM要素の取得
const timeDisplay = document.getElementById('time');
const statusDisplay = document.getElementById('status');
const startButton = document.getElementById('start');
const stopButton = document.getElementById('stop');
const resetButton = document.getElementById('reset');
const progressBar = document.getElementById('progress');
const workTimeInput = document.getElementById('work-time');
const breakTimeInput = document.getElementById('break-time');
const soundSelect = document.getElementById('sound');
const newTaskInput = document.getElementById('new-task');
const addTaskButton = document.getElementById('add-task');
const tasksList = document.getElementById('tasks');

// 音声ファイルの準備
const sounds = {
    bell: new Audio('https://notificationsounds.com/notification-sounds/bell-222/download/mp3'),
    chime: new Audio('https://notificationsounds.com/notification-sounds/chime-223/download/mp3')
};

// 時間のフォーマット
function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
}

// タイマーの更新
function updateTimer() {
    time--;
    currentProgress = (time / (session === 'work' ? workTime : breakTime)) * 100;
    progressBar.style.width = `${currentProgress}%`;
    
    if (time < 0) {
        // セッションの切り替え
        if (session === 'work') {
            session = 'break';
            time = breakTime;
            statusDisplay.textContent = '休憩中';
        } else {
            session = 'work';
            time = workTime;
            statusDisplay.textContent = '作業中';
        }
        
        // 通知音の再生
        const selectedSound = soundSelect.value;
        if (selectedSound !== 'none') {
            sounds[selectedSound].currentTime = 0;
            sounds[selectedSound].play();
        }
    }
    timeDisplay.textContent = formatTime(time);
}

// タスクの追加
function addTask() {
    const taskText = newTaskInput.value.trim();
    if (taskText) {
        const taskItem = document.createElement('li');
        taskItem.innerHTML = `
            <span>${taskText}</span>
            <button class="task-done-button">完了</button>
        `;
        
        taskItem.querySelector('.task-done-button').addEventListener('click', () => {
            taskItem.classList.toggle('task-done');
            const doneButton = taskItem.querySelector('.task-done-button');
            doneButton.textContent = taskItem.classList.contains('task-done') ? '未完了' : '完了';
        });
        
        tasksList.appendChild(taskItem);
        newTaskInput.value = '';
    }
}

// タイマーの設定更新
function updateTimerSettings() {
    const workMinutes = parseInt(workTimeInput.value);
    const breakMinutes = parseInt(breakTimeInput.value);
    
    if (!isNaN(workMinutes) && workMinutes > 0) {
        workTime = workMinutes * 60;
    }
    
    if (!isNaN(breakMinutes) && breakMinutes > 0) {
        breakTime = breakMinutes * 60;
    }
    
    if (!isRunning) {
        time = session === 'work' ? workTime : breakTime;
        timeDisplay.textContent = formatTime(time);
    }
}

// イベントリスナーの設定
startButton.addEventListener('click', () => {
    if (!isRunning) {
        isRunning = true;
        interval = setInterval(updateTimer, 1000);
        startButton.disabled = true;
        stopButton.disabled = false;
        resetButton.disabled = true;
    }
});

stopButton.addEventListener('click', () => {
    if (isRunning) {
        isRunning = false;
        clearInterval(interval);
        startButton.disabled = false;
        stopButton.disabled = true;
        resetButton.disabled = false;
    }
});

resetButton.addEventListener('click', () => {
    isRunning = false;
    clearInterval(interval);
    time = session === 'work' ? workTime : breakTime;
    currentProgress = 100;
    progressBar.style.width = '100%';
    timeDisplay.textContent = formatTime(time);
    statusDisplay.textContent = session === 'work' ? '作業中' : '休憩中';
    startButton.disabled = false;
    stopButton.disabled = true;
    resetButton.disabled = true;
});

workTimeInput.addEventListener('change', updateTimerSettings);
breakTimeInput.addEventListener('change', updateTimerSettings);
addTaskButton.addEventListener('click', addTask);
newTaskInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        addTask();
    }
});

// 初期表示の設定
timeDisplay.textContent = formatTime(time);
progressBar.style.width = '100%';
