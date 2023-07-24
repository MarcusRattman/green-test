# Тестовое задание Green Api
![Einstein](/assets/einstein.png)

## Структура проекта
### M1
Своеобразный "фронт", имеющий эндпоинт /addtask, который принимает POST реквест в виде:
```
{
    "task": "Ваша задача"
}
```

После успешной обработки возвращает задачу в виде:
```
{
    "done": "[X] Ваша задача"
}
```
Поднимается на http://localhost:3000

### M2
"Бэк" сервер, обрабатывающий приходящие задачи из очереди 'tasks' RabbitMQ, и отправляющий их обратно в очередь 'done' в виде:
```
    "[X] Ваша задача"
```
Поднимается на http://localhost:3001

### RabbitMQ
Поднимается на localhost:5672 с дефолтными настройками.

## Демонстрация работы

Отправка задачи "first" при помощи Postman на эндпоинт http://localhost:3000/addtask
![Postman 1](/assets/postman%201.png)

Отправка задачи "second":
![Postman 2](/assets/postman%202.png)

Лог сервиса M1(без задачи "second"):
![M1](/assets/Docker%20M1.png)

Лог сервиса M2(без задачи "second"):
![M2](/assets/Docker%20M2.png)

Список активных очередей RabbitMQ:
![RabbitMQ](/assets/Rabbit.png)

### Видео демо
[![Video](/assets/preview.png)](https://www.youtube.com/watch?v=g6yp5wDjjE8)

## Установка и запуск
Скопировать и вставить код ниже в командную строку в любой свободной папке
```
git clone https://github.com/MarcusRattman/green-test.git &
cd green-test/m1 &
npm i &
cd ../m2 &
npm i &
cd .. &
docker-compose up -d &
echo "Installation Finished" & pause
```
Запускается из корня docker-compose up.
После запуска нужно подождать секунд 20, пока загрузится RabbitMQ, от которого зависят остальные два контейнера.

## POST -> http://localhost:3000/addtask