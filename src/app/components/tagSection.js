import { useState, useEffect } from "react";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Plus, X } from "lucide-react";
import { addLabelToList } from "../actions/tasks";
import { fakeLabels } from "../consts/initialStates";

const tagColors = [
  "bg-red-500",
  "bg-blue-500",
  "bg-green-500",
  "bg-yellow-500",
  "bg-purple-500",
  "bg-pink-500",
  "bg-indigo-500",
  "bg-orange-500",
];

const TagSection = ({ boardId, listId, labels }) => {
  const [tags, setTags] = useState(labels.length > 0 ? labels : fakeLabels);
  const [newTag, setNewTag] = useState("");

  const addNewTag = async () => {
    if (tags.includes(newTag) || newTag.trim().length === 0) {
      alert("Bu tag zaten var veya boş bırakılamaz");
    } else {
      setTags([...tags, newTag]);
      await addLabelToList({ boardId, listId, label: newTag });
      setNewTag("");
    }
  };

  const removeTag = (tagToRemove) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  return (
    <div className="mb-4 space-y-2">
      {tags.length > 0 && (
        <h5 className="font-bold text-muted-foreground">Etiketler</h5>
      )}
      <div className="w-full max-w-md">
        <div className="flex flex-wrap gap-2">
          {tags.map((tag, index) => (
            <Badge
              key={tag}
              className={`${
                tagColors[index % tagColors.length]
              } text-white cursor-pointer transition-all hover:opacity-80`}
            >
              {tag}
              <X
                className="ml-1 h-3 w-3 hover:text-red-300"
                onClick={() => removeTag(tag)}
              />
            </Badge>
          ))}
        </div>
      </div>
      <div className="flex gap-2">
        <Input
          type="text"
          placeholder="Yeni etiket ekle"
          value={newTag}
          onChange={(e) => setNewTag(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && addNewTag()}
          className="flex-grow"
        />
        <Button onClick={addNewTag} size="sm">
          <Plus className="h-4 w-4 mr-1" /> Ekle
        </Button>
      </div>
    </div>
  );
};

export default TagSection;
