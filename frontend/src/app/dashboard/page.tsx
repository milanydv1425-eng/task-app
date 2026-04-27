"use client";

import { useEffect, useState } from "react";
import { getToken } from "@/lib/auth";

export default function Dashboard() {
  const [notes, setNotes] = useState<any[]>([]);
  const [open, setOpen] = useState(false);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState<"NOTE" | "TASK">("NOTE");

  const [editOpen, setEditOpen] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState("");
  const [editDesc, setEditDesc] = useState("");
  const API = process.env.NEXT_PUBLIC_API_URL;

  // 🔹 fetch notes
  useEffect(() => {
    const fetchData = async () => {
      const token = getToken();
      if (!token) return (window.location.href = "/login");

      const res = await fetch(`${API}/notes`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await res.json();
      setNotes(data.data || []);
    };

    fetchData();
  }, []);

  // 🔹 add note
  const handleAdd = async () => {
    const token = getToken();

    const res = await fetch(`${API}/notes`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ title, description, type }),
    });

    const newNote = await res.json();
    setNotes((prev) => [newNote, ...prev]);

    setTitle("");
    setDescription("");
    setOpen(false);
  };

  // 🔹 delete
  const handleDelete = async (id: string) => {
    const token = getToken();

   await fetch(`${API}/notes/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });

    setNotes((prev) => prev.filter((n) => n._id !== id));
  };

  // 🔹 update
  const handleEditSave = async () => {
    const token = getToken();

    const res = await fetch(`${API}/notes/${editId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        title: editTitle,
        description: editDesc,
      }),
    });

    const updated = await res.json();

    setNotes((prev) => prev.map((n) => (n._id === editId ? updated : n)));

    setEditOpen(false);
  };

  // 🔹 toggle task status
  const toggleStatus = async (n: any) => {
    const token = getToken();

    const res = await fetch(`${API}/notes/${n._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        status: n.status === "COMPLETED" ? "PENDING" : "COMPLETED",
      }),
    });

    const updated = await res.json();

    setNotes((prev) =>
      prev.map((item) => (item._id === n._id ? updated : item)),
    );
  };

  return (
    <div className="min-h-screen bg-[#f8f6f2] px-6 py-10">
      {/* HEADER */}
      <div className="max-w-6xl mx-auto mb-10 flex justify-between items-center">
        <h1 className="text-3xl font-light" style={{ fontFamily: "Georgia" }}>
          Dashboard
        </h1>

        <div className="flex gap-3">
          <button
            onClick={() => setOpen(true)}
            className="px-5 py-2 border border-[#c6a76e] text-[#c6a76e] hover:bg-[#c6a76e] hover:text-white transition"
          >
            Add
          </button>

          <button
            onClick={() => {
              localStorage.removeItem("token");
              window.location.href = "/login";
            }}
            className="px-4 py-2 border border-gray-300 hover:bg-gray-100"
          >
            Logout
          </button>
        </div>
      </div>

      {/* ADD MODAL */}
      {open && (
        <div className="fixed inset-0 bg-black/20 flex items-center justify-center">
          <div className="bg-white p-6 w-[400px] border">
            <input
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full mb-3 p-2 border"
            />

            <textarea
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full mb-3 p-2 border"
            />

            <select
              value={type}
              onChange={(e) => setType(e.target.value as any)}
              className="w-full mb-4 p-2 border"
            >
              <option value="NOTE">Note</option>
              <option value="TASK">Task</option>
            </select>

            <div className="flex justify-end gap-2">
              <button onClick={() => setOpen(false)}>Cancel</button>
              <button
                onClick={handleAdd}
                className="bg-[#c6a76e] text-white px-4 py-1"
              >
                Add
              </button>
            </div>
          </div>
        </div>
      )}

      {/* EDIT MODAL */}
      {editOpen && (
        <div className="fixed inset-0 bg-black/20 flex items-center justify-center">
          <div className="bg-white p-6 w-[400px] border">
            <input
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
              className="w-full mb-3 p-2 border"
            />

            <textarea
              value={editDesc}
              onChange={(e) => setEditDesc(e.target.value)}
              className="w-full mb-4 p-2 border"
            />

            <div className="flex justify-end gap-2">
              <button onClick={() => setEditOpen(false)}>Cancel</button>
              <button
                onClick={handleEditSave}
                className="bg-[#c6a76e] text-white px-4 py-1"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {/* NOTES GRID */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {notes.map((n) => (
          <div
            key={n._id}
            className="bg-white p-5 border border-[#e5e2dc] rounded-sm hover:shadow-sm transition"
          >
            <h2 className="font-semibold text-[#1a1a1a]">{n.title}</h2>

            <p className="text-sm text-gray-500 mt-1">{n.description}</p>

            {/* TASK checkbox */}
            {n.type === "TASK" && (
              <div className="mt-3 flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={n.status === "COMPLETED"}
                  onChange={() => toggleStatus(n)}
                />
                <span className="text-xs text-gray-500">Done</span>
              </div>
            )}

            {/* actions */}
            <div className="flex gap-4 mt-4 text-lg">
              <button
                onClick={() => {
                  setEditId(n._id);
                  setEditTitle(n.title);
                  setEditDesc(n.description || "");
                  setEditOpen(true);
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                  />
                </svg>
              </button>

              <button onClick={() => handleDelete(n._id)}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                  />
                </svg>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
