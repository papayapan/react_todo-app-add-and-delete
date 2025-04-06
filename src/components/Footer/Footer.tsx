/* eslint-disable @typescript-eslint/indent */
// /* eslint-disable @typescript-eslint/indent */
// // Footer.tsx
// import React from 'react';

// interface FooterProps {
//   activeTodos: number;
//   filter: 'all' | 'active' | 'completed';
//   setFilter: React.Dispatch<
//     React.SetStateAction<'all' | 'active' | 'completed'>
//   >;
//   clearCompleted: () => void;
// }

// export const Footer: React.FC<FooterProps> = ({
//   activeTodos,
//   filter,
//   setFilter,
//   clearCompleted,
// }) => (
//   <footer className="todoapp__footer" data-cy="Footer">
//     <span className="todo-count" data-cy="TodosCounter">
//       {activeTodos} {activeTodos === 1 ? 'item' : 'items'} left
//     </span>

//     <nav className="filter" data-cy="Filter">
//       <a
//         href="#/"
//         className={`filter__link ${filter === 'all' ? 'selected' : ''}`}
//         data-cy="FilterLinkAll"
//         onClick={() => setFilter('all')}
//       >
//         All
//       </a>

//       <a
//         href="#/active"
//         className={`filter__link ${filter === 'active' ? 'selected' : ''}`}
//         data-cy="FilterLinkActive"
//         onClick={() => setFilter('active')}
//       >
//         Active
//       </a>

//       <a
//         href="#/completed"
//         className={`filter__link ${filter === 'completed' ? 'selected' : ''}`}
//         data-cy="FilterLinkCompleted"
//         onClick={() => setFilter('completed')}
//       >
//         Completed
//       </a>
//     </nav>

//     <button
//       type="button"
//       className="todoapp__clear-completed"
//       data-cy="ClearCompletedButton"
//       disabled={activeTodos === 0}
//       onClick={clearCompleted}
//     >
//       Clear completed
//     </button>
//   </footer>
// );

import React from 'react';
import { Todo } from '../../types/Todo';

interface FooterProps {
  activeTodos: number;
  filter: 'all' | 'active' | 'completed';
  setFilter: React.Dispatch<
    React.SetStateAction<'all' | 'active' | 'completed'>
  >;
  todos: Todo[];
  clearCompleted: () => void;
}

const Footer: React.FC<FooterProps> = ({
  activeTodos,
  filter,
  setFilter,
  todos,
  clearCompleted,
}) => {
  return (
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
        onClick={clearCompleted}
      >
        Clear completed
      </button>
    </footer>
  );
};

export default Footer;
