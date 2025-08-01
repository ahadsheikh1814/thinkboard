import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import api from "../lib/axios";
import toast from "react-hot-toast";
import { ArrowLeftIcon, LoaderIcon, Trash2Icon } from "lucide-react";

const NoteDetails = () => {
  const [note, setNote] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchNote = async () => {
      try {
        const res = await api.get(`/notes/${id}`);
        setNote(res.data);
      } catch (error) {
        console.log("Error in fetching note", error);
        toast.error("Failed to fetch the note");
      } finally {
        setLoading(false);
      }
    };

    fetchNote();
  }, [id]);

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this note?")) return;

    try {
      await api.delete(`/notes/${id}`);
      toast.success("Note deleted");
      navigate("/");
    } catch (error) {
      console.log("Error deleting the note:", error);
      toast.error("Failed to delete note");
    }
  };

  const handleSave = async () => {
    if (!note.title.trim() || !note.content.trim()) {
      toast.error("Please add a title or content");
      return;
    }

    setSaving(true);

    try {
      await api.put(`/notes/${id}`, note);
      toast.success("Note updated successfully");
      navigate("/");
    } catch (error) {
      console.log("Error saving the note:", error);
      toast.error("Failed to update note");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-base-200 flex items-center justify-center">
        <LoaderIcon className="animate-spin w-10 h-10 text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-base-200 flex items-center justify-center">
      <div className="w-full max-w-2xl px-4 py-10">
        <div className="flex items-center justify-between mb-8">
          <Link to="/" className="btn btn-ghost flex items-center gap-2">
            <ArrowLeftIcon className="w-5 h-5" />
            <span>Back to Notes</span>
          </Link>
          <button
            onClick={handleDelete}
            className="btn btn-outline btn-error flex items-center gap-2"
          >
            <Trash2Icon className="w-5 h-5" />
            <span>Delete Note</span>
          </button>
        </div>

        <div className="card bg-base-100 shadow-lg border border-base-300">
          <div className="card-body">
            <form
              onSubmit={e => {
                e.preventDefault();
                handleSave();
              }}
              className="space-y-6"
            >
              <div className="form-control">
                <label className="label mb-2">
                  <span className="label-text text-base font-medium">Title</span>
                </label>
                <input
                  type="text"
                  placeholder="Note title"
                  className="input input-bordered w-full"
                  value={note.title}
                  onChange={e => setNote({ ...note, title: e.target.value })}
                  disabled={saving}
                  maxLength={100}
                  autoFocus
                />
              </div>

              <div className="form-control">
                <label className="label mb-2">
                  <span className="label-text text-base font-medium">Content</span>
                </label>
                <textarea
                  placeholder="Write your note here..."
                  className="textarea textarea-bordered w-full min-h-[8rem] resize-vertical"
                  value={note.content}
                  onChange={e => setNote({ ...note, content: e.target.value })}
                  disabled={saving}
                  maxLength={2000}
                />
              </div>

              <div className="flex justify-end">
                <button
                  type="submit"
                  className={`btn btn-primary px-8 ${saving ? "btn-disabled opacity-70" : ""}`}
                  disabled={saving}
                >
                  {saving ? (
                    <span className="flex items-center gap-2">
                      <span className="loading loading-spinner loading-xs"></span>
                      Saving...
                    </span>
                  ) : (
                    "Save Changes"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
export default NoteDetails;