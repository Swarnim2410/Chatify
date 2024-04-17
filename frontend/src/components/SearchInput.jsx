import React from "react";
import { useState } from "react";
import { MdPersonSearch } from "react-icons/md";
import { useSelector, useDispatch } from "react-redux";
import { selectedRedux } from "../redux/selectedConversation";
import toast from "react-hot-toast";
const SearchInput = () => {
  const dispatch = useDispatch();
  const allConversations = useSelector(
    (state) => state.all_conv.all_conversations
  );
  // console.log(allConversations);
  const [search, setSearch] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!search) return;
    if (search.length < 3) {
      toast.error("Enter at least 3 characters");
      return;
    }
    const find = allConversations.find((conv) =>
      conv.fullName.toLowerCase().includes(search.toLowerCase())
    );
    if (find) {
      dispatch(selectedRedux(find));
      setSearch("");
    } else {
      toast.error("No such conversation found");
    }
  };
  return (
    <form className="flex items-center gap-2" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Search.."
        className="input input-bordered rounded-full"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <button type="submit" className="btn btn-circle bg-green-500 text-white">
        <MdPersonSearch className="w-6 h-6 outline-none" />
      </button>
    </form>
  );
};

export default SearchInput;
