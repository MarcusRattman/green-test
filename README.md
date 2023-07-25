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

После чего отправляет ее в очередь 'tasks' RabbitMQ в виде:
```
    "Ваша задача"
```

При успешной обработке сервисом M2 возвращает результат:
```
{
    "done": "[X] Ваша задача"
}
```
Если же на данный эндпоинт поступил некорректный запрос, возвращает:
```
    400 Bad request
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

# Установка и запуск
## Установка
1. Клонировать данный репозиторий в любую свободную папку
   - `git clone https://github.com/MarcusRattman/green-test.git`
2. Запустить из корня скрипт `install.bat`
3. После установки `docker-compose` создаст и запустит 3 образа:
   - rabbitmq
   - green-test-m1
   - green-test-m2

## Запуск
Запускается из корня `docker-compose up`

После запуска нужно подождать секунд 20, пока загрузится RabbitMQ, от которого зависят остальные два контейнера.

Докер будет перезапускать контейнеры пока RabbitMQ не будет онлайн.

# Тест api
После запуска контейнеров, работоспособность api можно проверить выполнив данную команду:

```
curl -H "Content-Type: application/json" -X POST http://localhost:3000/addtask -d "{\"task\":\"test\"}"
```
На что вы получите ответ:

```
{"done":"[X] test"}
```

## POST -> http://localhost:3000/addtask