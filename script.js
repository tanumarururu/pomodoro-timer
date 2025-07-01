let time = 1500; // 25分（1500秒）
let isRunning = false;
let interval;
let session = 'work'; // 'work' or 'break'

// DOM要素の取得
const timeDisplay = document.getElementById('time');
const statusDisplay = document.getElementById('status');
const startButton = document.getElementById('start');
const stopButton = document.getElementById('stop');
const resetButton = document.getElementById('reset');

// 時間のフォーマット
function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
}

// タイマーの更新
function updateTimer() {
    time--;
    if (time < 0) {
        // セッションの切り替え
        if (session === 'work') {
            session = 'break';
            time = 300; // 5分の休憩
            statusDisplay.textContent = '休憩中';
        } else {
            session = 'work';
            time = 1500; // 25分の作業
            statusDisplay.textContent = '作業中';
        }
    }
    timeDisplay.textContent = formatTime(time);
}

// スタートボタンのクリックイベント
startButton.addEventListener('click', () => {
    if (!isRunning) {
        isRunning = true;
        interval = setInterval(updateTimer, 1000);
        startButton.disabled = true;
        stopButton.disabled = false;
        resetButton.disabled = true;
    }
});

// ストップボタンのクリックイベント
stopButton.addEventListener('click', () => {
    if (isRunning) {
        isRunning = false;
        clearInterval(interval);
        startButton.disabled = false;
        stopButton.disabled = true;
        resetButton.disabled = false;
    }
});

// リセットボタンのクリックイベント
resetButton.addEventListener('click', () => {
    isRunning = false;
    clearInterval(interval);
    time = session === 'work' ? 1500 : 300;
    timeDisplay.textContent = formatTime(time);
    statusDisplay.textContent = session === 'work' ? '作業中' : '休憩中';
    startButton.disabled = false;
    stopButton.disabled = true;
    resetButton.disabled = true;
});

// 初期表示の設定
timeDisplay.textContent = formatTime(time);
