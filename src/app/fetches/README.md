# fetches

Пример композиции функций в которых
исопльзуются async функции для получения
данных с сервера, в примере есть один запрос
фильтрация результата и
выражение на создание 3х параллельных запросов.

Результат работы
```
result: 21
============= End of Incrementor ===========
result: [
  { userId: 1, id: 1, title: 'delectus aut autem', completed: false },
  {
    userId: 1,
    id: 2,
    title: 'quis ut nam facilis et officia qui',
    completed: false
  },
  { userId: 1, id: 3, title: 'fugiat veniam minus', completed: false },
  undefined
]
============= End of Parallel ===========
result: [
  { userId: 1, id: 1, title: 'delectus aut autem', completed: false },
  {
    userId: 1,
    id: 2,
    title: 'quis ut nam facilis et officia qui',
    completed: false
  },
  { userId: 1, id: 3, title: 'fugiat veniam minus', completed: false },
  { userId: 1, id: 4, title: 'et porro tempora', completed: true },
  {
    userId: 1,
    id: 5,
    title: 'laboriosam mollitia et enim quasi adipisci quia provident illum',
    completed: false
  }
]
============= End of Five Todos ===========
```
