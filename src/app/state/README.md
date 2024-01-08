# state

Тут пример по композиции логики которая возвращает
реактивную модель а не данные.

Реактивная модель тоже является абстракцией
с простыми методами get и set, функцию state
можно переделать под логику
конкретного фреймворка useState - React или
ref - для Vue или сигналы.

Результат запуска, сначала модель пустая
позже она заполняется данными.
```js
Синхронный вызов rstate - пусто
{
  results: [],
  isLoading: true,
  args: [ 'https://jsonplaceholder.typicode.com/todos' ]
}

Обращение через секунду к rstate - есть реузльтаты
{
  results: [
    { userId: 1, id: 1, title: 'delectus aut autem', completed: false },
    {
      userId: 1,
      id: 2,
      title: 'quis ut nam facilis et officia qui',
      completed: false
    },
    {
      userId: 1,
      id: 3,
      title: 'fugiat veniam minus',
      completed: false
    }
  ],
  isLoading: false,
  args: [ 'https://jsonplaceholder.typicode.com/todos' ]
}
```
