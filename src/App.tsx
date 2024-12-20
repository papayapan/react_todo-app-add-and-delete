/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable max-len */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useRef, useState } from 'react';
import { UserWarning } from './UserWarning';
import { getTodos, postTodos, USER_ID } from './api/todos';
// import { Todo } from './types/Todo';

// eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/naming-convention
type filteringToDo = 'all' | 'active' | 'completed';

export const App: React.FC = () => {
  if (!USER_ID) {
    return <UserWarning />;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [todos, setTodos] = useState<any[]>([]);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [filter, setFilter] = useState<filteringToDo>('all');
  const [todoInput, setTodoInput] = useState<string>('');
  const [disableInput, setDisableInput] = useState<boolean>(false);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [tempTodo, setTempTodo] = useState<any>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const fetchedTodos = await getTodos();

        setTodos(fetchedTodos);
      } catch (error) {
        setErrorMessage('Unable to load todos');
      }
    };

    fetchTodos();
  }, [tempTodo]);

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    if (errorMessage) {
      const timer = setTimeout(() => setErrorMessage(''), 3000);

      return () => clearTimeout(timer);
    }
  }, [errorMessage]);

  const activeTodos = todos.filter(todo => !todo.completed).length;
  const filteredTodos = todos.filter(todo => {
    if (filter === 'active') {
      return !todo.completed;
    }

    if (filter === 'completed') {
      return todo.completed;
    }

    return true;
  });

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTodoInput(event.target.value);
  };

  const addTodos = async (e: React.FormEvent) => {
    e.preventDefault();

    if (disableInput) {
      return;
    }

    const trimmedTitle = todoInput.trim();

    if (trimmedTitle === '') {
      setErrorMessage('Title should not be empty');
      inputRef.current?.focus();

      return;
    }

    setDisableInput(true);

    const temporaryTodo = { id: 0, title: trimmedTitle, completed: false };

    setTempTodo(temporaryTodo);

    try {
      const newTodo = await postTodos({
        userId: USER_ID,
        title: trimmedTitle,
        completed: false,
      });

      setTodos(prev => [...prev, newTodo]);
      setTodoInput('');
    } catch {
      setErrorMessage('Unable to add a todo');
    } finally {
      setTempTodo(null);
      setDisableInput(false);
      inputRef.current?.focus();
    }
  };

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <header className="todoapp__header">
          <button
            type="button"
            className={`todoapp__toggle-all ${todos.every(todo => todo.completed) ? 'active' : ''}`}
            data-cy="ToggleAllButton"
          />
          <form onSubmit={addTodos}>
            <input
              autoFocus
              data-cy="NewTodoField"
              type="text"
              className="todoapp__new-todo"
              placeholder="What needs to be done?"
              onChange={handleInputChange}
              value={todoInput}
              disabled={disableInput}
              ref={inputRef}
            />
          </form>
        </header>

        {todos.length > 0 && (
          <section className="todoapp__main" data-cy="TodoList">
            {filteredTodos.map(todo => (
              <div
                key={todo.id}
                data-cy="Todo"
                className={`todo ${todo.completed ? 'completed' : ''}`}
              >
                <label className="todo__status-label">
                  <input
                    data-cy="TodoStatus"
                    type="checkbox"
                    className="todo__status"
                    checked={todo.completed}
                  />
                </label>

                <span data-cy="TodoTitle" className="todo__title">
                  {todo.title}
                </span>

                <button
                  type="button"
                  className="todo__remove"
                  data-cy="TodoDelete"
                >
                  ×
                </button>

                <div data-cy="TodoLoader" className="modal overlay">
                  <div className="modal-background has-background-white-ter" />
                  <div className="loader" />
                </div>
              </div>
            ))}

            {tempTodo && (
              <div
                key={tempTodo.id}
                data-cy="TempTodo"
                className={`todo ${tempTodo.completed ? 'completed' : ''}`}
              >
                <label className="todo__status-label">
                  <input
                    data-cy="TodoStatus"
                    type="checkbox"
                    className="todo__status"
                    checked={tempTodo.completed}
                    disabled
                  />
                </label>

                <span data-cy="TodoTitle" className="todo__title">
                  {tempTodo.title}
                </span>

                <div data-cy="TodoLoader" className="modal overlay is-active">
                  <div className="modal-background has-background-white-ter" />
                  <div className="loader"></div>
                </div>
              </div>
            )}
          </section>
        )}

        {todos.length > 0 && (
          <footer className="todoapp__footer" data-cy="Footer">
            <span className="todo-count" data-cy="TodosCounter">
              {activeTodos} {activeTodos === 1 ? 'item' : 'items'} left
            </span>

            <nav className="filter" data-cy="Filter">
              <a
                href="#/"
                className={`filter__link ${filter === 'all' ? 'selected' : ''}`}
                data-cy="FilterLinkAll"
                onClick={() => setFilter('all')}
              >
                All
              </a>

              <a
                href="#/active"
                className={`filter__link ${filter === 'active' ? 'selected' : ''}`}
                data-cy="FilterLinkActive"
                onClick={() => setFilter('active')}
              >
                Active
              </a>

              <a
                href="#/completed"
                className={`filter__link ${filter === 'completed' ? 'selected' : ''}`}
                data-cy="FilterLinkCompleted"
                onClick={() => setFilter('completed')}
              >
                Completed
              </a>
            </nav>

            <button
              type="button"
              className="todoapp__clear-completed"
              data-cy="ClearCompletedButton"
              disabled={todos.every(todo => !todo.completed)}
            >
              Clear completed
            </button>
          </footer>
        )}
      </div>

      <div
        data-cy="ErrorNotification"
        className={`notification is-danger is-light has-text-weight-normal ${errorMessage ? '' : 'hidden'}`}
      >
        <button
          data-cy="HideErrorButton"
          type="button"
          className="delete"
          onClick={() => setErrorMessage('')}
        />
        {errorMessage}
      </div>
    </div>
  );
};
