import React, { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";

// Types and Helpers
const apiUrl = `http://localhost:8000`;

type Effect<T> = (_: T) => void;

type ToDoItem = { state: "done" | "open"; text: string; id: number };
const ToDoItem = (
  text: string,
  id?: number,
  state: "open" | "done" = "open"
): ToDoItem => ({
  text,
  state,
  id,
});

const fetchStoredToDos = () =>
  fetch(`${apiUrl}/todos`)
    .then((response) => response.json())
    .catch(() => []);

const storeToDo = (item: ToDoItem) => {
  const baseUrl = `${apiUrl}/todos`;
  const updateExistingItem = !!item.id;
  const url = updateExistingItem ? `${baseUrl}/${item.id}` : baseUrl;
  const method = updateExistingItem ? "PUT" : "POST";
  return fetch(url, {
    headers: { "Content-Type": "application/json" },
    method,
    body: JSON.stringify(item),
  });
};

const deleteToDo = (item: ToDoItem) =>
  fetch(`${apiUrl}/todos/${item.id}`, { method: "DELETE" });

// Here the fun starts

type ItemEditorProps = {
  item?: ToDoItem;
  onSubmit: Effect<ToDoItem>;
  onCancel: Effect<any>;
};
const ItemEditor = ({ item, onCancel, onSubmit }: ItemEditorProps) => {
  const [text, setText] = useState(item.text);
  const handleChange = (evt: any) => setText(evt.currentTarget.value);

  return (
    <div className="item__editor">
      <input
        className="editor__input"
        type="text"
        value={text}
        onChange={handleChange}
      />
      <div className="input__buttons">
        <button className="editor__cancel" onClick={onCancel}>
          Cancel
        </button>
        <button
          className="editor__submit"
          onClick={() => onSubmit({ ...item, text })}
        >
          Save
        </button>
      </div>
    </div>
  );
};

type ItemViewProps = {
  item: ToDoItem;
  onChange: Effect<ToDoItem>;
  onDelete: Effect<ToDoItem>;
};
const ItemView = ({ item, onChange, onDelete }: ItemViewProps) => {
  const [editMode, setEditMode] = useState(false);
  const handleDelete = (item: ToDoItem) => () => onDelete(item);
  const closeEditor = () => setEditMode(false);
  const handleChange = (item: ToDoItem) => {
    void onChange(item);
    closeEditor();
  };
  const toggleState = () => {
    const state = item.state === "done" ? "open" : "done";
    return handleChange({ ...item, state });
  };

  const itemClass = `item ${
    item.state === "done" ? "item--done" : "item--open"
  }`;

  return (
    <li className={itemClass}>
      <button className="item__toggle-state" onClick={toggleState}>
        {item.state}
      </button>
      {editMode ? (
        <ItemEditor
          item={item}
          onSubmit={handleChange}
          onCancel={closeEditor}
        />
      ) : (
        <div className="item__text" onClick={() => setEditMode(true)}>
          {item.text}
        </div>
      )}
      <button className="item__delete" onClick={handleDelete(item)}>
        X
      </button>
    </li>
  );
};

type MainViewProps = {
  items: ToDoItem[];
  onSave: Effect<ToDoItem>;
  onDelete: Effect<ToDoItem>;
};
const MainView = ({ items, onDelete, onSave }: MainViewProps) => {
  const [showItemCreator, setShowItemCreator] = useState(false);
  const handleShowCreator = () => setShowItemCreator(true);
  const handleCloseCreator = () => setShowItemCreator(false);
  const handleCreateItem = (item: ToDoItem) => {
    onSave(item);
    handleCloseCreator();
  };

  return (
    <section className="main-view">
      <div className="items">
        <h3>What's to do?</h3>
        <ul className="items__list">
          {items.map((item) => (
            <ItemView
              key={item.id}
              item={item}
              onChange={onSave}
              onDelete={onDelete}
            />
          ))}
        </ul>
      </div>
      {showItemCreator ? (
        <ItemEditor
          item={ToDoItem("")}
          onCancel={handleCloseCreator}
          onSubmit={handleCreateItem}
        />
      ) : (
        <button
          className="items__open-creator-button"
          onClick={handleShowCreator}
        >
          New
        </button>
      )}
    </section>
  );
};

const App = () => {
  const [loading, setLoading] = useState(true);
  const [items, setItems] = useState<ToDoItem[]>([]);

  const loadItemsFromServer = () =>
    fetchStoredToDos()
      .then(setItems)
      .then(() => setLoading(false));

  const saveItem = (item: ToDoItem) =>
    storeToDo(item).then(loadItemsFromServer);

  const deleteItem = (item: ToDoItem) =>
    deleteToDo(item).then(loadItemsFromServer);

  useEffect(() => {
    void loadItemsFromServer();
  }, []);

  return (
    <main>
      <h1>To-Do me!</h1>
      {loading ? (
        <h2>Fetching items...</h2>
      ) : (
        <MainView items={items} onSave={saveItem} onDelete={deleteItem} />
      )}
    </main>
  );
};

const container = document.querySelector("#app-root");
const root = createRoot(container);
root.render(<App />);
