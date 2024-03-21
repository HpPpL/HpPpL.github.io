function getRandomJoke() {
    const jokes = [
        "Как называется самая маленькая монета в мире вампиров? Копейка.",
        "Что сказал программист в магазине? Вам сдачи дать или в коде?",
        "Чем программист отличается от обычного человека? Живёт в баге, а не в квартире."
    ];
    return jokes[Math.floor(Math.random() * jokes.length)];
}

function getRandomFact() {
    const facts = [
        "Самый большой океан на Земле - Тихий, его площадь превышает площадь всех континентов вместе взятых.",
        "Свет от Солнца доходит до Земли всего за 8 минут 20 секунд.",
        "Один человеческий год соответствует семи собачьим годам."
    ];
    return facts[Math.floor(Math.random() * facts.length)];
}

function getRandomHistoryFact() {
    const historyFacts = [
        "Великая стена была построена на протяжении нескольких веков и не является непрерывной стеной, а скорее серией стен и укреплений.",
        "Леонардо да Винчи писал свои заметки с использованием зеркального шрифта, возможно, чтобы скрыть свои идеи от посторонних глаз.",
        "Статуя Свободы была подарком от Франции к 100-летию подписания Декларации независимости США."
    ];
    return historyFacts[Math.floor(Math.random() * historyFacts.length)];
}

function getRelaxation() {
    return "Представь, что ты находишься на берегу океана. Волны нежно обрушиваются о берег. Солёный бриз касается твоего лица. Расслабься и вдыхай морской воздух.";
}

function getHelp() {
    return "Я могу рассказать анекдот, факт, исторический факт, дать совет или помочь тебе расслабиться. Просто попроси!";
}

function getWeatherForecast() {
    return "Сегодня ожидается солнечная погода, температура около 20 градусов цельсия. Идеальный день для прогулки!";
}

function getCustomResponse(message) {
    const customResponses = {
        "привет": "Привет! Я бот-помощник студента ВШЭ. Чем могу помочь?",
        "погода": getWeatherForecast(),
        "анекдот": getRandomJoke(),
        "факт": getRandomFact(),
        "совет": "Помни, что отдых так же важен, как и работа. Не забывай делать перерывы.",
        "помощь": getHelp(),
        "история": getRandomHistoryFact(),
        "расслабь меня": getRelaxation(),
        // Аудиофункционал в разработке
    };

    for (const key in customResponses) {
        if (message.toLowerCase().includes(key)) {
            return customResponses[key];
        }
    }
    return "Прости, я не понял тебя. Введи 'помощь', чтобы узнать, что я умею.";
}


window.onload = function() {
    let sendButton = document.getElementById('send-button');
    sendButton.addEventListener('click', sendMessage);

    function prepareBotAnswer() {
        let botResponseDiv = document.createElement('div');
        botResponseDiv.classList.add('bot-msg');
        return botResponseDiv;
    }

    function sendMessage() {
        let messageInput = document.getElementById('message-input');
        let audioInput = document.getElementById('audio-input');

        let message = messageInput.value.trim();
        let audioFile = audioInput.files[0];

        if (message === '' && !audioFile) {
            return;
        }

        let chatMessages = document.getElementById('chat-messages');

        if (message !== '') {
            let userMessageDiv = document.createElement('div');
            userMessageDiv.classList.add('user-msg');
            userMessageDiv.textContent = 'Вы: ' + message;
            chatMessages.appendChild(userMessageDiv);
            messageInput.value = '';

            let botResponse = getCustomResponse(message);
            let botResponseDiv = prepareBotAnswer();
            botResponseDiv.textContent = 'Бот ВШЭ: ' + botResponse;
            chatMessages.appendChild(botResponseDiv);
        }

        if (audioFile) {
            let audioURL = URL.createObjectURL(audioFile);
            let audioDiv = document.createElement('div');
            let audioElement = document.createElement('audio');
            audioElement.controls = true;
            audioElement.src = audioURL;
            audioDiv.appendChild(audioElement);
            chatMessages.appendChild(audioDiv);
            audioInput.value = '';
        }

        chatMessages.scrollTop = chatMessages.scrollHeight;
    }
};
