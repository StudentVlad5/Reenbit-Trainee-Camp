# Pics.io

## Task

Реализуйте примитивное приложение с использованием React, Redux и самых современных библиотек и инструментов. При старте приложение наполняется списком комментариев . Пользователь может добавлять новые комментарии, а также удалять любые комментарии. Приложение дружелюбно к пользователю и не "теряет" своё состояние (положение скролла, тексты в полях ввода, итд) при перезагрузке страницы. Пользовательский интерфейс приложения спроектируйте самостоятельно на ваше усмотрение с использованием любимого подхода или библиотеки (мы одинаково любим и красивый Material UI и функциональный HTML без стилей).

Предоставьте решение в виде ссылки на репозиторий и ссылки на ваше приложение запущенное в веб. Всесторонне оцените решение: кодовую базу, производительность приложения, условия использования, пользовательский опыт и удобство поддержки вашего решения. Добавьте всё, что считаете необходимым для лучшего в своём роде приложения для создания и удаления комментариев — тесты, понятный README, скрипты CI для сборки и деплоймента, итд.

## Discription

**Pics.io** is a project for message management, providing users with a convenient tool for working with messages in the form of tasks. The application allows users to download messages, view (use a filter), mark as done and delete in a convenient interface..

## Peculiarities

- Loading messages in the numbered task view
- Viewing the list of messages
- Add your own message, mark the task as completed, delete the message
- Ability to filter messages

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/StudentVlad5/Pics.io.git
   ```

2. Go to the project directory:

   ```bash
   cd Pics.io
   ```

3. Install dependencies for folder Pics.io and client:

   ```bash
   npm install
   ```

4. Add env file with your DB:
   MongoDB

5. Launch the project:
   ```bash
   backend - node index.js
   front - react-scripts start
   ```

## Usage

Once the application is running, open your browser and navigate to `http://localhost:3000`. Upload your messsages and start working with them!

## Technologies

Uses the following MERN technologies:

- **React** — for building an interface.
- **Node.js** & **Express** — for the server part.
- **MongoDB** — for data storage.

## Author

Vladyslav Popov [StudentVlad5](https://github.com/StudentVlad5).

## License

This project is licensed under the terms UNLICENSED.
