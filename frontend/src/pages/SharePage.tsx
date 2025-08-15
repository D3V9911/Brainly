import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { Card } from "../components/Card";

export default function SharePage() {
  const { shareLink } = useParams();
  const [data, setData] = useState<{ username: string; content: any } | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    axios.get(`${BACKEND_URL}/api/v1/brain/${shareLink}`)
      .then(res => setData(res.data))
      .catch(() => setError("Invalid or expired share link."));
  }, [shareLink]);

  if (error) return <div className="p-8">{error}</div>;
  if (!data) return <div className="p-8">Loading...</div>;

  return (
    <div className="p-8">
      <h2 className="text-xl font-bold mb-4">Shared by: {data.username}</h2>
      {Array.isArray(data.content) && data.content.length > 0 ? (
        <div className="flex gap-4 flex-wrap">
          {data.content.map((item, idx) => (
            <Card key={idx} {...item} />
          ))}
        </div>
      ) : (
        <div>No content found.</div>
      )}
    </div>
  );
}
